import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Pill, Sk } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, ChatPanel, ChatPage, Day, Me, Msg, Steps } from '../agents/agent-kit';
import './chat.css';

// The chat panel: where a conversation with an Agent lives. On a desktop it’s a full-height drawer from the right, over
// whatever page you’re on; on the Agents page it’s the whole page; on a phone it’s the full screen. One conversation
// per Agent, the same in all three.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

function Phone({ children }: { children: ReactNode }) {
  return <div className="ct-phone"><i className="ct-notch" /><div className="ct-screen">{children}</div></div>;
}

export default function Panel() {
  return (
    <>
      <Demo wide caption={<>On a desktop: Ramon is on the overdue invoices in Cebu and opens Marco’s chat. It slides in from the right, the full height of the window and about 40% of its width. The list stays in view and still works beside it, and the strip under the header says what Marco can see.</>}>
        <div className="ct-short">
          <AgentFrame as="lead" loud overlay={
            <ChatPanel agent="marco" status="Preparing this week’s payment run" onPage="Invoices · Overdue in Cebu">
              <Day label="Today" />
              <Me>Which of these 12 have had no reminder at all?</Me>
              <Steps items={[[true, 'Read the 12 invoices on this page'], [true, 'Checked each one’s reminders']]} />
              <Msg><span>3 have had no reminder: <a className="m-link">INV-1047</a>, <a className="m-link">INV-1052</a>, and <a className="m-link">INV-1061</a>, ₱2,105,000 between them. Want me to draft one for each? Ana sends them.</span></Msg>
            </ChatPanel>}>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo caption={<>The header, left to right: the Agent’s initials with the AI badge, its name and role, what it’s doing now in green, then Pause and ×. × only closes the panel; the run keeps waiting for Ramon.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="Invoices · Overdue in Cebu">
              <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
              <Msg><span>Payment run #0318 is ready: ₱48,650,000.00 to 32 suppliers, 3 held. <a className="m-link">Open run #0318</a></span></Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo caption={<>After Pause: Marco stops at once, and the header turns red, says who paused him and when, with Resume… in place of Pause. The feed says who paused him and what’s left waiting; the message box says how to start again.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="" pausedBy="Paused by Ramon, 8:15 AM" onPage="Invoices · Overdue in Cebu" composer="Marco is paused. Resume him to brief him.">
              <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
              <Msg><span>Payment run #0318 is ready: ₱48,650,000.00 to 32 suppliers, 3 held. <a className="m-link">Open run #0318</a></span></Msg>
              <p className="ct-note bad">Paused by Ramon Cruz, 8:15 AM. Nothing runs until someone resumes him. Run #0318 still waits for you, unpaid.</p>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Demo wide caption={<>In the Agents window, the chat is the whole page: sessions on the left, one per piece of work, and the open conversation on the right, going back as far as it goes. It’s the same conversation as the panel: what Ramon asked from the invoice list is here too.</>}>
        <AgentFrame as="lead" on="Agents">
          <ChatPage agent="marco" status="Waiting on you · payment run #0318">
            <Day label="Thursday 24 September" />
            <Me>Match September’s delivery receipts to their POs.</Me>
            <Steps items={[[true, 'Read 216 delivery receipts'], [true, 'Matched 214 to their POs'], ['flag', '2 held: they don’t match their POs']]} />
            <Msg><span>Run #0314 is done: 214 of 216 matched. I held <a className="m-link">DR-5588</a> and <a className="m-link">DR-5602</a>, which don’t match their POs. Someone in the warehouse needs to check them.</span></Msg>
            <Day label="Today" />
            <Me>Which of these 12 have had no reminder at all?</Me>
            <Msg><span>3 have had no reminder: <a className="m-link">INV-1047</a>, <a className="m-link">INV-1052</a>, and <a className="m-link">INV-1061</a>, ₱2,105,000 between them.</span></Msg>
            <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
            <Msg><span>Payment run #0318 is ready: ₱48,650,000.00 to 32 suppliers, 3 held. <a className="m-link">Open run #0318</a></span></Msg>
          </ChatPage>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>On a phone, the chat takes the full screen. Ask in the invoice’s top bar slides it in from the right, looking at that invoice; × at the top right, or a swipe right, slides it away. Same header, same Pause.</>}>
        <div className="ct-phones">
          <Phone>
            <p className="ct-ph-top"><span>☰</span><b>INV-1038</b><span className="ct-open ct-tap">Ask</span></p>
            <div className="ct-ph-body">
              <p className="m-title">INV-1038 · Metro Fuels</p>
              <span><Pill tone="bad">Overdue 26 days</Pill></span>
              <p className="as-facts"><span><small>Balance</small>₱420,000</span><span><small>Due</small>2 Sep</span></p>
              <Sk w="70%" /><Sk w="52%" /><Sk w="62%" />
            </div>
          </Phone>
          <p className="ct-arrow">Tap Ask<br />→</p>
          <Phone>
            <ChatPanel agent="marco" status="Preparing the payment run" onPage="INV-1038" composer="Ask Marco…">
              <Me>Why is this one overdue?</Me>
              <Msg>Metro Fuels paid ₱760,000 of ₱1,180,000 on 18 Sep. The ₱420,000 left is 26 days overdue, and two reminders got no reply.</Msg>
            </ChatPanel>
          </Phone>
        </div>
      </Demo>

      <Section title="Drawer, full page, or phone">
        <When head={['Where', 'Use it for', 'What it shows']} rows={[
          ['Chat panel, from the right', 'Asking about what’s on screen: this invoice, this list, this report. Opened from Ask an Agent in the top bar.', 'One Agent’s conversation, the page still usable beside it, and what the Agent can see.'],
          ['Agents page, full page', 'Long work with one Agent, reading back over past days, or moving between Agents.', 'Every Agent and what each is doing on the left; one conversation on the right.'],
          ['Phone, full screen', 'Answering a question or checking a run while away from a desk.', 'The same header and conversation. × or a swipe right closes it.'],
        ]} />
        <p>Approving from a phone or an email has its own rules: see {link('approvals/elsewhere', 'Approvals › Approving by email or phone')}.</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Open from the right, full height.', 'About 40% of the window, so the page beside it stays readable and usable.'],
            ['Say who, and what it’s doing.', 'Initials with the AI badge, name, role, what it’s doing now, then Pause and ×.'],
            ['Say what the Agent can see.', '“Looking at Invoices · Overdue in Cebu” under the header, changing as you move.'],
            ['One conversation per Agent.', 'The panel, the Agents page, and the phone show the same thread; × loses nothing.'],
            ['Full screen on a phone.', 'Sliding in from the right, closed by × or a swipe right.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A chat bubble in the corner.', 'It covers the totals and buttons of the very page it’s about.'],
            ['A header with only a name.', 'People can’t tell it’s an Agent, what it’s busy with, or how to stop it.'],
            ['A chat that can’t see the page.', 'People paste in invoice numbers the screen already shows.'],
            ['A new, empty chat every time.', 'Yesterday’s brief and answers are gone, so people repeat themselves.'],
            ['A small box on a phone.', 'Replies wrap a word to a line, and the message box hides under the keyboard.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
