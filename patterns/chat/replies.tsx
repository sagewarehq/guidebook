import { Section, Demo, Pair, Rules, Avoid, When, Btn, Pin } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps } from '../agents/agent-kit';
import './chat.css';

// Agent replies: the steps while it works, folded once it’s done; then the result, with a link to every record it
// names; then what happens next and who decides.

/** The folded steps line: tap it to open the steps again. */
const Fold = ({ children }: { children: string }) => <span className="ct-fold"><i>✓</i>{children} ▸</span>;

export default function Replies() {
  return (
    <>
      <Demo wide caption={<>Ramon asks why INV-1038 is overdue. Marco’s reply has four parts, numbered in the table below: the steps, folded now they’re done; the result, in the first line; a link for every record it names; and what happens next, with who decides.</>}>
        <div className="ct-mid">
          <AgentFrame as="lead" loud overlay={
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="Invoices · Overdue in Cebu">
              <Day label="Today" />
              <Me>Why is INV-1038 overdue?</Me>
              <Msg>
                <div className="ct-part"><Pin n={1} /><div><Fold>4 steps · 9 seconds</Fold></div></div>
                <div className="ct-part"><Pin n={2} /><div><span><b>Metro Fuels has paid ₱760,000 of ₱1,180,000. The ₱420,000 left is 26 days overdue.</b> Two reminders, on 9 and 21 Sep, got no reply. Their last 6 invoices were paid on time.</span></div></div>
                <div className="ct-part"><Pin n={3} /><div><span className="ct-acts"><a className="m-link">INV-1038</a><a className="m-link">PAY-0921, 18 Sep</a><a className="m-link">Reminders sent (2)</a></span></div></div>
                <div className="ct-part"><Pin n={4} /><div className="ct-next"><span>This looks like a missed payment, not a dispute. I can draft a final notice. <b>Ana handles Metro Fuels, and she decides whether to call or send it.</b></span><span className="ct-acts"><Btn>Draft a final notice</Btn><Btn kind="quiet">Not now</Btn></span></div></div>
              </Msg>
            </ChatPanel>}>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Section title="The parts of a reply">
        <When head={['', 'Part', 'What it says']} rows={[
          ['1', 'Steps', 'One line per thing the Agent did. Live while it works; folded to “✓ 4 steps · 9 seconds” when it’s done, and tapping opens them again.'],
          ['2', 'Result', 'The answer first, in bold, with the figure. Then one or two lines of why.'],
          ['3', 'Links', 'Every record the reply names, each opening that record: the invoice, the payment, the reminders.'],
          ['4', 'What’s next', 'What the Agent can do now, as buttons, and the person who decides.'],
        ]} />
      </Section>

      <Pair>
        <Demo caption={<>While it works: each step appears as it happens, the one running marked ◌. Stop ends the run where it is, and keeps what’s done so far.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Preparing this week’s payment run" onPage="Invoices · Overdue in Cebu">
              <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
              <Msg>
                <Steps items={[[true, 'Read the invoices due this week from 35 suppliers'], [true, 'Matched 22 suppliers to PO and delivery'], [false, 'Matching the other 13…']]} />
                <span className="ct-stop">Working · 1 min 40 s<Btn>Stop</Btn></span>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo caption={<>When it’s done: the steps fold into one line, and the result leads, with the link to the run and who approves it.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="Invoices · Overdue in Cebu">
              <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
              <Msg>
                <Fold>5 steps · 3 min 12 s</Fold>
                <span><b>Payment run #0318 is ready: ₱48,650,000.00 to 32 suppliers.</b> I made 2 judgment calls and held 3.</span>
                <span className="ct-acts"><a className="m-link">Open run #0318</a></span>
                <span className="ct-next">Nothing is paid until you approve it, as Finance lead.</span>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption={<>Steps folded, the answer in the first line, the records linked, and Ana named as the one who decides.</>}>
          <div className="ct-box tall">
            <ChatPanel agent="marco" status="Ready" onPage="INV-1038">
              <Me>Why is INV-1038 overdue?</Me>
              <Msg>
                <Fold>4 steps · 9 seconds</Fold>
                <span><b>Metro Fuels has paid ₱760,000 of ₱1,180,000. The ₱420,000 left is 26 days overdue.</b> Two reminders got no reply.</span>
                <span className="ct-acts"><a className="m-link">INV-1038</a><a className="m-link">PAY-0921, 18 Sep</a><a className="m-link">Reminders sent (2)</a></span>
                <span className="ct-next"><b>Ana decides whether to call or send a final notice.</b></span>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>A wall of text. The answer is in the second paragraph, no record is linked, and it never says who acts next.</>}>
          <div className="ct-box tall">
            <ChatPanel agent="marco" status="Ready" onPage="INV-1038">
              <Me>Why is INV-1038 overdue?</Me>
              <Msg>
                <div className="ct-wall">
                  <p>Great question! I looked into this invoice for you. I opened the invoice, then I checked the payments recorded against it, then I went through the reminders, and I also looked at the customer’s other invoices to see if there was a pattern.</p>
                  <p>Based on what I found, it seems the customer made a partial payment some time ago and there is still an outstanding balance, which is now past its due date. There have been a couple of reminders sent previously without a response.</p>
                  <p>There could be a number of reasons for this. Let me know if you’d like me to do anything else!</p>
                </div>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Show the steps while it works.', 'One line per step as it happens, the running one marked ◌, and Stop.'],
            ['Fold the steps when it’s done.', '“✓ 5 steps · 3 min 12 s” opens them again; the result leads.'],
            ['Lead with the result.', 'The first line answers the question, in bold, with the figure.'],
            ['Link every record it names.', 'INV-1038, PAY-0921, run #0318: each opens the record.'],
            ['End on what’s next, and who decides.', 'The next step as a button, and the person’s name: “Ana decides.”'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A spinner and silence.', 'Three minutes of “Thinking…”, and nobody knows whether to wait or stop it.'],
            ['Every step, forever.', 'Twenty tool lines push the answer out of sight.'],
            ['The answer in paragraph two.', 'People skim the first line, and miss it.'],
            ['Record numbers as plain text.', 'People copy them into search to check the Agent’s work.'],
            ['Replies that just stop.', 'Nobody knows the next step is theirs, so the invoice sits another week.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
