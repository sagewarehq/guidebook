import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill, Sk, Toast, Ini } from '../../site/kit';
import { AgentFrame } from '../agents/agent-kit';
import './control.css';

// Taking over: Take over on a running run stops it after the current step, keeps what’s done, and assigns the lines
// left to the person, by name. The run says “Taken over by Ramon, 2:14 PM”.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** Run #0322’s page: the header, then whatever the state calls for, with the side panel. */
function Run({ state, meta, acts, children, side }: { state: ReactNode; meta: string; acts: ReactNode; children: ReactNode; side: ReactNode }) {
  return (
    <div className="as-a-work">
      <div className="as-a-page">
        <p className="as-crumb">Agents <span>/</span> Runs <span>/</span> <b>#0322</b></p>
        <div className="as-a-head">
          <div><p className="m-title">Run #0322 · Record Friday’s BDO deposits</p><p className="as-meta">{state}<span>{meta}</span></p></div>
          <span className="as-acts">{acts}</span>
        </div>
        {children}
      </div>
      <div className="as-a-panel cs-side">{side}</div>
    </div>
  );
}

const left: [string, string, string, string][] = [
  ['40', 'Consolacion Bakeshop', '₱146,000.00', 'Reference is an account number, 11-2045, not an invoice.'],
  ['41', 'Lapu-Lapu Ice Plant', '₱88,200.00', 'Reference is an account number, 11-3310, not an invoice.'],
  ['42', 'Talamban Hardware', '₱530,000.00', 'Not started.'],
];

