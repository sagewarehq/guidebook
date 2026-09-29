import { Section, Demo, Pair, Rules, Avoid, When, Btn, Pill, Ini, Field, Win } from '../../site/kit';
import { AdminPage } from '../admin/admin-kit';
import { AuthScreen, Head, Full, Notice, Alt } from '../auth/auth-kit';
import '../forms/forms.css';

// People: the list of everyone who can sign in, how they're invited (and what the invitee sees: the email, joining,
// and an expired invite), how their role changes, and how they leave.
// Admins deactivate; nobody is ever deleted, so their name stays on everything they did.

const people: [string, string, string, string, string, 'ok' | 'off' | undefined, boolean?][] = [
  ['AR', 'Ana Reyes', 'Collections, Report viewer', 'Cebu', 'Active', 'ok'],
  ['RC', 'Ramon Cruz', 'Finance', 'All branches', 'Active', 'ok'],
  ['LT', 'Liza Tan', 'Branch manager', 'Cebu', 'Active', 'ok'],
  ['MA', 'Marco', 'Finance Agent', 'All branches', 'Active', 'ok', true],
  ['JO', 'jomar@metrolending.ph', 'Collections', 'Baguio', 'Invited, 2 days', undefined],
  ['JL', 'Joel Santos', 'Collections', 'Davao', 'Deactivated 25 Sep', 'off'],
];

export default function People() {
  return (
    <>
      <Demo wide caption="Administration › Users and roles. Everyone who can sign in, Agents included, with their role, branch, and state. Invited people wait with how long ago; people who left stay, deactivated.">
        <AdminPage on="Users and roles" crumb={<b>Users and roles</b>}>
          <div className="m-row"><div><p className="m-title">Users and roles</p><p className="as-meta"><span>18 active, 1 Agent, 1 invited, 3 deactivated</span></p></div><span className="as-acts"><Btn>Roles</Btn><Btn kind="pri">Invite someone</Btn></span></div>
          <table className="m-tbl">
            <thead><tr><th>Name</th><th>Roles</th><th>Branch</th><th>State</th></tr></thead>
            <tbody>{people.map(([i, n, r, b, st, tone, ag]) => <tr key={n}><td><span className="sh-user"><Ini n={i} agent={ag} />{n}</span></td><td>{r}</td><td>{b}</td><td><Pill tone={tone}>{st}</Pill></td></tr>)}</tbody>
          </table>
        </AdminPage>
      </Demo>

      <Demo wide caption="Invite someone opens a drawer: their email, one or more roles, and the branch. They get a link that works once, for 48 hours.">
        <AdminPage on="Users and roles" crumb={<b>Users and roles</b>} overlay={
          <div className="pp-drawer">
            <p className="pd-side-h"><b>Invite someone</b><span>×</span></p>
            <Field label="Email" value="jomar@metrolending.ph" />
            <div className="m-field"><label>Roles</label><p className="rb-chips"><span>Collections ×</span><span className="add">+ Add role</span></p><p className="m-hint">Record payments, send reminders. Can’t void or export.</p></div>
            <Field label="Branch" value="Baguio" select />
            <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Send invite</Btn></span>
          </div>}>
          <p className="m-title">Users and roles</p>
        </AdminPage>
      </Demo>

      <Section title="What the invitee sees">
        <p>An email, then the standard sign-in layout, in the client’s name.</p>
      </Section>
      <Pair>
        <Demo caption={<><b>1 · The email.</b> Who invited them, to what, as what role, and until when. One button.</>}>
          <Win title="Mail" className="ah-mailw">
            <div className="ah-mail">
              <p className="ah-mailh"><b>Carlo invited you to Loans OS</b><span>From Metro Lending · to ana@metrolending.ph</span></p>
              <p>Hi Ana, Carlo Mendoza added you to Metro Lending’s Loans OS as <b>Collections, Cebu branch</b>.</p>
              <Btn kind="pri">Accept invite</Btn>
              <small>The link works once, until 30 Sep 2026, 9:14 AM. Not expecting this? Ignore it, or tell Carlo.</small>
            </div>
          </Win>
        </Demo>
        <Demo caption={<><b>2 · Join.</b> The email is fixed, the role is shown. They add a name and a password, and they’re in.</>}>
          <AuthScreen small>
            <Head title="Join Loans OS" sub={<>Carlo invited you as <b>Collections, Cebu branch</b>.</>} />
            <Field label="Email" value="ana@metrolending.ph" calc />
            <Field label="Full name" value="Ana Reyes" />
            <Field label="Password" value="••••••••••••••" />
            <p className="ah-ok">✓ 12 or more characters · ✓ Not a common password</p>
            <Full pri>Create account</Full>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>An invite that’s expired.</b> Say who can send a new one. Don’t make them start over somewhere else.</>}>
          <AuthScreen small>
            <Head title="This invite has expired" />
            <Notice tone="info">Invites work for 48 hours. Ask Carlo to send a new one; it takes a click.</Notice>
            <Full pri>Ask Carlo for a new invite</Full>
            <Alt>Already joined? <a>Sign in</a></Alt>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>Already has an account.</b> An invite to an email that’s already in: sign in, and the role is added.</>}>
          <AuthScreen small>
            <Head title="You already have an account" sub="Sign in to accept Carlo’s invite." />
            <Field label="Email" value="ana@metrolending.ph" calc />
            <Field label="Password" value="" focus />
            <Full pri>Sign in and accept</Full>
          </AuthScreen>
        </Demo>
      </Pair>

      <Section title="A person’s life in the system">
        <When head={['Stage', 'What happens', 'Logged']} rows={[
          ['Invited', 'An admin picks the roles and branch; a link goes out, good for 48 hours', 'Who invited whom, as what'],
          ['Active', 'Signs in, with two-step if the role needs it', 'Every sign-in'],
          ['Roles changed', 'New access from the next click; open drafts stay theirs', 'From what, to what, by whom'],
          ['Deactivated', 'Signed out everywhere at once; their open work is reassigned; their name stays on everything', 'Who, when, and why'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Everyone who can sign in, in one list.', 'People and Agents together, with their roles, branch, and state.'],
            ['People join by invite, with their roles.', 'No public sign-up. Email, one or more roles, and branch, with what the roles allow in a line, before sending.'],
            ['The invite says who, what, and as what.', 'Then they add only a name and a password. It lasts 48 hours, works once, and resends with one click.'],
            ['Deactivate, never delete; off means off.', 'Their name stays on everything they did; every session ends at once.'],
            ['Every change is logged.', 'Invites, role changes, and deactivations, with who and when, in the audit trail.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Agents managed somewhere else.', 'Their access is forgotten when roles change.'],
            ['A public Sign up page.', 'Anyone could make an account on a system that holds the client’s records.'],
            ['An invite that only says “You’ve been invited,” or a temporary password.', 'People can’t tell whether it’s real; a password sits in an inbox until someone changes it.'],
            ['Deleting people who leave.', 'Their payments now say “Unknown user”, and Joel’s phone keeps working.'],
            ['Silent access changes.', 'Nobody can say when Ana was given Finance access, or by whom.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
