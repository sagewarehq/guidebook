import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Field } from '../../site/kit';
import { AgentFrame, AgentHead, Me, Msg, Day } from '../agents/agent-kit';
import { CmdWindow, Chip, type Sess } from './commands-kit';

// Making a command: after a session that went well, Save as command… on the ask turns it into a command. A drawer
// sets its name, description, inputs, and who can use it, then a test run that changes nothing. Like everything an
// Agent does, it only drafts, and it runs with the access of whoever uses it. Editing makes a new version.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

const ask = 'Prepare this week’s payment run. Hold anything you’re not sure about.';

// The Agents window on Mon 21 Sep, after run #0309 was approved.
const sessions: Sess[] = [
  ['marco', 'Payment run #0309', 'Done', '7:40 AM', true],
  ['nico', 'Branch targets for October', 'Answered', 'Fri'],
  ['marco', 'Why is Luzon Packaging over PO?', 'Answered', 'Fri'],
];

/** The Save as command drawer: name, description, the ask with its inputs, who can use it, and a test run. */
function SaveDrawer() {
  return (
    <div className="cm-drawer">
      <p className="cm-drawer-h"><b>Save as command</b><span>×</span></p>
      <p className="cm-drawer-s">From Payment run #0309, with Marco</p>
      <div className="cm-two">
        <Field label="Name" value="/payrun" hint="Short, and says the work." />
        <Field label="Agent" value="Marco" hint="A command belongs to one Agent." />
      </div>
      <Field label="Description" value="Prepare a week’s payment run, holding anything unsure." hint="Shown beside the name in the / menu." />
      <div>
        <p className="cm-lbl">What it asks Marco</p>
        <p className="cm-ask">Prepare the payment run for <Chip k="week" v="this week" />. Hold <Chip k="hold" v="anything you’re not sure about" />.</p>
      </div>
      <table className="cm-inputs">
        <thead><tr><th>Input</th><th>Default</th><th>People can choose</th></tr></thead>
        <tbody>
          <tr><td>week</td><td>this week</td><td>this week, next week, or a date</td></tr>
          <tr><td>hold</td><td>anything unsure</td><td>anything unsure, or only what’s over PO</td></tr>
        </tbody>
      </table>
      <p className="cm-fixed"><span className="cm-lvl">Drafts</span><span>Marco drafts the run; a Finance lead approves it. It runs with the access of whoever uses it.</span></p>
      <div>
        <p className="cm-lbl">Who can use it</p>
        <div className="cm-radio">
          <p><i />Just me</p>
          <p className="on"><i />Finance <small>5 people</small></p>
          <p><i />Everyone who can use Marco <small>11 people</small></p>
        </div>
      </div>
      <p className="cm-test"><b>✓ Test run: the same as run #0309.</b><span>Week of 21 Sep: ₱41,208,000.00 to 29 suppliers, 2 held. Nothing was created or paid.</span></p>
      <span className="pd-foot"><Btn>Test run again</Btn><Btn kind="pri">Save command</Btn></span>
    </div>
  );
}

// /payrun’s versions: number, when and by whom, what changed, live.
const versions: [string, string, string, boolean?][] = [
  ['Version 2', 'Tue 22 Sep · Ramon Cruz', 'hold defaults to anything unsure, not only what’s over PO', true],
  ['Version 1', 'Mon 21 Sep · Ramon Cruz', 'Saved from Payment run #0309'],
];

