import { Section, Demo, Pair, Rules, Avoid, Win, Btn, Pill, Field } from '../../site/kit';
import { AgentFrame, AgentHead, AgentDrawer } from './agent-kit';
import { cx } from '../../lib/cx';
import '../forms/forms.css';

// One Agent’s page. The header and its six tabs are the same for every Agent. The first tab, Instructions, is one
// plain textbox the owner writes and saves, with who saved it last and a small history of earlier saves. Then the
// Sessions tab: every conversation people have had with the Agent.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

// Marco’s instructions as Ramon last saved them: plain words, no numbering, no rules document.
const saved = [
  'You prepare Metro Lending’s weekly payment run for supplier invoices, and match delivery receipts to purchase orders. Ramon Cruz, Finance lead, answers for your work.',
  'Have the run ready by 8 AM every Monday. Pay an invoice only when it matches its PO and a delivery receipt. If an invoice looks like one we paid in the last 60 days, hold it.',
  'When you’re not sure, hold it and say why in one line. You never approve or pay anything: every run waits for Finance.',
];

// Earlier saves, newest first: when, who, and whether it’s the one in use.
const saves: [string, string, string?][] = [
  ['Mon 21 Sep, 4:12 PM', 'Ramon Cruz', 'In use'],
  ['Mon 7 Sep, 10:05 AM', 'Ramon Cruz'],
  ['Mon 24 Aug, 2:40 PM', 'Ramon Cruz'],
  ['Mon 6 Jul, 9:00 AM', 'Carlo Mendoza'],
];

// The 7 Sep save, opened in History: before the line about resends.
const sept7 = [
  saved[0],
  'Have the run ready by 8 AM every Monday. Pay an invoice only when it matches its PO and a delivery receipt.',
  saved[2],
];

// Sessions with Marco, newest first: title, started by, when, state. The first and last match Where the Agent lives.
const sessions: [string, string, string, string][] = [
  ['Payment run #0318', 'Ramon Cruz', 'Today, 7:40 AM', 'Waiting on you'],
  ['Bank lines, 25 to 27 Sep', 'Ramon Cruz', 'Sun 27 Sep', 'Done'],
  ['Delivery receipts, week of 21 Sep', 'Schedule, Thursdays', 'Thu 24 Sep', 'Done'],
  ['Payment run #0304', 'Ramon Cruz', 'Mon 21 Sep, 7:40 AM', 'Done'],
  ['Why is Luzon Packaging over PO?', 'Ramon Cruz', 'Fri 18 Sep', 'Answered'],
];

