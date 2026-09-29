import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Ini } from '../../site/kit';
import { AgentFrame, AgentAva, Line, Source } from '../agents/agent-kit';
import './runs.css';

// Run detail: one run, all of it, on one page. The header answers who, what, when, state, who approved, and cost;
// the sections run top to bottom in the order the work happened: the brief, the inputs, the steps, the output,
// what it changed, and the trail. Related records and the run’s history sit in the side panel, as on any record.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** A step: its time, done (✓), flagged for a person (!), and what happened. */
const steps: [string, true | 'flag', string, string?][] = [
  ['7:40 AM', true, 'Read 36 invoices from 35 suppliers, due by Fri 2 Oct'],
  ['7:41 AM', true, 'Found their 35 POs', 'Mactan Steel Supply’s 2 invoices share PO-4410'],
  ['7:43 AM', true, 'Found 34 delivery receipts in the warehouse log'],
  ['7:52 AM', true, 'Matched 30 invoices cleanly to PO and delivery'],
  ['7:55 AM', true, 'Chose to pay Bohol Diesel Depot, ₱42,000 over PO', 'The new diesel price was agreed by email on 12 Sep'],
  ['7:58 AM', 'flag', 'Held 3 for a person', 'Cebu Paperworks, Luzon Packaging, Island Grains'],
  ['8:02 AM', true, 'Sent the payment run to Ramon Cruz to approve'],
];

