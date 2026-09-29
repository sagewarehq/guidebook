import { Section, Demo, Rules, Avoid, When } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { ConfirmPage } from '../records/confirm-kit';
import '../records/foundations.css';

// Restoring a snapshot: loading a snapshot back. Safest as a new account, to look or practise; over the live account
// only with care: a confirmation page that says exactly what will be lost, a safety snapshot first, and the account
// name typed to confirm.

export default function Restoring() {
  return (
    <>
      <Demo wide caption="Restore into a new account: the default. The snapshot loads as a separate account, marked Training, to check an old figure, rehearse a change, or train staff. The live account isn’t touched.">
        <Frame as="admin" on="">
          <ConfirmPage crumb={['Administration', 'Snapshots', 'Restore']} title="Restore “Month end, August 2026” as a new account?" meta="Taken 1 Sep 2026, 12:00 AM · 2.2 GB"
            facts={[['New account', 'Metro Lending (Aug 2026 copy)'], ['Marked', 'Training'], ['Ready in', 'About 15 minutes']]}
            what={[
              <><b>A separate account is made</b> from the snapshot, with a Training banner on every page.</>,
              <><b>Nothing live changes.</b> Metro Lending carries on as it is.</>,
              <><b>Only admins can open it</b> at first; they choose who else can.</>,
            ]}
            back="Back to snapshots" action="Restore as new account" danger={false} />
        </Frame>
      </Demo>

      <Demo wide caption="Restore over the live account: the last resort. It says exactly what will be lost, takes a safety snapshot first, signs everyone out while it runs, and needs the account name typed. Only the owner can do it.">
        <Frame as="admin" on="">
          <ConfirmPage crumb={['Administration', 'Snapshots', 'Restore']} title="Replace Metro Lending with “Before payment run #0318”?" meta="Taken today, 9:02 AM, by Ramon · 2.3 GB"
            facts={[['Changes lost', '1,284'], ['Since', 'Today, 9:02 AM'], ['Offline for', 'About 20 minutes']]}
            what={[
              <><b>Everything since 9:02 AM is replaced:</b> 42 payments, 18 invoices, 3 loans, and 1,221 other changes.</>,
              <><b>A safety snapshot is taken first,</b> so this restore can itself be undone.</>,
              <><b>Everyone is signed out</b> while it runs, and told when it’s back.</>,
            ]}
            reason="Payment run #0318 was released with the wrong bank file"
            typeName="Metro Lending"
            back="Back to snapshots" action="Replace live data" />
        </Frame>
      </Demo>

      <Section title="Where to restore">
        <When head={['Restore', 'For', 'Who']} rows={[
          ['As a new account', 'Checking an old figure, rehearsing a change, training, testing a fix', 'Admins'],
          ['Over the live account', 'Undoing a mistake that can’t be undone record by record', 'The owner, with the account name typed'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Restore into a new account by default.', 'Look, check, and practise on a copy, marked Training, with nothing live at risk.'],
            ['Over live, say exactly what’s lost.', 'The time it goes back to, and how many payments, invoices, and loans since.'],
            ['Take a safety snapshot first.', 'Every restore over live can itself be undone.'],
            ['Make it hard to do by accident.', 'The owner only, with a reason and the account name typed.'],
            ['Tell everyone, before and after.', 'Sign people out with a message, and notify them when the system is back.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Restoring over live to look something up.', 'Hours of today’s work vanish to answer one question about August.'],
            ['“Are you sure?” before a restore.', 'It doesn’t say that 42 payments will disappear.'],
            ['A restore with no way back.', 'If the snapshot was the wrong one, the live data is gone for good.'],
            ['A restore any admin can start with one click.', 'The biggest button in the system is the easiest to press.'],
            ['Restoring while people work.', 'Their changes land halfway through, and are lost without a word.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
