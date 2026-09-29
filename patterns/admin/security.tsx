import type { ReactNode } from 'react';
import { Section, Demo, Rules, Avoid, When, Btn, Pill, Field } from '../../site/kit';
import { AdminPage } from './admin-kit';
import { Frame } from '../shell/shell-kit';
import { ConfirmPage } from '../records/confirm-kit';
import { AuthScreen, Head, Full, Notice, Alt } from '../auth/auth-kit';
import '../records/foundations.css';
import '../shell/shell.css';

// Security: the sign-in and session rules for everyone, in Administration › Security. Every rule ships at a safe
// default, marked as such. Weakening one goes through a confirmation page; tightening one gives people time.

type Rule = [string, ReactNode, string, string?];

const sections: [string, Rule[]][] = [
  ['Sessions', [
    ['Sign out after', '30 minutes away', 'Warned 2 minutes before; unsaved work is kept'],
    ['Longest session', '12 hours', 'Even with Keep me signed in, they sign in again each day'],
  ]],
  ['Passwords', [
    ['Length', '12 or more characters', 'No rules about symbols or capitals'],
    ['Common and breached passwords', 'Not allowed', 'Checked when a password is set'],
    ['Lock out', 'After 5 failed sign-ins, for 15 minutes', 'Admins are told after repeated lockouts'],
  ]],
  ['Sign-in methods', [
    ['Email and password', 'On', 'Always on for admins, so they can’t be locked out with Microsoft'],
    ['Microsoft', 'On, for @metrolending.ph', 'Metro Lending’s staff already use Microsoft 365', 'Changed by Carlo, 3 Aug'],
    ['Google', 'Off', 'Turn on only if staff already use it'],
  ]],
];

function Rows({ title, rules, change = 'Change' }: { title: string; rules: Rule[]; change?: string }) {
  return (
    <div className="sc-sec">
      <div className="sc-head"><p className="m-k">{title}</p><a className="m-link">{change}</a></div>
      {rules.map(([k, v, hint, by]) => (
        <p key={k} className="sc-row"><b>{k}</b><span><strong>{v}</strong><small>{hint}</small></span>{by ? <em>{by}</em> : <Pill tone="ok">Default</Pill>}</p>
      ))}
    </div>
  );
}

