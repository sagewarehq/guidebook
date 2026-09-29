import { Section, Demo, Rules, Avoid } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps, ApprovalCard, Line } from '../agents/agent-kit';
import { AgentWindow, Flow, Saved, Who, go, type Sess } from './b-kit';

// Chasing overdue customers: Ana asks Marco to draft reminders for the 12 overdue invoices in Cebu. He writes one per
// customer (8 customers), skips the 2 with a promise due this week or a dispute open, and puts the 6 drafts in one
// card. Ana reads them, removes one, and sends 5 from Loans OS; each is saved on the customer’s history. The 6 drafts
// add up: 420,000 + 3,820,000 + 1,318,000 + 1,284,000 + 742,000 + 318,000 = ₱7,902,000.00.

const sessions: Sess[] = [
  ['marco', 'Reminders, overdue in Cebu', 'Waiting on you', '9:15 AM'],
  ['marco', 'Metro Fuels statement', 'Done', 'Fri'],
  ['nico', 'Cebu collections this month', 'Answered', 'Thu'],
];

/** The 6 drafts, as Marco puts them in one approval card: three shown, three more folded, the 2 skipped in one line. */
function Drafts() {
  return (
    <ApprovalCard
      title="6 reminders, one per customer"
      meta="Drafted by Marco from Invoices · Overdue in Cebu · 12 invoices, 8 customers"
      facts={[['Reminders', '6'], ['Overdue', '₱7,902,000.00'], ['Skipped', '2']]}
      lines={[
        <Line name="Metro Fuels" amount="₱420,000.00" why="Broke a promise to pay by Fri 25 Sep. Firm, to Joy Santos." sources={['INV-1038']} />,
        <Line name="Northstar Supply · 2 invoices" amount="₱3,820,000.00" why="23 and 19 days late, no reply to 2 reminders. Firm." sources={['INV-1041', 'INV-1044']} />,
        <Line name="Cordova Cold Storage · 2 invoices" amount="₱1,318,000.00" why="Usually pays within a week. Friendly." sources={['INV-1053', 'INV-1057']} />,
        <p className="exb-more"><a className="m-link">3 more</a>: Liloan Marine Supply, Abad Trucking, and Pacific Cartons · ₱2,344,000.00</p>,
      ]}
      held={<p className="exb-skip"><b>Skipped 2:</b> Amihan Foods, a promise due Wed 30 Sep; Mandaue Glassworks, a dispute open.</p>}
      primary="Send 6 reminders…"
      secondary="Suggest changes"
      note="You send them. Nothing goes out until you do."
    />
  );
}

export default function Reminders() {
  return (
    <>
      <Demo wide caption={<><b>1. The ask.</b> Ana is on Invoices › Overdue in Cebu and asks Marco in the right bar. The saved view is the context, so she doesn’t list the invoices. Marco reads each customer’s payments, promises, and disputes, and says what he skipped before anything else.</>}>
        <div className="exa-mid">
          <AgentFrame as="staff" loud overlay={
            <ChatPanel agent="marco" status="Drafting reminders · Overdue in Cebu" onPage="Invoices · Overdue in Cebu · 12 invoices">
              <Day label="Today" />
              <Me ini="AR">Draft reminders for all 12 of these.</Me>
              <Steps items={[
                [true, '12 invoices, for 8 customers: one reminder each'],
                [true, 'Read each customer’s payments, promises, and disputes'],
                ['flag', 'Skipped 2: a promise due this week, and a dispute open'],
              ]} />
              <Msg>6 reminders are drafted; nothing is sent until you send it. <a className="m-link">Open the drafts</a></Msg>
            </ChatPanel>
          }>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<><b>2. The drafts, in one card.</b> One line per customer: what’s owing, the tone, and the invoices behind it; each opens the whole email to read or edit. The 2 skipped sit at the foot, with why. Ana removes Pacific Cartons, whose payment is on the bank but not yet recorded, and sends 5 from a confirmation page. Each is saved on the customer’s history.</>}>
        <AgentFrame as="staff" on="Agents" me="AR">
          <AgentWindow agent="marco" status="Waiting on you · 6 reminders" session="Reminders, overdue in Cebu" sessions={sessions}>
            <Me ini="AR">Draft reminders for all 12 of these.</Me>
            <Msg><Drafts /></Msg>
          </AgentWindow>
        </AgentFrame>
      </Demo>

      <Section title="The workflow">
        <Flow rows={[
          [<Who>Ana</Who>, 'Opens Invoices › Overdue in Cebu and asks: “Draft reminders for all 12 of these.”', go('agentic/chat/context', 'What the Agent can see')],
          [<Who agent="marco">Marco</Who>, 'Groups 12 invoices into 8 customers; reads payments, promises, and disputes.', go('agentic/chat/replies', 'Agent replies')],
          [<Who agent="marco">Marco</Who>, 'Skips 2 and says why; drafts 6 reminders in one card.', <>{go('agentic/explaining/holds', 'Holds and flags')}, {go('agentic/approvals/batch', 'Approving a batch')}</>],
          [<Who>Ana</Who>, 'Reads them, edits or removes any.', <>{go('agentic/approvals/edit-first', 'Changing before approving')}, {go('agentic/approvals/partial', 'Approving part')}</>],
          [<Who>Ana</Who>, 'Sends from a confirmation page; each is saved on the customer’s history.', <>{go('management/records/record-actions', 'Record actions')}, {go('agentic/explaining/history', 'In the history')}</>],
        ]} />
      </Section>

      <Section title="Why it saves time">
        <Saved
          rows={[
            ['Working out who to chase', '40 minutes checking 12 invoices against payments, promises, and disputes', '2 skipped, each with why'],
            ['Writing the reminders', 'An hour and a half filling a template 8 times', '15 minutes reading 6 drafts'],
          ]}
          total={['About 2½ hours', 'About 20 minutes']}
          still="Ana still reads every draft and decides who gets one. She knows things the system doesn’t yet, like Pacific Cartons’ payment on the bank statement."
        />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One reminder per customer, from their history.', 'How late, what they paid, their last promise, and who to write to.'],
            ['Skip, and say why.', 'A promise due this week or a dispute open means no reminder.'],
            ['Send from the system, and keep it.', 'Each sent reminder is on the customer’s history, with who sent it.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['One template for everyone.', 'A first-time late payer gets the letter meant for a broken promise.'],
            ['Chasing a customer mid-dispute.', 'Mandaue Glassworks is asked to pay for panes that arrived broken.'],
            ['Drafts copied into someone’s email.', 'Nothing is on the record, and the next person chases again.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
