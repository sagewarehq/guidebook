import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Sk } from '../../site/kit';
import { ConfirmPage } from '../records/confirm-kit';
import { AgentFrame, AgentAva, ChatPanel, Day, Me, Steps, agentsCast, type AgentId } from '../agents/agent-kit';
import './control.css';

// Pausing an Agent: one click wherever it appears, no confirmation page, and the same red “Paused by Ramon, 3:30 PM”
// everywhere. The step under way finishes; nothing is half-written; approvals keep waiting. Resume is a confirmation page.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;
const PAUSED = 'Paused by Ramon, 3:30 PM';

/** The Agents page: each Agent, what it’s doing, its owner, what waits on you, and Pause or Resume. */
function AgentsList({ paused = [] }: { paused?: AgentId[] }) {
  const doing: Record<AgentId, [string, string]> = {
    marco: ['Matching this week’s delivery receipts', 'Run #0323 · 118 of 240 done'],
    nico: ['Idle', 'Sent the September collections report, Fri 25 Sep'],
    bea: ['Drafting a proposal for Cebu Grains', 'Run #0315 · pricing from 14 past deals'],
  };
  const waits: Record<AgentId, number> = { marco: 2, nico: 0, bea: 0 };
  return (
    <div className="as-a-page">
      <p className="as-crumb"><b>Agents</b></p>
      <div className="as-a-head">
        <div><p className="m-title">Agents</p><p className="as-meta"><span>3 Agents · 2 things waiting on you</span></p></div>
      </div>
      <table className="m-tbl cs-agents">
        <thead><tr><th>Agent</th><th>Doing now</th><th>Owner</th><th>Waiting on you</th><th /></tr></thead>
        <tbody>{(Object.keys(agentsCast) as AgentId[]).map(id => {
          const off = paused.includes(id);
          return (
            <tr key={id} className={off ? 'cs-off' : undefined}>
              <td><span className="ag-cell"><AgentAva id={id} size="sm" /><span>{agentsCast[id].name}<small>{agentsCast[id].role}</small></span></span></td>
              <td>{off ? <><span className="cs-paused">{PAUSED}</span><small>{id === 'marco' ? 'Run #0323 paused after step 2' : 'Nothing was running'}</small></> : <>{doing[id][0]}<small>{doing[id][1]}</small></>}</td>
              <td>{agentsCast[id].owner}</td>
              <td>{waits[id] || <span className="ag-none">—</span>}</td>
              <td className="r"><span className={off ? 'ag-pause paused' : 'ag-pause'}>{off ? '▶ Resume…' : 'Pause'}</span></td>
            </tr>
          );
        })}</tbody>
      </table>
    </div>
  );
}

/** The run page for #0323, running or paused. */
function RunSteps({ paused }: { paused?: boolean }) {
  return (
    <div className="cs-steps">
      <p className="done"><i>✓</i><span><b>Read 240 delivery receipts</b> from this week, DR-5571 to DR-5810.</span></p>
      <p className="done"><i>✓</i><span><b>Matched 118 to their POs, each added to the draft.</b> The last was DR-5688, to PO-4460.</span></p>
      {paused
        ? <p className="stop"><i className="cs-bars" /><span><b>Paused here, 3:30 PM.</b> Ramon paused Marco. DR-5688 was finished and added to the draft first, so nothing is half-matched.</span></p>
        : <p><i>◌</i><span><b>Matching DR-5689</b> to PO-4461…</span></p>}
      <p className="todo"><i>○</i><span>Match the other 122 receipts. {paused ? 'Not started.' : ''}</span></p>
      <p className="todo"><i>○</i><span>Hold any receipt that doesn’t match, with why. {paused ? 'Not started.' : ''}</span></p>
    </div>
  );
}

