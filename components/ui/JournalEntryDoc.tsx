// @ts-nocheck
// Shared, print-ready journal-entry document used by the fund-accounting tools
// (bond amortised cost, FX revaluation, subscription/redemption). Inline styles
// keep the printed/exported copy fully self-contained, exactly like the
// Drawdown Notice generator.

export type JELine = { account: string; debit?: number; credit?: number; muted?: boolean };
export type JEntry = { ref?: string; date?: string; heading: string; narrative?: string; lines: JELine[] };

export function fmtMoney(currency: string, v: number) {
  const n = Number(v) || 0;
  return `${currency} ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function fmtLongDate(s?: string) {
  if (!s) return '—';
  const d = new Date(s);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

const doc = {
  paper: { background: '#ffffff', color: '#1a1a1a', padding: '44px 46px', fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 13.5, lineHeight: 1.6 },
  entity: { fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 },
  sub: { fontSize: 12.5, color: '#555', margin: '2px 0 0' },
  rule: { border: 0, borderTop: '2px solid #1a1a1a', margin: '14px 0 20px' },
  docTitle: { fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 18px' },
  entry: { margin: '0 0 24px' },
  entryHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 },
  entryRef: { fontSize: 13, fontWeight: 700 },
  entryDate: { fontSize: 12, color: '#555' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  thAcc: { textAlign: 'left', padding: '7px 10px', borderBottom: '1.5px solid #1a1a1a', fontWeight: 700, background: '#f3f3f3' },
  thNum: { textAlign: 'right', padding: '7px 10px', borderBottom: '1.5px solid #1a1a1a', fontWeight: 700, background: '#f3f3f3', width: 130 },
  tdAcc: { padding: '7px 10px', borderBottom: '1px solid #e3e3e3' },
  tdAccCr: { padding: '7px 10px 7px 34px', borderBottom: '1px solid #e3e3e3' },
  tdNum: { padding: '7px 10px', borderBottom: '1px solid #e3e3e3', textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
  tdTotAcc: { padding: '8px 10px', borderTop: '1.5px solid #1a1a1a', fontWeight: 700 },
  tdTotNum: { padding: '8px 10px', borderTop: '1.5px solid #1a1a1a', fontWeight: 700, textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
  narr: { margin: '7px 0 0', fontSize: 12, color: '#444', fontStyle: 'italic' },
  foot: { marginTop: 22, fontSize: 10.5, color: '#777', borderTop: '1px solid #ddd', paddingTop: 10, lineHeight: 1.5 },
};

export function JournalEntryDoc({ innerRef, entity, subtitle, title, currency, entries, footnote }) {
  return (
    <div ref={innerRef} style={doc.paper}>
      <h1 style={doc.entity}>{entity || 'Entity name'}</h1>
      {subtitle && <p style={doc.sub}>{subtitle}</p>}
      <hr style={doc.rule} />
      <div style={doc.docTitle}>{title}</div>

      {entries.map((e, i) => {
        const drTotal = e.lines.reduce((s, l) => s + (Number(l.debit) || 0), 0);
        const crTotal = e.lines.reduce((s, l) => s + (Number(l.credit) || 0), 0);
        return (
          <div key={i} style={doc.entry}>
            <div style={doc.entryHead}>
              <span style={doc.entryRef}>{e.ref ? `${e.ref} — ` : ''}{e.heading}</span>
              {e.date && <span style={doc.entryDate}>{fmtLongDate(e.date)}</span>}
            </div>
            <table style={doc.table}>
              <thead>
                <tr>
                  <th style={doc.thAcc}>Account</th>
                  <th style={doc.thNum}>Debit</th>
                  <th style={doc.thNum}>Credit</th>
                </tr>
              </thead>
              <tbody>
                {e.lines.map((l, j) => {
                  const isCr = (Number(l.credit) || 0) > 0 && !(Number(l.debit) > 0);
                  return (
                    <tr key={j}>
                      <td style={isCr ? doc.tdAccCr : doc.tdAcc}>{l.account}</td>
                      <td style={doc.tdNum}>{(Number(l.debit) || 0) > 0 ? fmtMoney(currency, l.debit) : ''}</td>
                      <td style={doc.tdNum}>{(Number(l.credit) || 0) > 0 ? fmtMoney(currency, l.credit) : ''}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td style={doc.tdTotAcc}>Total</td>
                  <td style={doc.tdTotNum}>{fmtMoney(currency, drTotal)}</td>
                  <td style={doc.tdTotNum}>{fmtMoney(currency, crTotal)}</td>
                </tr>
              </tbody>
            </table>
            {e.narrative && <p style={doc.narr}>Being {e.narrative}</p>}
          </div>
        );
      })}

      <div style={doc.foot}>
        {footnote || 'Illustrative journal entries generated for operational convenience only.'} Generated with aama.io.
      </div>
    </div>
  );
}
