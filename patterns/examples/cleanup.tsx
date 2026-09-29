import type { ReactNode } from 'react';
import { Section, Demo, Rules, Avoid, Btn } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps, Reason, Source, HeldPill } from '../agents/agent-kit';
import { Flow, Saved, Who, go } from './b-kit';

// Cleaning up the data: Carlo asks Marco to find duplicate customers and missing TINs. Marco finds 2 likely
// duplicates, 38 missing TINs (29 of them on the customers’ own documents), and 1 odd value; each comes with why he thinks so and a
// drafted fix: merge, fill in, or leave. Carlo approves them one by one or in groups. Nothing is deleted: a merge goes
// through its confirmation page, and both histories are kept.

const customers: [name: string, branch: string, tin: string, limit: string][] = [
  ['Metro Fuels', 'Cebu', '204-311-580-000', '₱2,000,000.00'],
  ['Metro Fuel Corp', 'Cebu', '204-311-580-000', '₱500,000.00'],
  ['Metro Fuels Trading', 'Baguio', '219-004-771-000', '₱1,500,000.00'],
  ['Northstar Supply', 'Cebu', '177-520-936-000', '₱5,000,000.00'],
  ['Northstar Supply Co.', 'Cebu', '', '₱1,000,000.00'],
];

/** The Customers list, as Carlo sees it: all branches, 4,812 customers. */
function Customers() {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Customers <span>/</span> <b>All</b></p>
      <div className="as-a-head">
        <div><p className="m-title">Customers</p><p className="as-meta"><span>All branches · 4,812 customers</span></p></div>
        <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn kind="pri">New customer</Btn></span>
      </div>
      <table className="m-tbl exb-tbl">
        <thead><tr><th>Customer</th><th>Branch</th><th>TIN</th><th className="r">Credit limit</th></tr></thead>
        <tbody>{customers.map(([n, b, t, l]) => (
          <tr key={n}><td><a className="m-link">{n}</a></td><td>{b}</td><td>{t || <span className="exb-none">—</span>}</td><td className="r">{l}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}

/** One finding: what, why Marco thinks so, the records behind it, the drafted fix, and its buttons. */
function Finding({ what, why, sources, fix, acts, left }: { what: ReactNode; why: ReactNode; sources?: string[]; fix: ReactNode; acts: ReactNode; left?: boolean }) {
  return (
    <div className={left ? 'exb-f left' : 'exb-f'}>
      <div>
        <p className="exb-f-what">{left && <HeldPill>Left for you</HeldPill>}{what}</p>
        <p className="exb-f-why"><Reason>{why}</Reason>{sources?.map(s => <Source key={s}>{s}</Source>)}</p>
      </div>
      <p className="exb-f-fix">{fix}</p>
      <span className="exb-f-acts">{acts}</span>
    </div>
  );
}

/** The cleanup list: every finding, grouped by kind, each with its drafted fix. */
function Cleanup() {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Customers <span>/</span> <b>Cleanup by Marco</b></p>
      <div className="as-a-head">
        <div><p className="m-title">41 things to check</p><p className="as-meta"><span>Drafted by Marco · today, 10:20 AM · 32 fixes drafted · nothing changed yet</span></p></div>
      </div>

      <p className="exb-grp"><b>Likely duplicates · 2</b><small>Merge one at a time</small></p>
      <Finding what={<>Metro Fuel Corp <span className="exb-arrow">→</span> Metro Fuels</>} why="Same TIN and same address, M.J. Cuenco Ave, Cebu City." sources={['CUS-0412', 'CUS-0118']} fix="Merge into Metro Fuels" acts={<><Btn kind="pri">Merge…</Btn><Btn kind="quiet">Leave</Btn></>} />
      <Finding what={<>Northstar Supply Co. <span className="exb-arrow">→</span> Northstar Supply</>} why="Same phone and contact, Ben Uy. No invoices since March 2025." sources={['CUS-0287', 'CUS-0141']} fix="Merge into Northstar Supply" acts={<><Btn kind="pri">Merge…</Btn><Btn kind="quiet">Leave</Btn></>} />

      <p className="exb-grp"><b>Missing TINs · 38</b><small>Approve as a group</small></p>
      <Finding what="29 found on the customers’ own documents" why="Each TIN is copied from a signed form or a BIR 2307." sources={['LN-2231 contract', '+28']} fix="Fill in 29 TINs" acts={<><Btn kind="pri">Approve 29</Btn><Btn>Review each</Btn></>} />
      <Finding left what="9 not on any document" why="Someone needs to ask the customer." fix="Leave empty" acts={<Btn>Assign…</Btn>} />

      <p className="exb-grp"><b>Odd values · 1</b><small>Not asked for, found on the way</small></p>
      <Finding what="Mandaue Glassworks: terms of Net 300" why="Every one of their 31 invoices is on Net 30." sources={['INV-1052']} fix="Change to Net 30" acts={<><Btn kind="pri">Approve</Btn><Btn kind="quiet">Leave</Btn></>} />
    </div>
  );
}

export default function Cleanup_() {
  return (
    <>
      <Demo wide caption={<><b>1. The ask.</b> Carlo, the admin, asks Marco from Customers. Marco compares TINs, addresses, and phone numbers rather than names alone, and looks for missing TINs on each customer’s own documents. He changes nothing: he drafts the fixes.</>}>
        <div className="exa-mid">
          <AgentFrame as="admin" on="Customers" loud overlay={
            <ChatPanel agent="marco" status="Checking customers" onPage="Customers · All branches · 4,812">
              <Day label="Today" />
              <Me ini="CM">Find duplicate customers and missing TINs.</Me>
              <Steps items={[
                [true, 'Read 4,812 customers, across all branches'],
                [true, 'Compared TINs, addresses, and phone numbers'],
                [true, 'Looked for missing TINs on each customer’s documents'],
              ]} />
              <Msg>2 likely duplicates, 38 missing TINs, and 1 odd value; 32 fixes drafted, nothing changed. <a className="m-link">Open the list</a></Msg>
            </ChatPanel>
          }>
            <Customers />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<><b>2. Findings, each with why and a drafted fix.</b> Every line says why Marco thinks so, links the records, and names the fix. The 29 TINs found on documents are safe to approve together; merges go one at a time, through the same confirmation page a person’s merge uses: nothing deleted, both histories kept. What he can’t know is left for a person, with Assign….</>}>
        <AgentFrame as="admin" on="Customers">
          <Cleanup />
        </AgentFrame>
      </Demo>

      <Section title="The workflow">
        <Flow rows={[
          [<Who>Carlo</Who>, 'On Customers, asks: “Find duplicate customers and missing TINs.”', go('agentic/chat/asking', 'Asking an Agent')],
          [<Who agent="marco">Marco</Who>, 'Reads the customers his role can see; compares TINs, addresses, and phones.', go('agentic/agents/access', 'Giving an Agent access')],
          [<Who agent="marco">Marco</Who>, 'Lists 41 findings in three groups, each with why and a drafted fix.', go('agentic/explaining/reasons', 'Reasons')],
          [<Who>Carlo</Who>, 'Approves the 29 TINs as a group, and merges each duplicate from its confirmation page.', <>{go('agentic/approvals/partial', 'Approving part')}, {go('management/records/archived', 'Archived records')}</>],
          [<Who>Carlo</Who>, 'Assigns the 9 missing TINs to Ana.', go('agentic/control/assigning', 'Assigning work')],
        ]} />
      </Section>

      <Section title="Why it saves time">
        <Saved
          rows={[
            ['Finding duplicates', 'A day exporting 4,812 customers and sorting by name', '2 likely pairs, each with why'],
            ['Filling in TINs', 'Half a day opening 38 customers’ documents one by one', '29 found and cited; 9 to ask for'],
          ]}
          total={['About 2 days', 'About 30 minutes']}
          still="Carlo still decides every merge. Only a person knows whether Metro Fuel Corp is a mistake, or a new company that should stay separate."
        />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Say why it thinks so.', 'Same TIN and same address, with links to both records, not just a similar name.'],
            ['Draft the fix, don’t make it.', 'Merge, fill in, or leave. Nothing changes until a person approves.'],
            ['Leave what it can’t know.', 'A TIN on no document is left for a person, and says so.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Matching on names alone.', 'Metro Fuels in Cebu and Metro Fuels Trading in Baguio are two businesses.'],
            ['Cleaning as it goes.', '32 customers changed overnight, and nobody knows which, or why.'],
            ['Guessing a value.', 'A TIN copied from a similar customer is worse than an empty one.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
