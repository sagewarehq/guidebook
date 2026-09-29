import { Section, Demo, Rules, Avoid, When, Btn, Pill } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { H } from '../shell/places-kit';
import '../records/foundations.css';
import '../shell/shell.css';
import './exports.css';

// The Jobs page: every background job this person started, whatever its kind, with its state and its result.
// Found at the foot of the sidebar, and from every job notification.

export default function JobsPage() {
  return (
    <>
      <Demo wide caption="Jobs, at the foot of the sidebar (1), with a badge counting Ana’s jobs that are running or need her. Her own exports, batches, and imports side by side: what each is, who started it and when, where it stands, and its result, a file to download or a summary to open.">
        <Frame loud as="staff" on="" foot={<><H n={1}><p className="as-nav on">Jobs <em className="as-jobs">2</em></p></H><p className="as-nav">Help</p></>}>
          <div className="as-a-page">
            <p className="as-crumb"><b>Jobs</b></p>
            <div className="as-a-head"><div><p className="m-title">Jobs</p><p className="as-meta"><span>Your background work. Files are kept for 7 days.</span></p></div></div>
            <table className="m-tbl dx-tbl">
              <thead><tr><th>Job</th><th>Started</th><th>State</th><th className="r">Result</th></tr></thead>
              <tbody>
                <tr><td>Generate September statements<small>Cebu · 1,188 customers</small></td><td>Today, 9:14 AM</td><td><Pill tone="bad">Needs attention</Pill><small>1,185 sent · 3 bounced</small></td><td className="r"><a className="m-link">Open summary</a></td></tr>
                <tr><td>Export invoices, 12 rows<small>Overdue in Cebu</small></td><td>Today, 9:12 AM</td><td><Pill tone="ok">Done</Pill></td><td className="r"><a className="m-link">Download</a><small>XLSX · 24 KB · until 5 Oct</small></td></tr>
                <tr><td>Export payments, 3,480 rows<small>Cebu · year 2026</small></td><td>Today, 9:10 AM</td><td><span className="dx-bar"><i style={{ width: '55%' }} /></span>1,910 of 3,480</td><td className="r">—</td></tr>
                <tr><td>Import customers<small>new-customers-cebu.xlsx · 212 rows</small></td><td>Yesterday, 4:02 PM</td><td><Pill tone="bad">Needs attention</Pill><small>208 added · 4 failed</small></td><td className="r"><a className="m-link">Review 4 rows</a></td></tr>
                <tr><td>Export loans, Q3 releases<small>1 Jul to 30 Sep 2026</small></td><td>20 Sep 2026</td><td><Pill tone="bad">Failed</Pill><small>The server restarted mid-run.</small></td><td className="r"><Btn>Try again</Btn></td></tr>
              </tbody>
            </table>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="For admins, the same page has two tabs: Mine, and Everyone, with who started each job. Admins see what ran, but can’t download someone else’s file.">
        <Frame loud as="admin" on="" foot={<><p className="as-nav on">Jobs <em className="as-jobs">1</em></p><p className="as-nav">Settings</p><p className="as-nav">Administration</p><p className="as-nav">Help</p></>}>
          <div className="as-a-page">
            <p className="as-crumb"><b>Jobs</b></p>
            <div className="as-a-head"><div><p className="m-title">Jobs</p><p className="as-meta"><span>Everyone’s background work, last 7 days</span></p></div></div>
            <p className="as-views2"><span>Mine<em>3</em></span><span className="on">Everyone<em>38</em></span></p>
            <table className="m-tbl dx-tbl">
              <thead><tr><th>Job</th><th>Started by</th><th>State</th><th className="r">Result</th></tr></thead>
              <tbody>
                <tr><td>Generate September statements<small>Cebu · 1,188 customers</small></td><td>Ana Reyes, today 9:14 AM</td><td><Pill tone="bad">Needs attention</Pill></td><td className="r"><a className="m-link">Open summary</a></td></tr>
                <tr><td>Export payments, 9,640 rows<small>All branches · year 2026</small></td><td>Ramon Cruz, today 9:05 AM</td><td><Pill tone="ok">Done</Pill></td><td className="r"><small>Ramon’s file</small></td></tr>
                <tr><td>Snapshot: before payment run #0318<small>2.3 GB</small></td><td>Ramon Cruz, today 9:02 AM</td><td><Pill tone="ok">Done</Pill></td><td className="r"><a className="m-link">Open</a></td></tr>
              </tbody>
            </table>
          </div>
        </Frame>
      </Demo>

      <Section title="Who sees which jobs">
        <When head={['Person', 'Sees', 'Badge counts']} rows={[
          ['Everyone', 'Their own jobs, on Mine', 'Their jobs running, or done but needing them, until they open them'],
          ['Admins', 'Mine, and an Everyone tab with who started each', 'Only their own, never everyone’s'],
          ['Nobody', 'Another person’s file to download. Admins see the job, not the data', '—'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One place for every job.', 'Jobs, at the foot of the sidebar, for exports, batches, imports, and snapshots alike. Every job notification links here.'],
            ['Yours by default; everyone’s for admins.', 'Everyone sees their own jobs. Admins get an Everyone tab, with who started each.'],
            ['The badge counts what needs you.', 'Your jobs that are running, or finished and waiting for you. It clears when you open them.'],
            ['Show where it stands.', 'Queued, progress while running, then Done, Needs attention, or Failed, with why.'],
            ['The result is one click away.', 'Download, Open summary, Review the failed rows, or Try again.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A separate page for each kind of job.', 'People check Exports, then Imports, then Batches to find what they started.'],
            ['Everyone’s jobs for everyone.', 'Collections sees Finance’s payment exports, and wonders what they’re for.'],
            ['A badge for every job ever run.', 'It never reaches zero, so people stop looking at it.'],
            ['A spinner with no progress.', 'People can’t tell a big job from a stuck one.'],
            ['Failures that just disappear.', 'People wait for a result that’s never coming.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
