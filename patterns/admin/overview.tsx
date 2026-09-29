import { Section, Demo, Rules, Avoid, Btn, Pill, Ini } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { H } from '../shell/places-kit';
import { ThreePlaces } from '../shell/three-kit';
import '../shell/shell.css';

// System administration: who can use the system and keeping it safe. Users and roles, audit trail, sign-in history,
// security, integration connections, snapshots, export everything, schedules, plan and billing. For the owner and IT.

const sections: [string, string][] = [
  ['People', 'Users and roles, Sign-in history'],
  ['Safety', 'Security, Audit trail'],
  ['Data', 'Snapshots, Export everything'],
  ['System', 'Schedules, Integrations'],
  ['Account', 'Plan and billing'],
];

const users: [string, string, string, string, boolean?][] = [
  ['AR', 'Ana Reyes', 'Collections', 'Cebu'],
  ['RC', 'Ramon Cruz', 'Finance', 'All branches'],
  ['LT', 'Liza Tan', 'Branch manager', 'Cebu'],
  ['MA', 'Marco', 'Finance Agent', 'All branches', true],
];

export default function Administration() {
  return (
    <>
      <Demo wide caption="Administration (1), at the foot of the sidebar, for the owner and IT. Its own list of sections: people, safety, data, the system’s schedules and connections, and the account. User management lives here, in Users and roles.">
        <Frame loud as="admin" on="" foot={<><p className="as-nav">Jobs</p><p className="as-nav">Settings</p><H n={1}><p className="as-nav on">Administration</p></H><p className="as-nav">Help</p></>}>
          <div className="as-a-page">
            <p className="as-crumb">Administration <span>/</span> <b>Users and roles</b></p>
            <div className="sh-set">
              <div className="sh-setnav st-groups">{sections.map(([g, items]) => <div key={g}><small>{g}</small>{items.split(', ').map(x => <p key={x} className={x === 'Users and roles' ? 'on' : undefined}>{x}</p>)}</div>)}</div>
              <div className="sh-setbody">
                <div className="m-row"><div><p className="m-title">Users and roles</p><p className="as-meta"><span>18 people, 1 Agent, 1 invite waiting</span></p></div><span className="as-acts"><Btn>Roles</Btn><Btn kind="pri">Invite someone</Btn></span></div>
                <table className="m-tbl">
                  <thead><tr><th>Name</th><th>Role</th><th>Branch</th><th>Status</th></tr></thead>
                  <tbody>
                    {users.map(([i, n, r, b, ag]) => <tr key={n}><td><span className="sh-user"><Ini n={i} agent={ag} />{n}</span></td><td>{r}</td><td>{b}</td><td><Pill tone="ok">Active</Pill></td></tr>)}
                    <tr><td><span className="sh-user"><Ini n="JO" />jomar@metrolending.ph</span></td><td>Collections</td><td>Baguio</td><td><Pill>Invited, 2 days</Pill></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="Three places, three jobs">
        <ThreePlaces />
      </Section>

      <p className="g-see">The rest of this chapter covers security, snapshots, restoring a snapshot, exporting everything, and plan and billing. Users and roles, the audit trail, and sign-in history are in User management; Schedules in System jobs; Integrations has its own chapter.</p>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Who gets in, and keeping it safe.', 'Users and roles, security, the audit trail, and the data itself. How the business works is Settings.'],
            ['For the owner and IT only.', 'Hidden from everyone else. Most people never see it in the sidebar.'],
            ['Grouped by what’s at stake.', 'People, Safety, Data, System, Account.'],
            ['Everything here is logged.', 'Invites, role changes, security changes, snapshots, and exports go in the audit trail, with who and when.'],
            ['Big changes confirm first.', 'Deactivating an admin, requiring two-step, or restoring a snapshot open a confirmation page.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Administration mixed into Settings.', 'The finance lead fixing a template is one click from deactivating a user.'],
            ['Administration visible to everyone.', 'Staff poke at pages they can’t use, or can, and shouldn’t.'],
            ['One long page of admin options.', 'Security settings hide between billing and integrations.'],
            ['Admin changes with no record.', 'Nobody can say who gave Ana access to payment runs.'],
            ['One click to lock everyone out.', 'Requiring two-step with no warning signs out the whole team mid-day.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
