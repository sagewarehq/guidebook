import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Btn, Pill, Ini, Sk } from '../../site/kit';
import { AgentFrame, ChatPanel, Me, Msg } from '../agents/agent-kit';
import './chat.css';

// Chat on a record: a conversation about INV-1038 is saved on INV-1038. It shows in the invoice’s side panel under
// Conversations, and anyone who can see the invoice can read it and carry on. A chat about no record stays yours.

/** Someone else’s message in a shared thread: on the left, with their name and initials. */
const Other = ({ ini, name, children }: { ini: string; name: string; children: ReactNode }) => (
  <div className="ct-other"><Ini n={ini} /><p><small>{name}</small>{children}</p></div>
);

/** The folded steps line. */
const Fold = ({ children }: { children: string }) => <span className="ct-fold"><i>✓</i>{children} ▸</span>;

/** INV-1038’s detail page, with Conversations in the side panel between Related and History. */
function Invoice({ thread = true, on, ana }: { thread?: boolean; on?: boolean; ana?: boolean }) {
  return (
    <div className="as-a-work">
      <div className="as-a-page">
        <p className="as-crumb">Invoices <span>/</span> Overdue in Cebu <span>/</span> <b>INV-1038</b></p>
        <div className="as-a-head">
          <div><p className="m-title">INV-1038 · Metro Fuels</p><p className="as-meta"><Pill tone="bad">Overdue 26 days</Pill><span>Cebu · Net 30</span></p></div>
          <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Send reminder</Btn><Btn kind="pri">Record payment</Btn></span>
        </div>
        <p className="as-a-tabs"><span className="on">Overview</span><span>Items 2</span><span>Payments 1</span><span>Documents</span></p>
        <p className="as-facts"><span><small>Amount</small>₱1,180,000</span><span><small>Balance</small><b>₱420,000</b></span><span><small>Due</small>2 Sep 2026</span></p>
        <p className="as-sech"><span className="m-k">Customer and terms</span><a className="m-link">Edit</a></p>
        <Sk w="70%" /><Sk w="56%" />
        <p className="as-sech"><span className="m-k">Items</span><a className="m-link">Edit</a></p>
        <Sk w="80%" /><Sk w="64%" />
      </div>
      <div className="as-a-panel">
        <p className="m-k">Related</p>
        <div className="as-rel">{[['Customer', 'Metro Fuels'], ['Purchase order', 'PO-2211'], ['Payment', 'PAY-0921']].map(([k, v]) => <p key={k}><span>{k}</span><a>{v}</a></p>)}</div>
        <p className="m-k">{thread ? 'Conversations 1' : 'Conversations'}</p>
        {thread ? (
          <div className={on ? 'ct-thread on' : 'ct-thread'}>
            <p className="ct-thread-h"><Ini n="RC" /><Ini n="MA" agent />{ana && <Ini n="AR" />}<b>Why is it overdue?</b></p>
            <p>{ana ? 'Ana: They’ll pay the ₱420,000 on Friday.' : 'Marco: Ana decides whether to call or send a final notice.'}</p>
            <small>{ana ? 'Ramon, Marco, and Ana · 6 messages · 11:20 AM' : 'Ramon and Marco · 4 messages · 9:05 AM'}</small>
            <a className="m-link">Open thread</a>
          </div>
        ) : <p className="ag-none">None</p>}
        <p className="m-k">History</p>
        <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> sent a payment reminder<small>21 Sep</small></span></p>
        <p className="as-h"><Ini n="AR" /><span><b>Ana</b> recorded ₱760,000<small>18 Sep</small></span></p>
        <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> created it<small>3 Aug</small></span></p>
      </div>
    </div>
  );
}

