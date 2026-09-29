import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Field } from '../../site/kit';
import { AgentFrame, AgentHead, AgentDrawer } from './agent-kit';
import { cx } from '../../lib/cx';
import '../forms/forms.css';

// Scheduled tasks: the Schedule tab on an Agent’s page lists the work it starts on its own, each with when it runs,
// when it runs next, how the last run went, and who its drafts go to. Like everything an Agent does, a scheduled task
// only drafts. One task can be paused without pausing the Agent. The same pattern as Scheduled jobs in Management.

// Marco’s scheduled tasks: name, who its drafts go to, when, next run, last run (run, result), paused by.
const tasks: [string, string, string, string, [string, string], string?][] = [
  ['Prepare the weekly payment run', 'Ramon Cruz', 'Mondays, 7:40 AM', 'Mon 5 Oct, 7:40 AM', ['#0318', 'Today · waiting on you']],
  ['Draft payment reminders', 'Ramon Cruz', 'Mondays and Thursdays, 9:15 AM', 'Thu 1 Oct, 9:15 AM', ['#0319', 'Today · 12 drafted, waiting on you']],
  ['Match delivery receipts', 'Ramon Cruz', 'Thursdays, 6:00 AM', 'Thu 1 Oct, 6:00 AM', ['#0314', 'Thu 24 Sep · 214 approved, 2 held']],
  ['Match the week’s bank lines', 'Ramon Cruz', 'Fridays, 4:00 PM', '—', ['#0317', 'Fri 25 Sep · undone by Ramon'], 'Paused by Ramon Cruz, today 9:05 AM'],
];

/** The Schedule tab: every task Marco starts on his own. */
function ScheduleTab() {
  return (
    <div className="as-a-page">
      <AgentHead id="marco" on="Schedule" />
      <p className="scd-lead">Work Marco starts on his own. Each run only drafts: changes wait for the person named.</p>
      <table className="m-tbl scd-tbl">
        <thead><tr><th>Task</th><th>When</th><th>Next run</th><th>Last run</th><th /></tr></thead>
        <tbody>{tasks.map(([t, to, when, next, [run, res], paused]) => (
          <tr key={t} className={cx(paused && 'scd-off')}>
            <td><a className="m-link">{t}</a><small>{`Drafts for ${to}`}</small></td>
            <td>{when}</td>
            <td>{paused ? <><Pill tone="off">Paused</Pill><small>{paused}</small></> : next}</td>
            <td><a className="m-link">{run}</a><small>{res}</small></td>
            <td className="scd-acts">{paused ? <a>Resume</a> : <a>Pause</a>}<a>Run now</a><a>Edit</a></td>
          </tr>
        ))}</tbody>
      </table>
      <p className="scd-foot">Pausing a task stops only that task. To stop everything Marco does, use Pause at the top.</p>
    </div>
  );
}

export default function Schedule() {
  return (
    <>
      <Demo wide caption={<>Marco’s Schedule tab. Each task says what it is, who its drafts go to, when it runs in words, and its next run as a date. Last run opens that run, with its result in a few words. Ramon paused bank matching this morning, after undoing Friday’s run; Marco’s other tasks, and his chat, carry on.</>}>
        <AgentFrame on="Agents" as="lead" loud><ScheduleTab /></AgentFrame>
      </Demo>

      <Demo wide caption="Edit opens a drawer from the right: what Marco is asked to do, in plain words, when it runs, and who approves what he drafts. Marco runs it with his own role, so a schedule never reaches more than he can. The next run updates as the fields change.">
        <AgentFrame on="Agents" as="lead" loud overlay={
          <AgentDrawer title="Prepare the weekly payment run" sub="Marco · Schedule" foot={<><Btn kind="quiet">Pause this task</Btn><Btn>Run now</Btn><span className="as-grow" /><Btn>Cancel</Btn><Btn kind="pri">Save</Btn></>}>
            <div className="scd-ask"><label>What Marco does</label><p>Prepare this week’s payment run for supplier invoices due by Friday. Hold anything you’re not sure about.</p></div>
            <div className="scd-row"><Field label="Runs" value="Every week" select /><Field label="On" value="Monday" select /><Field label="At" value="7:40 AM" /></div>
            <Field label="Drafts go to" value="Ramon Cruz, Finance lead" select hint="He approves, edits, or rejects each run. Marco never pays." />
            <Field label="Runs with the access of" value="Marco’s role, Finance Agent" hint="Set in Administration › Users and roles." />
            <p className="scd-next">Next run: <b>Monday 5 Oct, 7:40 AM</b></p>
          </AgentDrawer>}>
          <ScheduleTab />
        </AgentFrame>
      </Demo>

      <Section title="Pause a task, or pause the Agent">
        <When head={['', 'Pause this task', 'Pause Marco']} rows={[
          ['Where', 'The task’s row, or its drawer', 'The top of Marco’s page, the chat, the Agents list'],
          ['What stops', 'That task’s next runs', 'Everything: scheduled tasks, chat, running sessions'],
          ['What carries on', 'His other tasks, and his chat', 'Nothing, until someone resumes him'],
          ['Drafts already waiting', 'Still wait for you', 'Still wait for you'],
          ['Use it when', 'One task needs fixing', 'Something is wrong and you don’t yet know what'],
        ]} />
        <p className="g-see">The same pattern as <a className="m-link" href="#/management/jobs/scheduled">System jobs › Scheduled jobs</a>. Pausing the whole Agent: see <a className="m-link" href="#/agentic/control/pause">Pausing an Agent</a>.</p>
      </Section>

      <Pair>
        <Demo verdict="do" caption="When it runs, in words, and the next run as a date. Ramon can tell at a glance that Monday’s run is set.">
          <Win title="Marco · Schedule">
            <p className="scd-mini"><b>Prepare the weekly payment run</b><span>Mondays, 7:40 AM · next Mon 5 Oct, 7:40 AM</span><small>Drafts for Ramon Cruz</small></p>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="A cron line and a switch. Nobody at Metro Lending can read when it runs, or who sees what it makes.">
          <Win title="Marco · Settings">
            <p className="scd-mini"><b>payrun_job</b><code className="scd-cron">40 7 * * 1</code><small>Enabled ✓</small></p>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['List every recurring task on one tab.', 'Schedule, on the Agent’s page: what, when, next run, and last run.'],
            ['Say when in words.', '“Mondays, 7:40 AM”, and the next run as a date and time.'],
            ['Link the last run.', 'Its result in a few words, opening the run it made.'],
            ['Name who gets the drafts.', 'A scheduled task drafts like any other; a named person decides.'],
            ['Pause one task on its own.', 'One click on its row, logged with who and when; the Agent carries on.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Schedules hidden in settings.', 'Ramon learns Marco works on Fridays when a run turns up.'],
            ['Cron lines.', '“40 7 * * 1” means nothing to Finance, and says no next run.'],
            ['A last run that says OK.', 'Nobody can tell what came of it, or open it.'],
            ['Drafts with nobody named.', 'A run waits all week, and nobody knows it’s theirs.'],
            ['One Pause for everything.', 'To stop bank matching, Ramon stops Monday’s payment run too.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
