import { Section, Demo, Rules, Avoid, When, Btn, Pill } from '../../site/kit';
import { AdminPage } from '../admin/admin-kit';
import './integrations.css';

// The Integrations page: every outside service the system talks to, in Administration › Integrations. What each
// does, which provider, its state, and when it last worked, so a broken connection is seen before a customer does.

const rows: [string, string, string, string, 'ok' | 'bad' | undefined, string][] = [
  ['@', 'Email', 'Postmark, then Amazon SES, then Generic SMTP', 'Last sent 2 minutes ago · 3 bounces this week', 'ok', 'Connected'],
  ['SMS', 'SMS', 'Semaphore, then Twilio, then Generic HTTPS', 'Last sent 9:02 AM · 12,400 credits left', 'ok', 'Connected'],
  ['₱', 'Payments', 'PayMongo and Dragonpay live; Xendit in test', 'Last payment 11:40 AM · webhook healthy', 'ok', 'Live'],
  ['BDO', 'Bank statements', 'BDO, daily import for matching; Generic file import as backup', 'Access expires in 5 days', 'bad', 'Needs attention'],
];

export default function Overview() {
  return (
    <>
      <Demo wide caption="Administration › Integrations. One row per job the system hands to an outside service: what it’s for, which provider, what it did last, and its state. Anything close to breaking shows in red.">
        <AdminPage on="Integrations" crumb={<b>Integrations</b>}>
          <div className="m-row"><div><p className="m-title">Integrations</p><p className="as-meta"><span>Outside services the system uses. Changes are logged in the audit trail.</span></p></div><Btn kind="pri">Connect a service</Btn></div>
          <div className="ig-list">{rows.map(([l, n, p, last, tone, st]) => <p key={n} className="ig-row"><i className="ig-logo">{l}</i><span><b>{n}</b><small>{p}</small><small>{last}</small></span><Pill tone={tone}>{st}</Pill><a className="m-link">{tone === 'bad' ? 'Reconnect' : 'Open'}</a></p>)}</div>
        </AdminPage>
      </Demo>

      <Section title="What’s connected, and where it’s set">
        <When head={['Integration', 'Connected in', 'Behaviour set in']} rows={[
          ['Email, SMS, payments, bank', 'Administration › Integrations: providers in order, keys, sender', 'Settings: what’s sent, when, and to whom'],
          ['An Agent’s tools', 'Administration › Integrations, like any service', 'The Agent’s role and skills'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One row per job, named for the job.', 'Email, SMS, Payments, Bank statements. The provider is the detail, not the name.'],
            ['Show health, not just “connected”.', 'When it last worked, what failed recently, and anything about to expire.'],
            ['Warn before it breaks.', 'Expiring access, low credits, and failing webhooks turn red, and notify admins, days ahead.'],
            ['Connecting is for admins, and logged.', 'Keys, senders, and providers change only in Administration, and every change is in the audit trail.'],
            ['Behaviour lives in Settings.', 'Which emails go out, and when, is a business setting. Integrations only says how they’re sent.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Rows named for vendors.', '“Postmark” means nothing to the owner reading why statements didn’t go out.'],
            ['A green “Connected” that lies.', 'The key still works, but every SMS has failed since Tuesday.'],
            ['Finding out from a customer.', 'The bank connection expired a week ago, and nothing was matched since.'],
            ['Keys in Settings.', 'A finance lead can change the payment provider while editing a footer.'],
            ['Business rules inside the integration.', 'Reminder timing is buried in the SMS setup, where nobody looks for it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
