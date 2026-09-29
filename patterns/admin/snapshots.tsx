import { Section, Demo, Rules, Avoid, When, Btn, Pill } from '../../site/kit';
import { AdminPage } from './admin-kit';
import '../records/foundations.css';
import '../shell/shell.css';

// Snapshots: a complete, point-in-time copy of the whole account, records, files, and settings, that the system can
// load back. Taken nightly and before anything big. Listed under System administration › Snapshots.

const rows: [string, string, string, string, string, boolean?][] = [
  ['Before payment run #0318', 'Today, 9:02 AM', 'Ramon', '2.3 GB', '27 Dec 2026'],
  ['Nightly', 'Today, 2:00 AM', 'Automatic', '2.3 GB', '5 Oct 2026'],
  ['Nightly', 'Yesterday, 2:00 AM', 'Automatic', '2.3 GB', '4 Oct 2026'],
  ['Month end, August 2026', '1 Sep 2026, 12:00 AM', 'Automatic', '2.2 GB', '1 Sep 2027', true],
];

export default function Snapshots() {
  return (
    <>
      <Demo wide caption="Administration › Snapshots. Nightly and month-end snapshots are taken on their own; anyone with access can take one before something big. Each says when, by whom, its size, and how long it’s kept, with Restore… on each.">
        <AdminPage on="Snapshots" crumb={<b>Snapshots</b>}>
          <div className="m-row"><div><p className="m-title">Snapshots</p><p className="as-meta"><span>Nightly kept 7 days, month end kept 1 year</span></p></div><Btn kind="pri">Take snapshot</Btn></div>
          <table className="m-tbl">
            <thead><tr><th>Snapshot</th><th>Taken</th><th>By</th><th className="r">Size</th><th>Kept until</th><th /></tr></thead>
            <tbody>{rows.map(([n, t, b, sz, k, m], i) => (
              <tr key={i}><td>{n}{m && <> <Pill>Month end</Pill></>}</td><td>{t}</td><td>{b}</td><td className="r">{sz}</td><td>{k}</td><td className="r"><a className="m-link">Restore…</a></td></tr>
            ))}</tbody>
          </table>
        </AdminPage>
      </Demo>

      <Section title="When a snapshot is taken">
        <When head={['When', 'By', 'Kept']} rows={[
          ['Every night', 'Automatically', '7 days'],
          ['The end of each month', 'Automatically', '1 year'],
          ['Before a big change: a payment run, a data import, a price change', 'The person about to make it, or the system on its own', '90 days'],
          ['Before any restore', 'Automatically, always', '90 days'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A snapshot is the whole account.', 'Every record, file, setting, and user, at one moment, so it can be loaded back as it was.'],
            ['Taken on a schedule, and on demand.', 'Nightly and month end on their own; Take snapshot before anything big.'],
            ['Named for why it was taken.', '“Before payment run #0318”, not a number, so people find the right one.'],
            ['Say how long each is kept.', 'Kept until a date, on every row. Nothing disappears by surprise.'],
            ['Admins download and restore, and it’s logged.', 'Anyone with access can take one; taking, downloading, and restoring are all in the audit trail.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Backing up only the database.', 'The records come back, but the signed contracts and receipts don’t.'],
            ['Snapshots only when someone remembers.', 'The one night it mattered, nobody took one.'],
            ['snapshot_4412.bak.', 'Nobody can tell which one was taken before the mistake.'],
            ['Snapshots that quietly expire.', 'The month-end copy the auditor asked for was deleted last week.'],
            ['Snapshots anyone can download.', 'The whole business leaves in one file, and no one knows.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