/** The Instructions tab: the textbox, Save, and who saved it last. `editing` draws it changed and not yet saved. */
function Instructions({ editing }: { editing?: boolean }) {
  return (
    <div className="as-a-page pf-page">
      <AgentHead id="marco" on="Instructions" />
      <p className="pf-lead">How Marco should work, in your words. He reads this before every session.</p>
      <div className={cx('pf-box', editing && 'on')}>{saved.map(p => <p key={p}>{p}</p>)}{editing && <p>If you hold anything over ₱1,000,000, tell Liza Tan as well as me.<i className="pf-caret" /></p>}</div>
      <p className="pf-foot">
        <small>Saved by Ramon Cruz, Mon 21 Sep · <a className="m-link">History</a></small>
        <span className="as-grow" />
        {editing && <small className="pf-unsaved">Not saved yet</small>}
        <Btn kind={editing ? 'pri' : 'sec'} className={cx(!editing && 'pf-off')}>Save</Btn>
      </p>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <>
      <Demo wide caption={<>Marco’s page, from Agents, on its first tab. The header says what he is and who answers for him, with Pause, Open chat, and ••• for his runs and report. Instructions is one textbox in Ramon’s own words. Under it, who saved it last and when, and History. Save does nothing until the text changes.</>}>
        <AgentFrame on="Agents" as="lead" loud><Instructions /></AgentFrame>
      </Demo>

      <Demo wide caption="Ramon adds a line and clicks Save. That’s the whole change: no draft, no review, no publish step. Marco reads the new text from his next session; a session already running keeps what it started with. The save is logged with Ramon’s name, and the line under the box updates.">
        <AgentFrame on="Agents" as="lead" loud><Instructions editing /></AgentFrame>
      </Demo>

      <Demo wide caption={<>History opens a drawer of earlier saves: when, and who. Clicking one shows its text, read-only. Restore saves that text as the newest, with Ramon’s name, so restoring is just another save, and the history keeps both.</>}>
        <AgentFrame on="Agents" as="lead" loud overlay={
          <AgentDrawer title="History" sub="Marco · Instructions" foot={<><span className="as-grow" /><Btn>Close</Btn><Btn kind="pri">Restore this save</Btn></>}>
            <div className="pf-saves">
              {saves.map(([when, who, tag]) => (
                <div key={when} className={cx('pf-save', when.startsWith('Mon 7 Sep') && 'on')}>
                  <p><b>{when}</b>{tag && <Pill tone="ok">{tag}</Pill>}</p>
                  <small>{`Saved by ${who}`}</small>
                  {when.startsWith('Mon 7 Sep') && <div className="pf-box pf-read">{sept7.map(p => <p key={p}>{p}</p>)}</div>}
                </div>
              ))}
            </div>
            <p className="pf-note">Restoring saves this text as the newest. Nothing else about Marco changes.</p>
          </AgentDrawer>}>
          <Instructions />
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>The Sessions tab: every conversation people have had with Marco, newest first, with who started it and where it stands. Scheduled work starts sessions too (see {link('agents/schedule', 'Scheduled tasks')}). A session opens in the Agents window; see {link('agents/overview', 'Where the Agent lives')}.</>}>
        <AgentFrame on="Agents" as="lead" loud>
          <div className="as-a-page pf-page">
            <AgentHead id="marco" on="Sessions" />
            <table className="m-tbl pf-sess">
              <thead><tr><th>Session</th><th>Started by</th><th>When</th><th>State</th></tr></thead>
              <tbody>{sessions.map(([t, by, at, st]) => (
                <tr key={t}><td><a className="m-link">{t}</a></td><td>{by}</td><td>{at}</td><td><Pill tone={st === 'Waiting on you' ? undefined : 'ok'}>{st}</Pill></td></tr>
              ))}</tbody>
            </table>
            <p className="pf-foot"><small>5 of 48 since 6 Jul</small><span className="as-grow" /><a className="m-link">Show all</a></p>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Instructions in the owner’s words, in one box. Ramon can read every line, change it, and see who saved it last.">
          <Win title="Agents / Marco · Instructions">
            <div className="pf-mini">
              <div className="pf-box"><p>{saved[2]}</p></div>
              <p className="pf-foot"><small>Saved by Ramon Cruz, Mon 21 Sep · <a className="m-link">History</a></small></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Model settings and a system prompt. Ramon can’t tell what Marco may do with money, and there’s no name or date on the last change.">
          <Win title="Agents / Marco / Settings">
            <div className="pf-mini">
              <Field label="Model" value="large-2026-07" select />
              <Field label="Temperature" value="0.7" />
              <Field label="System prompt" value="You are Marco, a helpful finance assistant…" />
              <span className="pd-foot"><Btn kind="pri">Save</Btn></span>
            </div>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Write instructions as plain text.', 'One textbox, in the owner’s words, on the Agent’s first tab.'],
            ['One box, one Save.', 'Saving is the change. The Agent reads it from its next session.'],
            ['Say who saved it, and when.', 'Under the box: “Saved by Ramon Cruz, Mon 21 Sep · History”.'],
            ['Keep earlier saves.', 'History lists who and when; Restore is just another save, and logged.'],
            ['Keep the page to its six tabs.', 'Instructions, Sessions, Schedule, Memory, Skills, Commands; the rest opens from •••.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Model, temperature, and a system prompt.', 'The owner can’t read them, and they say nothing about money.'],
            ['Drafts, reviews, and Publish.', 'A workflow for a few lines of text, so nobody keeps them up to date.'],
            ['Saves with no name.', 'Marco starts paying differently, and nobody knows who changed what.'],
            ['Overwriting with no way back.', 'A bad edit on Monday, and nobody remembers what it said before.'],
            ['A profile that’s a dashboard.', 'Stats, access, and runs crowd out the one thing the owner came to change.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