export default function RunDetail() {
  return (
    <>
      <Demo wide caption={<>Run #0318 later that morning, after Ramon approved it at 9:42 AM (so the Agents badge is down to 1). The header answers the six questions anyone opening a run has. Below it, one section after another, in the order the work happened: what it was asked, what it read, what it did and when, what it drafted and why, what it changed, and the trail. Every count and record is a link.</>}>
        <AgentFrame on="Agents" as="lead" waiting={1}>
          <div className="as-a-work">
            <div className="as-a-page">
              <p className="as-crumb">Agents <span>/</span> Runs <span>/</span> <b>#0318</b></p>
              <div className="as-a-head">
                <div><p className="m-title">Run #0318 · This week’s payment run</p><p className="as-meta"><Pill tone="ok">Done</Pill><span>Payments go out Tue 29 Sep, 9:00 AM, from BDO ••4471</span></p></div>
                <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Open in chat</Btn><Btn>Undo run…</Btn></span>
              </div>
              <p className="rn-facts">
                <span><small>Agent</small><span className="ag-cell"><AgentAva id="marco" size="sm" />Marco</span></span>
                <span><small>Asked by</small>Ramon Cruz<em>in chat, 7:39 AM</em></span>
                <span><small>Started</small>Today, 7:40 AM</span>
                <span><small>Ready</small>8:02 AM<em>22 minutes</em></span>
                <span><small>Approved by</small>Ramon Cruz<em>9:42 AM</em></span>
                <span><small>AI usage</small>₱38</span>
              </p>

              <div className="rn-sec">
                <p className="m-k">What it was asked</p>
                <div className="rn-brief"><Ini n="RC" /><p><q>Prepare this week’s payment run. Hold anything you’re not sure about.</q><small>Ramon Cruz, in chat with Marco, today 7:39 AM · Instructions saved 21 Sep · Skills used: <a className="m-link">Handling split deliveries</a>, <a className="m-link">Spotting resent invoices</a>, <a className="m-link">Paying Bohol Diesel Depot’s agreed price rises</a></small></p></div>
              </div>

              <div className="rn-sec">
                <p className="m-k">Inputs</p>
                <p className="rn-chips"><a><b>36</b>supplier invoices</a><a><b>35</b>purchase orders</a><a><b>34</b>delivery receipts</a><a><b>1</b>email, 12 Sep</a><a><b>1</b>bank balance, BDO ••4471</a></p>
              </div>

              <div className="rn-sec">
                <p className="m-k">Steps</p>
                <ul className="rn-steps">{steps.map(([t, d, s, sub]) => <li key={t + s} className={d === 'flag' ? 'flag' : 'done'}><time>{t}</time><i>{d === 'flag' ? '!' : '✓'}</i><span>{s}{sub && <small>{sub}</small>}</span></li>)}</ul>
              </div>

              <div className="rn-sec">
                <p className="m-k">Output<a className="m-link">Open the approval card</a></p>
                <div className="ag-card rn-out">
                  <div className="ag-lines">
                    <div><Line name="30 suppliers, matched to PO and delivery" amount="₱39,723,500.00" /></div>
                    <div><Line name="Mactan Steel Supply" amount="₱2,184,500.00" why="Pay. 2 invoices, 1 PO: a split delivery, and both halves arrived." sources={['PO-4410', 'DR-5561']} /></div>
                    <div><Line name="Bohol Diesel Depot" amount="₱6,742,000.00" why="Pay. ₱42,000 over PO, but you agreed the new diesel price by email." sources={['Email, 12 Sep']} /></div>
                  </div>
                  <p className="rn-total"><span>To pay, 32 suppliers</span><span>₱48,650,000.00</span></p>
                  <div className="ag-held">
                    <div><Line held name="Cebu Paperworks" why="Same items and amount as INV-8807, paid Tue 22 Sep. Looks like a resend." sources={['INV-8807']} /></div>
                    <div><Line held name="Luzon Packaging" why="Still over PO. Their corrected invoice hasn’t come in." sources={['INV-2291']} /></div>
                    <div><Line held name="Island Grains" why="Billed in full, but the warehouse hasn’t received the goods." sources={['PO-4452']} /></div>
                  </div>
                </div>
              </div>

              <div className="rn-sec">
                <p className="m-k">What it changed</p>
                <div className="rn-chg">
                  <p><small>Created</small><span><b>Payment batch PB-0318:</b> 32 payments, ₱48,650,000.00, for Tue 29 Sep, 9:00 AM</span><a className="m-link">PB-0318</a></p>
                  <p><small>Updated</small><span><b>Invoices from 32 suppliers:</b> Due → Scheduled for payment</span><a className="m-link">See 32</a></p>
                  <p><small>Drafted</small><span><b>3 held invoices:</b> left out of the run, each with the reason, for Ramon Cruz</span><a className="m-link">See 3</a></p>
                  <p><small>Not yet</small><span className="none">Nothing has been paid. The bank transfer runs from PB-0318 tomorrow.</span><span /></p>
                </div>
              </div>

              <div className="rn-sec">
                <p className="m-k">Trail<a className="m-link">Open in the audit trail</a></p>
                <table className="m-tbl rn-tbl">
                  <tbody>
                    <tr><td>9:42 AM</td><td>Marco created PB-0318, on Ramon’s approval</td><td>From the draft Ramon approved, unchanged</td></tr>
                    <tr><td>9:42 AM</td><td>Ramon Cruz approved, on the confirmation page</td><td>“Pay the 32; keep the 3 held.”</td></tr>
                    <tr><td>9:31 AM</td><td>Ramon Cruz opened the run</td><td>From the Agents badge</td></tr>
                    <tr><td>7:40 AM</td><td>Marco read 36 invoices, 35 POs, 34 receipts</td><td>As Marco’s role: Payables, read only until approved</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="as-a-panel rn-panel">
              <p className="m-k">Related</p>
              <div className="as-rel">
                <p><span>Payment batch</span><a>PB-0318</a></p>
                <p><span>Invoices</span><a>36</a></p>
                <p><span>Held</span><a>3</a></p>
                <p><span>Chat</span><a>Marco</a></p>
                <p><span>Skills used</span><a>3</a></p>
                <p><span>Last week</span><a>#0304</a></p>
              </div>
              <p className="m-k">History</p>
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> approved it<small>Today, 9:42 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> sent it for approval<small>Today, 8:02 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> started it<small>Today, 7:40 AM</small></span></p>
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> asked for it<small>Today, 7:39 AM</small></span></p>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Section title="What each part answers">
        <When head={['Part', 'Answers', 'On run #0318']} rows={[
          ['Header', 'Who did it, what, when, where it stands, who approved, and what it cost', 'Marco · 7:40 to 8:02 AM · Done · Ramon Cruz · ₱38'],
          ['What it was asked', 'Who asked, in their own words, which instructions it read, and which skills it used', 'Ramon’s message; instructions saved 21 Sep; 3 skills'],
          ['Inputs', 'Every record it read, counted, each a link to that list', '36 invoices, 35 POs, 34 delivery receipts, 1 email'],
          ['Steps', 'What it did, in order, with times, and where it stopped for a person', '7 steps; 3 invoices held at 7:58 AM'],
          ['Output', 'What it drafted, line by line, with the reason and sources', '₱48,650,000.00 to 32 suppliers; 3 held'],
          ['What it changed', 'Each record created or updated, as a link, and what hasn’t happened yet', 'PB-0318 created; nothing paid until tomorrow'],
          ['Trail', 'Every read, write, check, and approval, as the audit trail has it', 'Ramon’s approval, and the batch it created'],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption={<>What it changed, as links. Each change opens the record, and each record’s history links back to run #0318. See {link('explaining/history', 'Showing the work › In the history')}.</>}>
          <Win title="Run #0318 · What it changed">
            <div className="rn-chg">
              <p><small>Created</small><span><b>Payment batch PB-0318:</b> 32 payments, ₱48,650,000.00</span><a className="m-link">PB-0318</a></p>
              <p><small>Updated</small><span><b>Invoices from 32 suppliers:</b> Scheduled for payment</span><a className="m-link">See 32</a></p>
              <p><small>Updated</small><span><b>3 held invoices:</b> Held, assigned to Ramon Cruz</span><a className="m-link">See 3</a></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption={<>A run page that’s just the chat transcript. The facts are in a paragraph, the changes have no links, and nobody can tell which invoices were touched, or what it cost.</>}>
          <Win title="Run #0318">
            <p className="rn-para">Marco: I’ve prepared the payment run. I went through the invoices and matched most of them, paid a couple that needed a judgment call, and held a few I wasn’t sure about. I’ve updated the invoices and set up the payments for tomorrow morning. Let me know if you need anything else!</p>
            <p><Source>Chat log</Source></p>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Answer the six questions in the header.', 'The Agent, the task, when it started and was ready, its state, who approved, and what it cost.'],
            ['Start from the brief.', 'Who asked, in their own words, with the instructions and skills it used.'],
            ['Count the inputs, as links.', '36 invoices, 35 POs, 34 delivery receipts: each opens that list, filtered to this run.'],
            ['Show the steps and the output.', 'Each step with its time, and each line of the output with its reason and sources.'],
            ['List every change, and keep the trail.', 'Each record created or updated, as a link, and what hasn’t happened yet.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A run page that starts with a log.', 'People scroll through 200 lines to find out whether it was approved, and by whom.'],
            ['Losing the brief.', 'A month later, nobody knows whether Marco was told to hold anything, or who asked.'],
            ['“Read your invoices.”', 'Nobody can tell whether it saw all 36, or which receipt it used for Mactan Steel.'],
            ['A result with no reasons.', 'Ramon sees ₱6,742,000.00 to Bohol Diesel Depot, and not why it’s over the PO.'],
            ['Changes in a sentence.', '“I’ve updated the invoices” can’t be opened, checked, or undone.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
