import { Section, Demo, Pair, Rules, Avoid, When, Pin, Field, Btn, Win } from '../../site/kit';
import { AuthScreen, Head, Full, Row, P } from './auth-kit';

// The layout every authentication page shares: the standard centred card, in the client's name. It's the first
// screen a client's staff see, so it should look finished and familiar, not clever.

export default function Layout() {
  return (
    <>
      <Demo wide caption="The standard layout, used for every page in this chapter: the client’s name above a centred card on a quiet page, one job per card, and a small footer. Familiar on purpose: people have seen it a thousand times, so they know what to do.">
        <AuthScreen pins>
          <P n={2} className="l"><Head title="Sign in" sub="to Metro Lending’s Loans OS" /></P>
          <P n={3} className="l"><Field label="Email" value="ana@metrolending.ph" /></P>
          <P n={3} className="l"><Field label="Password" value="••••••••••" /></P>
          <P n={4} className="l"><Row check="Keep me signed in" on link="Forgot password?" /></P>
          <P n={5} className="l"><Full pri>Sign in</Full></P>
          <P n={6} className="l"><p className="ah-or">or</p><Full>Sign in with Microsoft</Full></P>
        </AuthScreen>
      </Demo>

      <Section title="What goes where">
        <When head={['', 'Part', 'What goes there', 'Keep out']} rows={[
          [<Pin n={1} />, 'Client’s name', 'The client’s logo or name, and the system’s name under it. Centred, above the card.', 'Our logo, a marketing tagline, a hero photo.'],
          [<Pin n={2} />, 'Heading', 'What this card does, in two or three words: Sign in, Reset your password, Join Loans OS. One line under it when it helps.', 'Welcome back!, Hello, and exclamation marks.'],
          [<Pin n={3} />, 'Fields', 'Only what this step needs, labels above, full width, the email filled in when it’s known.', 'Placeholders as labels; fields that belong to a later step.'],
          [<Pin n={4} />, 'Small options', 'A checkbox on the left, a link on the right: Keep me signed in, Forgot password?', 'Terms and conditions to tick every time.'],
          [<Pin n={5} />, 'Primary button', 'Full width, named for the step: Sign in, Send reset link, Create account.', 'Submit, Continue, Go.'],
          [<Pin n={6} />, 'Other ways', 'Only when the client uses them: Sign in with Google or Microsoft, under a divider.', 'Every provider there is.'],
          [<Pin n={7} />, 'Footer', 'Help, Privacy, and the client’s name. Small and quiet.', 'Our marketing links.'],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption="Plain, centred, in the client’s name. It looks like every good sign-in page, which is the point.">
          <AuthScreen small>
            <Head title="Sign in" />
            <Field label="Email" value="" />
            <Field label="Password" value="" />
            <Full pri>Sign in</Full>
          </AuthScreen>
        </Demo>
        <Demo verdict="avoid" caption="The framework’s default page, unstyled, with its own name and a sign-up link nobody should use. Staff wonder if they’re in the right place.">
          <Win title="127.0.0.1:8000/accounts/login/" className="ah-bad">
            <p className="ah-bad-t">Django administration</p>
            <p className="ah-bad-f">Username: <span /></p>
            <p className="ah-bad-f">Password: <span /></p>
            <p><Btn>Log in</Btn> <a className="m-link">Register</a></p>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Use the standard layout.', 'A centred card on a quiet page. It’s the first screen staff see: finished and familiar, not clever.'],
            ['In the client’s name.', 'Their logo or name and the system’s name. Our name goes nowhere on it.'],
            ['One job per card, the same card everywhere.', 'Sign in, reset, invite, two-step, and signed out each get their own card in this layout.'],
            ['Light, calm, and fast.', 'No hero images or animation. It should load before people finish reaching for the keyboard.'],
            ['Land where they were going.', 'After signing in, people go to the page they asked for, or Home.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['The framework’s default pages, unstyled.', 'Staff wonder if they’re in the right place.'],
            ['Our logo, or a marketing tagline.', 'It’s the client’s system. Staff should see their company, not ours.'],
            ['A different look for each step.', 'Reset and two-step feel like somewhere else, and people stop trusting the link.'],
            ['A split screen with a big photo or marketing copy.', 'This is a work tool. It slows the page and says nothing staff need.'],
            ['Sending everyone to Home.', 'People who followed a link to a record have to find it again.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
