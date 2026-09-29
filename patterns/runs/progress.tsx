import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Ini, Toast } from '../../site/kit';
import { ConfirmPage } from '../records/confirm-kit';
import { AgentFrame, AgentAva, ChatPanel, Day, Me, Msg, Steps, Source } from '../agents/agent-kit';
import './runs.css';

// Long runs: work that takes more than a minute or two runs in the background. Its page shows the steps, the one
// it’s on, counts, and about how long is left; it sits in Jobs beside exports and imports; a notification says
// when it’s done. Cancel stops it and keeps what it finished.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** Run #0320 at 10:21 AM: its steps, done (✓), under way (▸), or still to come (○). */
const steps: [string, 'done' | 'now' | 'next', string, string?][] = [
  ['10:04 AM', 'done', 'Read 1,200 supplier invoices, 1 Jul to 30 Sep'],
  ['10:07 AM', 'done', 'Found the PO for each of the 1,200'],
  ['Now', 'now', 'Matching each invoice to its PO and delivery receipt', '742 of 1,200 · 731 matched · 9 held · 2 couldn’t be fetched, to retry at the end'],
  ['', 'next', 'Retry anything it couldn’t fetch'],
  ['', 'next', 'Write up what’s held, and why'],
];

/** The progress block: the bar, the count, the time left, and the tallies so far. */
const Progress = () => (
  <div className="rn-prog">
    <p className="rn-prog-h"><b>742 of 1,200 invoices</b><span>About 12 minutes left</span></p>
    <span className="rn-bar"><i style={{ width: '62%' }} /></span>
    <p className="rn-tally"><span className="ok"><b>731</b> matched</span><span className="bad"><b>9</b> held</span><span className="bad"><b>2</b> couldn’t be fetched</span><span><b>458</b> to go</span></p>
    <p className="rn-bg">Runs in the background. Leave this page if you like: we’ll notify you when it’s done.</p>
  </div>
);

