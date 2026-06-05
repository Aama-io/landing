// @ts-nocheck
import { useMemo, useRef, useState } from 'react';
import {
  Container, Title, Text, TextInput, NumberInput, Select, Textarea, Button, Loader,
} from '@mantine/core';
import {
  IconDownload, IconMail, IconCircleCheck, IconAlertTriangle, IconFileText,
} from '@tabler/icons-react';
import classes from './DrawdownNotice.module.css';

const CURRENCIES = ['USD', 'SGD', 'EUR', 'GBP', 'HKD', 'AUD'];
const PURPOSES = [
  'New portfolio investments',
  'Follow-on investment',
  'Management fees',
  'Fund operating expenses',
  'Mixed — see note below',
];

// ── Document styling (inline so the printed copy is fully self-contained) ──
const doc = {
  paper: { background: '#ffffff', color: '#1a1a1a', padding: '44px 46px', fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 13.5, lineHeight: 1.65 },
  fundName: { fontSize: 21, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 },
  manager: { fontSize: 12.5, color: '#555', margin: '2px 0 0' },
  rule: { border: 0, borderTop: '2px solid #1a1a1a', margin: '16px 0 22px' },
  metaRow: { display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: '#333', marginBottom: 4 },
  addr: { margin: '18px 0 6px', fontSize: 13 },
  title: { fontSize: 16, fontWeight: 700, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '20px 0 18px' },
  p: { margin: '0 0 14px' },
  table: { width: '100%', borderCollapse: 'collapse', margin: '8px 0 18px', fontSize: 13 },
  th: { textAlign: 'left', padding: '9px 12px', borderBottom: '1.5px solid #1a1a1a', fontWeight: 700, background: '#f3f3f3' },
  thR: { textAlign: 'right', padding: '9px 12px', borderBottom: '1.5px solid #1a1a1a', fontWeight: 700, background: '#f3f3f3' },
  td: { padding: '8px 12px', borderBottom: '1px solid #ddd' },
  tdR: { padding: '8px 12px', borderBottom: '1px solid #ddd', textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
  tdStrong: { padding: '10px 12px', borderTop: '1.5px solid #1a1a1a', fontWeight: 700 },
  tdStrongR: { padding: '10px 12px', borderTop: '1.5px solid #1a1a1a', fontWeight: 700, textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
  payBox: { border: '1px solid #1a1a1a', borderRadius: 4, padding: '14px 16px', margin: '6px 0 18px', fontSize: 12.5 },
  payRow: { display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px dotted #ccc' },
  sig: { marginTop: 30, fontSize: 12.5 },
  sigLine: { borderTop: '1px solid #1a1a1a', width: 220, marginTop: 36, paddingTop: 5 },
  foot: { marginTop: 26, fontSize: 10.5, color: '#777', borderTop: '1px solid #ddd', paddingTop: 10, lineHeight: 1.5 },
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function plusDaysISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function DrawdownNotice() {
  const [fundName, setFundName] = useState('Aama Growth Fund VCC');
  const [manager, setManager] = useState('Aama Capital Pte. Ltd.');
  const [callNo, setCallNo] = useState('3');
  const [noticeDate, setNoticeDate] = useState(todayISO());
  const [dueDate, setDueDate] = useState(plusDaysISO(10));

  const [investor, setInvestor] = useState('Evergreen Family Office Pte. Ltd.');
  const [currency, setCurrency] = useState('USD');
  const [commitment, setCommitment] = useState(5_000_000);
  const [prevCalled, setPrevCalled] = useState(1_500_000);
  const [thisCall, setThisCall] = useState(1_000_000);

  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [note, setNote] = useState('');

  const [bankName, setBankName] = useState('DBS Bank Ltd, Singapore');
  const [accName, setAccName] = useState('Aama Growth Fund VCC');
  const [accNo, setAccNo] = useState('0010-1234567-8');
  const [swift, setSwift] = useState('DBSSSGSG');
  const [payRef, setPayRef] = useState('AGF-CALL-03');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [errMsg, setErrMsg] = useState('');

  const noticeRef = useRef(null);

  const { commitmentN, prevN, callN, pct, cumAfter, remaining, over } = useMemo(() => {
    const c = Number(commitment) || 0;
    const p = Number(prevCalled) || 0;
    const t = Number(thisCall) || 0;
    return {
      commitmentN: c, prevN: p, callN: t,
      pct: c > 0 ? (t / c) * 100 : 0,
      cumAfter: p + t,
      remaining: c - (p + t),
      over: p + t > c + 0.001,
    };
  }, [commitment, prevCalled, thisCall]);

  const fmtC = (v) => `${currency} ${(Number(v) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fmtDate = (s) => {
    if (!s) return '—';
    const d = new Date(s);
    if (isNaN(d)) return '—';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  function downloadPdf() {
    const node = noticeRef.current;
    if (!node) return;
    const win = window.open('', '_blank', 'width=820,height=1040');
    if (!win) { setErrMsg('Please allow pop-ups to download the PDF.'); setStatus('error'); return; }
    win.document.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>Capital Call Notice ${callNo} — ${fundName}</title>` +
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: manager || investor || 'Fund Manager',
          email,
          company: fundName,
          inquiryType: 'Drawdown Notice Generator',
          message: `Requested a copy of Capital Call Notice No. ${callNo} for ${fundName}. Investor: ${investor || '—'}. This drawdown: ${fmtC(callN)} (${pct.toFixed(1)}% of commitment). Payment due ${fmtDate(dueDate)}.`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
    } catch {
      setStatus('error');
      setErrMsg('Couldn’t reach the server — you can still download the PDF above.');
    }
  }

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · Fund operations</span>
          <Title className={classes.heroTitle}>
            Drawdown <span className={classes.accent}>notice generator</span>
          </Title>
          <Text className={classes.heroDesc}>
            Produce a clean, professional capital call notice for your LPs in seconds. Fill in the details, preview it
            live, and download a print-ready PDF — or have a copy emailed to you.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="lg">
          <div className={classes.layout}>
            {/* Form */}
            <aside className={classes.controls}>
              <div className={classes.groupTitle}>Fund & notice</div>
              <TextInput label="Fund name" value={fundName} onChange={(e) => setFundName(e.currentTarget.value)} size="sm" className={classes.field} />
              <TextInput label="Manager / General Partner" value={manager} onChange={(e) => setManager(e.currentTarget.value)} size="sm" className={classes.field} />
              <div className={classes.row2}>
                <TextInput label="Call no." value={callNo} onChange={(e) => setCallNo(e.currentTarget.value)} size="sm" />
                <TextInput label="Notice date" type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.currentTarget.value)} size="sm" />
              </div>
              <TextInput label="Payment due date" type="date" value={dueDate} onChange={(e) => setDueDate(e.currentTarget.value)} size="sm" className={classes.field} />

              <div className={classes.groupTitle}>Investor & amounts</div>
              <TextInput label="Investor (LP) name" value={investor} onChange={(e) => setInvestor(e.currentTarget.value)} size="sm" className={classes.field} />
              <Select label="Currency" data={CURRENCIES} value={currency} onChange={setCurrency} size="sm" className={classes.field} allowDeselect={false} />
              <NumberInput label="Total commitment" value={commitment} onChange={setCommitment} min={0} step={500_000} thousandSeparator="," prefix={`${currency} `} hideControls size="sm" className={classes.field} />
              <NumberInput label="Capital previously called (cumulative)" value={prevCalled} onChange={setPrevCalled} min={0} step={250_000} thousandSeparator="," prefix={`${currency} `} hideControls size="sm" className={classes.field} />
              <NumberInput label="This drawdown amount" value={thisCall} onChange={setThisCall} min={0} step={250_000} thousandSeparator="," prefix={`${currency} `} hideControls size="sm" className={classes.field} />
              {over && (
                <div className={classes.warn}>
                  <IconAlertTriangle size={15} /> Called capital exceeds total commitment by {fmtC(cumAfter - commitmentN)}.
                </div>
              )}

              <div className={classes.groupTitle}>Purpose</div>
              <Select label="Use of proceeds" data={PURPOSES} value={purpose} onChange={setPurpose} size="sm" className={classes.field} allowDeselect={false} />
              <Textarea label="Additional note (optional)" value={note} onChange={(e) => setNote(e.currentTarget.value)} size="sm" autosize minRows={2} className={classes.field} placeholder="e.g. allocation across sub-funds, deal reference…" />

              <div className={classes.groupTitle}>Payment instructions</div>
              <TextInput label="Bank name" value={bankName} onChange={(e) => setBankName(e.currentTarget.value)} size="sm" className={classes.field} />
              <TextInput label="Account name" value={accName} onChange={(e) => setAccName(e.currentTarget.value)} size="sm" className={classes.field} />
              <div className={classes.row2}>
                <TextInput label="Account no. / IBAN" value={accNo} onChange={(e) => setAccNo(e.currentTarget.value)} size="sm" />
                <TextInput label="SWIFT / BIC" value={swift} onChange={(e) => setSwift(e.currentTarget.value)} size="sm" />
              </div>
              <TextInput label="Payment reference" value={payRef} onChange={(e) => setPayRef(e.currentTarget.value)} size="sm" className={classes.field} />
            </aside>

            {/* Preview + actions */}
            <div className={classes.results}>
              <div className={classes.toolbar}>
                <div className={classes.toolbarLabel}><IconFileText size={16} /> Live preview</div>
                <Button onClick={downloadPdf} leftSection={<IconDownload size={16} />} className={classes.dlBtn}>
                  Download PDF
                </Button>
              </div>
              <Text size="xs" c="dimmed" mb="sm">
                For privacy, notice details (investor and bank information) are never saved to the URL — share the downloaded PDF or have it emailed instead.
              </Text>

              <div className={classes.previewWrap}>
                {/* Self-contained, inline-styled notice — prints exactly as shown */}
                <div ref={noticeRef} style={doc.paper}>
                  <h1 style={doc.fundName}>{fundName || 'Fund Name'}</h1>
                  <p style={doc.manager}>Acting by its manager, {manager || 'Manager Name'}</p>
                  <hr style={doc.rule} />

                  <div style={doc.metaRow}><span><strong>Capital Call Notice No.</strong> {callNo || '—'}</span><span><strong>Date:</strong> {fmtDate(noticeDate)}</span></div>

                  <p style={doc.addr}><strong>To:</strong> {investor || 'Investor (LP) Name'}<br />(the “Investor”)</p>

                  <div style={doc.title}>Notice of Capital Call</div>

                  <p style={doc.p}>
                    Pursuant to the terms of the constitutive and subscription documents of {fundName || 'the Fund'} (the “Fund”),
                    notice is hereby given that the Fund is calling capital from the Investor as set out below. Payment is due in
                    cleared funds by <strong>{fmtDate(dueDate)}</strong>.
                  </p>

                  <table style={doc.table}>
                    <tbody>
                      <tr><td style={doc.td}>Total capital commitment</td><td style={doc.tdR}>{fmtC(commitmentN)}</td></tr>
                      <tr><td style={doc.td}>Capital previously called</td><td style={doc.tdR}>{fmtC(prevN)}</td></tr>
                      <tr><td style={doc.tdStrong}>This drawdown ({pct.toFixed(1)}% of commitment)</td><td style={doc.tdStrongR}>{fmtC(callN)}</td></tr>
                      <tr><td style={doc.td}>Cumulative called after this notice</td><td style={doc.tdR}>{fmtC(cumAfter)}</td></tr>
                      <tr><td style={doc.td}>Remaining uncalled commitment</td><td style={doc.tdR}>{fmtC(Math.max(0, remaining))}</td></tr>
                    </tbody>
                  </table>

                  <p style={doc.p}><strong>Purpose of this call:</strong> {purpose}{note ? `. ${note}` : '.'}</p>

                  <p style={{ ...doc.p, marginBottom: 6, fontWeight: 700 }}>Payment instructions</p>
                  <div style={doc.payBox}>
                    <div style={doc.payRow}><span>Amount due</span><strong>{fmtC(callN)}</strong></div>
                    <div style={doc.payRow}><span>Due date</span><span>{fmtDate(dueDate)}</span></div>
                    <div style={doc.payRow}><span>Bank</span><span>{bankName || '—'}</span></div>
                    <div style={doc.payRow}><span>Account name</span><span>{accName || '—'}</span></div>
                    <div style={doc.payRow}><span>Account no. / IBAN</span><span>{accNo || '—'}</span></div>
                    <div style={doc.payRow}><span>SWIFT / BIC</span><span>{swift || '—'}</span></div>
                    <div style={{ ...doc.payRow, borderBottom: 'none' }}><span>Payment reference</span><span>{payRef || '—'}</span></div>
                  </div>

                  <p style={doc.p}>
                    Please ensure the payment reference is quoted on your remittance. If payment is not received by the due date,
                    default provisions under the Fund’s governing documents may apply.
                  </p>

                  <div style={doc.sig}>
                    Yours faithfully,
                    <div style={doc.sigLine}>For and on behalf of<br /><strong>{manager || 'Manager Name'}</strong></div>
                  </div>

                  <div style={doc.foot}>
                    This notice is issued pursuant to the Fund’s Limited Partnership Agreement / subscription documents and is for the
                    named Investor only. It does not constitute an offer of securities or investment, legal or tax advice. Generated with aama.io.
                  </div>
                </div>
              </div>

              {/* Email capture */}
              <div className={classes.captureCard}>
                {status === 'done' ? (
                  <div className={classes.captureDone}>
                    <IconCircleCheck size={22} />
                    <div>
                      <strong>You’re all set.</strong>
                      <span> We’ve logged your request and our team will email your notice shortly.</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={classes.captureHead}>
                      <IconMail size={18} className={classes.captureIcon} />
                      <div>
                        <div className={classes.captureTitle}>Email me a copy</div>
                        <div className={classes.captureSub}>Get this notice and a fund-admin starter kit sent to your inbox.</div>
                      </div>
                    </div>
                    <div className={classes.captureRow}>
                      <TextInput
                        type="email" placeholder="you@fund.com" value={email}
                        onChange={(e) => { setEmail(e.currentTarget.value); if (status === 'error') setStatus('idle'); }}
                        size="md" className={classes.captureInput} error={status === 'error' ? errMsg : undefined}
                      />
                      <Button onClick={emailCopy} disabled={status === 'loading'} size="md" className={classes.captureBtn}>
                        {status === 'loading' ? <Loader size="xs" color="white" /> : 'Send it'}
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <Text className={classes.disclaimer}>
                Template for operational convenience only — not legal advice. Capital call terms, notice periods and default
                provisions are governed by your fund’s constitutive documents; have counsel review before issuing. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
