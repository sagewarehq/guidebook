import { Section, Demo, Rules, Avoid, When } from '../../site/kit';
import { ProviderPage } from './ig-kit';

// Email: the providers that send the system's email, in order. The first active one sends; if it fails, the next
// one does. Any number can be added, including a Generic SMTP server.

export default function Email() {
  return (
    <>
      <Demo wide caption="Administration › Integrations › Email. The providers, in order: the first sends, the next takes over if it fails. Drag to reorder; Add provider picks another, including any SMTP server.">
        <ProviderPage job="Email" desc="Sends statements, invoices, reminders, and invites, as billing@metrolending.ph"
          note="The first provider that’s working sends. If it fails 3 times or doesn’t answer in 30 seconds, the next one sends, and admins are told."
          rows={[
            ['PM', 'Postmark', 'Last sent 2 minutes ago · domain checks ✓', 'Sending', 'ok'],
            ['SES', 'Amazon SES', 'Ready · last test 12 Sep', 'Standing by'],
            ['SMTP', 'Generic SMTP · mail.metrolending.ph', 'The client’s own mail server · port 587, TLS', 'Standing by'],
          ]} />
      </Demo>

      <Section title="What an email provider needs">
        <When head={['Setting', 'Why']} rows={[
          ['Sends as', 'The client’s own address and name, so customers recognise it'],
          ['Domain checks (SPF, DKIM, DMARC)', 'So email isn’t marked as spam; shown set up or missing, in plain words'],
          ['A test send', 'Proof it works before it’s in the order'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Providers in order.', 'The first working one sends; the next takes over if it fails. Drag to reorder.'],
            ['Any number of providers.', 'Add as many as the client wants, each tested before it goes in the order.'],
            ['Always a Generic option.', 'Generic SMTP works with any mail server, so the client is never tied to one vendor.'],
            ['Send from the client’s domain.', 'billing@metrolending.ph, whichever provider sends it.'],
            ['Health on each provider.', 'When it last sent, and whether its domain checks pass.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['One provider, hard-wired.', 'When it’s down, no statement, invite, or reset link goes out.'],
            ['Adding a provider straight into use.', 'An untested key sends 1,188 statements into nothing.'],
            ['Only the vendors we built for.', 'The client’s own mail server can’t be used.'],
            ['A different sender for each provider.', 'Customers get statements from three different addresses.'],
            ['A provider list with no health.', 'Postmark has been failing all morning, and the list still looks fine.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
