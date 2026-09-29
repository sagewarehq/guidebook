import { Section, Demo, Rules, Avoid, When } from '../../site/kit';
import { Frame, ListPage } from '../shell/shell-kit';
import { ConfirmPage } from '../records/confirm-kit';
import '../records/foundations.css';
import '../shell/shell.css';

// User impersonation: an admin sees the system as someone else does, to help them. It starts on a confirmation page
// with a reason, runs for a limited time, keeps a banner across the top the whole time, and logs everything as the
// admin acting as that person.

export default function Impersonation() {
  return (
    <>
      <Demo wide caption="Act as Ana, from her page in Users and roles, opens a confirmation page: why, for how long, and what’s off limits. Ana is told.">
        <Frame loud as="admin" on="">
          <ConfirmPage crumb={['Administration', 'Users and roles', 'Ana Reyes', 'Act as Ana']} title="Act as Ana Reyes?" meta="Collections · Cebu branch"
            facts={[['For up to', '30 minutes'], ['Logged as', 'Carlo, acting as Ana'], ['Ana is', 'Emailed now']]}
            what={[
              <><b>You’ll see exactly what Ana sees:</b> her lists, her branch, her Jobs, and nothing more.</>,
              <><b>Everything you do is recorded as you,</b> acting as Ana, in the audit trail and on each record’s history.</>,
              <><b>Some things stay off:</b> her password, two-step, and approving or voiding money.</>,
            ]}
            reason="She can’t find the overdue view Liza shared"
            back="Back to Ana" action="Act as Ana" danger={false} />
        </Frame>
      </Demo>

      <Demo wide caption="While acting as Ana: a banner across the very top of the window, on every page, saying who you’re acting as, who you really are, how long is left, and Stop. The app below is exactly Ana’s.">
        <Frame on="Invoices" banner={<p className="im-banner"><b>You’re acting as Ana Reyes</b> · Collections, Cebu. Everything you do is recorded as Carlo, acting as Ana. <span>24 minutes left</span><a>Stop acting as Ana</a></p>}>
          <ListPage plain />
        </Frame>
      </Demo>

      <Section title="What’s on, and what’s off">
        <When head={['While acting as someone', 'Allowed?']} rows={[
          ['Seeing their lists, records, reports, and Jobs', 'Yes: exactly what they see'],
          ['Fixing their saved views, filters, and preferences', 'Yes, logged as you'],
          ['Changing their password or two-step', 'No: use Password resets'],
          ['Approving, voiding, releasing, or paying money', 'No: those always need the real person'],
          ['Acting as another admin', 'No'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Start on a confirmation page, with a reason.', 'Why, for how long, and what’s off limits, before anything changes.'],
            ['A banner across the top, the whole time.', '“You’re acting as Ana Reyes”, with who you really are, time left, and Stop.'],
            ['Logged as both of you.', '“Carlo, acting as Ana” on every change, in the audit trail and on each record.'],
            ['Time-limited, and money is off.', 'Thirty minutes at most; no approvals, voids, releases, passwords, or two-step.'],
            ['Tell the person.', 'Ana is emailed when it starts and ends, with the reason.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Signing in with their password.', 'The admin knows it, and nobody can tell who did what.'],
            ['A banner that scrolls away.', 'Carlo forgets he’s acting as Ana, and changes her views for good.'],
            ['Changes recorded as Ana alone.', 'Ana is blamed for what Carlo did.'],
            ['Acting as someone with no limits.', 'An admin approves a payment run as Ramon.'],
            ['Impersonating in secret.', 'Ana finds out from the audit trail, weeks later.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
