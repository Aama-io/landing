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

const CURRENCIES = ['USD', 'SGD', 'EUR', 'GBP', 'HKD', 'AUD', 'JPY', 'CNH'];

const ITEM_TYPES = [
  { value: 'receivable', label: 'Receivable (asset)', isAsset: true, account: 'Trade & other receivables' },
  { value: 'cash', label: 'Cash / bank balance (asset)', isAsset: true, account: 'Cash at bank' },
  { value: 'payable', label: 'Payable (liability)', isAsset: false, account: 'Trade & other payables' },
  { value: 'borrowing', label: 'Borrowing / loan (liability)', isAsset: false, account: 'Borrowings' },
];

export default function FxRevaluationJE() {
  const [entity, setEntity] = useState('Aama Global Fund VCC');
  const [funcCcy, setFuncCcy] = useState('SGD');
  const [foreignCcy, setForeignCcy] = useState('USD');
  const [itemType, setItemType] = useState('receivable');
  const [amount, setAmount] = useState(1_000_000);
  const [openRate, setOpenRate] = useState(1.34);
  const [closeRate, setCloseRate] = useState(1.36);
  const [periodEnd, setPeriodEnd] = useState('2026-03-31');
  const [desc, setDesc] = useState('USD trade receivable');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');
  const docRef = useRef(null);

  const m = useMemo(() => {
    const type = ITEM_TYPES.find((t) => t.value === itemType) || ITEM_TYPES[0];
    const amt = Number(amount) || 0;
    const openF = amt * (Number(openRate) || 0);
    const closeF = amt * (Number(closeRate) || 0);
    const diff = closeF - openF;                 // change in functional carrying amount
    const gain = type.isAsset ? diff : -diff;    // asset value up = gain; liability up = loss
    const account = `${type.account} (${foreignCcy})`;
    return { type, amt, openF, closeF, diff, gain, account, isAsset: type.isAsset };
  }, [itemType, amount, openRate, closeRate, foreignCcy]);

  const entries = useMemo(() => {
    const abs = Math.abs(m.gain);
    let lines;
    if (m.gain >= 0) {
      // gain: asset increases, or liability decreases
      lines = m.isAsset
        ? [{ account: m.account, debit: abs }, { account: 'Foreign exchange gain (P&L)', credit: abs }]
        : [{ account: m.account, debit: abs }, { account: 'Foreign exchange gain (P&L)', credit: abs }];
    } else {
      lines = m.isAsset
        ? [{ account: 'Foreign exchange loss (P&L)', debit: abs }, { account: m.account, credit: abs }]
        : [{ account: 'Foreign exchange loss (P&L)', debit: abs }, { account: m.account, credit: abs }];
    }
    return [{
      ref: 'JE-1', date: periodEnd,
      heading: `FX revaluation — ${m.gain >= 0 ? 'gain' : 'loss'}`,
      narrative: `retranslation of the ${foreignCcy} monetary item to the closing rate of ${closeRate} (IAS 21), recognised in profit or loss.`,
      lines,
    }];
  }, [m, periodEnd, foreignCcy, closeRate]);

  function downloadPdf() {
    const node = docRef.current;
    if (!node) return;
    const win = window.open('', '_blank', 'width=820,height=1040');
    if (!win) { setErrMsg('Please allow pop-ups to download the PDF.'); setStatus('error'); return; }
    win.document.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>FX revaluation journal entry — ${entity}</title>` +
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
          inquiryType: 'FX Revaluation JE Generator',
          message: `Generated an IAS 21 FX revaluation entry for ${entity}: ${foreignCcy} ${m.amt.toLocaleString()} ${m.type.label} at ${closeRate} (${funcCcy}). ${m.gain >= 0 ? 'Gain' : 'Loss'} ${fmtMoney(funcCcy, Math.abs(m.gain))}.`,
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
          <Title className={s.heroTitle}>FX revaluation <span className={s.accent}>JE generator</span></Title>
          <Text className={s.heroDesc}>
            Retranslate a foreign-currency monetary item to the closing rate under IAS 21, compute the period-end gain or
            loss, and produce the revaluation journal entry — ready to post and download.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout}>
            <aside className={s.controls} data-static>
              <div className={s.panelTitle}>Entity & item</div>
              <TextInput label="Reporting entity / fund" value={entity} onChange={(e) => setEntity(e.currentTarget.value)} size="sm" className={s.field} />
              <TextInput label="Item description" value={desc} onChange={(e) => setDesc(e.currentTarget.value)} size="sm" className={s.field} />
              <Select label="Monetary item type" data={ITEM_TYPES} value={itemType} onChange={setItemType} size="sm" className={s.field} allowDeselect={false} />
              <div className={s.row2}>
                <Select label="Functional ccy" data={CURRENCIES} value={funcCcy} onChange={setFuncCcy} size="sm" allowDeselect={false} />
                <Select label="Foreign ccy" data={CURRENCIES} value={foreignCcy} onChange={setForeignCcy} size="sm" allowDeselect={false} />
              </div>
              <NumberInput label={`Amount (${foreignCcy})`} value={amount} onChange={setAmount} min={0} step={100_000} thousandSeparator="," prefix={`${foreignCcy} `} hideControls size="sm" className={s.field} />

              <div className={s.panelTitle} style={{ marginTop: 18 }}>Rates ({funcCcy} per 1 {foreignCcy})</div>
              <div className={s.row2}>
                <NumberInput label="Opening / prior rate" value={openRate} onChange={setOpenRate} min={0} step={0.001} decimalScale={4} hideControls size="sm" />
                <NumberInput label="Closing rate" value={closeRate} onChange={setCloseRate} min={0} step={0.001} decimalScale={4} hideControls size="sm" />
              </div>
              <TextInput label="Period-end date" type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.currentTarget.value)} size="sm" className={s.field} />
            </aside>

            <div className={s.results}>
              <div className={s.kpiGrid} data-cols="3">
                <div className={s.kpiCard}>
                  <div className={s.kpiLabel}>Carrying at opening</div>
                  <div className={s.kpiVal} data-sm>{fmtMoney(funcCcy, m.openF)}</div>
                  <div className={s.kpiSub}>at {Number(openRate).toFixed(4)}</div>
                </div>
                <div className={s.kpiCard}>
                  <div className={s.kpiLabel}>Carrying at closing</div>
                  <div className={s.kpiVal} data-sm>{fmtMoney(funcCcy, m.closeF)}</div>
                  <div className={s.kpiSub}>at {Number(closeRate).toFixed(4)}</div>
                </div>
                <div className={s.kpiCard}>
                  <div className={s.kpiLabel}>FX {m.gain >= 0 ? 'gain' : 'loss'}</div>
                  <div className={s.kpiVal} style={{ color: m.gain >= 0 ? 'var(--mantine-color-teal-7)' : 'var(--mantine-color-red-6)' }}>
                    {m.gain >= 0 ? '' : '−'}{fmtMoney(funcCcy, Math.abs(m.gain))}
                  </div>
                  <div className={s.kpiSub}>to profit or loss</div>
                </div>
              </div>

              <div className={d.toolbar} style={{ marginTop: 22 }}>
                <div className={d.toolbarLabel}><IconFileText size={16} /> Journal entry</div>
                <Button onClick={downloadPdf} leftSection={<IconDownload size={16} />} className={d.dlBtn}>Download PDF</Button>
              </div>
              <div className={d.previewWrap}>
                <JournalEntryDoc
                  innerRef={docRef}
                  entity={entity} subtitle={`${desc} · ${foreignCcy} ${m.amt.toLocaleString('en-US')}`}
                  title="Journal entry — foreign exchange revaluation (IAS 21)"
                  currency={funcCcy} entries={entries}
                  footnote="Monetary items only. Non-monetary items carried at historical cost are not retranslated."
                />
              </div>

              <div className={d.note}>
                <IconInfoCircle size={17} className={d.noteIcon} />
                <span>
                  Only <strong>monetary</strong> items (cash, receivables, payables, borrowings) are retranslated at the closing
                  rate. Non-monetary items measured at historical cost (e.g. prepayments, equity investments at cost) stay at
                  the rate on the transaction date.
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
                Illustrative entry for operational convenience only — not accounting or tax advice. Treatment of monetary vs
                non-monetary items, and whether differences go to P&L or OCI, depends on your accounting policies under IAS 21;
                have your auditor review before posting. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
