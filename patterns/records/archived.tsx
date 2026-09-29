import { Section, Demo, Rules, Avoid, When, Btn, Pill, Toast } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import './foundations.css';
import '../shell/shell.css';

// Archived records: records the business is finished with, but that other records still point to. They leave the
// everyday lists and can't be picked for new work, but stay in reports, history, and links, read-only, and can be
// restored at any time.

const rows: [string, string, string, string][] = [
  ['Visayas Bottling', 'Cebu', 'Ramon, today 10:20 AM', 'Closed their account'],
  ['Amihan Foods', 'Baguio', 'Ramon, 3 Sep 2026', 'No orders since 2024'],
  ['Northfield Farms', 'Cebu', 'Liza, 2 Jul 2026', 'Merged into Pacific Cartons'],
];

export default function Archived() {
  return (
    <>
      <Demo wide caption="Customers, with Archived as its own view beside the everyday ones. Archived customers show who archived them, when, and why, with Restore on each.">
        <Frame on="Customers" as="lead">
          <div className="as-a-page">
            <p className="as-crumb">Customers <span>/</span> <b>Archived</b></p>
            <div className="as-a-head"><div><p className="m-title">Customers</p><p className="as-meta"><span>Archived: out of everyday lists, still in reports and history</span></p></div><span className="as-acts"><Btn kind="pri">New customer</Btn></span></div>
            <p className="as-views2"><span>Active<em>1,204</em></span><span>Mine<em>86</em></span><span className="on">Archived<em>31</em></span><span>Trash<em>3</em></span></p>
            <table className="m-tbl">
              <thead><tr><th>Customer</th><th>Branch</th><th>Archived by</th><th>Why</th><th /></tr></thead>
              <tbody>{rows.map(([c, b, by, why]) => <tr key={c}><td><a className="m-link">{c}</a> <Pill tone="off">Archived</Pill></td><td>{b}</td><td>{by}</td><td>{why}</td><td className="r"><a className="m-link">Restore</a></td></tr>)}</tbody>
            </table>
            <p className="ar-toastrow"><Toast action="Undo">Visayas Bottling archived.</Toast></p>
          </div>
        </Frame>
      </Demo>

      <Section title="What archiving changes">
        <When head={['Place', 'An archived record']} rows={[
          ['Everyday lists and pickers', 'Left out. A filter or the Archived view shows it.'],
          ['Its own page', 'Opens, read-only, with an Archived banner: who, when, why, and Restore.'],
          ['Records that point to it', 'Still show it, marked Archived, and the link still works.'],
          ['Reports, totals, and history', 'Unchanged. Last year’s figures include it, as they always did.'],
          ['Search and ⌘K', 'Found, lower down, marked Archived.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Archive what you’re finished with.', 'Customers who left, products no longer sold, branches that closed. Delete is for mistakes.'],
            ['Out of everyday lists, never out of the numbers.', 'Archived records leave lists and pickers, but stay in reports, totals, history, and links.'],
            ['Archiving can be undone, so it doesn’t ask.', 'Archive at once, with Undo in the toast, and Restore on the record any time after.'],
            ['Say who, when, and why.', 'An optional reason, shown in the Archived view and on the record’s banner.'],
            ['Archived is a view, not a hiding place.', 'Every list has an Archived view, with a count.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Deleting records you’re finished with.', 'Last year’s invoices lose their customer.'],
            ['Archiving that hides records from totals.', 'Revenue for 2025 drops the day a customer is archived.'],
            ['A confirmation page for archiving.', 'A reversible step gets the ceremony of a void, and people stop reading them.'],
            ['Archived with no reason.', 'A year later nobody knows why Visayas Bottling stopped buying.'],
            ['Archived records nobody can find.', 'People create Amihan Foods again, as a duplicate.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
