import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill } from '../../site/kit';
import { AgentFrame, AgentHead, Source } from '../agents/agent-kit';
import { SkillsTab } from './teach-kit';

// Skills are what an Agent learns: ways of doing a task it picked up from sessions and corrections. They sit on the
// Skills tab of its page, each with where it was learned, when, and how often it’s been used. The owner can edit,
// turn off, or forget any of them, and every change is logged. Nothing an Agent learns lives anywhere else.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

// Where Paying Bohol Diesel Depot’s agreed price rises was used: run, date, invoice, over PO, the email, what happened.
const uses: [string, string, string, string, string, string][] = [
  ['#0318', 'Today', 'INV-5241', '₱42,000 over PO-4512', 'Nora Dizon, 22 Sep', 'Drafted to pay · waiting on you'],
  ['#0304', 'Mon 21 Sep', 'INV-5188', '₱31,500 over PO-4497', 'Nora Dizon, 15 Sep', 'Paid · approved by Ramon Cruz'],
];

export default function Skills() {
  return (
    <>
      <Demo wide caption={<>Marco’s Skills tab: what he has learned. Each skill is named for the task, in Finance’s words, with where he learned it, when, how often he has used it, and when last. The newest is marked New. Ramon turned one off when Davao moved to Tuesdays; it stays listed, greyed, so he can turn it back on.</>}>
        <AgentFrame on="Agents" as="lead"><SkillsTab /></AgentFrame>
      </Demo>

      <Demo wide caption={<>One skill, open. How Marco does it, in plain words; the message he learned it from, linked to its session; and every time he has used it, each opening its run. Edit changes the wording in place. Turn off stops Marco using it without losing it. Forget removes it, with Undo. Each is logged in the panel.</>}>
        <AgentFrame on="Agents" as="lead">
          <div className="as-a-work tc-work">
            <div className="as-a-page">
              <AgentHead id="marco" on="Skills" crumb={['Paying Bohol Diesel Depot’s agreed price rises']}
                meta={<><Pill tone="ok">On</Pill><span>Learned from Ramon, Mon 14 Sep · used 2 times</span></>}
                acts={<><Btn kind="quiet">Forget</Btn><Btn>Turn off</Btn><Btn kind="pri">Edit</Btn></>} />
              <div className="tc-body">
                <p className="m-k">How Marco does it</p>
                <p className="tc-how">When a Bohol Diesel Depot invoice is over its PO, look for an email from Nora Dizon at Bohol Diesel agreeing the new price. If it’s on file, put the invoice in the run and link the email. If it isn’t, hold the invoice and say by how much it’s over.</p>
                <p className="m-k">Where he learned it</p>
                <p className="tc-quote">“Bohol Diesel’s price rises are always agreed by email with Nora. Pay them if the email’s on file.”<small>Ramon Cruz, in Payment run #0290 · Mon 14 Sep, 9:08 AM · <a className="m-link">Open the session</a></small></p>
                <p className="m-k">When he used it</p>
                <table className="m-tbl tc-tbl">
                  <thead><tr><th>Run</th><th>When</th><th>Invoice</th><th>Over PO</th><th>Email on file</th><th>Result</th></tr></thead>
                  <tbody>{uses.map(([r, d, inv, over, mail, res]) => (
                    <tr key={r}><td><a className="m-link">{r}</a></td><td>{d}</td><td><a className="m-link">{inv}</a></td><td>{over}</td><td><Source>{mail}</Source></td><td>{res}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
            <div className="as-a-panel">
              <p className="m-k">History</p>
              <p className="as-h"><span><b>Marco</b> used it in run #0318<small>Today, 7:40 AM</small></span></p>
              <p className="as-h"><span><b>Ramon</b> edited it: “…and say by how much it’s over.”<small>Tue 15 Sep, 8:30 AM</small></span></p>
              <p className="as-h"><span><b>Marco</b> learned it from Ramon<small>Mon 14 Sep, 9:09 AM · <Source>Run #0290</Source></small></span></p>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Section title="Instructions, skills, memory, or commands">
        <When head={['', 'Instructions', 'Skills', 'Memory', 'Commands']} rows={[
          ['What it is', 'How the owner wants the Agent to work', 'A way of doing a task it learned', 'A fact it remembers', 'An ask people saved to reuse'],
          ['Example', '“Have the run ready by 8 AM every Monday.”', 'Handling split deliveries: two invoices against one PO', '“Island Grains often bills before the goods arrive.”', '/payrun'],
          ['Who writes it', 'The owner, in a textbox', 'The Agent, from sessions and corrections', 'The Agent, from what it sees and is told', 'Whoever saves it'],
          ['Who changes it', 'The owner: Save; History to restore', 'The owner: Edit, Turn off, Forget', 'Anyone accountable: Correct, Forget', 'Its maker'],
          ['Where', <>The Instructions tab. See {link('agents/profile', 'Agent profile')}</>, 'The Skills tab', <>The Memory tab. See {link('teaching/memory', 'Agent memory')}</>, <>The Commands tab, and the / menu. See {link('commands/library', 'Commands list')}</>],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption="A skill with its source and its uses. Ramon can see what Marco learned, from whom, and what it has done since.">
          <Win title="Marco / Skills">
            <p className="tc-sk"><b>Handling split deliveries: two invoices against one PO</b><span>Ramon corrected me, 21 Jul · <Source>Run #0212</Source></span><small>Used 9 times · last today, run #0318</small></p>
            <span className="tc-mem-acts"><a>Edit</a><a>Turn off</a><a>Forget</a></span>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Learning nobody can open. Marco pays Bohol Diesel over PO, and nobody at Metro Lending can say why, or stop it.">
          <Win title="Marco">
            <div className="tc-lock"><b>Marco improves automatically</b><span>He learns from your feedback over time. Learned behaviour can’t be viewed or changed.</span></div>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Show every skill on one tab.', 'The Skills tab, on the Agent’s page. Nothing it learns lives anywhere else.'],
            ['Say where each came from.', '“Ramon corrected me, 14 Sep”, linked to the session or run.'],
            ['Show when it was used.', 'Each run it shaped, so the owner can check it did the right thing.'],
            ['Let the owner edit, turn off, or forget it.', 'In place, each logged with who and when; Forget has Undo.'],
            ['Name skills for the task.', 'In the business’s words: “Spotting resent invoices”.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Learning nobody can see.', 'Marco pays differently, and nobody can say why.'],
            ['Skills with no source.', 'Nobody knows whether a correction or a guess taught it.'],
            ['Skills with no uses shown.', 'A wrong skill quietly shapes every run.'],
            ['Only Sageware can change them.', 'Ramon waits on support to stop a bad habit.'],
            ['Names like code.', '“sk_bohol_override_2” means nothing to Finance.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
