import { Section, Demo, Pair, Rules, Avoid, When, Pill } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, Me, Msg } from '../agents/agent-kit';
import { CmdPanel, Menu, Composer, Caret, builtIns, builtInsFor, teamCmds } from './commands-kit';

// Built-in commands: six commands Loans OS gives every Agent, with the same names, in the same order, first in the
// menu. They work with the Agent itself (sessions, status, runs, pause, sharing, help), and each does exactly what
// its button does. Team commands, made by people, come after them.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

// Marco’s sessions at 10:05 AM, as /status lists them: title, who started it and when, where it stands.
const status: [string, string, string][] = [
  ['Payment run #0318', 'Ramon Cruz, 7:40 AM', 'Waiting on you'],
  ['Bank lines, 28 Sep', 'Schedule, 9:00 AM · 41 of 60 lines matched', 'Running'],
  ['Mactan Steel’s September statement', 'Ramon Cruz, 9:48 AM', 'Running'],
];

export default function BuiltIn() {
  return (
    <>
      <Demo wide caption={<>Ramon types / in Marco’s right bar. The six built-in commands come first, each with a line on what it does, then the team commands. The built-ins are the same six, with the same names, for Marco, Nico, and Bea.</>}>
        <div className="cm-short">
          <AgentFrame as="lead" loud overlay={
            <CmdPanel onPage="Invoices · Overdue in Cebu" foot={<>
              <Menu groups={[['Built-in · every Agent', builtIns], ['Team commands', [teamCmds.payrun]]]} on="/status" foot="3 more team commands ↓" />
              <Composer where={<span>Type to narrow the list</span>}><span className="cm-typed">/</span><Caret /></Composer>
            </>} />}>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo caption={<>/status at 10:05 AM. Marco runs sessions side by side, so status lists every one, not just this conversation: who started it, and where it stands. The run waiting on Ramon is first.</>}>
          <div className="cm-box tall">
            <CmdPanel status="Working · 3 sessions" onPage="Invoices · Overdue in Cebu" foot={<Composer>Ask Marco, or type / for commands</Composer>}>
              <Me>/status</Me>
              <Msg>
                <p>3 sessions: 1 waiting on you, 2 running.</p>
                <div className="cm-stat">
                  {status.map(([t, s, st]) => <p key={t}><b>{t}</b><small>{s}</small><Pill>{st}</Pill></p>)}
                </div>
              </Msg>
            </CmdPanel>
          </div>
        </Demo>
        <Demo caption={<>/pause at 10:12 AM does what the Pause button does: at once, with no confirmation page. Loans OS, not Marco, says what stopped and what still waits. Resume… is the way back, as with the button.</>}>
          <div className="cm-box tall">
            <CmdPanel pausedBy="Paused by Ramon, 10:12 AM" onPage="Invoices · Overdue in Cebu" foot={<Composer>Marco is paused. Resume him to brief him.</Composer>}>
              <Me>/pause</Me>
              <p className="cm-note">Loans OS · Ramon paused Marco at 10:12 AM, everywhere. Bank lines stopped after line 44 of 60, saved. Run #0318 still waits on you.</p>
            </CmdPanel>
          </div>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption="Nico’s menu has the same six, in the same order, as Marco’s. Ramon types /pause the same way for either.">
          <div className="cm-box">
            <CmdPanel agent="nico" status="Ready" onPage="Reports · Collections by branch" foot={<>
              <Menu groups={[['Built-in · every Agent', builtInsFor('nico')]]} on="/pause" />
              <Composer><span className="cm-typed">/</span><Caret /></Composer>
            </>} />
          </div>
        </Demo>
        <Demo verdict="avoid" caption="Nico has his own names for the same things. Ramon types /pause, and nothing matches: here it’s /stop, somewhere else /halt.">
          <div className="cm-box">
            <CmdPanel agent="nico" status="Ready" onPage="Reports · Collections by branch" foot={<>
              <Menu groups={[['Commands', [
                { name: '/stop', desc: 'Stop what Nico is doing.' },
                { name: '/whatsup', desc: 'Nico’s status.' },
                { name: '/history', desc: 'Past reports.' },
                { name: '/fresh', desc: 'Clear the chat.' },
              ]]]} />
              <Composer><span className="cm-typed">/</span><Caret /></Composer>
            </>} />
          </div>
        </Demo>
      </Pair>

      <Section title="Built-in or team command">
        <When head={['', 'Built-in', 'Team commands']} rows={[
          ['Made by', 'Loans OS, for every Agent', <>People, from an ask that worked. See {link('commands/making', 'Making a command')}</>],
          ['What they do', 'Work with the Agent itself: sessions, status, runs, pause, sharing, help', 'Work the Agent does: a payment run, reminders, an explanation'],
          ['Names', 'The same six for every Agent, in the same order', 'Belong to one Agent'],
          ['In the / menu', 'First, always', 'After, yours then the team’s'],
          ['Changed by', 'No one', 'Their maker, as a new version; archived when no longer needed'],
        ]} />
        <p className="g-see">/runs opens the Runs list filtered to the Agent; it doesn’t draw the list in the chat (see {link('runs/list', 'Runs list')}). /share lists your recent activity to trim before anything is sent (see {link('chat/context', 'What the Agent can see')}). /pause is the Pause button (see {link('control/pause', 'Pausing an Agent')}).</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['The same six for every Agent.', '/new, /status, /runs, /pause, /share, and /help, in that order.'],
            ['First in the menu.', 'Above the team commands, so they’re found without typing.'],
            ['Do what the button does.', '/pause pauses at once, like Pause; /runs opens the Runs list.'],
            ['Status covers every session.', 'Each with who started it and where it stands; waiting on you first.'],
            ['Share only what people see first.', '/share lists recent activity to trim before it’s sent.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Names that change per Agent.', '/stop for one, /halt for another: people guess.'],
            ['Built-ins under the team commands.', 'The way to pause is below ten other names.'],
            ['A command that differs from its button.', '/pause asks “Are you sure?” while Pause doesn’t.'],
            ['Status of this conversation only.', 'Ramon misses the run waiting on him in another session.'],
            ['Sharing on the command alone.', 'Typing /share sends the last hour without showing it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