export default function Pause() {
  return (
    <>
      <Demo wide caption={<>Ramon clicked Pause in Marco’s chat at 3:30 PM. There’s no confirmation page: pausing is always safe. Marco finished the receipt he was matching, added it to the draft, and paused. Loans OS, not Marco, posts where the run paused and what still waits. The Agents page behind says Paused too, in red, with who and when. Resume… is the only way back.</>}>
        <AgentFrame on="Agents" as="lead" loud overlay={
          <ChatPanel agent="marco" status="Matching receipts · run #0323" pausedBy={PAUSED} onPage="Agents" composer="Marco is paused. Resume him to brief him.">
            <Day label="Today" />
            <Me>Match this week’s delivery receipts to their POs. Hold anything that doesn’t match.</Me>
            <Steps items={[[true, 'Read 240 delivery receipts, DR-5571 to DR-5810'], [true, 'Matched 118 to their POs, each added to the draft']]} />
            <div className="cs-sys">
              <b>{PAUSED}</b>
              <span>Run #0323 paused after DR-5688, which was finished. 118 of 240 receipts are in the draft; the other 122 are untouched.</span>
              <span>The 6 reminders in #0319 and the 14 invoices held in #0320 still wait for you. Pausing Marco doesn’t approve or cancel them.</span>
            </div>
          </ChatPanel>}>
          <AgentsList paused={['marco']} />
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>Pause sits wherever Marco appears, always as the same button, and one click pauses him everywhere at once. Once he’s paused, all four places say so in the same words, in red, and Pause becomes Resume…, the way back.</>}>
        <div className="cs-states">
          <span /><p className="m-k">Running</p><p className="m-k">Paused</p>

          <p className="cs-where">Chat header<small>panel and full page</small></p>
          <div className="cs-cell"><div className="ag-head"><AgentAva id="marco" /><div className="ag-who"><b>Marco</b><small>Finance Operations Agent</small><span className="ag-st">Matching receipts · run #0323</span></div><span className="ag-pause">Pause</span></div></div>
          <div className="cs-cell"><div className="ag-head"><AgentAva id="marco" /><div className="ag-who"><b>Marco</b><small>Finance Operations Agent</small><span className="ag-st paused">{PAUSED}</span></div><span className="ag-pause paused">▶ Resume…</span></div></div>

          <p className="cs-where">Agents page<small>his row</small></p>
          <div className="cs-cell"><p className="cs-row"><AgentAva id="marco" size="sm" /><span><b>Marco</b><small>Matching receipts · run #0323</small></span><span className="ag-pause">Pause</span></p></div>
          <div className="cs-cell"><p className="cs-row"><AgentAva id="marco" size="sm" /><span><b>Marco</b><span className="cs-paused">{PAUSED}</span></span><span className="ag-pause paused">▶ Resume…</span></p></div>

          <p className="cs-where">His profile<small>the header</small></p>
          <div className="cs-cell"><p className="cs-row"><AgentAva id="marco" size="lg" /><span><b>Marco</b><small>Finance Operations Agent · owner Ramon Cruz</small><span className="cs-going">Running</span></span><span className="ag-pause">Pause</span><Btn kind="quiet">•••</Btn></p></div>
          <div className="cs-cell"><p className="cs-row"><AgentAva id="marco" size="lg" /><span><b>Marco</b><small>Finance Operations Agent · owner Ramon Cruz</small><span className="cs-paused">{PAUSED}</span></span><span className="ag-pause paused">▶ Resume…</span><Btn kind="quiet">•••</Btn></p></div>

          <p className="cs-where">A run<small>its header</small></p>
          <div className="cs-cell"><p className="cs-row"><span className="cs-t"><b>Run #0323</b><small>Matching receipts · 97 of 240</small></span><Pill>Running</Pill><span className="ag-pause">Pause Marco</span></p></div>
          <div className="cs-cell"><p className="cs-row"><span className="cs-t"><b>Run #0323</b><small>Paused at 118 of 240</small></span><Pill tone="bad">Marco paused</Pill><span className="ag-pause paused">▶ Resume…</span></p></div>
        </div>
      </Demo>

      <Demo wide caption={<>What the pause did to the run that was going. The step under way finished, then Marco paused before starting the next. Everything done is kept, everything not started stays untouched, and the run says where it paused and why. See {link('runs/detail', 'Runs › Run detail')}.</>}>
        <AgentFrame on="Agents" as="lead">
          <div className="as-a-work">
            <div className="as-a-page">
              <p className="as-crumb">Agents <span>/</span> Runs <span>/</span> <b>#0323</b></p>
              <div className="as-a-head">
                <div><p className="m-title">Run #0323 · Match this week’s delivery receipts</p><p className="as-meta"><Pill tone="bad">Paused</Pill><span>Marco · asked by Ramon, today at 3:20 PM</span></p></div>
                <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Take over</Btn><span className="ag-pause paused">▶ Resume Marco…</span></span>
              </div>
              <RunSteps paused />
            </div>
            <div className="as-a-panel cs-side">
              <p className="m-k">Still waiting on you</p>
              <span>Pausing approves nothing and cancels nothing.</span>
              <a className="m-link">#0319 · 6 reminders to send</a>
              <a className="m-link">#0320 · 14 invoices held</a>
              <p className="m-k">History</p>
              <span><b>Ramon</b> paused Marco · 3:30 PM</span>
              <span><b>Ramon</b> asked for this run · 3:20 PM</span>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>Resume… is deliberate: it opens a confirmation page that says what Marco will pick up, what ran while he was paused, and what still needs a person. Pausing took one click; starting him again takes two.</>}>
        <AgentFrame on="Agents" as="lead">
          <ConfirmPage crumb={['Agents', 'Marco', 'Resume']} title="Resume Marco?" meta={`${PAUSED} · 28 minutes ago`}
            facts={[['Paused for', '28 minutes'], ['Picks up', 'Run #0323'], ['Waiting on you', '2']]}
            what={[
              <><b>Marco picks up run #0323 where he paused:</b> the 122 receipts not yet matched, from DR-5689.</>,
              <><b>Work that fell due while he was paused runs once, now:</b> the 3:45 PM check of the supplier inbox.</>,
              <><b>Reminders #0319 and the 14 held in #0320 still wait for you.</b> Resuming approves nothing.</>,
            ]}
            back="Keep Marco paused" action="Resume Marco" danger={false} />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Carlo, as admin, has Pause all Agents at the top of the Agents page. One click, and each Agent pauses after its current step; the button then reads Resume all…, in red. Leads pause their own Agents, one at a time.">
          <Win title="Agents">
            <div className="as-a-head">
              <div><p className="m-title">Agents</p><p className="as-meta"><span>3 Agents · all paused</span></p></div>
              <span className="ag-pause paused">▶ Resume all…</span>
            </div>
            {(Object.keys(agentsCast) as AgentId[]).map(id => (
              <p key={id} className="cs-row"><AgentAva id={id} size="sm" /><span><b>{agentsCast[id].name}</b><span className="cs-paused">Paused by Carlo, 4:05 PM</span></span><span className="ag-pause paused">▶ Resume…</span></p>
            ))}
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Pause is a switch four levels into Settings, with a Save button. In a hurry, nobody finds it, and until Save is clicked, Marco keeps working.">
          <Win title="Settings / Agents / Marco / Advanced">
            <p className="m-k">Advanced</p>
            <p className="cs-row"><span /><span><b>Agent enabled</b><small>Turn off to stop this Agent from running tasks.</small></span><Pill tone="ok">On</Pill></p>
            <Sk w="70%" /><Sk w="55%" /><Sk w="62%" />
            <span className="cs-btns"><Btn kind="pri">Save</Btn></span>
          </Win>
        </Demo>
      </Pair>

      <Section title="Pause, or something else">
        <When head={['When', 'Use', 'What happens']} rows={[
          ['Something looks wrong, and the Agent should hold everything now.', <b>Pause</b>, 'Pauses after the current step, in every run. Nothing is lost. Resume… to carry on.'],
          ['One run needs a person, but the Agent can carry on with the rest.', link('control/take-over', 'Take over'), 'That run stops after its step; what’s done stays; the rest is assigned to you.'],
          ['What a finished run changed is wrong.', link('runs/undo', 'Undo the run'), 'A confirmation page, then the changes are rolled back, with the trail kept.'],
          ['The Agent should stop for good.', link('control/decommission', 'Decommission'), 'A confirmation page. Open work goes to named people; its access ends; its history stays.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Put Pause wherever the Agent appears.', 'The chat header, its row on the Agents page, its profile, and every run. Admins also get Pause all Agents.'],
            ['Pause in one click.', 'No confirmation page and no reason asked: pausing is always safe.'],
            ['Pause at a clean step.', 'The step under way finishes; nothing is half-drafted, and approvals keep waiting.'],
            ['Show paused everywhere, the same way.', 'In red, with who and when: “Paused by Ramon, 3:30 PM”.'],
            ['Resume on purpose.', 'Resume… opens a page that says what picks up, and what still waits for a person.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Pause buried in Settings.', 'In a hurry, nobody finds Settings › Agents › Marco › Advanced.'],
            ['A confirmation before pausing.', 'An “Are you sure?” costs seconds while the Agent keeps working.'],
            ['Pausing mid-write.', 'A receipt half-matched, or a payment half-recorded, that someone has to find and fix.'],
            ['Paused in one place only.', 'The chat says Paused, the Agents page says Running, and nobody knows which is true.'],
            ['Resume with a switch.', 'One stray click starts the Agent again, and nobody knows what it picked up.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
