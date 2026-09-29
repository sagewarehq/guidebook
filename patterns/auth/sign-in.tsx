import { Section, Demo, Pair, Rules, Avoid, Field } from '../../site/kit';
import { AuthScreen, Head, Full, Row, Notice, Alt } from './auth-kit';

// Signing in: the card, a wrong password, too many tries, and signing in with Google or Microsoft.

export default function SignIn() {
  return (
    <>
      <Pair>
        <Demo caption={<><b>Sign in.</b> Email and password, Keep me signed in, and Forgot password? beside it.</>}>
          <AuthScreen small>
            <Head title="Sign in" sub="to Metro Lending’s Loans OS" />
            <Field label="Email" value="ana@metrolending.ph" />
            <Field label="Password" value="••••••••••" focus />
            <Row check="Keep me signed in" on link="Forgot password?" />
            <Full pri>Sign in</Full>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>Wrong email or password.</b> One message, at the top, that doesn’t say which. The email stays; the password clears.</>}>
          <AuthScreen small>
            <Head title="Sign in" sub="to Metro Lending’s Loans OS" />
            <Notice>Wrong email or password. Check both, or reset your password.</Notice>
            <Field label="Email" value="ana@metrolending.ph" />
            <Field label="Password" value="" focus />
            <Row check="Keep me signed in" on link="Forgot password?" />
            <Full pri>Sign in</Full>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>Too many tries.</b> Say how long to wait, and offer the reset. No countdown to game.</>}>
          <AuthScreen small>
            <Head title="Sign in" sub="to Metro Lending’s Loans OS" />
            <Notice>Too many tries. Wait 15 minutes, or reset your password now.</Notice>
            <Field label="Email" value="ana@metrolending.ph" />
            <Full pri>Reset password</Full>
            <Alt>Still stuck? <a>Ask your admin</a></Alt>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>With Google or Microsoft.</b> Only when the client’s staff already use it. When everyone does, it comes first.</>}>
          <AuthScreen small>
            <Head title="Sign in" sub="with your Metro Lending account" />
            <Full pri>Sign in with Microsoft</Full>
            <p className="ah-or">or with email</p>
            <Field label="Email" value="" />
            <Full>Continue</Full>
          </AuthScreen>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One vague error.', '“Wrong email or password.” Never say which one was wrong, or whether the email exists.'],
            ['Keep the email, clear the password.', 'And put focus back in the password field.'],
            ['Lock out slowly, and say how long.', 'After 5 tries, 15 minutes. Offer the reset, and tell the admin after repeated lockouts.'],
            ['Email is the username, and the password manager fills it.', 'Real field names, autocomplete="username" and "current-password", and pasting allowed.'],
            ['Land where they were going.', 'A link to INV-1038 while signed out opens INV-1038 after signing in, not Home.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“No account with that email”, or “Wrong password”.', 'Either one tells a stranger half of what they need.'],
            ['Clearing the whole form.', 'People retype an email that was right.'],
            ['CAPTCHAs before anyone has failed.', 'They slow every honest sign-in. Throttle first.'],
            ['Usernames, or blocking paste.', 'One more thing to forget, and the password manager can’t help.'],
            ['Sending everyone to Home.', 'The link to INV-1038 is lost, and people hunt for it.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
