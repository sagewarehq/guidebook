import type { ReactNode } from 'react';
import { Section, When, Rules, Avoid, Btn, Pill, Ini } from '../../site/kit';
import { AgentAva, HeldPill, Source, Steps } from '../agents/agent-kit';
import './concepts.css';

// The words we use: one word for each piece of Agent work, each drawn as it looks on screen, with the page that covers
// it. Then the words we don't use, and what we say instead. Every example is Marco and payment run #0318.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** One word: its meaning, a tiny drawing of it on screen, and where it's covered. */
const words: [string, ReactNode, ReactNode, ReactNode][] = [
  ['Agent', 'A named teammate that does one role in the system. Always capitalised, always with the AI badge.',
    <><AgentAva id="marco" /><span className="kc-who"><b>Marco</b><small>Finance Operations Agent</small></span></>,
    link('agents/badge', 'Telling Agents apart')],
  ['Owner', 'The person accountable for an Agent: writes its instructions, and answers for its work.',
    <><AgentAva id="marco" /><span>owned by</span><Ini n="RC" /><b>Ramon Cruz</b></>,
    link('agents/profile', 'Agent profile')],
  ['Role', 'What the Agent may see, set in the Role builder like a person’s, and narrower.',
    <span className="kc-perm"><span>Invoices</span><span>All</span><span>Payments</span><span>Own</span><span>Users and roles</span><span className="no">No</span></span>,
    link('agents/access', 'Giving an Agent access')],
  ['Instructions', 'How the owner wants the Agent to work: one textbox, in plain words, that the owner edits and saves.',
    <span className="kc-box"><span>Have the run ready by 8 AM every Monday…</span><small>Saved by Ramon Cruz, Mon 21 Sep · History</small></span>,
    link('agents/profile', 'Agent profile')],
  ['Session', 'One conversation with an Agent about one piece of work. Many run side by side.',
    <><b>Payment run #0318</b><small>Marco · Waiting on you</small></>,
    link('concepts/sessions', 'Sessions at the same time')],
  ['Skill', 'A way of doing a task the Agent learned from sessions and corrections. Anyone accountable can see it; the owner can edit or forget it.',
    <><b>Spotting resent invoices</b><small>Learned from Ramon, 17 Aug · used 14 times</small></>,
    link('teaching/skills', 'Skills')],
  ['Memory', 'A fact the Agent remembers: a person, a supplier, a preference.',
    <span>“Island Grains often bills before the goods arrive.”</span>,
    link('teaching/memory', 'Agent memory')],
  ['Command', 'An ask people saved to reuse, typed after /.',
    <><code>/payrun</code><small>Prepare a week’s payment run</small></>,
    link('commands/using', 'Using a command')],
  ['Draft', 'What an Agent makes instead of a change: a payment run, receipt matches, a reminder. Nothing changes until a person approves it.',
    <span className="kc-perm"><span><b>Payment run #0318</b></span><span>₱48,650,000.00</span><span>32 of 35 suppliers</span><span>3 held</span></span>,
    link('agents/autonomy', 'Drafts, never changes')],
  ['Approval', 'A person’s answer to a draft. Every change to a record, anything sent outside, and all money waits for one.',
    <><Btn kind="pri">Approve…</Btn><Btn>Suggest changes</Btn></>,
    link('approvals/card', 'Approval card')],
  ['Run', 'One piece of Agent work, kept as a record with a number, its steps, and a state.',
    <><a className="m-link">#0318</a><span>This week’s payment run</span><Pill>Waiting on you</Pill></>,
    link('runs/list', 'Runs list')],
  ['Hold', <>An item the Agent left out of a draft for a person, with why. A <b>flag</b> marks one to look at while the rest goes ahead.</>,
    <><HeldPill /><span>Island Grains</span><small>Goods not received.</small><Steps items={[['flag', 'Luzon Packaging is over PO again']]} /></>,
    link('explaining/holds', 'Holds and flags')],
  ['Trail', 'Every change the Agent made, in the record’s history, with its reason and the run behind it.',
    <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> scheduled ₱2,184,500.00<small>Today, 9:43 AM · approved by Ramon · <Source>Run #0318</Source></small></span></p>,
    link('explaining/history', 'In the history')],
];

export default function Terms() {
  return (
    <>
      <Section title="Thirteen words">
        <table className="kc-terms">
          <thead><tr><th>Word</th><th>What it means</th><th>On screen</th><th>See</th></tr></thead>
          <tbody>{words.map(([w, m, on, see]) => <tr key={w}><td>{w}</td><td>{m}</td><td><div className="kc-on">{on}</div></td><td>{see}</td></tr>)}</tbody>
        </table>
      </Section>

      <Section title="Words we don’t use">
        <When head={['Not', 'Say instead', 'Why']} rows={[
          ['Bot, assistant', 'Agent, or its name: Marco', 'It owns a role and answers to an owner, like a teammate.'],
          ['AI, for the Agent (“the AI paid it”)', 'The Agent’s name: “Marco scheduled it”', 'People need to know which Agent, and whose it is. AI stays on the badge.'],
          ['Automation', 'Scheduled task, for what it does each week; run, for one time it did it', 'Automation hides that a person set it up and can stop it.'],
          ['System prompt, training', 'Instructions, for what the owner writes; skill, for what it learned', 'Both are words the owner can read and change.'],
          ['Workflow run, job, execution', 'Run', 'Jobs are exports and imports; a run is Agent work.'],
          ['Confidence score, “87% sure”', 'A reason, and Held when it isn’t sure', 'A percentage doesn’t say what to check.'],
          ['Autopilot, auto mode', 'Nothing: an Agent only drafts', 'There’s no mode where it changes things alone.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One word for each thing.', 'Run in the chat, the runs list, the bell, and the history.'],
            ['Call the Agent by name.', '“Marco held 3 invoices”, with the AI badge on his initials.'],
            ['Call a draft a draft.', '“Draft · nothing is linked until you approve”, until a person decides.'],
            ['Say why, not how sure.', 'A reason line on each call, and Held when the Agent can’t decide.'],
            ['Use the business’s words for records.', 'Invoice, PO, payment, supplier, as on every other screen in Loans OS.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Three words for one thing.', 'Run in the list, job in the bell, task in the history, and people think they’re different.'],
            ['“The AI did it.”', 'Nobody can tell which Agent changed the record, or who to ask.'],
            ['Autopilot.', 'People can’t tell whether the Agent waits for them or goes ahead.'],
            ['Confidence scores.', '“87%” doesn’t tell Ramon which invoice to open, or why.'],
            ['System words.', '“Entity”, “tool call”, and “execution” in front of a Finance lead.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
