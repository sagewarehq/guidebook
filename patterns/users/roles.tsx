import { Section, Demo, Rules, Avoid, When, Btn, Field } from '../../site/kit';
import { AdminPage } from '../admin/admin-kit';
import { Frame } from '../shell/shell-kit';
import '../forms/forms.css';

// Role-based access: every action the system can do is a permission, listed in the Role builder. Admins build roles
// from them, one per job. People and Agents hold one or more roles, and their access is everything their roles allow.

type C = 'all' | 'own' | 'no' | null;
const cols = ['View', 'Create', 'Edit', 'Archive', 'Delete', 'Void', 'Export', 'Approve'];
const grid: [string, C[]][] = [
  ['Invoices', ['all', 'own', 'own', 'no', 'no', 'no', 'no', null]],
  ['Payments', ['all', 'own', 'no', null, null, 'no', 'no', null]],
  ['Customers', ['all', 'own', 'own', 'no', 'no', null, 'no', null]],
  ['Loans', ['all', 'no', 'no', 'no', null, null, 'no', 'no']],
  ['Payment runs', ['no', null, null, null, null, null, 'no', 'no']],
  ['Reports', ['own', null, null, null, null, null, 'no', null]],
];
const Tri = ({ c }: { c: C }) => c === null
  ? <span className="rg-na">—</span>
  : <i className={`rg-box ${c}`} title={c === 'all' ? 'All' : c === 'own' ? 'Own' : 'No'}>{c === 'all' ? '✓' : ''}</i>;

export default function Roles() {
  return (
    <>
      <Demo wide caption="The Role builder: one role at a time, on its own page. Every area of the system down the side, every action across the top, and in each cell one box that cycles as it’s clicked: empty for No, half-filled for Own, ticked for All. A dash marks an action that doesn’t exist for that area. New features add their rows and columns on their own.">
        <Frame loud as="admin" on="" foot={<><p className="as-nav">Jobs</p><p className="as-nav">Settings</p><p className="as-nav on">Administration</p><p className="as-nav">Help</p></>}>
          <div className="as-a-page">
            <p className="as-crumb">Administration <span>/</span> Users and roles <span>/</span> Roles <span>/</span> <b>Collections</b></p>
            <div className="as-a-head"><div><p className="m-title">Collections</p><p className="as-meta"><span>Chasing and recording payments · held by 9 people</span></p></div><span className="as-acts"><Btn>Cancel</Btn><Btn kind="pri">Save role</Btn></span></div>
            <div className="rg-fields"><Field label="Name" value="Collections" /><Field label="What it’s for" value="Chasing and recording payments" /><p className="rg-legend"><span><i className="rg-box all">✓</i><b>All</b> any record they can reach</span><span><i className="rg-box own" /><b>Own</b> only records they created or are assigned</span><span><i className="rg-box no" /><b>No</b></span><small>Click a box to cycle: No → Own → All.</small></p></div>
            <table className="rg-tbl">
              <thead><tr><th />{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{grid.map(([area, cs]) => <tr key={area}><td>{area}</td>{cs.map((c, i) => <td key={i}><Tri c={c} /></td>)}</tr>)}</tbody>
            </table>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="A person can hold more than one role. Ana is in Collections and Report viewer; what she can do is everything both allow, and the drawer says which role gives her each.">
        <AdminPage on="Users and roles" crumb={<b>Users and roles</b>} overlay={
          <div className="pp-drawer">
            <p className="pd-side-h"><b>Ana Reyes</b><span>×</span></p>
            <div className="m-field"><label>Roles</label><p className="rb-chips"><span>Collections ×</span><span>Report viewer ×</span><span className="add">+ Add role</span></p></div>
            <Field label="Branch" value="Cebu" select />
            <div className="rb-can">
              <p className="m-k">What Ana can do</p>
              <p><b>Record payments, create customers</b><span>Collections</span></p>
              <p><b>View Profit and loss, export reports</b><span>Report viewer</span></p>
              <p><b>View invoices and payments</b><span>Both</span></p>
              <p className="no"><b>Void payments</b><span>No role gives this</span></p>
            </div>
            <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save roles</Btn></span>
          </div>}>
          <p className="m-title">Users and roles</p>
        </AdminPage>
      </Demo>

      <Section title="How roles add up">
        <When head={['Question', 'Answer']} rows={[
          ['Ana has two roles. Can she export?', 'Yes, if either role allows it. Roles only ever add access.'],
          ['One role says Own, another says All.', 'She gets All: the wider answer wins. Collections lets her edit her own invoices; if Report viewer said All for reports, she sees every report.'],
          ['Where does the branch come in?', 'All and Own work inside the branches the person can reach, set on the person. See Access › Record scope.'],
          ['Can a role take something away?', 'No. There are no “deny” rules; to remove access, remove the role, or untick it in the role.'],
          ['What about Agents?', 'The same: Marco holds Finance Agent, built in the same Role builder.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Every action is a permission: All, Own, or No.', 'The Role builder is a grid of every area and action. Own limits it to records the person created or is assigned.'],
            ['Roles bundle permissions for a job.', 'Admins build them: Collections, Finance, Report viewer. Named for the work, with a line on what it’s for.'],
            ['People hold one or more roles.', 'Access is everything their roles allow, added together. No role ever takes access away.'],
            ['Show what someone can do, and why.', 'On each person, the actions they have and the role that gives each one.'],
            ['Confirm changes that widen access.', 'Saving a role says who gains what: “9 people in Collections will be able to void payments.”'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Permissions kept by hand.', 'A new feature ships with no permission, and everyone can use it.'],
            ['A role for every person.', '“Ana’s role”, “Ana’s role 2”: nobody can say what a collector should have.'],
            ['Deny rules.', 'Once roles can take away, nobody can predict what two roles together allow.'],
            ['Access nobody can explain.', 'Ana can void payments, and no one knows which role gave her that.'],
            ['Silent widening.', 'One tick in Collections quietly lets nine people void payments.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
