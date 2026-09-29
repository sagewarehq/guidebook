import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Ini, Sk } from '../../site/kit';
import { AgentFrame, AgentAva, ChatPanel, Msg, Steps, Ask } from '../agents/agent-kit';
import { WaitList, WaitPage, type WaitRow, link } from './approval-kit';

// Waiting on you: one list of every proposal and question an Agent is waiting on this person for, from every Agent,
// oldest first, each with the time it must be answered by. The Agents badge and Home count it; each row opens its card.

const ramon: WaitRow[] = [
  { agent: 'marco', kind: 'Proposal', what: 'Payment run #0318: ₱48.65M to 32 suppliers, 3 held', asked: 'Today, 7:40 AM', due: 'Tue 29 Sep, 8:30 AM', note: 'The bank’s cut-off for the 9:00 AM payments' },
  { agent: 'marco', kind: 'Proposal', what: 'Run #0319: 6 payment reminders for overdue invoices in Cebu', asked: 'Today, 9:15 AM', due: 'Today, 5:00 PM', note: 'Drafted with today’s balances' },
];

const liza: WaitRow[] = [
  { agent: 'bea', kind: 'Proposal', what: 'Loan proposal for Talamban Bakery: ₱1,800,000.00 over 18 months', asked: 'Fri 25 Sep, 4:30 PM', due: 'Wed 30 Sep', note: 'You send it; they meet you Thu 1 Oct' },
  { agent: 'bea', kind: 'Question', what: 'Cebu Grains asked for 36 months. Offer 24, or ask Credit?', asked: 'Today, 8:50 AM', due: 'Today, 2:00 PM', note: 'Bea is pricing the proposal for your 3:00 PM meeting' },
];

export default function Waiting() {
  return (
    <>
      <Demo wide caption="The badge on Agents says 2, and opens this list: everything an Agent is waiting on Ramon for, oldest first. Each row says who asked, what for, when, and when it must be answered by, with why. Open shows its card, where Ramon answers; once answered, the row leaves the list.">
        <AgentFrame on="Agents" as="lead">
          <WaitPage rows={ramon} who="Ramon Cruz" />
        </AgentFrame>
      </Demo>

      <Demo wide caption="The same list for Liza, Cebu branch manager and Bea’s owner, with a proposal and a question. Open on the question opens Bea’s chat beside the list, at the question, with its options. Answering it takes the row off the list and Bea carries on.">
        <AgentFrame on="Agents" as="staff" me="LT" bell={2} overlay={
          <ChatPanel agent="bea" status="Waiting on you · a question about Cebu Grains" onPage="Agents · Waiting on you">
            <Steps items={[[true, 'Read your notes from the Cebu Grains meeting'], [true, 'Priced it from 14 past deals'], ['flag', 'They asked for 36 months; our past deals stop at 24']]} />
            <Msg>None of our loans to a business this size went past 24 months. I can offer 24, or ask Credit whether 36 is possible. Which do you want?</Msg>
            <Ask question="Cebu Grains: offer 24 months, or ask Credit about 36?" options={['Offer 24 months', 'Ask Credit about 36', 'I’ll call them first']} />
          </ChatPanel>}>
          <WaitPage rows={liza} who="Liza Tan" />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo caption={<>Home shows the same 2, first thing, with a link to the list. The Home badge counts these with Ramon’s other tasks.</>}>
          <Win title="Home">
            <div className="apv-box">
              <p className="m-k"><span>Waiting on you · 2</span><a className="m-link">See all</a></p>
              <p className="apv-hi"><AgentAva id="marco" size="sm" /><span><b>Payment run #0318</b>: ₱48.65M to 32 suppliers, 3 held<small>Marco · answer by Tue 29 Sep, 8:30 AM</small></span><Btn>Open</Btn></p>
              <p className="apv-hi"><AgentAva id="marco" size="sm" /><span><b>6 payment reminders</b> for overdue invoices in Cebu<small>Marco · answer by today, 5:00 PM</small></span><Btn>Open</Btn></p>
            </div>
            <Sk w="70%" /><Sk w="54%" />
          </Win>
        </Demo>
        <Demo caption="With nothing waiting, the list says so, and when the next thing is due. The badge on Agents disappears rather than showing 0.">
          <Win title="Agents / Waiting on you">
            <p className="m-title">Waiting on you</p>
            <div className="apv-empty">
              <b>Nothing is waiting on you.</b>
              <p>Marco’s next payment run is due Mon 5 Oct. You’ll get it here, by email, and on your phone.</p>
              <a className="m-link">See recent runs</a>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption="Decisions only, oldest first, each with its answer-by time. The payment run can’t slip out of sight.">
          <Win title="Agents / Waiting on you">
            <WaitList rows={ramon} />
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Decisions mixed into the notifications, newest first, among things that need nothing. By noon the payment run is at the bottom, with no sign it must be answered before the bank’s 8:30 AM cut-off.">
          <Win title="Notifications">
            <div className="apv-hist">
              <p className="as-h"><Ini n="NI" agent /><span><b>Nico</b> updated the Baguio dashboard<small>11:40 AM</small></span></p>
              <p className="as-h"><Ini n="BE" agent /><span><b>Bea</b> saved notes from a meeting<small>11:05 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> matched 14 delivery receipts<small>10:30 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b>: 6 reminders drafted<small>9:15 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b>: payment run #0318 is ready<small>7:40 AM</small></span></p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Section title="What goes in the list">
        <When head={['From the Agent', 'In Waiting on you?', 'Where else']} rows={[
          ['A proposal: a card with Approve… and Suggest changes', 'Yes, until it’s answered or expires', <>The chat, email, and phone. See {link('approvals/card', 'Approval card')}</>],
          ['A question, with options', 'Yes, until it’s answered', <>The chat. See {link('chat/asking-back', 'Chat › When it asks back')}</>],
          ['Work finished, or an update', 'No', <>Notifications and the {link('runs/list', 'Runs list')}</>],
          ['Something that failed and came back to you', 'Yes, as a question: what to do next', <>See {link('control/failures', 'Control and safety › When it fails')}</>],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One list for everything waiting on you.', 'Proposals and questions from every Agent, at /agents/waiting.'],
            ['Oldest first, with an answer-by.', 'Each row says when it must be decided, and why.'],
            ['Each row opens its card.', 'Answer there; the row leaves the list, and the Agent carries on.'],
            ['Only what needs a decision.', 'Updates and finished work go to notifications and the runs list.'],
            ['One count everywhere, and an empty state.', 'The same number on Agents, Home, and the list; none says what’s next.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Decisions scattered across chats.', 'Ramon has to open each Agent to find what’s waiting on him.'],
            ['Newest first, with no deadline.', 'The payment run sinks below today’s small asks and misses the cut-off.'],
            ['A list you can only read.', 'People go hunting through the chat for the card to answer.'],
            ['Every update in the list.', 'The two real decisions drown among “report sent”.'],
            ['A badge that disagrees with the list.', 'People stop trusting it, and an empty list with no words looks broken.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
