import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Field } from '../../site/kit';
import { ConfirmPage } from '../records/confirm-kit';
import { AgentAva, AgentFrame } from './agent-kit';
import { cx } from '../../lib/cx';
import '../shell/shell.css';

// Giving an Agent access: its own role, built in the same Role builder as people’s, narrower than the person it works
// for, with the actions no Agent may hold locked. Whatever it may create or edit, it only drafts. Widening goes to a
// review page.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

// The Role builder’s grid for Finance Agent. 'lock' is an action no Agent role may hold: approving and voiding.
type C = 'all' | 'own' | 'no' | 'lock' | null;
const cols = ['View', 'Create', 'Edit', 'Archive', 'Delete', 'Void', 'Export', 'Approve'];
const grid: [string, C[]][] = [
  ['Invoices', ['all', 'no', 'no', 'no', 'no', 'lock', 'no', null]],
  ['Purchase orders', ['all', 'no', 'no', 'no', 'no', null, 'no', null]],
  ['Delivery receipts', ['all', 'no', 'all', 'no', 'no', null, 'no', null]],
  ['Payments', ['all', 'no', 'no', null, null, 'lock', 'no', null]],
  ['Payment runs', ['all', 'all', 'own', 'no', 'no', 'lock', 'no', 'lock']],
  ['Loans', ['no', 'no', 'no', 'no', null, null, 'no', 'lock']],
];
const Tri = ({ c }: { c: C }) => c === null
  ? <span className="rg-na">—</span>
  : <i className={cx('rg-box', c === 'lock' ? 'no gv-lock' : c)} title={{ all: 'All', own: 'Own', no: 'No', lock: 'Never for an Agent' }[c]}>{c === 'all' ? '✓' : ''}</i>;

// The sidebar foot for a drawing inside Administration.
const foot = <><p className="as-nav">Jobs</p><p className="as-nav">Settings</p><p className="as-nav on">Administration</p><p className="as-nav">Help</p></>;

/** What an Agent can do, and which role gives each: the Do and Avoid drawings. */
function CanDo({ items, owner }: { items: [string, string, boolean?][]; owner?: string }) {
  return (
    <Win title="Administration / Users and roles / Marco">
      <div className="gv-can">
        <p className="gv-who"><AgentAva id="marco" /><span><b>Marco</b><small>Agent · owner {owner ?? <em className="gv-none">none</em>}</small></span></p>
        <div className="rb-can">
          <p className="m-k">What Marco can do</p>
          {items.map(([what, why, bad]) => <p key={what} className={cx(bad && 'gv-bad')}><b>{what}</b><span>{why}</span></p>)}
        </div>
      </div>
    </Win>
  );
}

