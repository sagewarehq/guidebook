import { Section, Demo, Pair, Rules, Avoid, When } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, ChatPanel, Me, Msg, Ask } from '../agents/agent-kit';
import './chat.css';

// Asking an Agent: the message box. Suggested asks drawn from the page you’re on, records mentioned with @, files
// attached, and what the Agent says back when the brief is thin: a plan with the gaps filled from the system, then one
// question.

const Ment = ({ children }: { children: string }) => <span className="ct-ment">{children}</span>;

export default function Asking() {
  return (
    <>
      <Demo wide caption={<>A new conversation, opened from the overdue invoices in Cebu. Marco says what he can see, and the suggested asks come from this page and Ramon’s role: this week’s payment run, the oldest invoice on the list, reminders for the 12. Tapping one fills the box; Ramon can change it before sending.</>}>
        <div className="ct-short">
          <AgentFrame as="lead" loud overlay={
            <ChatPanel agent="marco" status="Ready" onPage="Invoices · Overdue in Cebu">
              <Msg>I can see the 12 overdue invoices in Cebu, ₱11,642,000 in all. What do you need?</Msg>
              <div className="ct-sugg">
                <small>Suggested for this page</small>
                <span>Prepare this week’s payment run</span>
                <span>Why is INV-1038 overdue?</span>
                <span>Draft reminders for the 12 overdue in Cebu</span>
              </div>
            </ChatPanel>}>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo caption={<>Typing @ opens a search of the records Ramon can see. Picking one turns it into a chip that links to the record, so Marco reads the invoice itself, not a number typed from memory.</>}>
          <div className="ct-stack">
            <div className="ct-menu">
              <p className="m-k">Records</p>
              <p className="on"><b>INV-2291</b><span>Luzon Packaging · ₱1,286,000.00</span></p>
              <p><b>INV-2290</b><span>Luzon Packaging · ₱312,400.00</span></p>
              <p><b>INV-2298</b><span>Mactan Steel Supply · ₱1,092,250.00</span></p>
            </div>
            <div className="ct-comp">
              <span>Check @INV-229<i className="ct-caret" /></span>
              <p className="ct-comp-bar"><span>＋ Attach</span><span>@ Record</span><span className="ct-send">↑</span></p>
            </div>
          </div>
        </Demo>
        <Demo caption={<>Files from outside the system go in as attachments: a supplier’s PDF statement, a photo of a signed delivery receipt. Each shows its name and size, with × to take it off before sending.</>}>
          <div className="ct-comp">
            <p className="ct-files">
              <span className="ct-file"><b>Luzon Packaging statement, Sep 2026.pdf</b><small>3 pages · 212 KB</small><i>×</i></span>
              <span className="ct-file"><b>Delivery receipt, 24 Sep.jpg</b><small>Photo · 1.8 MB</small><i>×</i></span>
            </p>
            <span>Check <Ment>INV-2291</Ment> against Luzon’s September statement and the delivery receipt. What’s still over <Ment>PO-4431</Ment>?<i className="ct-caret" /></span>
            <p className="ct-comp-bar"><span>＋ Attach</span><span>@ Record</span><span className="ct-send">↑</span></p>
          </div>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption={<>A thin brief. Marco fills the gaps from the system (the invoices due this week, the usual account, tomorrow’s pay date) and asks the one thing only Ramon can answer.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Ready" onPage="Invoices · Overdue in Cebu">
              <Me>Pay the suppliers.</Me>
              <Msg>Here’s what I’ll prepare: the 35 suppliers due this week, paid from BDO ••4471 on Tue 29 Sep, 9:00 AM. You approve the run before anything is paid.</Msg>
              <Ask question="If an invoice is over its PO: hold it for you, or pay it when the new price was agreed in writing?" options={['Hold it for me', 'Pay it if agreed in writing']} />
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>The same brief, answered with a questionnaire. Every question but the last has an answer in the system already, and Ramon has to type them all.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Ready" onPage="Invoices · Overdue in Cebu">
              <Me>Pay the suppliers.</Me>
              <Msg>
                <span>Sure! Before I start, please tell me:</span>
                <ol className="ct-qs">
                  <li>Which suppliers?</li>
                  <li>Which invoices?</li>
                  <li>Which bank account?</li>
                  <li>On what date?</li>
                  <li>What should I do if an invoice doesn’t match its PO?</li>
                </ol>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption={<>Suggestions tied to the page and the role: a Finance lead on the overdue list sees the payment run, one invoice, and the reminders.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Ready" onPage="Invoices · Overdue in Cebu">
              <Msg>I can see the 12 overdue invoices in Cebu, ₱11,642,000 in all. What do you need?</Msg>
              <div className="ct-sugg">
                <small>Suggested for this page</small>
                <span>Prepare this week’s payment run</span>
                <span>Why is INV-1038 overdue?</span>
                <span>Draft reminders for the 12 overdue in Cebu</span>
              </div>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>A blank box with a greeting and suggestions that could be in any app. Nothing says what Marco can do, or that he can see the list.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Ready" composer="Type a message…">
              <div className="ct-blank">
                <b>How can I help you today?</b>
                <div className="ct-sugg">
                  <span>Summarise a document</span>
                  <span>Write an email</span>
                  <span>Explain a concept</span>
                </div>
              </div>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Section title="Mention, attach, or just say it">
        <When head={['What you’re giving it', 'How', 'Example']} rows={[
          ['A record already in the system', 'Type @ and pick it. It shows as a chip that links to the record.', <><Ment>INV-1038</Ment>, <Ment>PO-4431</Ment>, <Ment>Metro Fuels</Ment></>],
          ['A file from outside', '＋ Attach, or drop it on the chat. It shows with its name and size.', 'A supplier’s PDF statement, a photo of a paper form'],
          ['What’s on screen', 'Nothing to do: the Agent sees the page, as the strip under the header says.', 'Looking at Invoices · Overdue in Cebu'],
          ['What you want, and how far to go', 'Say it in plain words, as to a colleague.', '“Hold anything you’re not sure about.”'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Suggest asks for this page.', 'Two or three, from what’s on screen and the person’s role: “Why is INV-1038 overdue?”'],
            ['Mention records with @.', 'A search of what the person can see; the chip links to the record.'],
            ['Attach what came from outside.', 'A supplier’s PDF, a photo of a form, each shown with its name, size, and ×.'],
            ['Fill the gaps from the system.', 'A thin brief gets a plan with the defaults filled in, and the one question left.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A blank box and a greeting.', 'People don’t know what to ask, so they don’t.'],
            ['Record numbers typed from memory.', 'One wrong digit, and the Agent works on the wrong invoice.'],
            ['Asking people to paste a file’s contents.', 'The figures arrive jumbled, and the file isn’t kept with the chat.'],
            ['A questionnaire back.', 'Five questions the system could answer, before any work starts.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
