import { Section, Demo, Rules, Avoid, When, Win, Btn, Toast } from '../../site/kit';
import { AgentFrame, AgentHead } from '../agents/agent-kit';
import { teamCmds, type Cmd } from './commands-kit';

// Commands list: the Commands tab on an Agent’s profile, beside Instructions, Sessions, Schedule, Memory, and Skills. Yours
// first, then the team’s, each with what it does, who made it, who can use it, how often it’s used, and when it was
// last edited. A command no longer needed is archived, never deleted: out of the / menu, and restorable.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

// A row: the command, who can use it, used this month, and last edited.
type Row = [Cmd, string, string, string];

const yours: Row[] = [
  [teamCmds.payrun, 'Finance', 'Once', 'Tue 22 Sep · version 2'],
  [teamCmds.receipts, 'Just me', '3 times', 'Mon 7 Sep · version 1'],
];
const team: Row[] = [
  [teamCmds.explain, 'Everyone who can use Marco', '23 times', 'Mon 14 Sep · version 3'],
  [teamCmds.remind, 'Everyone who can use Marco', '18 times', 'Fri 18 Sep · version 2'],
];

function Table({ rows, mine }: { rows: Row[]; mine?: boolean }) {
  return (
    <table className="m-tbl cm-tbl">
      <thead><tr><th>Command</th><th>Made by</th><th>Who can use it</th><th>Used this month</th><th>Last edited</th><th /></tr></thead>
      <tbody>{rows.map(([c, who, used, edited]) => (
        <tr key={c.name}>
          <td><a className="m-link">{c.name}</a><span>{c.desc}</span></td>
          <td>{mine ? 'You' : c.by}</td><td>{who}</td><td>{used}</td><td>{edited}</td>
          <td className="cm-acts">{mine ? <><a>Edit</a><a>Archive</a></> : <><a>Copy to yours</a><a>Archive</a></>}</td>
        </tr>
      ))}</tbody>
    </table>
  );
}

export default function Library() {
  return (
    <>
      <Demo wide caption={<>Marco’s profile, Commands tab, beside his Instructions, Sessions, Schedule, Memory, and Skills. Ramon’s own commands first, then the ones others shared with him. Each says what it does, who made it, who can use it, how often it was used this month, and when it was last edited. A name opens the command’s page, with its versions.</>}>
        <AgentFrame on="Agents" as="lead" loud>
          <div className="as-a-page cm-page">
            <AgentHead id="marco" on="Commands" />
            <p className="cm-p">Asks people saved to reuse with Marco. They come after the six built-in commands in the / menu, which are the same for every Agent.</p>
            <div className="cm-grp">
              <p className="cm-grp-h"><span className="m-k">Yours</span><small>2</small><span className="as-grow" /><a className="m-link">Archived (1)</a></p>
              <Table rows={yours} mine />
            </div>
            <div className="cm-grp">
              <p className="cm-grp-h"><span className="m-k">Team</span><small>2 you can use</small></p>
              <Table rows={team} />
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>Ramon archives /payrun-cebu, the Cebu-only run he made before /payrun. It leaves the / menu at once, with Undo. Archived (1) lists it with who archived it and when, and Restore. The sessions it started still say which command they came from.</>}>
        <AgentFrame on="Agents" as="lead" loud>
          <div className="as-a-page cm-page">
            <AgentHead id="marco" on="Commands" crumb={['Archived']} title="Archived commands" meta={<span>Out of the / menu. Restore one to use it again.</span>} acts={<Btn>Back to commands</Btn>} />
            <table className="m-tbl cm-tbl">
              <thead><tr><th>Command</th><th>Made by</th><th>Archived</th><th>Sessions it started</th><th /></tr></thead>
              <tbody>
                <tr className="cm-sel">
                  <td><a className="m-link">/payrun-cebu</a><span>Prepare the Cebu suppliers’ payment run.</span></td>
                  <td>You</td><td>By you, today 10:30 AM</td><td>9, kept</td>
                  <td className="cm-acts"><a>Restore</a></td>
                </tr>
              </tbody>
            </table>
            <div className="cm-toast"><Toast action="Undo">/payrun-cebu archived. It’s out of the / menu.</Toast></div>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide verdict="do" caption="Each command with what it does, who made it, and how often it’s used. Ramon can see /explain is worth keeping.">
        <Win title="Marco · Commands">
          <Table rows={team.slice(0, 1)} />
        </Win>
      </Demo>
      <Demo wide verdict="avoid" caption="Bare names with Delete. Nobody knows which are used, and a deleted command leaves its old sessions pointing at nothing.">
        <Win title="Marco · Commands">
          <table className="m-tbl cm-tbl">
            <tbody>
              {['/explain', '/pr2', '/payrun-cebu'].map(n => <tr key={n}><td>{n}</td><td className="cm-acts"><Btn>Delete</Btn></td></tr>)}
            </tbody>
          </table>
        </Win>
      </Demo>

      <Section title="Who can do what">
        <When head={['To', 'Who', 'How']} rows={[
          ['Use a command', 'Whoever it’s shared with', 'Type / in the chat, or open it here'],
          ['Edit it', 'Its maker', <>Edit command makes a new version. See {link('commands/making', 'Making a command')}</>],
          ['Copy it', 'Anyone who can use it', 'Copy to yours, then change your copy'],
          ['Archive or restore it', 'Its maker, or the Agent’s owner', 'Archive, with Undo; Restore from Archived'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A Commands tab on each Agent.', 'Beside Instructions, Sessions, Schedule, Memory, and Skills.'],
            ['Yours, then the team’s.', 'What you made first, then what others shared with you.'],
            ['Say what, who, and how often.', 'Description, maker, who can use it, use this month, last edited.'],
            ['Archive, never delete.', 'Out of the / menu at once, with Undo; restorable from Archived.'],
            ['Let the owner tidy up.', 'The maker edits; the Agent’s owner can archive any command.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Commands only in the menu.', 'Nobody can see them all, or who made them.'],
            ['One long mixed list.', 'Your two commands lost among thirty.'],
            ['Bare names.', 'Nobody knows which are used, or safe to archive.'],
            ['Deleting commands.', 'Old sessions point at a command that no longer exists.'],
            ['Commands nobody can remove.', 'The maker left in June, and /old-payrun is still in the menu.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
