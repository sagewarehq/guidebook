import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Btn, Pill, Ini, Sk } from '../../site/kit';
import { AgentFrame, AgentAva, ChatPanel, Me, Msg, Reason, Source } from '../agents/agent-kit';
import './chat.css';

// Inline Agent notes: when an Agent has one thing to say about one row, field, or section, it pins a one-line note
// there, with its badge and name and Continue in chat, instead of opening a conversation. A drafted change carries its
// answers in place. Continue in chat opens the right bar already on that record, with the note as the first message.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** A note from an Agent, pinned to what it’s about: the badge, the name, one line, and Continue in chat. */
const Note = ({ children }: { children: ReactNode }) => (
  <div className="inl-note">
    <AgentAva id="marco" size="sm" />
    <span><b>Marco:</b> {children}</span>
    <a className="m-link">Continue in chat</a>
    <span className="inl-x">×</span>
  </div>
);

/** A breadcrumb, then a page head with its buttons. */
function Head({ crumb, title, meta, acts }: { crumb: string[]; title: string; meta: ReactNode; acts?: ReactNode }) {
  return (
    <>
      <p className="as-crumb">{crumb.map((c, i) => i < crumb.length - 1 ? <span key={c}>{c}<span>/</span></span> : <b key={c}>{c}</b>)}</p>
      <div className="as-a-head"><div><p className="m-title">{title}</p><p className="as-meta">{meta}</p></div>{acts && <span className="as-acts">{acts}</span>}</div>
    </>
  );
}

const suppliers: [inv: string, supplier: string, po: string, received: string, amount: string][] = [
  ['INV-8863', 'Cebu Paperworks', 'PO-4388', '25 Sep', '₱186,400.00'],
  ['INV-2291', 'Luzon Packaging', 'PO-4431', '24 Sep', '₱1,318,750.00'],
  ['INV-3317', 'Island Grains', 'PO-4452', '23 Sep', '₱2,406,000.00'],
  ['INV-7702', 'Visayas Office Supply', 'PO-4436', '23 Sep', '₱48,300.00'],
];

/** Payments › Supplier invoices, due this week, with Marco’s note under Cebu Paperworks’ row. */
function SupplierList() {
  return (
    <div className="as-a-page">
      <Head crumb={['Payments', 'Supplier invoices', 'Due this week']} title="Supplier invoices" meta={<span>Due by 30 Sep · 36 invoices</span>} acts={<><Btn kind="quiet">•••</Btn><Btn kind="pri">New supplier invoice</Btn></>} />
      <table className="m-tbl inl-tbl">
        <thead><tr><th>Invoice</th><th>Supplier</th><th>PO</th><th>Received</th><th className="r">Amount</th></tr></thead>
        <tbody>{suppliers.flatMap(([inv, s, po, r, amt], i) => [
          <tr key={inv}><td><a className="m-link">{inv}</a></td><td>{s}</td><td>{po}</td><td>{r}</td><td className="r">{amt}</td></tr>,
          ...(i === 0 ? [<tr key="note" className="inl-sub"><td colSpan={5}><Note>likely a resend of INV-8807, paid Tue 22 Sep. Same items, same total.</Note></td></tr>] : []),
        ])}</tbody>
      </table>
      <p className="as-a-foot2"><span>1–4 of 36</span><span className="as-pages"><i>‹</i><i className="on">1</i><i>2</i><i>›</i></span></p>
    </div>
  );
}

/** A label and its value, as on a detail page. `children` pins a note under it. */
const Fact = ({ k, v, hot, children }: { k: string; v: ReactNode; hot?: boolean; children?: ReactNode }) => (
  <div className={hot ? 'inl-f hot' : 'inl-f'}><small>{k}</small><b>{v}</b>{children}</div>
);

/** The side panel: Related, then History. */
function Side({ rel, hist }: { rel: [string, string][]; hist: [ini: string, who: string, what: string, when: string, agent?: boolean][] }) {
  return (
    <div className="as-a-panel">
      <p className="m-k">Related</p>
      <div className="as-rel">{rel.map(([k, v]) => <p key={k}><span>{k}</span><a>{v}</a></p>)}</div>
      <p className="m-k">History</p>
      {hist.map(([ini, who, what, when, agent]) => <p key={what} className="as-h"><Ini n={ini} agent={agent} /><span><b>{who}</b> {what}<small>{when}</small></span></p>)}
    </div>
  );
}

