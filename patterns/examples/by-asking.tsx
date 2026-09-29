import type { ReactNode } from 'react';
import { Section, Demo, Rules, Avoid, Btn, Pill, Field } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps } from '../agents/agent-kit';
import { Flow, Saved, Who, go } from './b-kit';
import '../forms/forms.css';

// Changing records by asking: Ana says in a sentence what should change, and Marco drafts it in the record itself,
// never saving it. On INV-1038 (₱420,000.00 owing, due 2 Sep) she moves the due date to Fri 9 Oct and notes Joy’s
// promise; the draft says what else moves: the invoice leaves Overdue in Cebu, and Thursday’s reminder (1 Oct) moves
// to Mon 12 Oct. On Customers she adds Tamarind Foods; Marco fills the New customer form with only what she said.

/** A drafted value in a record: the new value, what it was, and the Draft tag. */
const DraftVal = ({ children, was }: { children: ReactNode; was?: string }) => (
  <span className="exc-d"><em>Draft</em><b>{children}</b>{was && <small>{`was ${was}`}</small>}</span>
);

/** A label and its value, as in a detail page’s section. */
const Kv = ({ k, children }: { k: string; children: ReactNode }) => <p className="exc-kv"><small>{k}</small><span>{children}</span></p>;

/** INV-1038 with Marco’s drafted edit in place: the new due date, the note, what else it changes, and the answers. */
function Invoice() {
  return (
    <div className="exc-rec">
      <p className="as-crumb">Invoices <span>/</span> Overdue in Cebu <span>/</span> <b>INV-1038</b></p>
      <div className="as-a-head">
        <div><p className="m-title">INV-1038 · Metro Fuels</p><p className="as-meta"><Pill tone="bad">Overdue 26 days</Pill><span>Cebu · Net 30</span></p></div>
      </div>
      <p className="as-sech"><span className="m-k">Customer and terms</span><a className="m-link">Edit</a></p>
      <div className="exc-kvs">
        <Kv k="Customer">Metro Fuels · Joy Santos</Kv>
        <Kv k="Payment terms">Net 30</Kv>
        <Kv k="Due date"><DraftVal was="2 Sep 2026, from Net 30">Fri 9 Oct 2026</DraftVal></Kv>
        <Kv k="Balance">₱420,000.00</Kv>
      </div>
      <p className="as-sech"><span className="m-k">Notes</span></p>
      <p className="exc-note"><em>Draft</em><span>Joy Santos promised the ₱420,000.00 by Fri 9 Oct. <small>Ana Reyes, from her call today</small></span></p>
      <div className="exc-bar">
        <p><b>Drafted by Marco from your message, 10:05 AM.</b> Also changes: INV-1038 leaves Overdue in Cebu, and Thursday’s reminder moves to Mon 12 Oct.</p>
        <span><Btn kind="pri">Approve</Btn><Btn>Edit</Btn><Btn kind="quiet">Reject</Btn></span>
      </div>
    </div>
  );
}

/** The New customer form, filled in by Marco from one sentence: the name, and the rest under More details. */
function NewCustomer() {
  return (
    <div className="exc-rec">
      <p className="as-crumb">Customers <span>/</span> <b>New customer</b></p>
      <div className="as-a-head">
        <div><p className="m-title">New customer</p><p className="as-meta"><Pill>Draft</Pill><span>Filled in by Marco from your message · not created</span></p></div>
      </div>
      <div className="exc-form">
        <div className="exc-df"><Field label="Customer name" value="Tamarind Foods" /></div>
        <div className="exc-two">
          <div className="exc-df"><Field label="Branch" value="Cebu" select hint="Mandaue is served from Cebu" /></div>
          <div className="exc-df"><Field label="Payment terms" value="Net 30" select /></div>
        </div>
        <div className="fm-more open">
          <p className="fm-more-h"><b>▾ More details</b><span>Optional · 3 filled; TIN and credit limit left for later</span></p>
          <div className="exc-two">
            <div className="exc-df"><Field label="Contact person" value="Lito Reyes" optional /></div>
            <div className="exc-df"><Field label="Mobile" value="0917 555 0142" optional /></div>
          </div>
          <div className="exc-df"><Field label="City" value="Mandaue" optional /></div>
        </div>
      </div>
      <p className="exc-act"><Btn>Cancel</Btn><span className="as-grow" /><Btn kind="pri">Create customer</Btn></p>
    </div>
  );
}

