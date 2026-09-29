import { Section, Demo, Pair, Rules, Avoid, When } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, Me, Msg, Steps } from '../agents/agent-kit';
import { CmdPanel, CmdWindow, Menu, Composer, Chip, Caret, Sent, builtIns, teamCmds, type Sess } from './commands-kit';

// Using a command: typing / in the message box opens a menu of commands, filtered as you type, each with a line on
// what it does and who made it. Picking one fills its inputs as chips, and a preview says what will happen (it only
// drafts) before Enter runs it: in this conversation from the right bar, or in a new session from the Agents window.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

const greeting = <Msg>I can see the 12 overdue invoices in Cebu, ₱11,642,000 in all. What do you need?</Msg>;
const pause = builtIns.find(c => c.name === '/pause')!;
const payrun = <><span className="cm-tok">/payrun</span><Chip k="week" v="this week" on /><Chip k="hold" v="anything unsure" /></>;
const payrunPreview = 'Marco drafts the run for your approval. Nothing is paid until you approve it.';

// The Agents window at 7:40 AM, once Ramon has pressed Enter: the new session is on top.
const sessions: Sess[] = [
  ['marco', 'Payment run #0318', 'Running', '7:40 AM', true],
  ['bea', 'Proposal for Abad Trucking', 'Waiting on Liza', 'Yesterday'],
  ['marco', 'Bank lines, 25 to 27 Sep', 'Done', 'Sun'],
];

