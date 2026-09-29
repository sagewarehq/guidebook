import { Section, Demo, Rules, Avoid, When, Btn } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import './foundations.css';
import '../shell/shell.css';

// Trash: a deleted record waits in the trash for 30 days, restorable, then it's gone for good. Each list has a Trash
// view. Deleting for good before then takes its own permission, on a confirmation page.

const rows: [string, string, string, string][] = [
  ['Metro Fuel Corp', 'Ana, today 9:40 AM', 'A duplicate of Metro Fuels', '30 days'],
  ['Sugbo Hardware', 'Ana, 20 Sep 2026', 'Made by mistake', '22 days'],
  ['Test customer', 'Liza, 1 Sep 2026', '—', '3 days'],
];

export default function Trash() {
  return (
    <>
      <Demo wide caption="Customers › Trash. Everything deleted in the last 30 days: who deleted it, when, why, and how long it has left. Restore brings it back exactly as it was.">
        <Frame on="Customers" as="lead">
          <div className="as-a-page">
            <p className="as-crumb">Customers <span>/</span> <b>Trash</b></p>
            <div className="as-a-head"><div><p className="m-title">Customers</p><p className="as-meta"><span>Trash: deleted records are kept for 30 days, then gone for good</span></p></div></div>
            <p className="as-views2"><span>Active<em>1,204</em></span><span>Mine<em>86</em></span><span>Archived<em>31</em></span><span className="on">Trash<em>3</em></span></p>
            <table className="m-tbl">
              <thead><tr><th>Record</th><th>Deleted by</th><th>Why</th><th>Gone in</th><th /></tr></thead>
              <tbody>{rows.map(([r, by, why, left]) => <tr key={r}><td>{r}</td><td>{by}</td><td>{why}</td><td className={left === '3 days' ? 'tr-soon' : undefined}>{left}</td><td className="r"><Btn>Restore</Btn></td></tr>)}</tbody>
            </table>
          </div>
        </Frame>
      </Demo>

      <Section title="A deleted record’s life">
        <When head={['Stage', 'What people see', 'Can it come back?']} rows={[
          ['In the trash, 30 days', 'The Trash view; opening it shows “In the trash”, with when it goes and Restore', 'Yes, by anyone who could delete it'],
          ['Deleted for good', 'Not found, anywhere', 'Only from a snapshot'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Deleting goes to the trash first.', 'After its confirmation page, a deleted record waits 30 days before it’s gone.'],
            ['Every list has a Trash view.', 'With who deleted each record, when, why, and how long it has left.'],
            ['Restore puts it back exactly.', 'Same ID, same links, same history, with the restore added to it.'],
            ['Say when it goes for good.', '“Gone in 3 days”, on the list and on the record’s banner.'],
            ['Deleting for good early is for a few.', 'A permission of its own, on a confirmation page, logged in the audit trail.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Deleting straight away, for good.', 'One wrong click, and the only way back is a snapshot restore.'],
            ['One trash for the whole system.', 'Ana scrolls past deleted loans and payments to find her customer.'],
            ['Restoring as a copy.', 'The record comes back with a new ID, and every old link is broken.'],
            ['Records that vanish without warning.', 'Someone meant to restore it next week, and it’s gone.'],
            ['Anyone can empty the trash.', 'The safety net is gone with one click, and nobody knows who did it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
