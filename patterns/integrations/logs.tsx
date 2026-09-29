import { Section, Demo, Rules, Avoid, Btn, Pill } from '../../site/kit';
import { AdminPage } from '../admin/admin-kit';
import './integrations.css';

// Integration logs: every call the system made to an outside service, per integration. What was sent, through which
// provider, what came back, and how long it took, so a failed email or payment can be traced.

const rows: [string, string, string, string, 'ok' | 'bad' | undefined, string][] = [
  ['9:14:02 AM', 'Postmark', 'Statement ST-2026-09-0412 to joy.santos@metrofuels.ph', 'Delivered', 'ok', '0.4 s'],
  ['9:14:02 AM', 'Postmark', 'Statement ST-2026-09-0418 to accounts@pacificcartons.ph', 'Bounced: no such address', 'bad', '0.3 s'],
  ['9:05:41 AM', 'Twilio', 'Reminder for INV-1061 to +63 917 ••• 0142 (second provider)', 'Delivered', 'ok', '1.1 s'],
  ['9:05:11 AM', 'Semaphore', 'Reminder for INV-1061 to +63 917 ••• 0142', 'Failed: service unavailable', 'bad', '30 s'],
];

export default function Logs() {
  return (
    <>
      <Demo wide caption="Administration › Integrations › Logs. Every call to an outside service, newest first: when, through which provider, what it was for, what came back, and how long it took. Filter by integration, provider, or result; open a row to see the full exchange.">
        <AdminPage on="Integrations" crumb={<>Integrations <span>/</span> <b>Logs</b></>}>
          <div className="m-row"><div><p className="m-title">Integration logs</p><p className="as-meta"><span>Kept for 90 days</span></p></div><Btn>Export</Btn></div>
          <p className="as-filters"><span className="as-chip">All integrations ▾</span><span className="as-chip">Any provider ▾</span><span className="as-chip">Any result ▾</span><span className="as-chip">Today ▾</span></p>
          <table className="m-tbl ig-logtbl">
            <thead><tr><th>When</th><th>Provider</th><th>What</th><th>Result</th><th className="r">Took</th></tr></thead>
            <tbody>{rows.map(([t, p, w, r, tone, d], i) => <tr key={i}><td>{t}</td><td>{p}</td><td><a className="m-link">{w}</a></td><td><Pill tone={tone}>{r}</Pill></td><td className="r">{d}</td></tr>)}</tbody>
          </table>
        </AdminPage>
      </Demo>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Every call is logged.', 'Each email, text, payment event, and import, with when, which provider, and what came back.'],
            ['Say what it was for.', '“Statement ST-2026-09-0412 to joy.santos@…”, linked to the record, not a request ID.'],
            ['Show the fallback.', 'When a second provider took over, both calls show, one after the other.'],
            ['Filter to what went wrong.', 'By integration, provider, result, and date; Failed only is one click.'],
            ['Hide what’s private.', 'Phone numbers and keys are masked; message bodies only for admins who need them.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Logs only in the provider’s own dashboard.', 'Every provider is a different login, and nobody checks them.'],
            ['Raw JSON as the log.', 'Nobody can tell which customer a failed call was for.'],
            ['Only the last attempt.', 'Nobody can see that Semaphore failed before Twilio sent it.'],
            ['A log you can only scroll.', 'Finding the one bounced statement takes an afternoon.'],
            ['Full numbers and keys in the log.', 'Anyone who can read logs can read every customer’s number, and the keys.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