export default function TakeOver() {
  return (
    <>
      <Demo wide caption={<>Marco is recording Friday’s 63 BDO deposits as payments. He’s on the 39th, and he’s flagged that the rest give account numbers, not invoice numbers, so he’d hold them one by one. Ramon knows which accounts they are. Take over sits beside Pause, one click, no page.</>}>
        <AgentFrame on="Agents" as="lead">
          <Run state={<Pill>Running</Pill>} meta="Marco · asked by Ramon, today at 2:02 PM"
            acts={<><Btn kind="quiet">•••</Btn><span className="ag-pause">Pause Marco</span><Btn kind="pri">Take over</Btn></>}
            side={<>
              <p className="m-k">Take over</p>
              <span>Marco stops after the deposit he’s on. The ones done stay recorded; the ones left are assigned to you.</span>
              <p className="m-k">History</p>
              <span><b>Ramon</b> asked for this run · 2:02 PM</span>
              <span><b>Ramon</b> uploaded BDO’s statement · 11:20 AM</span>
            </>}>
            <div className="cs-steps">
              <p className="done"><i>✓</i><span><b>Read 63 deposits, ₱15,838,900.00,</b> from the BDO statement Ramon uploaded.</span></p>
              <p className="done"><i>✓</i><span><b>Recorded 38 as payments, ₱9,506,000.00,</b> each against the invoice its reference names.</span></p>
              <p><i>◌</i><span><b>Recording deposit 39:</b> Talisay Rice Mill, ₱212,500.00, against INV-1061…</span></p>
              <p className="stop"><i>!</i><span><b>Deposits 40 to 63 give account numbers, not invoice numbers.</b> Marco will hold each one for a person.</span></p>
            </div>
          </Run>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>One click later. Marco finished deposit 39, then stopped. The 39 payments he recorded stay, linked from the run; the 24 deposits left are assigned to Ramon, each with Marco’s note. The run, the runs list, and Marco’s chat all say “Taken over by Ramon, 2:14 PM”. Marco carries on with his other work.</>}>
        <AgentFrame on="Agents" as="lead">
          <Run state={<Pill>Taken over by Ramon, 2:14 PM</Pill>} meta="Marco stopped after deposit 39 of 63"
            acts={<><Btn kind="quiet">•••</Btn><Btn>Hand back to Marco</Btn></>}
            side={<>
              <p className="m-k">History</p>
              <span><b>Ramon</b> took over · 2:14 PM</span>
              <span><b>Marco</b> recorded deposit 39 and stopped · 2:14 PM</span>
              <span><b>Ramon</b> asked for this run · 2:02 PM</span>
            </>}>
            <p className="as-facts"><span><small>Done by Marco</small>39 · ₱9,718,500.00</span><span><small>Left for you</small>24 · ₱6,120,400.00</span><span><small>Statement</small>63 · ₱15,838,900.00</span></p>
            <p className="as-sech"><span className="m-k">Left for you · 24</span><a className="m-link">Open all 24 in Payments</a></p>
            <table className="m-tbl cs-agents">
              <thead><tr><th>Deposit</th><th>From</th><th className="r">Amount</th><th>Marco’s note</th><th>Assigned to</th></tr></thead>
              <tbody>
                {left.map(([n, from, amt, note]) => <tr key={n}><td>{n}</td><td>{from}</td><td className="r">{amt}</td><td><small>{note}</small></td><td><span className="cs-ini"><Ini n="RC" />Ramon</span></td></tr>)}
                <tr><td colSpan={5}><span className="cs-none">and 21 more</span></td></tr>
              </tbody>
            </table>
            <p className="as-sech"><span className="m-k">Done by Marco · 39</span><a className="m-link">See the 39 payments</a></p>
            <p className="cs-toast"><Toast action="Undo">Run #0322 is yours. 24 deposits are assigned to you.</Toast></p>
          </Run>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Take over says what it keeps. Nothing is lost, so it needs no page: one click, and the rest is yours.">
          <Win title="Run #0322">
            <span className="cs-btns"><span className="ag-pause">Pause Marco</span><Btn kind="pri">Take over</Btn></span>
            <p className="cs-tip">Marco stops after deposit 39. The 39 done stay recorded; the 24 left are assigned to you.</p>
            <Sk w="76%" /><Sk w="60%" />
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Cancel is the only way to stop, and it throws away the 39 correct payments. So people let the run finish wrong. It’s a dialog, too, for an action that isn’t about unsaved work.">
          <Win title="Run #0322">
            <div className="cs-dim">
              <Sk w="76%" /><Sk w="60%" /><Sk w="68%" />
              <div className="cs-dlg">
                <b>Cancel run #0322?</b>
                <p>All progress will be lost. Payments recorded by this run will be removed.</p>
                <span><Btn>Keep running</Btn><Btn kind="danger">Cancel run</Btn></span>
              </div>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Section title="Take over, or something else">
        <When head={['When', 'Use', 'What happens']} rows={[
          ['This run needs you, and the Agent can carry on with other work.', <b>Take over</b>, 'The run stops after its step; what’s done stays; the rest is assigned to you.'],
          ['The Agent should stop everything.', link('control/pause', 'Pause'), 'Every run pauses after its step, until someone resumes the Agent.'],
          ['What the run did is wrong.', link('runs/undo', 'Undo the run'), 'A confirmation page, then its changes are rolled back, with the trail kept.'],
          ['The Agent holds a record, not a run.', link('control/assigning', 'Assign to me'), 'The record is yours, and the Agent’s next steps on it are cancelled.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Put Take over on every running run.', 'Beside Pause, on the run page: one click, no page.'],
            ['Stop after the current step.', 'The deposit under way is finished and saved, never left half-recorded.'],
            ['Keep what’s done.', 'The 39 recorded payments stay, linked from the run. Nothing is rolled back.'],
            ['Give the rest to the person, by name.', 'Each line left is assigned to them, with the Agent’s note on it.'],
            ['Mark the run.', '“Taken over by Ramon, 2:14 PM”, on the run, in the runs list, and in the chat.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Only a Cancel button.', 'People let a run finish wrong, rather than lose its work.'],
            ['Stopping mid-line.', 'A payment recorded against no invoice, found at month-end.'],
            ['Cancel that rolls it all back.', '39 correct payments disappear, and someone records them again.'],
            ['Leftovers with no owner.', '24 deposits sit unmatched, because nobody knows they’re theirs.'],
            ['A run that just says Cancelled.', 'Nobody can tell whether Marco or Ramon finished it, or who to ask.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