export default function Security() {
  return (
    <>
      <Demo wide caption="Administration › Security. Every sign-in and session rule on one page, each with its current value and a line on what it means. Rules still at their safe default say Default; a changed one says who changed it and when. Two-step sign-in has its own page; Sign out everyone is here for a leaked password.">
        <AdminPage on="Security" crumb={<b>Security</b>}>
          <div><p className="m-title">Security</p><p className="as-meta"><span>Sign-in and session rules for everyone at Metro Lending. Changed by Carlo, 3 Aug.</span></p></div>
          {sections.map(([t, r]) => <Rows key={t} title={t} rules={r} />)}
          <Rows title="Two-step sign-in" change="Manage" rules={[['Required for', 'Finance, Branch manager, Admin', '1 person still to set it up, 3 days left']]} />
          <div className="sc-sec">
            <div className="sc-head"><p className="m-k">Signed in now</p></div>
            <p className="sc-row"><b>Sign out everyone</b><span><strong>31 people, on 44 devices</strong><small>Everyone but you signs in again; drafts are kept</small></span><Btn>Sign out everyone…</Btn></p>
          </div>
        </AdminPage>
      </Demo>

      <p className="g-see">Which roles need two-step, and each person’s state: <a className="m-link" href="#/management/auth/two-factor">Authentication › Two-step sign-in</a>.</p>

      <Demo wide caption="Weakening a rule: sign out after 2 hours away, not 30 minutes. Change, then Save, opens this page instead of saving. It says who is affected and what gets riskier, in red, asks for a reason, and logs the change in the audit trail with Carlo’s name.">
        <Frame as="admin" on="">
          <div className="sc-weak">
            <ConfirmPage crumb={['Administration', 'Security', 'Sessions']} title="Sign people out after 2 hours away?" meta="Now 30 minutes, the safe default · Changes Sessions for everyone"
              facts={[['Affects', '48 people'], ['From', 'Their next sign-in'], ['Default', '30 minutes']]}
              what={[
                <><b>Weaker than the safe default.</b> A computer left open at a branch counter stays signed in for 2 hours.</>,
                <><b>All 48 people get it,</b> every role, at every branch, from their next sign-in.</>,
                <><b>Logged in the audit trail,</b> with your name and reason, and the other admins are emailed.</>,
                <><b>Put back any time</b> with Use default, on the Security page.</>,
              ]}
              reason="Cebu counter staff sign in again between most customers"
              back="Back to Security" action="Sign out after 2 hours" />
          </div>
        </Frame>
      </Demo>

      <Demo wide verdict="do" caption={<><b>Tighten with time to catch up.</b> Carlo raises the length to 14 characters. The 23 people whose passwords are shorter are emailed today, and have until 12 Oct to change them; after that, they’re asked at sign-in.</>}>
        <AdminPage on="Security" crumb={<>Security <span>/</span> <b>Passwords</b></>}>
          <p className="sc-note"><b>Saved. 23 people must choose a longer password by Mon, 12 Oct.</b> They’ve been emailed, and see a reminder each time they sign in until then.</p>
          <Rows title="Passwords" rules={[
            ['Length', '14 or more characters', 'Tightened from 12. Grace period: 14 days', 'Changed by Carlo, today'],
            ['Common and breached passwords', 'Not allowed', 'Checked when a password is set'],
          ]} />
        </AdminPage>
      </Demo>
      <Demo wide verdict="avoid" caption={<><b>Tighten overnight.</b> The new rule applies at once. On Monday morning, 23 people can’t sign in, and all of them call Carlo.</>}>
        <AuthScreen small>
          <Head title="Sign in" sub="to Metro Lending’s Loans OS" />
          <Notice>Your password no longer meets the security policy. Contact your administrator.</Notice>
          <Field label="Email" value="ana@metrolending.ph" />
          <Full pri>Sign in</Full>
          <Alt>Forgot password?</Alt>
        </AuthScreen>
      </Demo>

      <Section title="What each change needs">
        <When head={['Change', 'Examples', 'What happens']} rows={[
          ['Weakens a rule', 'Longer time away, shorter passwords, more tries, breached check off, two-step off for a role', 'A confirmation page with who’s affected and a reason; logged, and the other admins are emailed'],
          ['Tightens a rule', 'Shorter time away, longer passwords, two-step for a new role', 'Saved with a grace period; the people affected are emailed and reminded at sign-in; logged'],
          ['Back to the default', 'Use default, on any changed rule', 'Saved straight away; logged'],
          ['Sign out everyone', 'After a leaked password, or someone leaving', 'A confirmation page with how many people and devices; logged'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Ship safe defaults, and mark them.', 'Every rule starts at its safe value, marked Default; a changed one says who changed it, and when.'],
            ['Weakening goes through a confirmation page.', 'Who’s affected, what gets riskier, a reason, and a line in the audit trail.'],
            ['Tightening gives people time.', 'A grace period, an email today, and a reminder at each sign-in until it ends.'],
            ['Every sign-in rule on one page.', 'Sessions, passwords, lockout, sign-in methods, and two-step, side by side.'],
            ['Sign out everyone, in one place.', 'For a leaked password: confirmed, logged, and nobody loses their draft.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Rules with no default shown.', 'Nobody can tell whether 8 hours was chosen, or just never changed.'],
            ['A switch that weakens a rule on click.', 'The breached-password check goes off, and nobody knows who, or why.'],
            ['New rules that apply at once.', '23 people are locked out on Monday morning.'],
            ['Rules scattered across screens.', 'The admin tightens passwords, and never sees the lockout is off.'],
            ['No way to end every session.', 'After a leak, old sessions stay open until they time out.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