export default function ByAsking() {
  return (
    <>
      <Demo wide caption={<><b>1. Edit a record in a sentence.</b> On INV-1038, Ana tells Marco in the right bar what should change. He drafts the edit in the invoice itself: the new due date marked Draft beside what it was, the note added, and what else it changes. Ana approves it, edits it in the section’s drawer ({go('management/records/edit', 'Edit record')}), or rejects it. For a long record, the same drafts show with the chat {go('agentic/chat/focus', 'full screen')}.</>}>
        <div className="exa-mid">
          <AgentFrame as="staff" loud overlay={
            <ChatPanel agent="marco" status="Waiting on you · INV-1038" onPage="INV-1038 · Metro Fuels">
              <Day label="Today" />
              <Me ini="AR">Move the due date to 9 Oct and note that Joy promised the rest by then.</Me>
              <Steps items={[
                [true, 'Read INV-1038: ₱420,000.00 owing, due 2 Sep'],
                [true, 'Drafted the due date and the note on the invoice'],
                ['flag', 'Thursday’s reminder would move to Mon 12 Oct'],
              ]} />
              <Msg>The edit is on the invoice, marked Draft; nothing is saved until you approve it.</Msg>
            </ChatPanel>
          }>
            <Invoice />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<><b>2. Create one the same way.</b> On Customers, Ana asks for a new customer. Marco checks it isn’t there already, and fills the real New customer form with only what she said: the name, and the rest under More details, as on any {go('management/records/create', 'Create record')} page. He doesn’t guess a TIN or a credit limit. Create customer is Ana’s to press.</>}>
        <div className="exa-mid">
          <AgentFrame as="staff" loud on="Customers" overlay={
            <ChatPanel agent="marco" status="Waiting on you · New customer" onPage="Customers · Cebu branch">
              <Day label="Today" />
              <Me ini="AR">Add a new customer: Tamarind Foods, Mandaue, contact Lito Reyes 0917 555 0142, Net 30.</Me>
              <Steps items={[
                [true, 'No customer named Tamarind Foods, or with that number'],
                [true, 'Filled the New customer form from your message'],
              ]} />
              <Msg>The form is open for you to check; I haven’t created it.</Msg>
            </ChatPanel>
          }>
            <NewCustomer />
          </AgentFrame>
        </div>
      </Demo>

      <Section title="The workflow">
        <Flow rows={[
          [<Who>Ana</Who>, 'Says what should change, on the record’s page, or asks for a new one.', go('agentic/chat/context', 'What the Agent can see')],
          [<Who agent="marco">Marco</Who>, 'Drafts the edit in the record itself, each changed value marked, with what else it changes.', go('agentic/chat/inline', 'Inline Agent notes')],
          [<Who agent="marco">Marco</Who>, 'For a new record, checks it isn’t there, and fills the form with only what was said.', go('management/records/create', 'Create record')],
          [<Who>Ana</Who>, 'Approves, edits in the section’s drawer, or rejects.', <>{go('management/records/edit', 'Edit record')}, {go('agentic/approvals/edit-first', 'Changing before approving')}</>],
          [<Who>Loans OS</Who>, 'Saves it; the history says “changed by Ana Reyes, drafted by Marco”.', go('agentic/explaining/history', 'In the history')],
        ]} />
      </Section>

      <Section title="Why it saves time">
        <Saved
          rows={[
            ['Moving a due date, with why', 'Open the terms drawer, add a note, find and move the reminder: 4 minutes', 'One sentence, then a look at the draft'],
            ['Adding a customer', 'Search for it, open New customer, type 6 fields: 3 minutes', 'One sentence, then check 6 filled fields'],
          ]}
          total={['About 7 minutes', 'About 1 minute']}
          still="Ana still approves every change. She took Joy’s call, and a new customer is where every future invoice goes."
        />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Show the draft in the record.', 'The new due date marked Draft in Customer and terms, beside what it was.'],
            ['Say what else it changes.', 'INV-1038 leaves Overdue in Cebu; Thursday’s reminder moves to Mon 12 Oct.'],
            ['Only what was said, and a person saves it.', 'Six fields from one sentence; Approve and Create customer are Ana’s.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A change described only in the chat.', '“Due date updated ✓”, and nobody saw which field or what it was.'],
            ['Knock-on effects left unsaid.', 'Thursday’s reminder still goes to Joy after she was given until 9 Oct.'],
            ['Filling the gaps with guesses.', 'A ₱500,000.00 credit limit nobody asked for, saved without a look.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
