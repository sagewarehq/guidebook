import { Section, Demo, Rules, Avoid, Btn, Pill } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { ConfirmPage } from '../records/confirm-kit';
import '../records/foundations.css';
import './artifacts.css';

// Generating in batches: many documents at once, such as September statements for every customer. A confirmation page
// says how many and who's skipped; a background job makes them; a summary says what happened to each.

export default function Batches() {
  return (
    <>
      <Demo wide caption="Generate statements, from Customers, opens a confirmation page: how many will be made, who’s skipped and why, and whether they’re emailed. It runs as a background job, and shows in Jobs while it does.">
        <Frame on="Customers">
          <ConfirmPage crumb={['Customers', 'Generate statements']} title="Generate August statements?" meta="1 to 31 Aug 2026 · all customers in Cebu with a balance"
            facts={[['Statements', '1,188'], ['Emailed', '1,184'], ['Ready in', 'About 6 minutes']]}
            what={[
              <><b>1,188 statements are made,</b> one per customer with a balance, and saved to each customer’s Documents.</>,
              <><b>1,184 are emailed</b> to each customer’s billing contact, with the August message.</>,
              <><b>4 are saved but not emailed:</b> those customers have no billing email. <a className="m-link">See the 4</a></>,
              <><b>12 customers are skipped:</b> they have no balance, so they get no statement.</>,
            ]}
            back="Back to customers" action="Generate 1,188 statements" danger={false} />
        </Frame>
      </Demo>

      <Demo wide caption="When it’s done: a summary, in Jobs and linked from the notification. What was made and sent, what wasn’t and why, and the fix for each.">
        <Frame on="Customers">
          <div className="as-a-page">
            <p className="as-crumb">Customers <span>/</span> <b>August statements</b></p>
            <div className="as-a-head"><div><p className="m-title">August statements</p><p className="as-meta"><span>Run by Ana · 1 Sep 2026, 8:02 to 8:08 AM</span></p></div><span className="as-acts"><Btn>Download all as ZIP</Btn></span></div>
            <p className="cf-facts bt-facts"><span><small>Made</small>1,188</span><span><small>Emailed</small>1,184</span><span><small>Bounced</small>3</span></p>
            <table className="m-tbl bt-tbl">
              <thead><tr><th>Customer</th><th>Statement</th><th>What happened</th><th /></tr></thead>
              <tbody>
                <tr><td>Metro Fuels</td><td>ST-2026-08-0731</td><td><Pill tone="bad">Bounced</Pill> <small>Address no longer exists</small></td><td className="r"><a className="m-link">Fix the contact</a></td></tr>
                <tr><td>Pacific Cartons</td><td>ST-2026-08-0802</td><td><Pill tone="ok">Opened</Pill></td><td className="r"><a className="m-link">Open</a></td></tr>
                <tr><td>Abad Trucking</td><td>ST-2026-08-0002</td><td><Pill>Not emailed</Pill> <small>No billing email</small></td><td className="r"><a className="m-link">Add an email</a></td></tr>
                <tr className="dc-more"><td colSpan={4}>…and 1,185 more</td></tr>
              </tbody>
            </table>
          </div>
        </Frame>
      </Demo>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Confirm the count, and who’s skipped.', 'How many will be made, how many emailed, and who’s left out and why, before it starts.'],
            ['Always a background job.', 'It shows in Jobs with progress while people keep working, and its summary stays there.'],
            ['Each document lands on its record.', 'Every statement is saved to its customer’s Documents, like one made by hand.'],
            ['Summarise what happened to each.', 'Made, emailed, bounced, skipped, with the fix beside each problem.'],
            ['Schedule the ones that repeat.', 'Monthly statements run on the 1st, set once in Administration › Schedules.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Generate all, with no count.', 'People don’t know they’re about to email 1,184 customers.'],
            ['Making 1,188 PDFs while people wait.', 'The page freezes for six minutes, and they click again.'],
            ['One big PDF of every statement.', 'Nobody can find, resend, or check one customer’s statement.'],
            ['“Batch complete.”', 'The 3 bounces and 4 missing emails are never followed up.'],
            ['Someone remembering on the 1st.', 'The month they’re on leave, no statements go out.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
