import { Section, Demo, Rules, Avoid, When, Btn } from '../../site/kit';
import { AdminPage } from '../admin/admin-kit';
import '../shell/shell.css';

// Password resets: the request admins get most, “I can’t get in.” The person’s page says why, and every fix is one
// click. The admin never sets or sees a password.

export default function Resets() {
  return (
    <>
      <Demo wide caption="The most common request: “I can’t get in.” Opening Ana shows why at the top, locked after 5 failed sign-ins, and the fixes as buttons: send her a reset link, unlock her, reset her two-step, or sign her out everywhere. The admin never sets or sees a password.">
        <AdminPage on="Users and roles" crumb={<>Users and roles <span>/</span> <b>Ana Reyes</b></>} overlay={
          <div className="pp-drawer">
            <p className="pd-side-h"><b>Ana Reyes</b><span>×</span></p>
            <p className="um-alert"><b>Locked since 11:15 PM.</b> 5 failed sign-ins, from an unknown device in Singapore.</p>
            <div className="um-acts">
              <p><b>Send a password reset link</b><span>To ana@metrolending.ph. Works once, for 1 hour.</span><Btn kind="pri">Send link</Btn></p>
              <p><b>Unlock her account</b><span>She can try again straight away.</span><Btn>Unlock</Btn></p>
              <p><b>Reset two-step sign-in</b><span>For a lost phone. She sets it up again on next sign-in.</span><Btn>Reset two-step</Btn></p>
              <p><b>Sign out everywhere</b><span>Ends her sessions on 2 devices.</span><Btn>Sign out</Btn></p>
            </div>
            <p className="um-note">Each is logged in the audit trail, and Ana is emailed that it happened.</p>
          </div>}>
          <p className="m-title">Users and roles</p>
        </AdminPage>
      </Demo>

      <Section title="Common requests, and the fix">
        <When head={['They say', 'The admin', 'Never']} rows={[
          ['“I forgot my password.”', 'Sends a reset link, or points them to Forgot password', 'Type a new password for them'],
          ['“I’m locked out.”', 'Checks why, then unlocks, or sends a reset link if it looks like someone else', 'Unlock without looking at the failed sign-ins'],
          ['“I lost my phone.”', 'Resets two-step sign-in, and signs them out everywhere', 'Turn two-step off for their role'],
          ['“Someone else used my account.”', 'Signs them out everywhere, sends a reset link, and checks the audit trail', 'Leave the sessions running'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Say why they can’t get in.', 'Locked, expired, two-step lost, or never accepted the invite, at the top of their page.'],
            ['Every fix is one click.', 'Send a reset link, unlock, reset two-step, or sign out everywhere.'],
            ['Never a password.', 'The admin sends a link; the person sets their own password. Nobody else ever knows it.'],
            ['Check before unlocking.', 'Failed sign-ins from somewhere strange mean a reset link, not just an unlock.'],
            ['Tell the person, and log it.', 'An email saying what was done and by whom, and a line in the audit trail.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A generic “Account locked” with no reason.', 'The admin unlocks it, and whoever was guessing the password carries on.'],
            ['Resets that need a developer.', 'Ana can’t work until someone runs a script.'],
            ['Admins typing a new password.', 'The admin knows it, and it’s sent in a chat message.'],
            ['Unlocking without looking.', 'The attacker in Singapore gets five more tries.'],
            ['Silent resets.', 'Ana finds her two-step reset and doesn’t know who did it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
