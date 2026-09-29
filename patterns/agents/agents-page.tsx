import { Section, Demo, Pair, Rules, Avoid, When, Win, Pill, Toast, Ini } from '../../site/kit';
import { AgentFrame, AgentAva, agentsCast, type AgentId } from './agent-kit';
import { cx } from '../../lib/cx';

// All Agents: one list of every Agent, reached from the All Agents link at the top of the Agents window’s sessions, what each is doing now, what waits on you, and Pause on every row.
// Drawn at rest, then with Bea just paused, then the statuses to avoid.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

type Row = { id: AgentId; state: 'Waiting on you' | 'Working' | 'Idle' | 'Paused'; now: string; waiting: number; last: string };

const rows = (beaPaused?: boolean): Row[] => [
  { id: 'marco', state: 'Waiting on you', now: 'Payment run #0318 and 6 reminders (#0319)', waiting: 2, last: '#0319 · Today, 9:15 AM' },
  { id: 'nico', state: 'Idle', now: 'Sent the September collections report', waiting: 0, last: '#0316 · Fri 25 Sep' },
  beaPaused
    ? { id: 'bea', state: 'Paused', now: 'Paused by Liza Tan, 10:05 AM. Proposal for Cebu Grains stopped at step 3 of 5.', waiting: 0, last: '#0315 · Thu 24 Sep' }
    : { id: 'bea', state: 'Working', now: 'Drafting a proposal for Cebu Grains, pricing from 14 past deals', waiting: 0, last: '#0315 · Thu 24 Sep' },
];

const tone = { 'Waiting on you': undefined, Working: undefined, Idle: 'off', Paused: 'bad' } as const;

function AgentsPage({ beaPaused }: { beaPaused?: boolean }) {
  const list = rows(beaPaused);
  const paused = list.filter(r => r.state === 'Paused').length;
  return (
    <AgentFrame on="Agents" as="lead" loud>
      <div className="as-a-page">
        <p className="as-crumb">Agents <span>/</span> <b>All Agents</b></p>
        <div className="as-a-head">
          <div><p className="m-title">All Agents</p><p className="as-meta"><span>3 Agents at Metro Lending · 2 things waiting on you</span></p></div>
          <span className="as-acts"><a className="m-link ap-runs">All runs</a></span>
        </div>
        <div className="as-views2">
          <span className="on">All<em>3</em></span>
          <span>Waiting on you<em>2</em></span>
          <span>Paused<em>{paused}</em></span>
        </div>
        <table className="m-tbl ap-tbl">
          <thead><tr><th>Agent</th><th>Owner</th><th>Now</th><th className="r">Waiting on you</th><th>Last run</th><th /></tr></thead>
          <tbody>{list.map(r => {
            const a = agentsCast[r.id];
            return (
              <tr key={r.id} className={cx(r.state === 'Waiting on you' && 'ap-wait', r.state === 'Paused' && 'ap-paused')}>
                <td><span className="ap-who"><AgentAva id={r.id} /><span><a className="m-link">{a.name}</a><small>{a.role}</small></span></span></td>
                <td>{a.owner}</td>
                <td><span className="ap-now"><Pill tone={tone[r.state]}>{r.state}</Pill><small>{r.now}</small></span></td>
                <td className="r">{r.waiting > 0 ? <a className="m-link">{r.waiting}</a> : <span className="ag-none">—</span>}</td>
                <td>{r.last}</td>
                <td className="ap-act"><span className={cx('ag-pause', r.state === 'Paused' && 'paused')}>{r.state === 'Paused' ? '▶ Resume…' : 'Pause'}</span></td>
              </tr>
            );
          })}</tbody>
        </table>
        {beaPaused && <div className="ap-toast"><Toast action="Resume…">Bea paused. Her run #0315 is paused; nothing was sent.</Toast></div>}
      </div>
    </AgentFrame>
  );
}

export default function AgentsPageDoc() {
  return (
    <>
      <Demo wide caption={<>Agents, in the top bar beside the bell, opens the Agents window; All Agents, the link at the top of its sessions, opens one list of every Agent. Each row says who owns it, what it’s doing now in plain words, how many things wait on you, and its last run. Marco has 2, which is the badge on Agents in the top bar; the count opens {link('approvals/waiting', 'Waiting on you')} filtered to him. Pause sits on every row.</>}>
        <AgentsPage />
      </Demo>

      <Demo wide caption="Liza clicked Pause on Bea. It takes effect at once, with no confirmation page: pausing is always safe, and Resume… undoes it, on a confirmation page. The row turns red, says who paused her and where her work stopped, and the toast confirms nothing went out. The Paused tab counts her.">
        <AgentsPage beaPaused />
      </Demo>

      <Section title="What each state shows">
        <When head={['State', 'The row says', 'What people can do']} rows={[
          ['Waiting on you', 'What’s waiting, with the run number: “Payment run #0318 and 6 reminders (#0319)”. The count is a link.', 'Open the count to see each card, and approve or suggest changes.'],
          ['Working', 'The run it’s on and the step: “Drafting a proposal for Cebu Grains, pricing from 14 past deals”.', 'Open the run to watch it, or Pause.'],
          ['Idle', 'The last thing it finished: “Sent the September collections report”.', 'Open the chat to brief it.'],
          ['Paused', 'Who paused it, when, and where its run stopped. In red, with Resume in place of Pause.', 'Resume, or open the stopped run and finish it yourself.'],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption="The status names the work and the run, so people know what’s happening without opening anything.">
          <Win title="Agents">
            <div className="ap-mini">
              <p><Ini n="MA" agent /><span><b>Marco</b><small>Waiting on you · payment run #0318</small></span><em>2</em></p>
              <p><Ini n="NI" agent /><span><b>Nico</b><small>Idle · sent the September collections report</small></span></p>
              <p><Ini n="BE" agent /><span><b>Bea</b><small>Working · proposal for Cebu Grains</small></span></p>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Green dots and “Online” say only that something is switched on. Nobody can tell that Marco has ₱48.65M waiting for a decision.">
          <Win title="Agents">
            <div className="ap-mini">
              <p><Ini n="MA" agent /><span><b>Marco</b><small>Online</small></span><i className="ap-dot" /></p>
              <p><Ini n="NI" agent /><span><b>Nico</b><small>Online</small></span><i className="ap-dot" /></p>
              <p><Ini n="BE" agent /><span><b>Bea</b><small>Active</small></span><i className="ap-dot" /></p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One list of every Agent.', 'All Agents, at the top of the Agents window’s sessions, opens it. Name, role, and owner on each row.'],
            ['Say what it’s doing now.', 'The state, then the work in plain words, with the run number.'],
            ['Count what waits on you.', 'The count on each row adds up to the badge on Agents, and opens the cards.'],
            ['Pause on every row.', 'One click, at once, no confirmation page. Resume takes its place.'],
            ['Say who paused it and where it stopped.', 'The row shows the name, the time, and the step, so anyone can pick it up.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Agents spread across Settings pages.', 'Nobody can see every Agent at once, or find one in a hurry.'],
            ['“Online” and a green dot.', 'It says the Agent exists, not what it’s doing to your books.'],
            ['A badge nobody can trace.', 'The badge says 2, and nobody can find which Agent is waiting.'],
            ['Pause behind a confirmation page or a menu.', 'The one control people need fast takes three clicks.'],
            ['A silent “Paused”.', 'Nobody knows who stopped Bea, or whether the proposal went out.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
