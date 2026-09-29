import { Section, Demo, Rules, Avoid, When, Btn, Field } from '../../site/kit';
import { ProviderPage } from './ig-kit';

// Adding a provider: Add provider opens a drawer listing every provider available for this integration, always ending
// with Generic, which uses a standard interface. Picking one shows only its fields, a test, and where it goes in the
// order.

export default function Providers() {
  return (
    <>
      <Demo wide caption="Add provider, on Email, opens a drawer: every email provider the system supports, and Generic SMTP for any other mail server. Picking one shows its few fields and a test; saving adds it to the end of the order.">
        <ProviderPage job="Email" desc="Sends statements, invoices, reminders, and invites" note="Add as many providers as you like. The first working one sends."
          rows={[['PM', 'Postmark', 'Last sent 2 minutes ago', 'Sending', 'ok'], ['SES', 'Amazon SES', 'Ready · last test 12 Sep', 'Standing by']]}
          drawer={
            <div className="pp-drawer">
              <p className="pd-side-h"><b>Add an email provider</b><span>×</span></p>
              <div className="ig-pick">
                <p><i className="ig-logo sm">SG</i><span><b>SendGrid</b><small>API key</small></span><em /></p>
                <p><i className="ig-logo sm">MG</i><span><b>Mailgun</b><small>API key and domain</small></span><em /></p>
                <p><i className="ig-logo sm">365</i><span><b>Microsoft 365</b><small>Sign in with Microsoft</small></span><em /></p>
                <p className="on"><i className="ig-logo sm">SMTP</i><span><b>Generic SMTP</b><small>Any mail server</small></span><em>Selected</em></p>
              </div>
              <div className="ig-2"><Field label="Server" value="mail.metrolending.ph" /><Field label="Port" value="587 · TLS" select /></div>
              <div className="ig-2"><Field label="Username" value="billing" /><Field label="Password" value="••••••••••" hint="Hidden once saved" /></div>
              <span className="pd-foot"><Btn>Send a test</Btn><Btn kind="pri">Add to the order</Btn></span>
            </div>} />
      </Demo>

      <Section title="Generic, for every kind">
        <When head={['Integration', 'Generic option', 'Works with']} rows={[
          ['Email', 'Generic SMTP', 'Any mail server: the client’s own, Google Workspace, or a local host'],
          ['SMS', 'Generic HTTPS gateway', 'Any SMS service with an HTTPS API: URL, method, and where the number and text go'],
          ['Payments', 'Generic webhook', 'A provider that posts payment events to a URL, matched by reference'],
          ['Bank statements', 'Generic file import', 'CSV or OFX statements, uploaded or dropped in a folder'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Add provider opens a drawer.', 'Every provider available for this integration, as a list to pick from.'],
            ['Always end with Generic.', 'A standard interface, SMTP, HTTPS, webhook, or file, for anything not listed.'],
            ['Show only that provider’s fields.', 'Postmark needs a key; SMTP needs a server, port, and login. Nothing more.'],
            ['Test before it joins the order.', 'Send a test, see it arrive, then Add to the order, at the end.'],
            ['Many can be active.', 'Add as many as the client wants; the order decides which is used.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Adding a provider on a page of its own.', 'People lose sight of the order they were adding to.'],
            ['No Generic option.', 'The client’s own mail server or local SMS gateway can’t be used at all.'],
            ['A long form for one key.', 'Setting up Postmark takes ten fields it doesn’t need.'],
            ['Providers live the moment they’re saved.', 'A typo in a password stops every email.'],
            ['Replacing the provider to add one.', 'The working one is removed to try a new one.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
