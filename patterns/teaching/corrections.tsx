import { Section, Demo, Pair, Rules, Avoid, When, Win } from '../../site/kit';
import { AgentFrame, ChatPage, Me, Msg, Day, type SessionRow } from '../agents/agent-kit';
import { Learned, SkillsTab, marcoSkills } from './teach-kit';

// Correcting an Agent: a person says what’s wrong, in the chat, in plain words. The Agent fixes this piece of work
// and, when the correction is about how to do the task, learns a skill and says so under its reply, with See skills
// and Undo. The skill is on the Skills tab at once, where the owner can edit, turn off, or forget it.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

const skill = 'Paying Bohol Diesel Depot’s agreed price rises';

// The Skills tab as Ramon sees it on Mon 14 Sep, a minute after: the new skill used once, and nothing turned off yet.
const onMonday = marcoSkills.filter(s => !s.off).map(s => s.fresh ? { ...s, used: 1, last: 'Mon 14 Sep, run #0290' } : s);

// Ramon’s sessions on Mon 14 Sep, with the payment run open.
const monday: SessionRow[] = [
  ['marco', 'Payment run #0290', 'Waiting on you', '7:40 AM'],
  ['nico', 'August collections report', 'Done', 'Fri'],
  ['marco', 'Delivery receipts, week of 7 Sep', 'Done', 'Thu'],
];

export default function Corrections() {
  return (
    <>
      <Demo wide caption={<>Mon 14 Sep. Marco held a Bohol Diesel invoice because it was over its PO. Ramon says why it shouldn’t be held, in one line. Marco puts it back in the run for Ramon to approve, and says under his reply what he learned, with See skills and Undo.</>}>
        <AgentFrame on="Agents" as="lead">
          <ChatPage agent="marco" status="Waiting on you · payment run #0290" sessions={monday}>
            <Day label="Mon 14 Sep" />
            <Msg>Run #0290 is ready. I held INV-5120 from Bohol Diesel Depot: it’s ₱38,000 over PO-4388.</Msg>
            <Me>Bohol Diesel’s price rises are always agreed by email with Nora. Pay them if the email’s on file.</Me>
            <Msg>
              <p>Nora’s email of 3 Sep is on file, so INV-5120 is back in run #0290 for you to approve. I’ll do the same next time.</p>
              <Learned>{skill}</Learned>
            </Msg>
          </ChatPage>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>See skills opens Marco’s Skills tab. The new skill is at the top, marked New, with the message it came from. Ramon can edit its wording, turn it off, or forget it; each is logged. See {link('teaching/skills', 'Skills')}.</>}>
        <AgentFrame on="Agents" as="lead"><SkillsTab skills={onMonday} /></AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Marco says what he learned, where Ramon is looking, with a way to check it and a way to take it back.">
          <Win title="Marco · Payment run #0290">
            <div className="ag-feed">
              <Me>Bohol Diesel’s price rises are always agreed by email with Nora. Pay them if the email’s on file.</Me>
              <Msg><p>INV-5120 is back in the run for you to approve. I’ll do the same next time.</p><Learned>{skill}</Learned></Msg>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="“Noted!” Marco’s behaviour changes, and there’s nothing to see or undo. Three weeks later he pays a Bohol Diesel invoice with no email behind it.">
          <Win title="Marco · Payment run #0290">
            <div className="ag-feed">
              <Me>Bohol Diesel’s price rises are always agreed by email with Nora. Pay them if the email’s on file.</Me>
              <Msg>Noted! I’ll remember that for next time.</Msg>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Section title="What a correction becomes">
        <When head={['What the person says', 'What happens']} rows={[
          ['“Pay this one.” A one-off, for this run.', 'Marco changes this run only, and notes it in the run’s history. Nothing is learned.'],
          ['“Always do this.” How to do the task.', 'Marco learns a skill, and says so under his reply, with See skills and Undo.'],
          ['“From now on, tell Liza too.” How the owner wants him to work.', <>The owner adds it to the instructions: edit the textbox, and Save. See {link('agents/profile', 'Agent profile')}.</>],
          ['“Just approve these yourself.”', <>Beyond what any Agent may do. Marco says he only drafts, and who decides. See {link('agents/autonomy', 'Drafts, never changes')}.</>],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Correct in the chat.', 'In plain words, where the work is. No form to fill in.'],
            ['Say what was learned, at once.', '“Learned a skill: …” under the reply, with See skills and Undo.'],
            ['Show it on the Skills tab straight away.', 'Marked New, with the message it came from.'],
            ['Let the owner change it.', 'Undo in the chat; Edit, Turn off, and Forget on the tab; all logged.'],
            ['Keep one-offs one-off.', '“Pay this one” changes this run, not how Marco works.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A form for corrections.', 'People stop correcting the Agent, and fix the work themselves.'],
            ['“Noted!”', 'Behaviour changes, with nothing to see.'],
            ['Learning that shows up weeks later.', 'Marco pays an invoice nobody expected, and nobody knows why.'],
            ['No way back.', 'A loose correction becomes a habit nobody can remove.'],
            ['Every remark becomes a skill.', 'One exception becomes how every run is paid.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
