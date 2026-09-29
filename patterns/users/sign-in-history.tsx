import { Section, Demo, Rules, Avoid, Ini, Pill } from '../../site/kit';
import { AdminPage } from '../admin/admin-kit';

// Sign-in history: every sign-in, failed attempt, and lockout, with when and from where. Admins see everyone's; each
// person sees their own in User preferences.

const rows: [string, string, string, string, 'ok' | 'bad' | undefined][] = [
  ['AR', 'Ana Reyes', 'Signed in', 'Chrome, Windows · Cebu office · today 9:02 AM', 'ok'],
  ['RC', 'Ramon Cruz', 'Signed in with two-step', 'Safari, iPhone · Makati · today 7:55 AM', 'ok'],
  ['AR', 'ana@metrolending.ph', '5 failed sign-ins, account locked', 'Unknown device · Singapore · 26 Sep, 11:15 PM', 'bad'],
  ['JL', 'Joel Santos', 'Signed out of 2 devices, deactivated', 'By Carlo · 25 Sep, 5:30 PM', undefined],
];

export default function SignInHistory() {
  return (
    <>
      <Demo wide caption="Administration › Sign-in history. Who signed in, how, from where, and when. Failed attempts and lockouts in red, so an attack stands out.">
        <AdminPage on="Sign-in history" crumb={<b>Sign-in history</b>}>
          <div><p className="m-title">Sign-in history</p><p className="as-meta"><span>Last 90 days</span></p></div>
          <table className="m-tbl">
            <thead><tr><th>Person</th><th>What</th><th>Where and when</th></tr></thead>
            <tbody>{rows.map(([i, n, w, where, tone], k) => <tr key={k}><td><span className="sh-user"><Ini n={i} />{n}</span></td><td><Pill tone={tone}>{w}</Pill></td><td>{where}</td></tr>)}</tbody>
          </table>
        </AdminPage>
      </Demo>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Every sign-in, and every failure.', 'Successes, failed attempts, lockouts, two-step, and sign-outs.'],
            ['When, how, and from where.', 'The browser and device, the rough place, and the time.'],
            ['Failures stand out.', 'Failed attempts and lockouts in red; repeated ones notify the admin.'],
            ['People see their own.', 'User preferences › Signed-in devices shows theirs, with Sign out on each.'],
            ['Kept long enough to investigate.', '90 days on screen; longer in the audit trail.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Logging only successful sign-ins.', 'The attack from Singapore at 11 PM leaves no trace.'],
            ['IP addresses and user agents.', '203.0.113.7, Mozilla/5.0: nobody can tell if it was really Ana.'],
            ['Lockouts nobody hears about.', 'Someone tries every night for a week before anyone notices.'],
            ['History only admins can see.', 'Ana can’t check where her own account is signed in.'],
            ['A week of history.', 'The breach is found a month later, with nothing left to look at.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