/** INV-2291, Luzon Packaging, with Marco’s note on the amount. */
function Luzon() {
  return (
    <div className="as-a-work">
      <div className="as-a-page">
        <Head crumb={['Payments', 'Supplier invoices', 'INV-2291']} title="INV-2291 · Luzon Packaging" meta={<><Pill>Not in a run</Pill><span>Received 24 Sep · due 30 Sep</span></>} acts={<><Btn kind="quiet">•••</Btn><Btn>Edit</Btn><Btn kind="pri">Add to a payment run</Btn></>} />
        <p className="as-sech"><span className="m-k">Invoice</span><a className="m-link">Edit</a></p>
        <div className="inl-grid">
          <Fact k="Supplier" v="Luzon Packaging" />
          <Fact k="Purchase order" v={<a className="m-link">PO-4431</a>} />
          <Fact k="Amount" v="₱1,318,750.00" hot><Note>₱68,750.00 over PO-4431. No new price was agreed.</Note></Fact>
          <Fact k="Due" v="30 Sep 2026" />
        </div>
        <p className="as-sech"><span className="m-k">Items</span><a className="m-link">Edit</a></p>
        <Sk w="78%" /><Sk w="62%" />
      </div>
      <Side rel={[['Supplier', 'Luzon Packaging'], ['Purchase order', 'PO-4431'], ['Delivery', 'DR-5120']]}
        hist={[['MA', 'Marco', 'held it from run #0318', 'Today', true], ['AR', 'Ana', 'entered it', '24 Sep']]} />
    </div>
  );
}

/** BP-0412, a bill payment, with Marco’s drafted correction inside its Payment section. */
function BillPayment() {
  return (
    <div className="as-a-work">
      <div className="as-a-page">
        <Head crumb={['Payments', 'Bill payments', 'BP-0412']} title="BP-0412 · Cebu Paperworks" meta={<><Pill tone="ok">Paid</Pill><span>22 Sep · from BDO ••4471</span></>} acts={<><Btn kind="quiet">•••</Btn><Btn>Edit</Btn></>} />
        <p className="as-sech"><span className="m-k">Payment</span><a className="m-link">Edit</a></p>
        <div className="inl-grid">
          <Fact k="Amount" v="₱184,600.00" hot />
          <Fact k="Pays" v={<a className="m-link">INV-8807</a>} />
          <Fact k="From" v="BDO ••4471" />
          <Fact k="Paid" v="22 Sep 2026" />
        </div>
        <div className="inl-draft">
          <div>
            <p className="inl-dh"><AgentAva id="marco" size="sm" /><em>Draft</em><b>Change the amount to ₱186,400.00</b></p>
            <p className="ag-line-s"><Reason>Cleared at ₱186,400.00, the amount of INV-8807. Two digits were swapped when it was keyed in.</Reason><Source>BDO line 178</Source><Source>INV-8807</Source></p>
          </div>
          <span className="inl-da"><Btn>Approve…</Btn><Btn>Edit</Btn><Btn kind="quiet">Reject</Btn><a className="m-link">Continue in chat</a></span>
        </div>
        <p className="as-sech"><span className="m-k">Bank and reference</span><a className="m-link">Edit</a></p>
        <Sk w="66%" /><Sk w="48%" />
      </div>
      <Side rel={[['Supplier', 'Cebu Paperworks'], ['Invoice', 'INV-8807'], ['Reconciliation', 'BDO ••4471, Sep']]}
        hist={[['MA', 'Marco', 'drafted a correction', '10:12 AM', true], ['AR', 'Ana', 'recorded it', '22 Sep']]} />
    </div>
  );
}

/** INV-8863’s page, quiet, under the right bar. */
function Resend() {
  return (
    <div className="inl-under">
      <Head crumb={['Payments', 'Supplier invoices', 'INV-8863']} title="INV-8863 · Cebu Paperworks" meta={<span>Received 25 Sep · PO-4388</span>} />
      <Sk w="90%" /><Sk w="82%" /><Sk w="86%" /><Sk w="70%" />
    </div>
  );
}

