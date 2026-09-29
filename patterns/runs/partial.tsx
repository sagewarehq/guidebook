import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Ini } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps, Line } from '../agents/agent-kit';
import './runs.css';

// Runs that half-work: most of a big run succeeds, some of it is held, and some of it fails. Keep what worked, say
// which is which, and give each group its own next step: review what’s held, retry what failed.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** A line Marco couldn’t check: not held (he didn’t choose to stop), so it gets its own pill. */
const NotChecked = ({ no, amount }: { no: string; amount: string }) => (
  <Line name={<><Pill tone="bad">Not checked</Pill>Mindanao Cement · {no}</>} amount={amount} why="Delivery receipt not fetched: their supplier portal didn’t answer." />
);

export default function PartialRuns() {
  return (
    <>
      <Demo wide caption={<>Run #0320 finished at 10:38 AM as Partly done (in Jobs, Needs attention). The 1,180 matches are kept, as a draft for Ramon to approve in one go. The rest is split in two, each with its own next step: 14 Marco held because he wasn’t sure, for Ramon to review, and 6 he couldn’t check because a supplier’s portal was down, to retry. Every line says why.</>}>
        <AgentFrame on="Agents" as="lead">
          <div className="as-a-work">
            <div className="as-a-page">
              <p className="as-crumb">Agents <span>/</span> Runs <span>/</span> <b>#0320</b></p>
              <div className="as-a-head">
                <div><p className="m-title">Run #0320 · Match Q3 supplier invoices</p><p className="as-meta"><Pill tone="bad">Partly done</Pill><span>Marco · asked by Ramon Cruz · today, 10:04 to 10:38 AM</span></p></div>
                <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Open in chat</Btn></span>
              </div>
              <div className="rn-groups">
                <div className="rn-grp ok">
                  <small>Drafted</small><b>1,180</b>
                  <p>Each matched to its PO and delivery receipt, as a draft. Nothing is marked until you approve.</p>
                  <span><Btn>Approve 1,180 matches…</Btn><a className="m-link">See 1,180</a></span>
                </div>
                <div className="rn-grp held">
                  <small>Held for you</small><b>14</b>
                  <p>Marco checked these and wasn’t sure. Nothing changed on them.</p>
                  <ul><li>8 over PO, with no agreement found</li><li>4 look like resends</li><li>2 billed before the goods arrived</li></ul>
                  <span><Btn kind="pri">Review 14 held</Btn></span>
                </div>
                <div className="rn-grp fail">
                  <small>Couldn’t check</small><b>6</b>
                  <p>Mindanao Cement’s supplier portal didn’t answer, so Marco couldn’t fetch 6 delivery receipts. He tried 3 times, 10:33 to 10:37 AM.</p>
                  <span><Btn>Retry 6</Btn><Btn kind="quiet">Assign to a person</Btn></span>
                </div>
              </div>

              <div className="rn-sec">
                <p className="m-k">Held for you · 14<a className="m-link">See all 14</a></p>
                <div className="ag-card rn-out"><div className="ag-held">
                  <div><Line held name="Luzon Packaging · INV-2291" amount="₱1,318,750.00" why="Still ₱68,750 over PO. Their corrected invoice hasn’t come in." sources={['PO-4431']} /></div>
                  <div><Line held name="Cebu Paperworks · INV-8863" amount="₱186,400.00" why="Same items and amount as INV-8807, paid Tue 22 Sep. Looks like a resend." sources={['INV-8807']} /></div>
                  <div><Line held name="Island Grains · INV-3317" amount="₱2,406,000.00" why="Billed in full, but the warehouse hasn’t received the goods." sources={['PO-4452']} /></div>
                </div></div>
              </div>

              <div className="rn-sec">
                <p className="m-k">Couldn’t check · 6<a className="m-link">See all 6</a></p>
                <div className="ag-card rn-out"><div className="ag-lines">
                  <div><NotChecked no="INV-MC-3301" amount="₱742,500.00" /></div>
                  <div><NotChecked no="INV-MC-3302" amount="₱1,108,000.00" /></div>
                  <div><NotChecked no="INV-MC-3305" amount="₱615,250.00" /></div>
                </div></div>
              </div>
            </div>
            <div className="as-a-panel rn-panel">
              <p className="m-k">Related</p>
              <div className="as-rel"><p><span>Invoices</span><a>1,200</a></p><p><span>Held</span><a>14</a></p><p><span>Not checked</span><a>6</a></p><p><span>Supplier</span><a>Mindanao Cement</a></p></div>
              <p className="m-k">History</p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> finished: partly done<small>Today, 10:38 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> retried 6, 3 times<small>Today, 10:33 AM</small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> started it<small>Today, 10:04 AM</small></span></p>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>In the chat, the same split in three lines, with a button for each next step and a link to the run. This is how run #0320 from {link('runs/progress', 'Long runs')} ended.</>}>
          <div className="rn-chat short">
            <ChatPanel agent="marco" status="Partly done · run #0320">
              <Day label="Today" />
              <Me>Match every Q3 supplier invoice to its PO and delivery receipt. Hold anything that doesn’t add up.</Me>
              <Msg>
                Done, but not all of it. Here’s where the 1,200 stand.
                <Steps items={[[true, '1,180 matched to PO and delivery receipt'], ['flag', '14 held: 8 over PO, 4 look like resends, 2 not received'], ['flag', '6 not checked: Mindanao Cement’s portal didn’t answer']]} />
                <span className="rn-qf"><Btn kind="pri">Review 14 held</Btn><Btn>Retry 6</Btn><a className="m-link">Open run #0320</a></span>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption="“Run failed”, with nothing kept. Six receipts from one supplier threw away 1,180 good matches, the error means nothing to Ramon, and Try again runs all 1,200 against the same broken portal.">
          <Win title="Run #0320">
            <div className="rn-err">
              <b>Run failed</b>
              <p>Something went wrong while matching invoices. No changes were saved.</p>
              <code>ETIMEDOUT supplier-portal: request exceeded 30000 ms (step 3/5)</code>
              <span><Btn>Try again</Btn></span>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Section title="Which group, and what’s next">
        <When head={['Group', 'Means', 'What the system does', 'Next step']} rows={[
          [<Pill tone="ok">Drafted</Pill>, 'It worked, as asked', 'Kept as a draft, with the run in its history', 'Approve them in one go'],
          [<Pill tone="bad">Held</Pill>, 'The Agent could have acted, but wasn’t sure', 'Left unchanged, marked Held with the reason, for whoever asked', 'Review each: approve it, change it, or reject it'],
          [<Pill tone="bad">Couldn’t check</Pill>, 'The Agent couldn’t do it: a portal was down, or a file wouldn’t open', 'Left unchanged, retried 3 times, then the reason in plain words', 'Retry just these, or assign them to a person'],
          [<Pill tone="bad">Outside its role</Pill>, 'It needed a record the Agent’s role can’t see', 'Left unchanged, with what it couldn’t reach', <>A person with access does it. See {link('agents/access', 'Giving an Agent access')}</>],
        ]} />
      </Section>

      <Section title="What the run as a whole is called">
        <When head={['What happened', 'Runs list', 'Jobs']} rows={[
          ['All of it worked', <Pill tone="ok">Done</Pill>, <Pill tone="ok">Done</Pill>],
          ['Some worked; some held or couldn’t be done', <Pill tone="bad">Partly done</Pill>, <Pill tone="bad">Needs attention</Pill>],
          ['Nothing could be done', <Pill tone="bad">Failed</Pill>, <Pill tone="bad">Failed</Pill>],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Keep what worked.', '1,180 matches stay drafted, even though 6 couldn’t be checked.'],
            ['Tell held from couldn’t.', 'Held: the Agent chose to stop and ask. Couldn’t check: something outside stopped it.'],
            ['Give each group its next step.', 'Review 14 held, Retry 6, Assign to a person: a button on each group.'],
            ['Say why for every item.', 'One plain line per invoice: over PO, a likely resend, the portal didn’t answer.'],
            ['Retry only what didn’t work.', 'Retry 6 fetches those 6 again; the 1,180 and the 14 are left alone.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“Run failed” with nothing kept.', 'Six missing receipts throw away 34 minutes of work on 1,180 invoices.'],
            ['One pile called “Errors”.', 'Ramon can’t tell what needs his judgment from what just needs another try.'],
            ['A count with nowhere to go.', '“20 need attention” and no way to open them, so they’re never looked at.'],
            ['Error codes.', 'ETIMEDOUT tells Ramon nothing, and he can’t say which supplier to call.'],
            ['Try again from the start.', 'All 1,200 run again, the same portal times out, and the held ones are flagged twice.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