export default function Making() {
  return (
    <>
      <Demo wide caption={<>Monday 21 September. Ramon’s ask worked: run #0309 came back right, and he approved it. He’ll ask the same thing next Monday, so he opens ••• on his message and picks Save as command…. Only a person’s ask can be saved; Marco doesn’t make commands.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <CmdWindow sessions={sessions} title="Payment run #0309">
            <Day label="Mon 21 Sep" />
            <div className="cm-hover">
              <Me>{ask}</Me>
              <div className="cm-pop"><p>Copy</p><p className="on">Save as command…</p></div>
            </div>
            <Msg>Run #0309 is ready: ₱41,208,000.00 to 29 suppliers, and 2 held.</Msg>
            <p className="cm-note">Ramon approved run #0309 at 8:15 AM.</p>
          </CmdWindow>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>Save as command… opens a drawer, full height, beside the session. The ask comes in as written, with the parts that change each week already made inputs: the week, and what to hold. Ramon names it, says what it does in a line, and picks who can use it. Approval isn’t a choice: Marco only drafts, so every run still waits for a Finance lead. The test run shows what Marco would prepare, and creates nothing.</>}>
        <div className="cm-short cm-mid">
          <AgentFrame as="lead" loud on="Agents" overlay={<SaveDrawer />}>
            <CmdWindow sessions={sessions} title="Payment run #0309">
              <Me>{ask}</Me>
              <Msg>Run #0309 is ready: ₱41,208,000.00 to 29 suppliers, and 2 held.</Msg>
            </CmdWindow>
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<>The command’s own page, under Marco’s Commands. Edit command never changes the live version: it makes a new one, and each session says which version it ran on. Ramon changed the hold default on Tuesday; today’s run #0318 ran on version 2.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <div className="as-a-page cm-page">
            <AgentHead id="marco" on="Commands" crumb={['/payrun']} title="/payrun" meta={<span>Prepare a week’s payment run, holding anything unsure.</span>}
              acts={<><Btn kind="quiet">Archive</Btn><Btn kind="pri">Edit command</Btn></>} />
            <div className="cm-cards">
              <div className="cm-card"><small>Made by</small><b>Ramon Cruz</b><span>Mon 21 Sep</span></div>
              <div className="cm-card"><small>Who can use it</small><b>Finance</b><span>5 people</span></div>
              <div className="cm-card"><small>Used</small><b>Once</b><span>Today, 7:40 AM, run #0318</span></div>
            </div>
            <div className="cm-grp">
              <p className="cm-grp-h"><span className="m-k">Versions</span></p>
              <div className="cm-ver">{versions.map(([v, when, what, live]) => <p key={v}><b>{v}{live && <em>Live</em>}</b><small>{when}</small><span>{what}</span></p>)}</div>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="The command only drafts, like everything Marco does, and runs with the access of whoever uses it. Saving it gives no one more than they had.">
          <Win title="Save as command">
            <div className="cm-grp">
              <p className="cm-fixed"><span className="cm-lvl">Drafts</span><span>Marco drafts the run; a Finance lead approves it. It runs with the access of whoever uses it.</span></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="The command skips approval and borrows Ramon’s access. Anyone in Finance could now have Marco pay suppliers, as Ramon, in every branch, with nobody deciding.">
          <Win title="Save as command">
            <div className="cm-grp">
              <Field label="Approval" value="Skip: pay at once" select />
              <Field label="Run with the access of" value="Ramon Cruz (all branches)" select />
            </div>
          </Win>
        </Demo>
      </Pair>

      <Section title="A command, or something else">
        <When head={['When', 'Make it', 'Who makes it']} rows={[
          ['People ask the same thing again and again', 'A command', 'Anyone, from an ask that worked'],
          ['It’s a one-off question', 'Nothing: just ask', '—'],
          ['The Agent should always work this way', <>A line in its instructions. See {link('agents/profile', 'Agent profile')}</>, 'Its owner, in the Instructions box'],
          ['The Agent should know a fact', <>A memory. See {link('teaching/memory', 'Agent memory')}</>, 'The Agent, as it works; people correct it'],
          ['The Agent needs a new way of doing a task', <>A skill. See {link('teaching/skills', 'Skills')}</>, 'The Agent learns it; the owner can edit or forget it'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Save from an ask that worked.', '••• on the message, then Save as command…, in the session.'],
            ['Name it, and say what it does.', 'A short name and one line, as the / menu will show them.'],
            ['Make inputs of what changes.', 'The week, the hold rule, each with a default.'],
            ['Choose who can use it, and test it.', 'Just me, a team, or everyone; the test run creates nothing.'],
            ['Never more than the Agent may do.', 'It only drafts, with the user’s own access; edits make a new version.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Commands written from scratch.', 'Wording nobody has seen work.'],
            ['Names without descriptions.', '/pr2, in a menu of twenty.'],
            ['Values fixed into the command.', '/payrun-21sep, then /payrun-28sep, every week.'],
            ['Sharing it untested.', 'The whole team runs it before anyone sees what it does.'],
            ['A command that skips approval.', 'Suppliers paid with nobody deciding, because a command said so.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