export default function Inline() {
  return (
    <>
      <Demo wide caption={<><b>A note on a row.</b> Marco has one thing to say about one invoice in the list, so it’s pinned under that row: his badge and name, one line, and Continue in chat. The other rows are left alone. × dismisses it; the note stays in INV-8863’s history.</>}>
        <AgentFrame as="lead" on="Payments">
          <SupplierList />
        </AgentFrame>
      </Demo>

      <Demo wide caption={<><b>A note on a field.</b> On INV-2291, the note sits under the amount it’s about, not in a banner at the top. People see the figure and the reason together.</>}>
        <AgentFrame as="lead" on="Payments">
          <Luzon />
        </AgentFrame>
      </Demo>

      <Demo wide caption={<><b>A drafted change inside a section.</b> From the September reconciliation, Marco drafts a correction to BP-0412. It sits in the Payment section, under the amount it would change, marked Draft, with its reason and sources. The field still shows ₱184,600.00: nothing changes until Ramon approves, and Approve… opens a confirmation page, because it changes the books.</>}>
        <AgentFrame as="lead" on="Payments">
          <BillPayment />
        </AgentFrame>
      </Demo>

      <Demo wide caption={<><b>Continue in chat.</b> From the note on INV-8863, the right bar opens already on that invoice, with the note as Marco’s first message and its sources. Ramon carries on from there; the conversation is saved on the invoice.</>}>
        <div className="ct-short">
          <AgentFrame as="lead" on="Payments" overlay={
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="INV-8863 · Cebu Paperworks">
              <Msg><span>Likely a resend of INV-8807, paid Tue 22 Sep: same items, same quantities, same total, dated 3 days apart. <Source>INV-8807</Source> <Source>BP-0412</Source></span></Msg>
              <Me>Ask them to confirm, and keep it out of the run until they do.</Me>
              <Msg>It stays held. I’ve drafted an email asking Cebu Paperworks whether INV-8863 is a copy; it’s on INV-8863 for you to send.</Msg>
            </ChatPanel>}>
            <Resend />
          </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>One line, pinned to the amount it’s about. The fields stay where they were, and Continue in chat is there for anyone who wants more.</>}>
          <div className="inl-box">
            <Fact k="Amount" v="₱1,318,750.00" hot><Note>₱68,750.00 over PO-4431. No new price was agreed.</Note></Fact>
            <Fact k="Due" v="30 Sep 2026" />
            <Sk w="70%" /><Sk w="54%" />
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>A whole chat thread embedded in the invoice. Five bubbles push the fields below the fold, and a second copy of the conversation now lives on the page.</>}>
          <div className="inl-box">
            <div className="inl-thread">
              <Msg agent="marco">INV-2291 is ₱68,750.00 over PO-4431.</Msg>
              <Me>Was a new price agreed?</Me>
              <Msg agent="marco">Not that I can find in email or on the PO.</Msg>
              <Me>Ask them for a corrected invoice.</Me>
              <Msg agent="marco">Drafted. It’s ready for you to send.</Msg>
              <div className="ag-in"><span>Reply to Marco…</span><i>↑</i></div>
            </div>
            <Fact k="Amount" v="₱1,318,750.00" />
          </div>
        </Demo>
      </Pair>

      <Section title="Inline note, right bar, or chat on the record">
        <When head={['When the Agent has', 'Use', 'Why']} rows={[
          ['One thing to say about a row, field, or section', 'An inline note', 'One line where people already look; Continue in chat for more'],
          ['A drafted change to one part of a record', 'A draft in that section', 'Approve, Edit, Reject beside what it would change'],
          ['A question to answer, or more than one line', 'The right bar', 'Opened on the record, with the note as the first message'],
          ['A conversation others should find later', <>{link('chat/on-record', 'Chat on a record')}</>, 'Saved under Conversations, with the record’s access'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Pin it to what it’s about.', 'Under the row, the field, or in the section, never in a banner at the top.'],
            ['Say who, in one line.', 'The Agent’s badge and name: “Marco: likely a resend of INV-8807.”'],
            ['Drafts carry their answers.', 'Approve, Edit, Reject beside the change; the field keeps its value until then.'],
            ['Continue in chat for the rest.', 'It opens the right bar on that record, with the note as the first message.'],
            ['Few, and gone once answered.', 'One note on a row at most; dismissed or decided, it moves to the history.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Notes far from what they’re about.', '“1 invoice looks like a resend” at the top, and people hunt for which.'],
            ['Unsigned notes.', 'People can’t tell Marco’s guess from a colleague’s comment.'],
            ['Drafts that look applied.', 'The field shows ₱186,400.00 before anyone approved it.'],
            ['A whole chat thread in the page.', 'Five bubbles push the invoice’s fields below the fold.'],
            ['A note on every row.', 'Thirty-six notes, and people stop reading them.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
