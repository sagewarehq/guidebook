import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Ini, Toast } from '../../site/kit';
import { ConfirmPage } from '../records/confirm-kit';
import { AgentFrame, Source, Reason } from '../agents/agent-kit';
import type { RunRowData } from '../agents/agent-kit';
import './runs.css';

// Undoing a run: Undo run… on the run’s page opens a confirmation page that lists what will be reversed, what
// can’t be (emails already sent), and what people have changed since, which is left alone. The run stays, marked
// Undone, and every record’s history shows both the change and its undoing.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** A narrow runs table, for side-by-side demos: run, task, state, and result. */
const tone = { 'Waiting on you': undefined, Running: undefined, Done: 'ok', 'Partly done': 'bad', Failed: 'bad', Undone: 'off' } as const;
const MiniRuns = ({ rows }: { rows: RunRowData[] }) => (
  <table className="m-tbl rn-tbl rn-mini">
    <thead><tr><th>Run</th><th>Task</th><th>State</th></tr></thead>
    <tbody>{rows.map(r => <tr key={r.no}><td><a className="m-link">{r.no}</a></td><td>{r.task}<small>{r.result}</small></td><td><Pill tone={tone[r.state]}>{r.state}</Pill></td></tr>)}</tbody>
  </table>
);

export default function UndoRun() {
  return (
    <>
      <Demo wide caption={<>On Friday, Marco matched 212 bank lines to customer invoices and emailed the receipts. This morning BDO sent a corrected statement for those days, so Ramon opens run #0317 and chooses Undo run…. The confirmation page counts what will be reversed, marks in red what can’t be, and leaves alone the 2 invoices Ana has changed since.</>}>
        <AgentFrame on="Agents" as="lead" waiting={1}>
          <div className="rn-undo">
            <ConfirmPage
              crumb={['Agents', 'Runs', '#0317', 'Undo']}
              title="Undo run #0317?"
              meta="Marco matched 212 bank lines to invoices, 21–25 Sep · approved by Ramon Cruz, Fri 25 Sep"
              facts={[['Matches removed', '210 of 212'], ['Open again', '₱18,238,450.00'], ['Can’t be undone', '37 receipts']]}
              what={[
                <><b>210 matches are removed.</b> The bank lines go back to Unmatched, ready to match against the corrected statement.</>,
                <><b>210 invoices get their balances back</b>: ₱18,238,450.00 is open again, and 31 invoices marked Paid go back to Due or Overdue.</>,
                <><b>2 invoices are left as they are</b>, because Ana recorded payments on them this morning: INV-1052 and INV-1066. They’re listed on the run for you to check.</>,
                <span className="rn-cant"><b>37 receipts already emailed to customers can’t be unsent.</b> After the undo, the run offers to draft a correction for each; nothing goes out until you approve.</span>,
                <><b>Nothing is deleted.</b> Run #0317 stays, marked Undone, and each invoice’s history shows the match and its undoing.</>,
              ]}
              reason="BDO sent a corrected statement for 21–25 Sep. These were matched against the first file."
              back="Keep the run"
              action="Undo 210 matches"
            />
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>Afterwards, the run is still there, marked Undone, with who undid it, when, and why. What it changed now reads as what was reversed, what was kept, and what couldn’t be, each a link, with the next step for the receipts.</>}>
        <AgentFrame on="Agents" as="lead" waiting={1}>
          <div className="as-a-page">
            <p className="as-crumb">Agents <span>/</span> Runs <span>/</span> <b>#0317</b></p>
            <div className="as-a-head">
              <div><p className="m-title">Run #0317 · Match bank lines to invoices, 21–25 Sep</p><p className="as-meta"><Pill tone="off">Undone</Pill><span>Marco · approved by Ramon Cruz, Fri 25 Sep</span></p></div>
              <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Open in chat</Btn></span>
            </div>
            <p className="rn-banner"><span><b>Undone by Ramon Cruz, today 9:05 AM.</b> “BDO sent a corrected statement for 21–25 Sep. These were matched against the first file.”</span></p>
            <div className="rn-sec">
              <p className="m-k">What it changed, and what happened to it</p>
              <div className="rn-chg">
                <p><small>Reversed</small><span><b>210 matches removed:</b> the bank lines are Unmatched, and ₱18,238,450.00 is open again</span><a className="m-link">See 210</a></p>
                <p><small>Kept</small><span><b>2 matches left in place:</b> Ana recorded payments on INV-1052 and INV-1066 since</span><a className="m-link">Check 2</a></p>
                <p><small>Not undone</small><span><b>37 receipts emailed to customers</b> on Fri 25 Sep</span><Btn>Draft 37 corrections…</Btn></p>
              </div>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>On the invoice, the history keeps both: Marco’s match and receipt, and Ramon’s undo, each linked to run #0317. The receipt is still there, because it was sent. See {link('explaining/history', 'Showing the work › In the history')}.</>}>
          <Win title="INV-1047 · Pacific Cartons · History">
            <div className="rn-notes">
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> undid run #0317: balance back to ₱318,000<small>Today, 9:05 AM · <Reason>Corrected BDO statement.</Reason> <Source>Run #0317</Source></small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> emailed receipt OR-5518 to Pacific Cartons<small>Fri 25 Sep · <Source>Run #0317</Source></small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> matched a BDO line of 24 Sep, ₱318,000<small>Fri 25 Sep · <Source>Run #0317</Source></small></span></p>
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> created it<small>13 Aug</small></span></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Undo that deletes the run. The matches vanish with no trace, Ana’s payments on INV-1052 and INV-1066 go with them, and 37 customers hold receipts for payments the system no longer shows.">
          <Win title="Agents / Runs">
            <MiniRuns rows={[
              { no: '#0319', agent: 'marco', task: 'Reminders for overdue invoices in Cebu', started: 'Today, 9:15 AM', state: 'Waiting on you', result: '6 reminders drafted' },
              { no: '#0318', agent: 'marco', task: 'This week’s payment run', started: 'Today, 7:40 AM', state: 'Waiting on you', result: '₱48.65M to 32 suppliers, 3 held' },
              { no: '#0316', agent: 'nico', task: 'September collections report', started: 'Fri 25 Sep', state: 'Done', result: 'Sent to leadership', by: 'Ramon Cruz' },
            ]} />
            <div className="rn-toast"><Toast action="Close">Run #0317 deleted. All changes reverted.</Toast></div>
          </Win>
        </Demo>
      </Pair>

      <Section title="What Undo does to each kind of change">
        <When head={['What the run did', 'What Undo does']} rows={[
          ['Created a record: a payment batch, a draft, a note', 'Voids or archives it, never deletes it. Its number stays taken.'],
          ['Changed a field: a status, a balance, an assignee', 'Sets it back to the value before, unless a person has changed it since: then it’s left, and listed.'],
          ['Matched or linked records', 'Removes the match. Both records go back to unmatched.'],
          ['Sent an email, SMS, or document', 'Can’t unsend it. Lists what went to whom, and offers to draft a correction for approval.'],
          ['Paid money out of the bank', 'Can’t undo it here. A refund or a recall is its own action, with its own confirmation page.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Undo the whole run, from its page.', 'Undo run… on the run opens a confirmation page, and one button reverses everything it can.'],
            ['Count what will be reversed.', '210 matches removed, ₱18,238,450.00 open again, 31 invoices back to Due or Overdue.'],
            ['Say what can’t be undone.', '37 receipts already emailed, marked in red, with a way to send corrections.'],
            ['Leave later changes alone.', 'Anything a person changed since the run is kept, and listed for someone to check.'],
            ['Keep the trail.', 'The run stays, marked Undone, with who, when, and why, and each record’s history shows both.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Undoing record by record.', 'Ramon unmatches 212 invoices one at a time, and misses a few.'],
            ['“Undo all changes?” and nothing else.', 'Ramon can’t tell whether it touches 12 invoices or 1,200, or any money.'],
            ['Pretending it’s all undone.', '37 customers have receipts for payments the system no longer shows, and nobody tells them.'],
            ['Overwriting people’s work.', 'Ana’s payments recorded this morning disappear with Marco’s matches.'],
            ['Deleting the run.', 'A month later, nobody can say why 210 balances moved twice in one week.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
