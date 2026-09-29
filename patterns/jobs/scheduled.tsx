import { Section, Demo, Rules, Avoid, When, Btn, Field, Pill } from '../../site/kit';
import { AdminPage } from '../admin/admin-kit';
import '../records/foundations.css';
import '../forms/forms.css';
import '../shell/shell.css';
import './exports.css';

// Scheduled jobs: jobs that repeat, such as monthly statements, daily reminders, and nightly snapshots. Each says what
// it does, when it next runs, and how its last run went. Set up and paused in Administration › Schedules; every run shows
// in Jobs like any other job.

const rows: [string, string, string, string, 'ok' | 'bad' | 'off' | undefined, string][] = [
  ['Monthly statements', 'Monthly, on the 1st, 8:00 AM', '1 Oct, 8:00 AM', '1 Sep: 2,406 sent, 3 bounced', 'bad', 'Active'],
  ['Payment reminders', 'Weekdays, 9:00 AM', 'Tomorrow, 9:00 AM', 'Today: 42 sent', 'ok', 'Active'],
  ['Overdue report to Liza', 'Mondays, 7:00 AM', '5 Oct, 7:00 AM', '28 Sep: sent', 'ok', 'Active'],
  ['Bank statement import', 'Every day, 6:00 AM', '—', 'Paused by Carlo, 25 Sep', 'off', 'Paused'],
];

export default function Scheduled() {
  return (
    <>
      <Demo wide caption="Administration › Schedules, for admins. Every job that repeats: what it is, when it runs, when it runs next, and how its last run went, in words. Opening one shows its schedule in a drawer, with Run now and Pause.">
        <AdminPage on="Schedules" crumb={<b>Schedules</b>} overlay={
            <div className="pd-side">
              <p className="pd-side-h"><b>Monthly statements</b><span>×</span></p>
              <p className="pd-side-s">Generates a statement for every customer with a balance, and emails it to their billing contact.</p>
              <Field label="Runs" value="Monthly" select />
              <div className="sj-row"><Field label="On day" value="1" /><Field label="At" value="8:00 AM" /></div>
              <Field label="With the access of" value="Ramon Cruz, Finance" select hint="It reaches only what Ramon can." />
              <Field label="If anything fails, tell" value="Ramon Cruz, Ana Reyes" />
              <p className="sj-next">Next run: <b>Thursday 1 Oct, 8:00 AM</b></p>
              <span className="pd-foot"><Btn>Pause</Btn><Btn>Run now</Btn><Btn kind="pri">Save</Btn></span>
            </div>
        }>
              <div className="as-a-head"><div><p className="m-title">Schedules</p><p className="as-meta"><span>Jobs the system runs on its own. Each run shows in Jobs.</span></p></div><Btn kind="pri">New schedule</Btn></div>
              <table className="m-tbl dx-tbl">
                <thead><tr><th>Job</th><th>When</th><th>Next run</th><th>Last run</th></tr></thead>
                <tbody>{rows.map(([n, w, next, last, tone, st]) => <tr key={n}><td><a className="m-link">{n}</a>{st === 'Paused' && <> <Pill tone="off">Paused</Pill></>}</td><td>{w}</td><td>{next}</td><td><Pill tone={tone}>{last}</Pill></td></tr>)}</tbody>
              </table>
            
        </AdminPage>
      </Demo>

      <Section title="Now, or on a schedule">
        <When head={['', 'Started by a person', 'Scheduled']} rows={[
          ['Examples', 'An export, a batch someone starts, an import', 'Monthly statements, daily reminders, nightly snapshots'],
          ['Runs with the access of', 'The person who started it', 'The person named on the schedule'],
          ['Shows in Jobs for', 'The person who started it', 'The people told on failure, and admins'],
          ['Set up in', 'The page the work is on', 'Administration › Schedules'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Say when it runs, in words.', '“Monthly, on the 1st, 8:00 AM”, and the next run as a date and time.'],
            ['Show how the last run went.', '“2,406 sent, 3 bounced”, linked to that run in Jobs.'],
            ['Every schedule runs as someone.', 'A named person’s access, so it reaches only what they could.'],
            ['Pause, and Run now.', 'Pause without deleting it, and run it once by hand to check.'],
            ['Say who hears when it fails.', 'Named people, notified with the run’s summary.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Cron expressions on screen.', '“0 8 1 * *” means nothing to the finance lead who owns the statements.'],
            ['“Last run: success.”', 'The 3 statements that bounced never get followed up.'],
            ['Jobs that run as the system, with every permission.', 'A schedule set up for Cebu quietly emails every branch’s customers.'],
            ['Deleting to stop a schedule.', 'Its settings are lost, and nobody remembers how it was set up.'],
            ['Failures only in a server log.', 'The reminders stopped two weeks ago, and nobody was told.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
