import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill } from '../../site/kit';
import { AgentFrame, ChatPage, Day, Me, Msg, Steps, ApprovalCard, Line, type SessionRow } from './agent-kit';

// Drafts, never changes. An Agent reads, answers, analyses, and drafts on its own. Every change to a record, anything
// sent to a customer or supplier, and all money is a draft that waits for a person to approve, edit, or reject. There
// are no levels to set and no switch to let it act alone: the same rule holds for every Agent and every task.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

// Ramon’s sessions on Thursday morning, with the receipts session open.
const thursday: SessionRow[] = [
  ['marco', 'Delivery receipts, week of 21 Sep', 'Waiting on you', '6:10 AM'],
  ['nico', 'Baguio collections in September', 'Answered', 'Wed'],
  ['marco', 'Payment run #0304', 'Done', 'Mon'],
];

export default function Drafts() {
  return (
    <>
      <Demo wide caption={<>Thursday 24 Sep, 6:10 AM. Marco’s scheduled receipt matching has run. He read 216 delivery receipts and worked out which PO each belongs to, but linked nothing: the 214 matches are a draft, waiting for Ramon, and the 2 he couldn’t match are held. Approve 214 matches links them all in one go; Edit opens the draft to change any line first; Reject drops it, with a reason Marco keeps.</>}>
        <AgentFrame on="Agents" as="lead">
          <ChatPage agent="marco" status="Waiting on you · receipts, week of 21 Sep" sessions={thursday}>
            <Day label="Thursday 24 September" />
            <Steps items={[[true, 'Read 216 delivery receipts from the warehouse'], [true, 'Worked out the PO and invoice for 214'], ['flag', 'Couldn’t match 2: DR-5588 and DR-5602']]} />
            <Msg>
              <p>This week’s receipt matches are drafted. Nothing is linked until you approve.</p>
              <ApprovalCard title="Draft: link 214 delivery receipts to their POs" meta="Run #0314 · drafted by Marco, Thu 24 Sep, 6:10 AM"
                facts={[['Drafted', '214 matches'], ['Held', '2'], ['Changed so far', 'Nothing']]}
                lines={[<Line name="214 receipts, each to its PO and invoice" amount="Draft" why="Items and quantities agree with the PO." />]}
                held={<>
                  <Line held amount="not linked" name="DR-5588 · Tagbilaran Hardware" why="No PO has these items." sources={['DR-5588']} />
                  <Line held amount="not linked" name="DR-5602 · Cebu Paperworks" why="Quantity is 40 short of PO-4436." sources={['PO-4436']} />
                </>}
                primary="Approve 214 matches" secondary="Edit" third="Reject"
                note="You decide. Marco drafts; he never links, sends, or pays on his own." />
            </Msg>
          </ChatPage>
        </AgentFrame>
      </Demo>

      <Section title="What an Agent does on its own">
        <When head={['Work', 'On its own?', 'Example']} rows={[
          ['Read records its role allows', 'Yes', 'Invoices, POs, receipts, bank lines'],
          ['Answer a question', 'Yes', '“Why is Luzon Packaging over PO?”'],
          ['Build an analysis', 'Yes, read-only', 'Collections by branch, by month'],
          ['Draft a change', 'Yes, as a draft', 'Payment run #0318; 214 receipt matches'],
          ['Change a record', <b>No: a person approves the draft</b>, 'Linking a receipt to its PO'],
          ['Send to a customer or supplier', <b>No: a person approves, or sends it</b>, 'Payment reminders, remittance emails'],
          ['Move money', <b>No: approved on a confirmation page</b>, 'Every payment run'],
        ]} />
        <p className="g-see">Routine drafts are approved in one go, with the held lines first: see {link('approvals/batch', 'Approving a batch')}. To change a line before approving, see {link('approvals/edit-first', 'Changing before approving')}.</p>
      </Section>

      <Pair>
        <Demo verdict="do" caption="A draft says it’s a draft, and says what hasn’t happened yet. Ramon knows the receipts aren’t linked until he approves.">
          <Win title="Run #0314 · Delivery receipts">
            <div className="dr-mini">
              <p><Pill>Waiting on you</Pill><span>Draft · 214 matches, 2 held</span></p>
              <small>Nothing is linked until you approve.</small>
              <span className="dr-acts"><Btn kind="pri">Approve 214 matches</Btn><Btn>Edit</Btn><Btn kind="quiet">Reject</Btn></span>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="An autopilot switch. Turning it on to save Ramon a click on receipts also lets Marco change records, and pay suppliers, with nobody deciding.">
          <Win title="Agents / Marco / Settings">
            <div className="dr-mini">
              <p className="dr-switch"><span><b>Autopilot</b><small>Let Marco act without asking, and report after</small></span><i className="on" /></p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption={<>Once approved, the record’s history names both: who drafted it, and who decided. See {link('explaining/history', 'In the history')}.</>}>
          <Win title="PO-4436 · History">
            <p className="as-h dr-h"><span><b>Receipt DR-5577 linked</b><small>Drafted by Marco · approved by Ramon Cruz, Thu 24 Sep, 7:02 AM · run #0314</small></span></p>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="“Done” with nobody behind it. The receipts changed at 6:10 AM, and the first Ramon hears of it is a report.">
          <Win title="PO-4436 · History">
            <p className="as-h dr-h"><span><b>Receipt DR-5577 linked</b><small>By Marco · Thu 24 Sep, 6:10 AM</small></span></p>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Read, answer, and analyse freely.', 'Anything that changes nothing needs no one’s say-so.'],
            ['Make every change a draft.', 'Records, anything sent outside, and money wait for Approve, Edit, or Reject.'],
            ['Say that nothing has changed yet.', '“Nothing is linked until you approve”, on the card and the run.'],
            ['Approve routine drafts in one go.', '214 matches, one Approve, with the held lines listed first.'],
            ['Name who decided.', 'The history reads “Drafted by Marco, approved by Ramon Cruz”.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Asking before every look.', 'An Agent that needs a yes to read a PO, so people stop asking it.'],
            ['An autopilot switch.', 'Once it’s on, records change and money moves with nobody deciding.'],
            ['Drafts that look done.', 'Ramon thinks the receipts are linked, and they’re not.'],
            ['Approving 214 lines one by one.', 'People stop reading, and click through the two that matter.'],
            ['Changes with only the Agent’s name.', 'Nobody can say who let a change through.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
