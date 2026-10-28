import { Container } from '@mantine/core';
import { GOV_FEES, GOV_FEES_AS_OF, SPV_JURISDICTIONS, type SpvJurisdictionKey } from '@/lib/spvCostData';
import classes from './GovFeesTable.module.css';

const QUOTED = 'Quoted per deal';
const ORDER: SpvJurisdictionKey[] = ['singapore', 'delaware', 'cayman', 'bvi'];

/**
 * Indicative government and registry fees for a single-asset SPV, shown beside the aama.io
 * price so the extra cost is visible up front. These are pass-through costs at cost, not part of
 * the SPV fee. Where we have not confirmed a figure from an official schedule, the cell says so.
 */
export function GovFeesTable({ compact = false, embedded = false }: { compact?: boolean; embedded?: boolean }) {
  const table = (
    <>
      <div className={classes.table} role="table" aria-label="Government and registry fees by jurisdiction">
        <div className={classes.tHead} role="row">
          <span role="columnheader">Jurisdiction</span>
          <span role="columnheader">Incorporation or registration</span>
          <span role="columnheader">Annual registry or franchise</span>
          <span role="columnheader">Regulatory filings</span>
        </div>
        {ORDER.map((k) => {
          const g = GOV_FEES[k];
          const cells: [string, string][] = [
            ['Incorporation or registration', g.formation],
            ['Annual registry or franchise', g.annual],
            ['Regulatory filings', g.regulatory],
          ];
          return (
            <div key={k} className={classes.tRow} role="row">
              <span className={classes.jur} role="rowheader">{SPV_JURISDICTIONS[k].label}</span>
              {cells.map(([label, value]) => (
                <span key={label} className={`${classes.cell} ${value === QUOTED ? classes.quoted : ''}`} role="cell">
                  <span className={classes.mobileLabel}>{label}</span>
                  {value}
                </span>
              ))}
            </div>
          );
        })}
      </div>
      <p className={classes.note}>
        Indicative, as of {GOV_FEES_AS_OF}, for a single-asset SPV. Fees are set by each government or registry and change,
        so confirm against the official schedule. {`"${QUOTED}"`} means we have not confirmed a published figure and will
        quote it for your deal. Not legal or tax advice.
      </p>
    </>
  );

  if (compact) {return <div>{table}</div>;}

  // Embedded inside another section (e.g. the SPV tab of the pricing tables): heading plus table, no own section.
  if (embedded) {
    return (
      <div className={classes.embedded}>
        <div className={classes.head}>
          <span className={classes.eyebrow}>Not included in the SPV fee</span>
          <h2 className={classes.title}>Government and registry fees are extra, and paid at cost</h2>
          <p className={classes.lead}>
            Incorporation and registration fees, annual registry or franchise fees and regulatory filing fees are paid to the
            government or registry. We pass them through at cost with no markup. Here is what they typically look like.
          </p>
        </div>
        {table}
      </div>
    );
  }

  return (
    <section className={classes.section}>
      <Container size="xl">
        <div className={classes.head}>
          <span className={classes.eyebrow}>Not included in the SPV fee</span>
          <h2 className={classes.title}>Government and registry fees are extra, and paid at cost</h2>
          <p className={classes.lead}>
            Incorporation and registration fees, annual registry or franchise fees and regulatory filing fees are paid to the
            government or registry. We pass them through at cost with no markup. Here is what they typically look like.
          </p>
        </div>
        {table}
      </Container>
    </section>
  );
}
