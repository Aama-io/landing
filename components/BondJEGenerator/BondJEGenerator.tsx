// @ts-nocheck
import { useMemo, useRef, useState } from 'react';
import {
  Container, Title, Text, TextInput, NumberInput, Select, Button, Loader,
} from '@mantine/core';
import {
  IconDownload, IconMail, IconCircleCheck, IconFileText, IconInfoCircle,
} from '@tabler/icons-react';
import { JournalEntryDoc, fmtMoney } from '@/components/ui/JournalEntryDoc';
import s from '@/components/ui/tool.module.css';
import d from '@/components/ui/jeDoc.module.css';

const CURRENCIES = ['USD', 'SGD', 'EUR', 'GBP', 'HKD', 'AUD'];
const FREQ = [
  { value: '1', label: 'Annual' },
  { value: '2', label: 'Semi-annual' },
  { value: '4', label: 'Quarterly' },
];

function addMonths(iso, months) {
  const dt = new Date(iso);
  if (isNaN(dt)) return '';
  dt.setMonth(dt.getMonth() + months);
  return dt.toISOString().slice(0, 10);
}
function yearsBetween(a, b) {
  const da = new Date(a); const db = new Date(b);
  if (isNaN(da) || isNaN(db)) return 0;
  return (db - da) / (365.25 * 24 * 3600 * 1000);
}

