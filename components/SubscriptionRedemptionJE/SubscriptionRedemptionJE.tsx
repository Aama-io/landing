// @ts-nocheck
import { useMemo, useRef, useState } from 'react';
import {
  Container, Title, Text, TextInput, NumberInput, Select, SegmentedControl, Button, Loader,
} from '@mantine/core';
import {
  IconDownload, IconMail, IconCircleCheck, IconFileText, IconInfoCircle,
} from '@tabler/icons-react';
import { JournalEntryDoc, fmtMoney } from '@/components/ui/JournalEntryDoc';
import s from '@/components/ui/tool.module.css';
import d from '@/components/ui/jeDoc.module.css';

const CURRENCIES = ['USD', 'SGD', 'EUR', 'GBP', 'HKD', 'AUD'];

export default function SubscriptionRedemptionJE() {
  const [fund, setFund] = useState('Aama Income Fund VCC');
  const [investor, setInvestor] = useState('Evergreen Family Office Pte. Ltd.');
  const [currency, setCurrency] = useState('USD');
  const [txn, setTxn] = useState('subscription'); // subscription | redemption
  const [nav, setNav] = useState(102.45);
  const [amount, setAmount] = useState(500_000);  // subscription gross
  const [units, setUnits] = useState(4_000);      // redemption units
  const [feePct, setFeePct] = useState(2.0);      // entry/exit fee %
  const [dealDate, setDealDate] = useState('2026-02-15');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');
  const docRef = useRef(null);

  const isSub = txn === 'subscription';

  const m = useMemo(() => {
    const navN = Number(nav) || 0;
    const fee = (Number(feePct) || 0) / 100;
    if (isSub) {
      const gross = Number(amount) || 0;
      const feeAmt = gross * fee;
      const invested = gross - feeAmt;             // applied to NAV
      const unitsIssued = navN > 0 ? invested / navN : 0;
      return { gross, feeAmt, capital: invested, units: unitsIssued, navN, netCash: gross };
    }
    const u = Number(units) || 0;
    const gross = u * navN;                         // capital cancelled
    const feeAmt = gross * fee;
    const netPayable = gross - feeAmt;
    return { gross, feeAmt, capital: gross, units: u, navN, netCash: netPayable };
  }, [isSub, amount, units, nav, feePct]);

  const entries = useMemo(() => {
    if (isSub) {
      const lines = [
        { account: 'Cash at bank', debit: m.gross },
        { account: 'Net assets attributable to unitholders', credit: m.capital },
      ];
      if (m.feeAmt > 0) lines.push({ account: 'Subscription / entry fee income', credit: m.feeAmt });
      return [{
        ref: 'JE-1', date: dealDate, heading: 'Subscription — units issued',
        narrative: `issue of ${m.units.toLocaleString('en-US', { maximumFractionDigits: 4 })} units at the dealing NAV of ${fmtMoney(currency, m.navN)} per unit.`,
        lines,
      }];
    }
    const lines = [
      { account: 'Net assets attributable to unitholders', debit: m.capital },
      { account: 'Cash at bank / redemptions payable', credit: m.netCash },
    ];
    if (m.feeAmt > 0) lines.push({ account: 'Redemption / exit fee income', credit: m.feeAmt });
    return [{
      ref: 'JE-1', date: dealDate, heading: 'Redemption — units cancelled',
      narrative: `cancellation of ${m.units.toLocaleString('en-US', { maximumFractionDigits: 4 })} units at the dealing NAV of ${fmtMoney(currency, m.navN)} per unit.`,
      lines,
    }];
  }, [isSub, m, dealDate, currency]);

  function downloadPdf() {
    const node = docRef.current;
    if (!node) return;
    const win = window.open('', '_blank', 'width=820,height=1040');
    if (!win) { setErrMsg('Please allow pop-ups to download the PDF.'); setStatus('error'); return; }
    win.document.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>${isSub ? 'Subscription' : 'Redemption'} journal entry — ${fund}</title>` +
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
          name: fund || 'Fund Administrator', email, company: fund,
          inquiryType: 'Subscription / Redemption JE Generator',
          message: `Generated a ${txn} journal entry for ${fund} (investor ${investor}). NAV ${fmtMoney(currency, m.navN)}, ${m.units.toLocaleString()} units, capital ${fmtMoney(currency, m.capital)}.`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
    } catch {
      setStatus('error'); setErrMsg('Couldn’t reach the server — you can still download the PDF above.');
    }
  }

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · Fund accounting</span>
          <Title className={s.heroTitle}>Subscription &amp; redemption <span className={s.accent}>JE generator</span></Title>
          <Text className={s.heroDesc}>
            Price units at the dealing NAV, apply entry or exit fees, and generate the subscription or redemption journal
            entry — with the unit count and impact on net assets attributable to unitholders.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout}>
            <aside className={s.controls} data-static>
              <SegmentedControl
                fullWidth value={txn} onChange={setTxn} className={s.field}
                data={[{ value: 'subscription', label: 'Subscription' }, { value: 'redemption', label: 'Redemption' }]}
              />
              <div className={s.panelTitle}>Fund & investor</div>
              <TextInput label="Fund name" value={fund} onChange={(e) => setFund(e.currentTarget.value)} size="sm" className={s.field} />
              <TextInput label="Investor (unitholder)" value={investor} onChange={(e) => setInvestor(e.currentTarget.value)} size="sm" className={s.field} />
              <Select label="Currency" data={CURRENCIES} value={currency} onChange={setCurrency} size="sm" className={s.field} allowDeselect={false} />

              <div className={s.panelTitle} style={{ marginTop: 18 }}>Dealing</div>
              <NumberInput label="NAV per unit (dealing)" value={nav} onChange={setNav} min={0} step={0.01} decimalScale={4} thousandSeparator="," prefix={`${currency} `} hideControls size="sm" className={s.field} />
              {isSub ? (
                <NumberInput label="Subscription amount (gross)" value={amount} onChange={setAmount} min={0} step={50_000} thousandSeparator="," prefix={`${currency} `} hideControls size="sm" className={s.field} />
              ) : (
                <NumberInput label="Units redeemed" value={units} onChange={setUnits} min={0} step={100} thousandSeparator="," hideControls size="sm" className={s.field} />
              )}
              <NumberInput label={isSub ? 'Entry / sales fee' : 'Exit / redemption fee'} value={feePct} onChange={setFeePct} min={0} step={0.25} suffix="%" hideControls size="sm" className={s.field} />
              <TextInput label="Dealing date" type="date" value={dealDate} onChange={(e) => setDealDate(e.currentTarget.value)} size="sm" className={s.field} />
            </aside>

            <div className={s.results}>
              <div className={s.kpiGrid} data-cols="3">
                <div className={s.kpiCard}>
                  <div className={s.kpiLabel}>{isSub ? 'Units issued' : 'Units cancelled'}</div>
                  <div className={s.kpiVal} data-sm>{m.units.toLocaleString('en-US', { maximumFractionDigits: 4 })}</div>
                  <div className={s.kpiSub}>at {fmtMoney(currency, m.navN)} / unit</div>
                </div>
                <div className={s.kpiCard}>
                  <div className={s.kpiLabel}>{isSub ? 'Capital credited' : 'Capital cancelled'}</div>
                  <div className={s.kpiVal} data-sm>{fmtMoney(currency, m.capital)}</div>
                  <div className={s.kpiSub}>{isSub ? 'increase in net assets' : 'decrease in net assets'}</div>
                </div>
                <div className={s.kpiCard}>
                  <div className={s.kpiLabel}>{isSub ? 'Net cash received' : 'Net cash payable'}</div>
                  <div className={s.kpiVal} data-sm>{fmtMoney(currency, m.netCash)}</div>
                  <div className={s.kpiSub}>{m.feeAmt > 0 ? `${fmtMoney(currency, m.feeAmt)} fee` : 'no fee'}</div>
                </div>
              </div>

              <div className={d.toolbar} style={{ marginTop: 22 }}>
                <div className={d.toolbarLabel}><IconFileText size={16} /> Journal entry</div>
                <Button onClick={downloadPdf} leftSection={<IconDownload size={16} />} className={d.dlBtn}>Download PDF</Button>
              </div>
              <div className={d.previewWrap}>
                <JournalEntryDoc
                  innerRef={docRef}
                  entity={fund} subtitle={`${investor} · ${isSub ? 'Subscription' : 'Redemption'}`}
                  title={`Journal entry — ${isSub ? 'subscription (units issued)' : 'redemption (units cancelled)'}`}
                  currency={currency} entries={entries}
                  footnote="Open-ended unit pricing at the dealing NAV. Net assets attributable to unitholders is presented as a liability under IAS 32 where units are puttable."
                />
              </div>

              <div className={d.note}>
                <IconInfoCircle size={17} className={d.noteIcon} />
                <span>
                  Units are priced at the <strong>dealing NAV</strong> per unit. Where the fund’s units are puttable, the
                  unitholders’ interest is presented as a financial liability (IAS 32), so subscriptions and redemptions move
                  that balance rather than equity.
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
                        <div className={d.captureTitle}>Email me this entry</div>
                        <div className={d.captureSub}>Get the journal entry and a fund-accounting starter kit in your inbox.</div>
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
                Illustrative entry for operational convenience only — not accounting or tax advice. Unit pricing, equalisation
                and the equity-vs-liability presentation of unitholders’ interests depend on your fund’s constitution and
                accounting policies; have your auditor review before posting. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
