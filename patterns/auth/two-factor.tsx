import { Section, Demo, Pair, Rules, Avoid, When, Btn, Pill, Ini } from '../../site/kit';
import { AuthScreen, Head, Full, Row, Code, Alt } from './auth-kit';
import { AdminPage } from '../admin/admin-kit';
import '../shell/shell.css';
import { cx } from '../../lib/cx';

// Two-step sign-in, both sides: what people see (set it up once, then a six-digit code at sign-in, with recovery
// codes for a lost phone), and the admin's side (which roles must use it, who has, and a reset for a lost phone).

const people: [string, string, string, string, 'ok' | 'bad' | 'off' | undefined][] = [
  ['RC', 'Ramon Cruz', 'Finance · required', 'On, authenticator app', 'ok'],
  ['LT', 'Liza Tan', 'Branch manager · required', 'On, authenticator app', 'ok'],
  ['DI', 'Dina Flores', 'Finance · required', 'Not set up: 3 days left', 'bad'],
  ['AR', 'Ana Reyes', 'Collections · optional', 'Off', 'off'],
];

const qr = '111101111100101001101111101000000000111010111010101010000000001111101011100101010111101111101'.slice(0, 81);

export default function TwoFactor() {
  return (
    <>
      <Pair>
        <Demo caption={<><b>Enter your code.</b> Six boxes that fill as they type or paste, and submit on the sixth digit.</>}>
          <AuthScreen small>
            <Head title="Enter your code" sub="From your authenticator app." />
            <Code digits="481" />
            <Row check="Trust this computer for 30 days" />
            <Full pri>Verify</Full>
            <Alt>Lost your phone? <a>Use a recovery code</a></Alt>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>Set it up.</b> Once, after signing in, when the role needs it. Scan, then type a code to prove it works.</>}>
          <AuthScreen small>
            <Head title="Turn on two-step sign-in" sub="Finance roles need it. Scan this with Google Authenticator or Microsoft Authenticator." />
            <p className="ah-qr">{qr.split('').map((c, i) => <i key={i} className={cx(c === '0' && 'o')} />)}</p>
            <Code digits="" />
            <Full pri>Turn on</Full>
          </AuthScreen>
        </Demo>
        <Demo caption={<><b>Recovery codes.</b> Shown once, straight after setup, with ways to keep them.</>}>
          <AuthScreen small>
            <Head title="Save your recovery codes" sub="Each works once, if you lose your phone. We won’t show them again." />
            <p className="ah-keys"><span>7KQ4-2M9X</span><span>P3VD-8H2L</span><span>Z6TN-4R7C</span><span>B9WF-1J5S</span><span>M2XE-6Q8A</span><span>H4YK-3D9P</span></p>
            <Row link="Download" check="I’ve saved them" on />
            <Full pri>Done</Full>
          </AuthScreen>
        </Demo>
      </Pair>

      <Section title="Who must use it">
        <When head={['Role', 'Two-step', 'Why']} rows={[
          ['Admin', 'Required', 'They can change anyone’s access'],
          ['Anyone who approves or moves money', 'Required', 'Finance, branch managers, and approvers'],
          ['Everyone else', 'Optional, encouraged', 'Collections, report viewers'],
          ['Agents', 'Not a person: their own keys, rotated', 'See Agents in the Agentic edition'],
        ]} />
      </Section>

      <Demo wide caption="The admin’s side, in Administration › Security › Two-step sign-in. Which roles must use it, and each person’s state. Anyone required who hasn’t set it up is in red, with the days left before they must; Reset is there for a lost phone.">
        <AdminPage on="Security" crumb={<>Security <span>/</span> <b>Two-step sign-in</b></>}>
          <div><p className="m-title">Two-step sign-in</p><p className="as-meta"><span>A code from an app, on top of the password</span></p></div>
          <p className="tf-roles"><b>Required for</b><span>Finance ×</span><span>Branch manager ×</span><span>Admin ×</span><span className="add">+ Add a role</span></p>
          <table className="m-tbl">
            <thead><tr><th>Person</th><th>Role</th><th>Two-step</th><th /></tr></thead>
            <tbody>{people.map(([i, n, r, st, tone]) => <tr key={n}><td><span className="sh-user"><Ini n={i} />{n}</span></td><td>{r}</td><td><Pill tone={tone}>{st}</Pill></td><td className="r">{tone === 'ok' ? <Btn kind="quiet">Reset</Btn> : tone === 'bad' ? <Btn kind="quiet">Remind</Btn> : null}</td></tr>)}</tbody>
          </table>
        </AdminPage>
      </Demo>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Required by role, with a grace period.', 'Pick the roles that must use it; everyone in them does. Newly required people get a few days, counted down, and admins see everyone’s state in one list.'],
            ['An authenticator app, not SMS.', 'Codes by text can be intercepted. Offer SMS only if the client insists, and never for admins.'],
            ['Six boxes that act as one field.', 'Accept a paste, and submit on the last digit. autocomplete="one-time-code" lets phones fill it.'],
            ['Recovery codes, and a reset for a lost phone.', 'Codes are shown once, right after setup. An admin’s Reset makes them set it up again at their next sign-in, and emails them that it happened.'],
            ['Trust a computer for 30 days, if the client agrees.', 'Unticked by default. Signing out everywhere ends it.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Two-step switched on person by person, or overnight.', 'The new finance hire slips through, or everyone in Finance is locked out on Monday morning.'],
            ['SMS codes for admins.', 'A swapped SIM gives someone the keys to everyone’s access.'],
            ['A code field that won’t take a paste.', 'People copy the code, then have to type it digit by digit.'],
            ['Turning it off to help someone in.', 'A lost phone becomes a role without two-step, for good.'],
            ['A code at every sign-in, on the same computer.', 'People tire of it, and ask for it to be turned off.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
