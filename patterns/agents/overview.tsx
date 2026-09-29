import { Section, Demo, Rules, Avoid, When, Btn } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, AgentAva, ChatPanel, Day, Me, Msg, Steps, HeldPill, SessionList } from './agent-kit';

// Where the Agent lives: two places for the same conversation. A right bar beside whatever page people are on, for
// quick asks about that page, and an Agents window of its own for longer work: sessions on the left, the chat in the
// middle, and a drawer on the right for the record or run the chat is about.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** The Agents window: sessions on the left, one conversation in the middle, and a detail drawer on the right. */
function Workspace() {
  return (
    <div className="wh-ws">
      <SessionList on="Payment run #0318" />
      <div className="wh-chat">
        <p className="wh-chat-h"><AgentAva id="marco" size="sm" /><b>Payment run #0318</b><small>with Marco</small></p>
        <div className="ag-feed">
          <Day label="Today" />
          <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
          <Steps items={[[true, 'Read 36 invoices from 35 suppliers, due this week'], [true, 'Matched each to its PO and delivery']]} />
          <Msg>Run #0318 is ready: ₱48,650,000.00 to 32 suppliers, and 3 held. It’s open on the right.</Msg>
        </div>
        <div className="ag-in"><span>Ask Marco, or tell him what to change…</span><i>↑</i></div>
      </div>
      <div className="wh-detail">
        <p className="wh-detail-h"><b>Run #0318</b><span>×</span></p>
        <p className="wh-big">₱48,650,000.00</p>
        <p className="wh-sub">32 of 35 suppliers · pays 29 Sep, 9:00 AM</p>
        <div className="wh-held">
          <p><HeldPill /> Cebu Paperworks</p>
          <p><HeldPill /> Luzon Packaging</p>
          <p><HeldPill /> Island Grains</p>
        </div>
        <span className="wh-acts"><Btn>Suggest changes</Btn><Btn kind="pri">Approve…</Btn></span>
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <>
      <Demo wide caption={<><b>The right bar.</b> Ramon is on the overdue invoices, opens Marco from Agents in the top bar, and asks about them without leaving the page. The bar runs the full height of the window, knows what page it’s beside, and keeps the answer short. Longer work opens in the Agents window.</>}>
        <AgentFrame as="lead" loud overlay={
          <ChatPanel agent="marco" status="Working · payment run #0318" onPage="Invoices · Overdue in Cebu">
            <Day label="Today" />
            <Me>Which of these should Collections call first?</Me>
            <Msg>INV-1044, Northstar Supply: ₱2,940,000.00, overdue since 9 Sep, and no reply to two reminders. <a className="m-link">Open INV-1044</a></Msg>
          </ChatPanel>
        }>
          <ListPage plain />
        </AgentFrame>
      </Demo>

      <Demo wide caption={<><b>The Agents window.</b> Agents, in the top bar beside the bell, opens a window of its own. Sessions on the left, one per piece of work, with the Agent and where it stands; All Agents, at the top, lists every Agent. The chat in the middle. What the chat is about opens in a drawer on the right, so the run or record sits beside the conversation instead of inside it.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <Workspace />
        </AgentFrame>
      </Demo>

      <Section title="Which to use">
        <When head={['When people', 'Use', 'Why']} rows={[
          ['Want an Agent, from any page', 'Agents, top right', 'Beside the bell and their initials, on every page, with what waits on them'],
          ['Ask about the page they’re on', 'The right bar', 'The Agent sees the page; the answer lands beside it'],
          ['Hand over a piece of work', 'The Agents window', 'It becomes a session they can leave and come back to'],
          ['Review what an Agent prepared', 'The window, with the detail drawer', 'The run and the conversation side by side'],
          ['Pick up where they left off', 'Sessions, in the window', 'Every conversation is kept, newest first'],
          ['Need a record while chatting', 'The detail drawer', 'Open it beside the chat, not in a new page'],
        ]} />
        <p className="g-see">The right bar and the window are the same conversation: “Open in Agents” moves a session from the bar to the window. Approvals also reach people in {link('approvals/waiting', 'Waiting on you')}, and every change shows in {link('explaining/history', 'the history')}.</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A right bar for quick asks.', 'Full height, from the right, beside any page. It knows the page, and keeps answers short.'],
            ['A window of its own for real work.', 'Agents, top right beside your initials, opens sessions, the chat, and a detail drawer.'],
            ['One session per piece of work.', 'Named for the work (“Payment run #0318”), with the Agent and where it stands.'],
            ['Details open beside the chat.', 'Runs and records open in the right drawer; the conversation stays in view.'],
            ['The same conversation in both places.', 'Open in Agents moves it from the bar to the window, history and all.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A floating chat bubble over the page.', 'It covers the work, and moves with every page.'],
            ['Long work in the right bar.', 'A 35-line proposal in a narrow bar is hard to check.'],
            ['One endless conversation per Agent.', 'Last week’s run and today’s are mixed in one scroll.'],
            ['Drawing whole records inside the chat.', 'People can’t tell the copy from the real record.'],
            ['Separate chats that don’t know about each other.', 'People ask twice, and get two answers.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
