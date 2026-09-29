import { Section, Demo, Rules, Avoid, Btn, Ini, Field } from '../../site/kit';
import { Frame } from './shell-kit';
import { H, Menu } from './places-kit';
import { ThreePlaces } from './three-kit';
import './shell.css';

// User preferences: each person's own settings, reached from the profile menu. They change only that person's
// experience, never what the system does for anyone else.

const Tog = ({ on }: { on?: boolean }) => <i className={`up-tog${on ? ' on' : ''}`} />;

export default function Preferences() {
  return (
    <>
      <Demo wide caption="The profile menu (1), top right, says who you are and opens User preferences. Everyone has it, whatever their role.">
        <Frame loud on="Invoices"
          top={<><span className="as-bell">3</span><H n={1}><Ini n="AR" /></H></>}
          overlay={<Menu className="sh-menu-tr">
            <p className="sh-me"><Ini n="AR" /><span><b>Ana Reyes</b><small>Collections · Cebu branch</small></span></p>
            <p className="on">User preferences</p><p>Keyboard shortcuts</p>
            <p className="sep">Sign out</p>
          </Menu>}>
          <div className="as-a-page sh-dimpage"><p className="as-crumb">Invoices <span>/</span> <b>Overdue in Cebu</b></p><p className="m-title">Invoices</p></div>
        </Frame>
      </Demo>

      <Demo wide caption="User preferences, with its own short list of sections. Here, Notifications: which events reach Ana, and how. Nothing here changes anything for anyone else.">
        <Frame loud on="">
          <div className="as-a-page">
            <p className="as-crumb">User preferences <span>/</span> <b>Notifications</b></p>
            <div className="sh-set">
              <div className="sh-setnav">{['Profile', 'Password and two-step', 'Notifications', 'Language and region', 'Signed-in devices'].map(x => <p key={x} className={x === 'Notifications' ? 'on' : undefined}>{x}</p>)}</div>
              <div className="sh-setbody">
                <div><p className="m-title">Notifications</p><p className="as-meta"><span>What reaches you, and where. Changes save as you make them.</span></p></div>
                <table className="m-tbl up-tbl">
                  <thead><tr><th>When</th><th>In the app</th><th>Email</th></tr></thead>
                  <tbody>
                    <tr><td>Someone assigns you an invoice</td><td><Tog on /></td><td><Tog on /></td></tr>
                    <tr><td>A promise to pay is due today</td><td><Tog on /></td><td><Tog /></td></tr>
                    <tr><td>An Agent flags something for you</td><td><Tog on /></td><td><Tog on /></td></tr>
                    <tr><td>Your export is ready</td><td><Tog on /></td><td><Tog /></td></tr>
                  </tbody>
                </table>
                <Field label="Daily summary email" value="8:00 AM, working days" select />
              </div>
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="Three places, three jobs">
        <ThreePlaces />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Only what affects you.', 'Your name, password, two-step, notifications, language, and devices. Nothing that changes the system for others.'],
            ['From the profile menu, for everyone.', 'Top right, whatever the role. Nobody needs Settings to change their own password.'],
            ['Save as you go.', 'Switches and choices save when changed, with a quiet “Saved”. No Save button for a toggle.'],
            ['Say what the business decides for you.', 'If two-step is required by your role, show it on, with “Required for Finance”.'],
            ['Show your devices, and sign them out.', 'Where you’re signed in, and when, with Sign out on each.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Personal choices mixed into Settings.', 'People open a page built for admins and change something for everyone by mistake.'],
            ['Preferences only an admin can change.', 'People file a request to change their own notifications.'],
            ['A Save button for every switch.', 'People flip a switch, leave, and it never saved.'],
            ['Options that silently don’t apply.', 'Ramon turns two-step off, and it quietly stays on.'],
            ['No way to see where you’re signed in.', 'A lost phone stays signed in for weeks.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
