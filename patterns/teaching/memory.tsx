import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, Win, Btn, Pill } from '../../site/kit';
import { AgentFrame, AgentHead, Line, Source } from '../agents/agent-kit';
import { ConfirmPage } from '../records/confirm-kit';
import './teaching.css';

// Agent memory: the facts an Agent remembers (people, suppliers, preferences), shown as plain statements on a Memory
// tab. Each says where it came from, when it was last used, and who can see it. People can correct it, forget it, or
// add it to the instructions; a memory that’s really a way of doing a task is a skill. Nothing is hidden.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

// What Marco remembers: statement, where it came from, last used, selected for forgetting, now a skill.
const memories: [string, ReactNode, string, boolean?, boolean?][] = [
  ['Bohol Diesel Depot’s price rises are agreed by email with Nora Dizon.', <>Ramon told me, 14 Sep · <Source>Run #0290</Source></>, 'Today · run #0318', false, true],
  ['Island Grains often bills before the goods arrive.', <>3 of their last 5 invoices · <Source>Run #0276</Source> <Source>Run #0318</Source></>, 'Today · run #0318'],
  ['Ramon wants the payment run ready by 8 AM on Monday.', <>Ramon told me, 3 Aug · <Source>Session</Source></>, 'Today, 7:40 AM'],
  ['Cebu Paperworks sometimes sends the same invoice twice.', <>2 resends held · <Source>Run #0254</Source> <Source>Run #0318</Source></>, 'Today · run #0318'],
  ['Luzon Packaging sends a corrected invoice within a week.', <>From <Source>Run #0304</Source></>, 'Mon 21 Sep', true],
  ['Davao suppliers are paid on Fridays.', <>Ramon told me, 6 Jul · <Source>Session</Source></>, 'Fri 25 Sep', true],
];

export default function Memory() {
  return (
    <>
      <Demo wide caption={<>Marco’s Memory tab: facts he remembers about people and suppliers. Each is one plain sentence, with where it came from, when he last used it, and who can see it. The Bohol Diesel memory became a skill when Ramon corrected him, and links to it (see {link('teaching/skills', 'Skills')}). Add to instructions copies the sentence into the Instructions box for Ramon to save. Ramon has picked two memories that are out of date.</>}>
        <AgentFrame on="Agents" as="lead">
          <div className="as-a-page">
            <AgentHead id="marco" on="Memory" />
            <p className="tc-p">Facts Marco remembers about the people and suppliers he works with. Everyone who can open Marco sees all of it. How he does a task is on Skills.</p>
            <div>
              <p className="as-bulk"><b>2 selected</b><span className="as-grow" /><Btn>Forget…</Btn><Btn kind="quiet">Clear</Btn></p>
              <table className="m-tbl as-tbl tc-tbl">
                <thead><tr><th><i className="as-cb" /></th><th>What Marco remembers</th><th>Where it came from</th><th>Last used</th><th>Seen by</th><th /></tr></thead>
                <tbody>{memories.map(([m, from, used, sel, skill]) => (
                  <tr key={m} className={sel ? 'as-sel' : undefined}>
                    <td><i className={sel ? 'as-cb on' : 'as-cb'} /></td>
                    <td>{m}</td><td>{from}</td><td>{used}</td><td>Finance</td>
                    <td>{skill
                      ? <span className="tc-mem-acts"><Pill tone="ok">Now a skill</Pill><a>Forget</a></span>
                      : <span className="tc-mem-acts"><a>Correct</a><a>Forget</a><a>Add to instructions</a></span>}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="In run #0318, Marco holds Island Grains. The reason names the memory he used, and the memory opens.">
          <Win title="Run #0318 · Held">
            <Line held name="Island Grains" why="Billed in full, but the warehouse hasn’t received the goods." sources={['PO-4452', 'Memory: Island Grains often bills before the goods arrive']} />
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="“Based on past patterns.” Ramon can’t see which pattern, so he can’t tell a good hold from a stale memory.">
          <Win title="Run #0318 · Held">
            <Line held name="Island Grains" why="Held based on past patterns." />
          </Win>
        </Demo>
      </Pair>

      <Demo wide caption="Forget… on two memories opens a confirmation page. Forgetting one memory is a single click, with Undo. Either way, it’s logged in Marco’s history with who forgot it and why.">
        <AgentFrame on="Agents" as="lead">
          <ConfirmPage
            crumb={['Agents', 'Marco', 'Memory', 'Forget 2 memories']}
            title="Forget 2 memories"
            meta="Marco · Finance Operations Agent · owner Ramon Cruz"
            what={[
              <><b>Luzon Packaging sends a corrected invoice within a week.</b> Their corrected invoice for INV-2291 is still not in.</>,
              <><b>Davao suppliers are paid on Fridays.</b> Davao is paid on Tuesdays with everyone else.</>,
              'Marco stops using both from his next run. Past runs keep their reasons, with each memory marked Forgotten.',
              'Logged in Marco’s history, with your name and the reason below.',
            ]}
            reason="Both out of date since September."
            back="Keep them"
            action="Forget 2 memories"
          />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="The people accountable for Marco see everything he remembers, in words they can check.">
          <Win title="Marco / Memory">
            <p className="tc-p">Island Grains often bills before the goods arrive.</p>
            <span className="tc-mem-acts"><a>Correct</a><a>Forget</a><a>Add to instructions</a></span>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Memory only Sageware can open. Metro Lending can’t check what Marco has learned about their suppliers.">
          <Win title="Marco / Memory">
            <div className="tc-lock"><b>Managed by Sageware</b><span>Contact support to view or change what Marco remembers.</span></div>
          </Win>
        </Demo>
      </Pair>

      <Section title="Memory, or something else">
        <p className="g-see">A memory is a fact: who bills early, when Ramon wants the run. A way of doing a task is a skill, on the Skills tab; how the owner wants the Agent to work goes in the instructions. The table on {link('teaching/skills', 'Skills')} sets all four side by side.</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Show memory as plain statements.', 'One sentence each, on a Memory tab beside Instructions and Sessions.'],
            ['Say where each memory came from.', 'The run or session, or who told him and when, with when it was last used.'],
            ['Cite memories in reasons.', 'When a memory shapes a decision, the reason links to it.'],
            ['Let people correct and forget.', 'Anyone accountable, logged; forgetting several goes through a confirmation page.'],
            ['Hide nothing.', 'Everyone accountable for the Agent sees all of it, in the same words.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Memory as a black box.', 'Nobody can say what Marco believes about a supplier.'],
            ['Memories with no source.', 'Nobody knows if “Davao is paid on Fridays” is still true, or who said it.'],
            ['“Based on past patterns.”', 'A stale memory drives a hold, and nobody can trace it.'],
            ['Memory only Sageware can change.', 'Ramon waits on support to stop Marco repeating a mistake.'],
            ['Memories kept from the client.', 'Metro Lending can’t check what Marco learned about their own suppliers.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