export default function LongRuns() {
  return (
    <>
      <Demo wide caption={<>Run #0320, 17 minutes in. Ramon asked Marco to match every Q3 supplier invoice: 1,200 of them. The page shows the steps, which one it’s on, the counts so far, and about how long is left. It runs in the background, so the Jobs badge counts it. Cancel run… opens a confirmation page.</>}>
        <AgentFrame on="Agents" as="lead" waiting={1}>
          <div className="as-a-work">
            <div className="as-a-page">
              <p className="as-crumb">Agents <span>/</span> Runs <span>/</span> <b>#0320</b></p>
              <div className="as-a-head">
                <div><p className="m-title">Run #0320 · Match Q3 supplier invoices</p><p className="as-meta"><Pill>Running</Pill><span>Marco · asked by Ramon Cruz · started today, 10:04 AM</span></p></div>
                <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Open in chat</Btn><Btn>Cancel run…</Btn></span>
              </div>
              <Progress />
              <div className="rn-sec">
                <p className="m-k">Steps</p>
                <ul className="rn-steps">{steps.map(([t, s, text, sub]) => <li key={text} className={s === 'done' ? 'done' : s}><time>{t}</time><i>{s === 'done' ? '✓' : s === 'now' ? '▸' : '○'}</i><span>{text}{sub && <small>{sub}</small>}</span></li>)}</ul>
              </div>
              <div className="rn-sec">
                <p className="m-k">What it was asked</p>
                <div className="rn-brief"><Ini n="RC" /><p><q>Match every Q3 supplier invoice to its PO and delivery receipt. Hold anything that doesn’t add up.</q><small>Ramon Cruz, in chat with Marco, today 10:02 AM · Skills used: <a className="m-link">Handling split deliveries</a>, <a className="m-link">Spotting resent invoices</a></small></p></div>
              </div>
            </div>
            <div className="as-a-panel rn-panel">
              <p className="m-k">Related</p>
              <div className="as-rel"><p><span>Invoices</span><a>1,200</a></p><p><span>Chat</span><a>Marco</a></p><p><span>In Jobs</span><a>Open</a></p></div>
              <p className="m-k">History</p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> started it<small>Today, 10:04 AM</small></span></p>
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> asked for it<small>Today, 10:02 AM</small></span></p>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>The same run in Jobs, beside Ramon’s export and snapshot. It’s the 1 on the Jobs badge while it runs, with the same count and time left, and Open run takes him to its page. See <a className="m-link" href="#/management/jobs/page">System jobs › Jobs page</a>.</>}>
        <AgentFrame on="" as="lead" waiting={1}>
          <div className="as-a-page">
            <p className="as-crumb"><b>Jobs</b></p>
            <div className="as-a-head"><div><p className="m-title">Jobs</p><p className="as-meta"><span>Your background work, your Agents’ runs included. Files are kept for 7 days.</span></p></div></div>
            <table className="m-tbl rn-jobs">
              <thead><tr><th>Job</th><th>Started</th><th>State</th><th className="r">Result</th></tr></thead>
              <tbody>
                <tr><td><span className="ag-cell"><AgentAva id="marco" size="sm" />Run #0320: match Q3 supplier invoices</span><small>Marco, for Ramon Cruz · 1,200 invoices</small></td><td>Today, 10:04 AM</td><td><span className="rn-bar sm"><i style={{ width: '62%' }} /></span>742 of 1,200<small>About 12 minutes left</small></td><td className="r"><a className="m-link">Open run</a></td></tr>
                <tr><td>Export payments, 9,640 rows<small>All branches · year 2026</small></td><td>Today, 9:05 AM</td><td><Pill tone="ok">Done</Pill></td><td className="r"><a className="m-link">Download</a><small>XLSX · until 5 Oct</small></td></tr>
                <tr><td>Snapshot: before payment run #0318<small>2.3 GB</small></td><td>Today, 9:02 AM</td><td><Pill tone="ok">Done</Pill></td><td className="r"><a className="m-link">Open</a></td></tr>
              </tbody>
            </table>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="In the chat, a progress card that links to the run. Marco carries on in the background, and Ramon asks him something else in the meantime.">
          <div className="rn-chat">
            <ChatPanel agent="marco" status="Running · run #0320">
              <Day label="Today" />
              <Me>Match every Q3 supplier invoice to its PO and delivery receipt. Hold anything that doesn’t add up.</Me>
              <Steps items={[[true, 'Read 1,200 supplier invoices, 1 Jul to 30 Sep'], [true, 'Found the PO for each'], [false, 'Matching each to its PO and delivery receipt']]} />
              <div className="rn-card">
                <b>Run #0320 · 742 of 1,200</b>
                <span className="rn-bar"><i style={{ width: '62%' }} /></span>
                <p className="rn-tally"><span className="ok"><b>731</b> matched</span><span className="bad"><b>9</b> held</span><span>About 12 min left</span></p>
                <a className="m-link">Open run</a>
              </div>
              <Me>Meanwhile, what are we paying Mactan Steel this week?</Me>
              <Msg>₱2,184,500.00, in payment run #0318, going out tomorrow at 9:00 AM. <Source>PB-0318</Source></Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption="A spinner that holds the chat hostage. No steps, no count, no time left, so a slow run and a stuck one look the same, and Ramon can’t ask anything else until it’s over.">
          <div className="rn-chat rn-off">
            <ChatPanel agent="marco" status="Working…" composer="Wait for Marco to finish…">
              <Day label="Today" />
              <Me>Match every Q3 supplier invoice to its PO and delivery receipt. Hold anything that doesn’t add up.</Me>
              <Msg><span className="rn-spin"><i />Marco is working on it. Please don’t close this window.</span></Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption={<>When it’s done, a notification with the result in counts, linking to the run, wherever Ramon is. This one is partly done: see {link('runs/partial', 'Runs that half-work')}.</>}>
          <Win title="Notifications">
            <div className="rn-notes">
              <p className="as-h new"><Ini n="MA" agent /><span><b>Marco</b> finished run #0320: 1,180 matched, 14 held, 6 couldn’t be fetched<small>Today, 10:38 AM · <Source>Run #0320</Source></small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> needs you: 6 reminders ready to send<small>Today, 9:20 AM · <Source>Run #0319</Source></small></span></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="A toast that only shows if Ramon is still on the page, and says nothing about the result. He’s moved on to the loans list, so he never sees it.">
          <Win title="Run #0320">
            <div className="rn-toast"><Toast>Task complete.</Toast></div>
          </Win>
        </Demo>
      </Pair>

      <Demo wide caption="Cancel run… opens a confirmation page. It says exactly what stops, what’s kept, and what’s left, and the run ends as Partly done, never as if it hadn’t happened.">
        <AgentFrame on="Agents" as="lead" waiting={1}>
          <ConfirmPage
            crumb={['Agents', 'Runs', '#0320', 'Cancel']}
            title="Cancel run #0320?"
            meta="Marco is matching Q3 supplier invoices · started today, 10:04 AM"
            facts={[['Done so far', '742 of 1,200'], ['Still to do', '458'], ['Time left', 'About 12 min']]}
            what={[
              <><b>Marco stops after the invoice he’s on.</b> Nothing new starts.</>,
              <><b>The 731 matches are kept</b>, and the 9 held stay held, each with its reason.</>,
              <><b>The other 460 invoices are left as they were</b>: the 458 not started, and the 2 it couldn’t fetch. You can start a new run for just those.</>,
              <><b>The run ends as Partly done</b>, in the runs list and in Jobs, with what it finished.</>,
            ]}
            back="Keep running"
            action="Cancel run"
            danger={false}
          />
        </AgentFrame>
      </Demo>

      <Section title="How long it runs, and what people see">
        <When head={['How long', 'Example', 'What people see']} rows={[
          ['Seconds', 'Nico answers “Why did Baguio collections drop?”', 'The steps appear in the chat as they happen, then the answer.'],
          ['A few minutes', 'Marco prepares this week’s payment run', 'Steps in the chat, then the approval card. No page of its own needed while it runs.'],
          ['Longer than a few minutes', 'Marco matches 1,200 Q3 invoices', 'Runs in the background: progress on the run page and in the chat card, listed in Jobs with the badge, and a notification when it’s done.'],
          ['Overnight, or on a schedule', 'Nico builds the year-end collections report', 'The same, plus an email in the morning with the result and a link.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Show the steps, and the one it’s on.', 'Done steps with their times, the current one with its count, and what’s still to come.'],
            ['Count, and say about how long is left.', '742 of 1,200, with matched, held, and failed so far, and “About 12 minutes left”.'],
            ['Run it in the background.', 'People leave the page and keep chatting. The run sits in Jobs, counted on its badge.'],
            ['Say when it’s done, with the result.', 'A notification with the counts, linking to the run, wherever the person is.'],
            ['Let people cancel, and keep what’s done.', 'Cancel run… opens a confirmation page saying what stops, what’s kept, and what’s left.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“Working…” and a spinner.', 'A slow run and a stuck one look the same, so people cancel good runs and wait on dead ones.'],
            ['A percentage and nothing else.', '62% says nothing about how many are held, or whether it’s worth waiting.'],
            ['A chat that locks until it’s done.', 'Ramon can’t ask anything else for half an hour, or he closes the window and wonders if it stopped.'],
            ['“Task complete.”', 'A toast on a page nobody’s looking at, with no result and no link.'],
            ['Cancel that throws everything away.', '742 invoices of work gone, or no Cancel at all, so people close the tab and hope.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