export default function Using() {
  return (
    <>
      <Demo wide caption={<>Ramon types / in the right bar, beside the overdue invoices. The menu opens over the message box: the built-in commands first, in a row, then the team commands he may use, each with one line on what it does and who made it. Typing narrows the list; Esc closes it and leaves the /.</>}>
        <div className="cm-short">
          <AgentFrame as="lead" loud overlay={
            <CmdPanel onPage="Invoices · Overdue in Cebu" foot={<>
              <Menu built groups={[['Team commands', [teamCmds.payrun, teamCmds.remind, teamCmds.explain]]]} on="/payrun" />
              <Composer where={<span>Type to narrow the list</span>}><span className="cm-typed">/</span><Caret /></Composer>
            </>}>
              {greeting}
            </CmdPanel>}>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo caption={<>He types /pa. Two commands are left, and the descriptions tell them apart: /pause stops Marco at once; /payrun prepares a run. The letters he typed are marked in each name.</>}>
          <div className="cm-box">
            <CmdPanel onPage="Invoices · Overdue in Cebu" foot={<>
              <Menu typed="/pa" groups={[['Built-in', [pause]], ['Team commands', [teamCmds.payrun]]]} on="/payrun" />
              <Composer where={<span>Enter to pick /payrun</span>}><span className="cm-typed">/pa</span><Caret /></Composer>
            </>}>
              {greeting}
            </CmdPanel>
          </div>
        </Demo>
        <Demo caption={<>Enter picks /payrun and fills its inputs as chips, with the defaults Ramon saved: this week, and hold anything unsure. Tab moves to the next chip to change it. The preview says what will happen, and that Marco only drafts, before anything runs.</>}>
          <div className="cm-box">
            <CmdPanel onPage="Invoices · Overdue in Cebu" foot={
              <Composer tag="Drafts" preview={payrunPreview} where={<><span><b>Runs here</b>, in this conversation</span><span>Tab next input · Enter run</span></>}>{payrun}</Composer>
            }>
              {greeting}
            </CmdPanel>
          </div>
        </Demo>
      </Pair>

      <Demo wide caption={<>The same command in the Agents window. Ramon pressed New, typed /payrun, and Enter started a session of its own, named for the work. His message shows the command and its inputs; the note under it says which command and version it came from. The session runs beside his others, and he can leave it and come back.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <CmdWindow sessions={sessions} title="Payment run #0318" foot={<Composer>Ask Marco, or type / for commands</Composer>}>
            <Me><Sent name="/payrun" inputs={[['week', 'this week'], ['hold', 'anything unsure']]} /></Me>
            <p className="cm-note">From /payrun, version 2, by Ramon Cruz · drafts for your approval</p>
            <Steps items={[[true, 'Read 36 invoices from 35 suppliers, due this week'], [false, 'Matching each to its PO and delivery']]} />
          </CmdWindow>
        </AgentFrame>
      </Demo>

      <Section title="Where a command runs">
        <When head={['Where you type it', 'Where it runs', 'Why']} rows={[
          ['The right bar, beside a page', 'This conversation', 'The page goes with it, and the answer lands beside it'],
          ['The Agents window, in a session', 'That session, after what’s there', 'It carries on the work already under way'],
          ['The Agents window, after New', 'A new session, named for the work', 'Sessions run side by side; this one doesn’t wait on the others'],
          ['The right bar, for long work', 'This conversation, with Open in Agents', 'A 35-line run is easier to check in the window'],
        ]} />
        <p className="g-see">The same few commands work with every Agent: see {link('commands/built-in', 'Built-in commands')}. A command only drafts, like everything an Agent does: see {link('agents/autonomy', 'Drafts, never changes')}.</p>
      </Section>

      <Pair>
        <Demo verdict="do" caption="Each command says what it does and who made it. Ramon picks the right one without opening help.">
          <div className="cm-box">
            <CmdPanel onPage="Invoices · Overdue in Cebu" foot={<>
              <Menu groups={[['Team commands', [teamCmds.payrun, teamCmds.remind, teamCmds.explain]]]} on="/payrun" />
              <Composer><span className="cm-typed">/</span><Caret /></Composer>
            </>} />
          </div>
        </Demo>
        <Demo verdict="avoid" caption="Names only, made up by whoever saved them. Is /pr2 the payment run or the proposal? Nobody but its maker knows.">
          <div className="cm-box">
            <CmdPanel onPage="Invoices · Overdue in Cebu" foot={<>
              <div className="cm-bare"><Menu groups={[['Commands', [{ name: '/pr', desc: '' }, { name: '/pr2', desc: '' }, { name: '/rmd_od', desc: '' }, { name: '/x', desc: '' }]]]} foot="4 commands" /></div>
              <Composer><span className="cm-typed">/</span><Caret /></Composer>
            </>} />
          </div>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption="The inputs are on screen before it runs, and the preview says Marco only drafts. Ramon sees “this week” and presses Enter.">
          <div className="cm-box">
            <CmdPanel onPage="Invoices · Overdue in Cebu" foot={
              <Composer tag="Drafts" preview={payrunPreview} where={<span><b>Runs here</b>, in this conversation</span>}>{payrun}</Composer>
            }>
              {greeting}
            </CmdPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption="Picking the command runs it. No inputs, no preview: Ramon learns from the reply that it used last week’s dates.">
          <div className="cm-box">
            <CmdPanel onPage="Invoices · Overdue in Cebu" foot={<Composer>Type a message…</Composer>}>
              <Me>/payrun</Me>
              <Msg>Done! I prepared the payment run for 21 to 27 Sep.</Msg>
            </CmdPanel>
          </div>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Open the menu on /.', 'In the message box, filtered as you type, by name and description.'],
            ['Describe every command.', 'One line on what it does, and who made it, beside the name.'],
            ['Fill the inputs as chips.', 'Each with its saved default; Tab moves to the next to change it.'],
            ['Preview before it runs.', 'What will happen: “drafts the run for your approval”.'],
            ['Say where it runs.', 'This conversation in the right bar; a new session after New in the Agents window.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Commands hidden in help.', 'People who don’t know the names never find them.'],
            ['Cryptic names.', '/pr2 and /rmd_od mean something only to whoever made them.'],
            ['Inputs typed after the name.', '“/payrun thisweek unsure”: one typo, and it runs on the wrong week.'],
            ['Running on pick.', 'The work starts before anyone sees what it will do.'],
            ['Sessions started silently.', 'The answer lands somewhere the person isn’t looking.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
