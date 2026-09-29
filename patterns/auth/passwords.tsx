import { Section, Demo, Pair, Rules, Avoid, Field } from '../../site/kit';
import { AuthScreen, Head, Full, Row, Notice, Alt } from './auth-kit';

// Forgotten and reset passwords: ask for the email, say to check it, set a new one, and land signed in.

export default function Passwords() {
  return (
    <>
      <Pair>
        <Demo caption={<><b>1 · Forgot password.</b> Just the email, filled in from the sign-in page.</>}>
          <AuthScreen small>
            <Head title="Reset your password" sub="We’ll email you a link to set a new one." />
            <Field label="Email" value="ana@metrolending.ph" />
            <Full pri>Send reset link</Full>
            <Alt><a>Back to sign in</a></Alt>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>2 · Check your email.</b> The same words whether the email exists or not. Say how long the link lasts.</>}>
          <AuthScreen small>
            <Head title="Check your email" />
            <Notice tone="info">If ana@metrolending.ph has an account, a reset link is on its way. It works once, for 1 hour.</Notice>
            <Full>Back to sign in</Full>
            <Alt>Nothing after 5 minutes? Check spam, or <a>send it again</a>.</Alt>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>3 · Set a new password.</b> Rules shown up front and ticked as they type. One field, with Show.</>}>
          <AuthScreen small>
            <Head title="Set a new password" sub="For ana@metrolending.ph" />
            <Field label="New password" value="••••••••••••••" focus />
            <Row link="Show password" />
            <p className="ah-ok">✓ 12 or more characters<br />✓ Not a common password</p>
            <Full pri>Save and sign in</Full>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>A link that’s expired or used.</b> Say so, and offer a new one in the same card.</>}>
          <AuthScreen small>
            <Head title="This link has expired" />
            <Notice tone="info">Reset links work once, for 1 hour. Send a new one and use the latest email.</Notice>
            <Field label="Email" value="ana@metrolending.ph" />
            <Full pri>Send a new link</Full>
          </AuthScreen>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Never say whether an account exists.', '“If ana@metrolending.ph has an account, a link is on its way.” The same words, every time.'],
            ['Reset by a link that works once, for an hour.', 'Say so on the page and in the email. Sending a new one cancels the old.'],
            ['Show the rules before they type.', 'Length, and not a common or breached password. Tick them as they go; no hidden rules at submit.'],
            ['One password field, with Show.', 'No Confirm password: Show lets people check, and the reset is always there.'],
            ['Sign them in, tell them, and sign out everywhere else.', 'Email that the password changed, with a link if it wasn’t them. A new password ends every other session.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“No account with that email.”', 'It tells anyone which emails have accounts.'],
            ['Security questions, or emailing a password.', 'Answers are easy to find out, and an emailed password sits in an inbox.'],
            ['Rules like “one symbol, one capital, one number”.', 'Length matters more; check against common passwords instead.'],
            ['A Confirm password field.', 'Twice the typing, and people still can’t see what they typed.'],
            ['A silent change that leaves old sessions open.', 'If it wasn’t them, nobody knows, and whoever got in stays in.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
