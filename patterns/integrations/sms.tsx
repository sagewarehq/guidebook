import { Section, Demo, Rules, Avoid, When } from '../../site/kit';
import { ProviderPage } from './ig-kit';

// SMS: the providers that send texts, in order, including a Generic HTTPS gateway.

export default function Sms() {
  return (
    <>
      <Demo wide caption="Administration › Integrations › SMS. The same shape as email: providers in order, the first working one sends. Credits sit on each provider that sells them.">
        <ProviderPage job="SMS" desc="Sends payment reminders and sign-in codes, as MetroLend"
          note="The first provider that’s working sends. Sign-in codes always go, even to numbers that replied STOP."
          rows={[
            ['SEM', 'Semaphore', 'Sender MetroLend, approved · 12,400 credits, about 5 weeks', 'Sending', 'ok'],
            ['TW', 'Twilio', 'Pay as you go · last test 2 Sep', 'Standing by'],
            ['HTTPS', 'Generic HTTPS gateway', 'Any SMS service with an HTTPS API · Globe Labs', 'Standing by'],
          ]} />
      </Demo>

      <Section title="What an SMS provider needs">
        <When head={['Setting', 'Why']} rows={[
          ['An approved sender name', 'Customers see MetroLend, not a random number'],
          ['Credits, and a warning', 'How many are left, how long they’ll last, and a warning below a level'],
          ['A test text', 'Proof it delivers before it’s in the order'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Providers in order.', 'The first working one sends; the next takes over. Sign-in codes always have a second.'],
            ['Always a Generic option.', 'A Generic HTTPS gateway for any SMS service with an API.'],
            ['Credits on the provider.', 'Left, how long they’ll last, and a warning well before they run out.'],
            ['An approved sender name.', 'The same name, whichever provider sends.'],
            ['Honour opt-outs.', 'STOP stops reminders for good; only sign-in codes still go.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['One SMS provider.', 'A provider outage means no sign-in codes, and nobody can sign in.'],
            ['Only the vendors we built for.', 'A cheaper local gateway can’t be added.'],
            ['Credits nobody watches.', 'Reminders stop on the 1st, and nobody notices for a week.'],
            ['Texts from an unknown number.', 'Customers ignore them, or report them as scams.'],
            ['Texting people who said STOP.', 'Complaints, and the sender name gets blocked.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
