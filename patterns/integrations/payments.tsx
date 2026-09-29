import { Section, Demo, Rules, Avoid, When } from '../../site/kit';
import { ProviderPage } from './ig-kit';

// Payments: the providers customers pay through. Several can be active at once, each for its methods; the order
// decides which is offered first where methods overlap. Test first, then live.

export default function Payments() {
  return (
    <>
      <Demo wide caption="Administration › Integrations › Payments. Several providers can be live at once, each for its own methods. Where two offer the same method, the first in the order is used. A new provider starts in Test.">
        <ProviderPage job="Payments" desc="How customers pay invoices online. Payments land in BDO ••4471 and match to invoices on arrival."
          note="Customers see every method that’s live. Where two providers offer the same method, the first is used; if it fails, the next."
          rows={[
            ['PMG', 'PayMongo', 'Cards, GCash, Maya · last payment 11:40 AM · webhook ✓', 'Live', 'ok'],
            ['DP', 'Dragonpay', 'Online banking, over the counter · last payment yesterday', 'Live', 'ok'],
            ['XND', 'Xendit', 'Cards, GCash · test keys', 'Test'],
          ]} />
      </Demo>

      <Section title="Test, then live">
        <When head={['Mode', 'What it does', 'Shows']} rows={[
          ['Test', 'The provider’s test keys; no real money moves', 'Test on the provider, and a Test banner on its payment pages'],
          ['Live', 'Real payments into the client’s account', 'Live, in green; switching to Live is a confirmation page'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Several providers, each for its methods.', 'Cards through one, online banking through another, all live at once.'],
            ['Order decides overlaps.', 'Where two offer GCash, the first is used, and the next if it fails.'],
            ['Test first, then live.', 'A new provider starts in Test; going live is a confirmation page.'],
            ['Keys shown once.', 'Pasted, saved, then only the last four characters, with who set them.'],
            ['Webhook health on each.', 'When the last payment event arrived, and any that failed.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['One provider for every method.', 'Customers who pay over the counter have no way to pay.'],
            ['Two providers fighting over GCash.', 'Customers see GCash twice, and payments split unpredictably.'],
            ['Live keys on day one.', 'The first test payment takes a real ₱1,000 from someone’s card.'],
            ['Keys anyone can read back.', 'Whoever sees the screen can move the client’s money.'],
            ['A silent broken webhook.', 'Customers pay, and invoices stay unpaid in the system, for days.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