export default function Access() {
  return (
    <>
      <Demo wide caption={<>Marco’s role, in the same Role builder as people’s: one role, on its own page, each box cycling No → Own → All. It’s marked as an Agent role, so approving and voiding are locked: those boxes can’t be ticked. He may view invoices, POs, receipts, and payments, link receipts to POs, and prepare payment runs, and nothing on loans. Whatever an Agent role may create or edit, it only drafts: each change waits for a person. See User management › User roles.</>}>
        <AgentFrame loud as="admin" on="" foot={foot}>
          <div className="as-a-page">
            <p className="as-crumb">Administration <span>/</span> Users and roles <span>/</span> Roles <span>/</span> <b>Finance Agent</b></p>
            <div className="as-a-head"><div><p className="m-title">Finance Agent</p><p className="as-meta"><span>An Agent role · held by Marco, owned by Ramon Cruz</span></p></div><span className="as-acts"><Btn>Cancel</Btn><Btn kind="pri">Save role</Btn></span></div>
            <div className="rg-fields">
              <Field label="Name" value="Finance Agent" />
              <Field label="What it’s for" value="Matching receipts and preparing payment runs" />
              <p className="rg-legend">
                <span><i className="rg-box all">✓</i><b>All</b> any record it can reach</span>
                <span><i className="rg-box own" /><b>Own</b> only runs it prepared</span>
                <span><i className="rg-box no" /><b>No</b></span>
                <span><i className="rg-box no gv-lock" /><b>Locked</b> never for an Agent</span>
              </p>
            </div>
            <table className="rg-tbl">
              <thead><tr><th />{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{grid.map(([area, cs]) => <tr key={area}><td>{area}</td>{cs.map((c, i) => <td key={i}><Tri c={c} /></td>)}</tr>)}</tbody>
            </table>
            <p className="gv-note">An Agent role drafts: anything it creates or edits waits for a person to approve, edit, or reject.</p>
          </div>
        </AgentFrame>
      </Demo>

      <Section title="Ramon and Marco, side by side">
        <When head={['Action', 'Finance (Ramon)', 'Finance Agent (Marco)']} rows={[
          ['View invoices, POs, and payments', 'All', 'All'],
          ['Prepare a payment run', 'All', 'All, as a draft for a Finance lead'],
          ['Link a receipt to its PO', 'All', 'All, as a draft for a person to approve'],
          ['Approve a payment run', 'All', 'Never: locked for Agents'],
          ['Void an invoice or payment', 'All', 'Never: locked for Agents'],
          ['View loans', 'All', 'No'],
        ]} />
      </Section>

      <Demo wide caption="Widening an Agent role, such as letting Marco read loans, opens a review page, /admin/roles/finance-agent/review. It says what changes, what doesn’t, and who is told, and asks for a reason. Narrowing a role saves at once.">
        <AgentFrame loud as="admin" on="" foot={foot}>
          <ConfirmPage crumb={['Administration', 'Users and roles', 'Roles', 'Finance Agent', 'Review']} title="Let Finance Agent view loans?" meta="An Agent role · held by Marco, owned by Ramon Cruz"
            facts={[['Loans now', 'No'], ['Loans after', 'View, all branches'], ['Held by', 'Marco']]}
            what={[
              <><b>Marco can read every loan and its payments,</b> in every branch, to answer questions about them.</>,
              <><b>He still only drafts.</b> Nothing on a loan changes unless a person approves it, and approving stays locked.</>,
              <><b>Ramon Cruz, Marco’s owner, is told,</b> and the change goes in the audit trail with your reason.</>,
            ]}
            reason="Ramon wants Marco to answer cash-flow questions that need loan balances."
            back="Back to Finance Agent" action="Let it view loans" danger={false} />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Marco holds Finance Agent only, with Ramon as his owner. Each thing he can do names the role that gives it, and what’s locked says so.">
          <CanDo owner="Ramon Cruz" items={[
            ['View invoices, POs, and payments', 'Finance Agent'],
            ['Draft payment runs, for Finance to approve', 'Finance Agent'],
            ['Approve payment runs', 'Locked for Agents'],
          ]} />
        </Demo>
        <Demo verdict="avoid" caption="Marco given Ramon’s Finance role to save time, with no owner. He can now approve his own payment runs, and nobody answers for him.">
          <CanDo items={[
            ['View invoices, POs, and payments', 'Finance'],
            ['Void invoices and payments', 'Finance', true],
            ['Approve payment runs', 'Finance', true],
          ]} />
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Give each Agent its own role.', 'Built in the same Role builder, marked as an Agent role, named for the work.'],
            ['Lock what no Agent may do.', 'Approving and voiding can’t be ticked on an Agent role. A person always does those.'],
            ['Let it draft, never save.', 'What an Agent role may create or edit, it drafts; a person approves each change.'],
            ['Name an accountable owner.', 'An Agent can’t be saved without one. The owner gets its questions, failures, and warnings.'],
            ['Review before widening.', 'A new role or wider access opens a review page: what changes, what doesn’t, and a reason.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Lending an Agent a person’s role.', 'Marco gets everything Ramon can do, including what he shouldn’t.'],
            ['An Agent that approves its own work.', 'Marco prepares a run and pays it, and no person ever looks.'],
            ['An Agent role that saves changes.', 'Marco links 214 receipts on his own, and nobody decided.'],
            ['An Agent nobody owns.', 'A run fails on Saturday, and nobody knows it’s theirs to fix.'],
            ['Widening in one click.', 'Marco can suddenly read every loan, and nobody is told.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