// Solve the per-period effective interest rate so the present value of all
// future cash flows equals the initial carrying amount (IFRS 9 amortised cost).
function solveEir(carrying, couponPerPeriod, n, face) {
  const pv = (r) => {
    let v = 0;
    for (let k = 1; k <= n; k++) v += couponPerPeriod / (1 + r) ** k;
    v += face / (1 + r) ** n;
    return v - carrying;
  };
  let lo = -0.95; let hi = 1.0;
  // pv is monotonically decreasing in r
  if (pv(lo) < 0) return lo;
  if (pv(hi) > 0) return hi;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const f = pv(mid);
    if (Math.abs(f) < 1e-7) return mid;
    if (f > 0) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

export default function BondJEGenerator() {
  const [name, setName] = useState('5.00% Corporate Bond 2030');
  const [entity, setEntity] = useState('Aama Credit Fund VCC');
  const [currency, setCurrency] = useState('USD');
  const [face, setFace] = useState(1_000_000);
  const [price, setPrice] = useState(96.5);          // clean price as % of par
  const [coupon, setCoupon] = useState(5.0);          // annual coupon %
  const [freq, setFreq] = useState('2');              // periods per year
  const [txnCost, setTxnCost] = useState(2_000);
  const [settle, setSettle] = useState('2026-01-01');
  const [maturity, setMaturity] = useState('2030-01-01');
  const [period, setPeriod] = useState('1');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');
  const docRef = useRef(null);

  const model = useMemo(() => {
    const ppy = Number(freq) || 1;
    const faceN = Number(face) || 0;
    const consideration = faceN * (Number(price) || 0) / 100;
    const carrying = consideration + (Number(txnCost) || 0);
    const couponPerPeriod = faceN * (Number(coupon) || 0) / 100 / ppy;
    const n = Math.max(1, Math.round(yearsBetween(settle, maturity) * ppy));
    const r = solveEir(carrying, couponPerPeriod, n, faceN);
    const annualEir = (1 + r) ** ppy - 1;
    const monthsPerPeriod = 12 / ppy;

    const schedule = [];
    let opening = carrying;
    let totalIncome = 0;
    for (let k = 1; k <= n; k++) {
      const income = opening * r;
      const amort = income - couponPerPeriod;       // + accretes (discount), − amortises (premium)
      const closing = opening + amort;
      totalIncome += income;
      schedule.push({
        k,
        date: addMonths(settle, Math.round(monthsPerPeriod * k)),
        opening, income, coupon: couponPerPeriod, amort, closing,
      });
      opening = closing;
    }

    return {
      ppy, faceN, consideration, carrying, couponPerPeriod, n, r, annualEir,
      premium: consideration - faceN, schedule, totalIncome,
      totalCoupons: couponPerPeriod * n,
      isDiscount: consideration < faceN,
    };
  }, [face, price, coupon, freq, txnCost, settle, maturity]);

  const pIdx = Math.min(Math.max(1, Number(period) || 1), model.n) - 1;
  const row = model.schedule[pIdx];

  const entries = useMemo(() => {
    const list = [];
    // 1 — Day-1 recognition
    list.push({
      ref: 'JE-1', date: settle, heading: 'Initial recognition',
      narrative: 'the debt instrument recognised at amortised cost (fair value plus transaction costs).',
      lines: [
        { account: 'Investment in debt securities', debit: model.carrying },
        { account: 'Cash', credit: model.carrying },
      ],
    });
    // 2 — Selected period accrual
    if (row) {
      const accretes = row.amort >= 0;
      const lines = [{ account: 'Interest receivable / cash', debit: row.coupon }];
      if (accretes) {
        lines.push({ account: 'Investment in debt securities', debit: row.amort });
      }
      lines.push({ account: 'Interest income', credit: row.income });
      if (!accretes) {
        lines.push({ account: 'Investment in debt securities', credit: Math.abs(row.amort) });
      }
      list.push({
        ref: `JE-2 (period ${row.k})`, date: row.date, heading: 'Period interest accrual (effective interest method)',
        narrative: `interest income at the EIR on the opening carrying amount, with the ${accretes ? 'discount accreted to' : 'premium amortised against'} the carrying amount.`,
        lines,
      });
    }
    // 3 — Maturity redemption
    list.push({
      ref: 'JE-3', date: maturity, heading: 'Redemption at maturity',
      narrative: 'repayment of principal; the carrying amount has amortised to face value.',
      lines: [
        { account: 'Cash', debit: model.faceN },
        { account: 'Investment in debt securities', credit: model.faceN },
      ],
    });
    return list;
  }, [model, row, settle, maturity]);

  function downloadPdf() {
    const node = docRef.current;
    if (!node) return;
    const win = window.open('', '_blank', 'width=820,height=1040');
    if (!win) { setErrMsg('Please allow pop-ups to download the PDF.'); setStatus('error'); return; }
    win.document.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>Bond journal entries — ${name}</title>` +
      `<style>@page{margin:16mm;} body{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}</style></head>` +
      `<body>${node.outerHTML}</body></html>`
    );
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  }

  async function emailCopy() {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setStatus('error'); setErrMsg('Please enter a valid email address.'); return; }
    setStatus('loading'); setErrMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: entity || 'Fund Administrator', email, company: entity,
          inquiryType: 'Bond Accounting JE Generator',
          message: `Generated IFRS 9 amortised-cost journal entries for ${name} (${entity}). Face ${fmtMoney(currency, model.faceN)}, price ${price}, EIR ${(model.annualEir * 100).toFixed(3)}%.`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
    } catch {
      setStatus('error'); setErrMsg('Couldn’t reach the server — you can still download the PDF above.');
    }
  }

  const fmtPct = (v) => `${(v * 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}%`;

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · Fund accounting</span>
          <Title className={s.heroTitle}>Bond accounting <span className={s.accent}>JE generator</span></Title>
          <Text className={s.heroDesc}>
            Generate IFRS 9 amortised-cost journal entries for a debt instrument — day-1 recognition, effective-interest
            accruals and maturity — with the full amortisation schedule and effective interest rate solved for you.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout}>
            <aside className={s.controls} data-static>
              <div className={s.panelTitle}>Instrument</div>
              <TextInput label="Instrument name" value={name} onChange={(e) => setName(e.currentTarget.value)} size="sm" className={s.field} />
              <TextInput label="Holding entity / fund" value={entity} onChange={(e) => setEntity(e.currentTarget.value)} size="sm" className={s.field} />
              <Select label="Currency" data={CURRENCIES} value={currency} onChange={setCurrency} size="sm" className={s.field} allowDeselect={false} />
              <NumberInput label="Face / nominal value" value={face} onChange={setFace} min={0} step={100_000} thousandSeparator="," prefix={`${currency} `} hideControls size="sm" className={s.field} />
              <div className={s.row2}>
                <NumberInput label="Clean price (% par)" value={price} onChange={setPrice} min={0} step={0.25} suffix="%" hideControls size="sm" />
                <NumberInput label="Coupon (annual)" value={coupon} onChange={setCoupon} min={0} step={0.125} suffix="%" hideControls size="sm" />
              </div>
              <Select label="Coupon frequency" data={FREQ} value={freq} onChange={setFreq} size="sm" className={s.field} allowDeselect={false} />
              <NumberInput label="Transaction costs (capitalised)" value={txnCost} onChange={setTxnCost} min={0} step={500} thousandSeparator="," prefix={`${currency} `} hideControls size="sm" className={s.field} />

              <div className={s.panelTitle} style={{ marginTop: 18 }}>Dates</div>
              <div className={s.row2}>
                <TextInput label="Settlement" type="date" value={settle} onChange={(e) => setSettle(e.currentTarget.value)} size="sm" />
                <TextInput label="Maturity" type="date" value={maturity} onChange={(e) => setMaturity(e.currentTarget.value)} size="sm" />
              </div>
              <Select
                label="Accrual entry — show period"
                data={model.schedule.map((r) => ({ value: String(r.k), label: `Period ${r.k} of ${model.n}` }))}
                value={String(Math.min(Number(period) || 1, model.n))} onChange={setPeriod} size="sm" className={s.field} allowDeselect={false}
              />
            </aside>

            <div className={s.results}>
              <div className={s.kpiGrid} data-cols="3">
                <div className={s.kpiCard}>
                  <div className={s.kpiLabel}>Effective interest rate</div>
                  <div className={s.kpiVal}>{fmtPct(model.annualEir)}</div>
                  <div className={s.kpiSub}>annual · {fmtPct(model.r)} per period</div>
                </div>
                <div className={s.kpiCard}>
                  <div className={s.kpiLabel}>Initial carrying</div>
                  <div className={s.kpiVal} data-sm>{fmtMoney(currency, model.carrying)}</div>
                  <div className={s.kpiSub}>incl. {fmtMoney(currency, Number(txnCost) || 0)} costs</div>
                </div>
                <div className={s.kpiCard}>
                  <div className={s.kpiLabel}>{model.isDiscount ? 'Discount to par' : 'Premium to par'}</div>
                  <div className={s.kpiVal} data-sm>{fmtMoney(currency, Math.abs(model.premium))}</div>
                  <div className={s.kpiSub}>{model.n} periods to maturity</div>
                </div>
              </div>

              <div className={d.toolbar} style={{ marginTop: 22 }}>
                <div className={d.toolbarLabel}><IconFileText size={16} /> Journal entries</div>
                <Button onClick={downloadPdf} leftSection={<IconDownload size={16} />} className={d.dlBtn}>Download PDF</Button>
              </div>
              <div className={d.previewWrap}>
                <JournalEntryDoc
                  innerRef={docRef}
                  entity={entity} subtitle={name}
                  title="Journal entries — debt instrument at amortised cost (IFRS 9)"
                  currency={currency} entries={entries}
                  footnote="Effective interest method per IFRS 9. Schedule assumes settlement on a coupon date."
                />
              </div>

              <div className={s.sectionLabel} style={{ marginTop: 24 }}>Amortisation schedule</div>
              <div className={s.tableCard}>
                <div className={s.tableScroll}>
                  <table className={s.table}>
                    <thead>
                      <tr>
                        <th>#</th><th>Date</th>
                        <th className={s.num}>Opening</th>
                        <th className={s.num}>Interest (EIR)</th>
                        <th className={s.num}>Coupon</th>
                        <th className={s.num}>Amortisation</th>
                        <th className={s.num}>Closing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {model.schedule.map((r) => (
                        <tr key={r.k} data-active={r.k === pIdx + 1 ? '' : undefined}>
                          <td className={s.tdLabel}>{r.k}</td>
                          <td>{r.date}</td>
                          <td className={s.num}>{fmtMoney(currency, r.opening)}</td>
                          <td className={s.num}>{fmtMoney(currency, r.income)}</td>
                          <td className={s.num}>{fmtMoney(currency, r.coupon)}</td>
                          <td className={s.num}>{fmtMoney(currency, r.amort)}</td>
                          <td className={s.num}>{fmtMoney(currency, r.closing)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={d.note}>
                <IconInfoCircle size={17} className={d.noteIcon} />
                <span>
                  Over the bond’s life, total interest income of <strong>{fmtMoney(currency, model.totalIncome)}</strong> is
                  recognised versus <strong>{fmtMoney(currency, model.totalCoupons)}</strong> of cash coupons — the difference
                  is the {model.isDiscount ? 'discount accreted' : 'premium amortised'} to par.
                </span>
              </div>

              <div className={d.captureCard}>
                {status === 'done' ? (
                  <div className={d.captureDone}>
                    <IconCircleCheck size={22} />
                    <div><strong>You’re all set.</strong><span> We’ve logged your request and our team will follow up shortly.</span></div>
                  </div>
                ) : (
                  <>
                    <div className={d.captureHead}>
                      <IconMail size={18} className={d.captureIcon} />
                      <div>
                        <div className={d.captureTitle}>Email me these entries</div>
                        <div className={d.captureSub}>Get the journal entries and a fund-accounting starter kit in your inbox.</div>
                      </div>
                    </div>
                    <div className={d.captureRow}>
                      <TextInput type="email" placeholder="you@fund.com" value={email}
                        onChange={(e) => { setEmail(e.currentTarget.value); if (status === 'error') setStatus('idle'); }}
                        size="md" className={d.captureInput} error={status === 'error' ? errMsg : undefined} />
                      <Button onClick={emailCopy} disabled={status === 'loading'} size="md" className={d.captureBtn}>
                        {status === 'loading' ? <Loader size="xs" color="white" /> : 'Send it'}
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <Text className={s.disclaimer}>
                Illustrative entries for operational convenience only — not accounting or tax advice. Classification,
                effective-interest mechanics and presentation depend on your accounting policies and IFRS 9 business-model
                assessment; have your auditor review before posting. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
