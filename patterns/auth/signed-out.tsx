import { Section, Demo, Rules, Avoid, Field, Sk } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { Head, Full, Alt } from './auth-kit';
import '../records/foundations.css';

// Signed out while away: signing in again over the page people were on, with their work kept. No access has its own
// page, in Access › Record access.

export default function SignedOut() {
  return (
    <>
      <Demo wide caption="Signed out after 30 minutes away. The card opens over the page they were on, the email filled in. Signing in carries on exactly where they were, with the unsaved draft kept.">
        <Frame on="Invoices">
          <div className="ah-over">
            <div className="as-a-page ah-dim">
              <p className="as-crumb">Invoices <span>/</span> <b>INV-1038</b></p>
              <p className="m-title">INV-1038 · Metro Fuels</p>
              {[80, 64, 72, 58, 76].map(w => <Sk key={w} w={`${w}%`} />)}
            </div>
            <div className="ah-card">
              <Head title="You were signed out" sub="After 30 minutes away. Sign in to carry on; your changes to the terms are kept." />
              <Field label="Email" value="ana@metrolending.ph" calc />
              <Field label="Password" value="" focus />
              <Full pri>Sign in and carry on</Full>
              <Alt>Not Ana? <a>Sign in as someone else</a></Alt>
            </div>
          </div>
        </Frame>
      </Demo>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Sign in where they were.', 'An expired session opens the sign-in card over the page, not a redirect that loses it.'],
            ['Keep their work.', 'A draft or an open form survives the sign-in. Say so on the card.'],
            ['Warn before signing out.', 'Two minutes before, a quiet “You’ll be signed out soon. Stay signed in” bar.'],
            ['Show whose account it was.', 'The email is filled in and fixed, with “Not Ana? Sign in as someone else” for shared computers.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Redirecting to a separate sign-in page.', 'The page they were on is lost, and they have to find it again.'],
            ['“Session expired” on a blank page, with the draft gone.', 'People lose what they typed, and stop trusting the system.'],
            ['Signing out without warning.', 'People who were reading, not typing, are cut off mid-task.'],
            ['An empty sign-in form.', 'On a shared computer, the next person signs in over Ana’s draft.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