export default function OnRecord() {
  return (
    <>
      <Demo wide caption={<>9:05 AM. Ramon opens the chat from INV-1038. The strip says Marco is looking at the invoice and that this conversation is saved on it, so Ramon knows who else can read it before he writes.</>}>
        <div className="ct-short ct-rec">
          <AgentFrame as="lead" loud overlay={
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage={<>INV-1038 · Metro Fuels</>}>
              <p className="ct-note">Saved on INV-1038. Anyone who can see this invoice can read this conversation.</p>
              <Me>Why is it overdue?</Me>
              <Msg>
                <Fold>4 steps · 9 seconds</Fold>
                <span><b>Metro Fuels has paid ₱760,000 of ₱1,180,000. The ₱420,000 left is 26 days overdue.</b> Two reminders got no reply.</span>
                <span className="ct-next"><b>Ana decides whether to call or send a final notice.</b></span>
              </Msg>
            </ChatPanel>}>
            <Invoice thread={false} />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<>With the chat closed, the conversation sits on the invoice, in the side panel under Conversations: who’s in it, the last line, and Open thread. It’s part of the record, like Related and History.</>}>
        <div className="ct-rec">
          <AgentFrame as="lead">
            <Invoice on />
          </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>11:20 AM. Ana handles Metro Fuels. She opens INV-1038, sees Ramon’s thread, and carries on in it. Marco already has the context, so her one line is enough.</>}>
          <div className="ct-box tall">
            <ChatPanel agent="marco" status="Ready" onPage={<>INV-1038 · Metro Fuels</>} composer="Reply in this thread…">
              <p className="ct-note">Saved on INV-1038. Anyone who can see this invoice can read this conversation.</p>
              <Other ini="RC" name="Ramon · 9:05 AM">Why is it overdue?</Other>
              <Msg><span><b>₱420,000 is 26 days overdue.</b> Two reminders got no reply. Ana decides whether to call or send a final notice.</span></Msg>
              <Me ini="AR">I called them. They’ll pay the ₱420,000 on Friday.</Me>
              <Msg>Noted on INV-1038. I’ll hold reminders until Fri 2 Oct, and check for the payment that afternoon.</Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>The thread lives only in Ramon’s own chat. Ana starts from nothing, Marco goes through the same steps again, and nobody knows Ramon already asked.</>}>
          <div className="ct-box tall">
            <ChatPanel agent="marco" status="Ready" onPage={<>INV-1038 · Metro Fuels</>}>
              <Me ini="AR">Why is INV-1038 overdue?</Me>
              <Msg>
                <Fold>4 steps · 9 seconds</Fold>
                <span><b>₱420,000 is 26 days overdue.</b> Two reminders got no reply. Want me to send a third?</span>
              </Msg>
              <Me ini="AR">Yes, send it.</Me>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Section title="Who sees the thread on INV-1038">
        <When head={['Who', 'Sees INV-1038?', 'Sees the thread?']} rows={[
          ['Ramon Cruz, Finance lead, all branches', 'Yes', 'Yes, and he started it'],
          ['Ana Reyes, Collections, Cebu', 'Yes, it’s a Cebu invoice', 'Yes, and she can reply'],
          ['Liza Tan, Cebu branch manager', 'Yes', 'Yes'],
          ['A collections officer in Baguio', 'No, it’s in another branch', 'No: the thread has the record’s access, nothing more'],
        ]} />
      </Section>

      <Section title="Where a conversation is saved">
        <When head={['Asked about', 'Saved on', 'Who can read it']} rows={[
          ['One record, from its page or with @', 'That record, under Conversations.', 'Anyone who can see the record.'],
          ['A run, such as payment run #0318', 'The run, linked from each record it changed.', 'Anyone who can see the run.'],
          ['No record in particular', 'Your own chat with the Agent.', 'Only you. Anything the Agent changes still shows in each record’s history.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Save the thread on the record.', 'Asked from INV-1038, it’s saved on INV-1038, under Conversations.'],
            ['Say where it’s saved.', '“Saved on INV-1038. Anyone who can see this invoice can read this conversation.”'],
            ['Give the thread the record’s access.', 'Whoever can see the invoice sees the thread; nobody else.'],
            ['Let the next person carry on.', 'Ana replies in the same thread, and Marco has the context.'],
            ['Keep chats about no record private.', 'A general question stays in your own chat with the Agent.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Threads only in someone’s own chat.', 'Ana chases a customer Ramon already asked about.'],
            ['Not saying who will read it.', 'People write things in a thread they thought was private.'],
            ['Threads with their own permissions.', 'A Baguio officer reads about a Cebu invoice they can’t open.'],
            ['Starting over each time.', 'Marco repeats his checks, and Metro Fuels gets a third reminder.'],
            ['Every chat shared.', 'A quick private question ends up on a record the whole branch reads.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
