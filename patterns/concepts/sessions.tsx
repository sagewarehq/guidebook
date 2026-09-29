import type { CSSProperties, ReactNode } from 'react';
import { Section, Demo, Pair, When, Rules, Avoid, Ini } from '../../site/kit';
import { AgentFrame, AgentAva, Day, Me, Msg, Steps, Ask, Source, HeldPill } from '../agents/agent-kit';
import './concepts.css';

// Sessions at the same time: one Agent runs many sessions at once, one per piece of work and per person, and a new
// one starts straight away. Two sessions (or a session and a person) touching one record: no locks, a version check
// on save. Short claims only where a double write costs money.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

type Sess = [ini: string, title: string, who: string, at: string, on?: boolean];

const running: Sess[] = [
  ['RC', 'Mactan Steel’s statement', 'Ramon · Running', '9:18 AM', true],
  ['RC', 'Payables due by 5 Oct', 'Ramon · Running', '9:00 AM'],
  ['RC', 'Bank lines, 28 Sep', 'Ramon’s schedule · Running', '9:05 AM'],
  ['AR', 'Who to call first in Cebu', 'Ana · Running', '9:16 AM'],
];
const waiting: Sess[] = [
  ['RC', 'Payment run #0318', 'Ramon · Waiting on you', '7:40 AM'],
  ['AR', 'Overdue reminders, Cebu', 'Ana · Waiting on you', '9:15 AM'],
];

const Row = ([ini, t, who, at, on]: Sess) => (
  <p key={t} className={on ? 'wh-s on' : 'wh-s'}><Ini n={ini} /><span><b>{t}</b><small>{who}</small></span><em>{at}</em></p>
);

/** The sessions column: every Agent with its counts, then Marco’s sessions by state, the newest selected. */
function SessionList() {
  return (
    <div className="wh-sess">
      <div className="ks-ags">
        <p className="ks-ag on"><AgentAva id="marco" size="sm" /><span><b>Marco</b><small>4 running, 2 waiting on you</small></span></p>
        <p className="ks-ag"><AgentAva id="nico" size="sm" /><span><b>Nico</b><small>1 running</small></span></p>
        <p className="ks-ag"><AgentAva id="bea" size="sm" /><span><b>Bea</b><small>1 running</small></span></p>
      </div>
      <p className="wh-sess-h"><b>Marco’s sessions</b><small className="ks-tog"><b>Everyone</b> · Mine</small></p>
      <p className="ks-grp">Running · 4</p>
      {running.map(Row)}
      <p className="ks-grp">Waiting on you · 2</p>
      {waiting.map(Row)}
    </div>
  );
}

/** The chat in the middle of the Agents window: a header naming the session, the feed, and the message box. */
function Chat({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="wh-chat">
      <p className="wh-chat-h"><AgentAva id="marco" size="sm" /><b>{title}</b><small>with Marco</small></p>
      <div className="ag-feed">{children}</div>
      <div className="ag-in"><span>Ask Marco, or tell him what to change…</span><i>↑</i></div>
    </div>
  );
}

/** The drawer on the right: a title, ×, and what the chat is about. */
function Drawer({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <div className="wh-detail">
      <p className="wh-detail-h"><b>{title}</b><span>×</span></p>
      <p className="wh-sub">{sub}</p>
      {children}
    </div>
  );
}

/** One line of a record’s history. */
const H = ({ ini, agent, who, what, meta }: { ini: string; agent?: boolean; who: string; what: ReactNode; meta: ReactNode }) => (
  <p className="as-h"><Ini n={ini} agent={agent} /><span><b>{who}</b> {what}<small>{meta}</small></span></p>
);

export default function Sessions() {
  return (
    <>
      <Demo wide caption={<><b>One Agent, many sessions.</b> Ramon’s Agents window at 9:20 AM. Marco has a session for each piece of work and each person: four running side by side, and two waiting on Ramon. Ramon’s statement check started the moment he asked; nothing waits in line. The drawer shows what each running session is doing right now, so Ramon can see what else is touching his suppliers.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <div className="wh-ws ks-three">
            <SessionList />
            <Chat title="Mactan Steel’s statement">
              <Day label="Today" />
              <Me>Check Mactan Steel’s September statement against what we’ve paid them.</Me>
              <Steps items={[[true, 'Read Mactan Steel’s September statement: 14 lines'], [false, 'Checking each line against what we’ve paid']]} />
            </Chat>
            <Drawer title="Marco, right now" sub="4 sessions running · 2 waiting on you">
              <div className="ks-now">
                <p><span>Mactan Steel’s statement<small>Ramon · 9:18 AM</small></span><b>Checking 14 lines</b></p>
                <p><span>Payables due by 5 Oct<small>Ramon · 9:00 AM</small></span><b>Matching 18 invoices</b></p>
                <p><span>Bank lines, 28 Sep<small>Ramon’s schedule · 9:05 AM</small></span><b>Drafting matches</b></p>
                <p><span>Who to call first in Cebu<small>Ana · 9:16 AM</small></span><b>Reading 12 invoices</b></p>
              </div>
              <small className="ks-note">Each session is separate. A new one starts at once.</small>
            </Drawer>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<><b>Two touch one record.</b> At 9:02 Marco’s payables session read INV-2291, Luzon Packaging, still ₱68,750.00 over its PO. At 9:10 Ana entered Luzon’s corrected invoice. At 9:12 Marco went to save it as held: the save was refused, because the invoice had changed since he read it. He re-read it, redid that one step, and said so. The history on the right shows both changes, in order.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <div className="wh-ws ks-two">
            <Chat title="Payables due by 5 Oct">
              <Day label="Today" />
              <Me>Line up the invoices due by 5 Oct. Hold anything that doesn’t match its PO.</Me>
              <Steps items={[[true, 'Read 18 invoices due by 5 Oct, at 9:02 AM'], [true, 'Matched 17 to their PO and delivery'], [true, 'Re-read INV-2291 at 9:12 AM, and checked it again']]} />
              <Msg>INV-2291 changed since I read it (Ana, 9:10: amount ₱1,318,750.00 → ₱1,250,000.00). Now within PO-4431, so I’ve moved it from held to pay. <Source>INV-2291</Source> <Source>PO-4431</Source></Msg>
            </Chat>
            <Drawer title="INV-2291" sub="Luzon Packaging · PO-4431, ₱1,250,000.00">
              <p className="wh-big">₱1,250,000.00</p>
              <p className="ks-ver"><span><small>Marco read it</small>9:02 AM</span><span><small>Last changed</small>9:10 AM, Ana</span></p>
              <div className="ks-hist">
                <p className="m-k">History</p>
                <H ini="MA" agent who="Marco" what="moved it from held to pay, in his draft" meta="Today, 9:12 AM · Payables due by 5 Oct" />
                <H ini="AR" who="Ana" what="changed the amount, ₱1,318,750.00 → ₱1,250,000.00" meta="Today, 9:10 AM · Corrected invoice from Luzon" />
                <H ini="MA" agent who="Marco" what={<>matched it to PO-4431, and held it <HeldPill /></>} meta={<>Wed 23 Sep · <Source>Run #0312</Source></>} />
              </div>
            </Drawer>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="When the change touches the decision, Marco asks. A new account to pay into is Ramon’s call, not a step to redo.">
          <div className="kc-scr">
            <p className="m-k">Payables due by 5 Oct · with Marco</p>
            <Msg>
              <Ask question="INV-2291 changed since I read it (Ana, 9:10: pay to BPI ••2208, was BDO ••1937). A new account changes who gets the money. What should I do?" options={['Hold until Luzon confirms by phone', 'Pay to BPI ••2208…']} />
            </Msg>
          </div>
        </Demo>
        <Demo verdict="avoid" caption="Last save wins. Marco saves the copy he read at 9:02, and puts back the amount Ana corrected. Nobody is told.">
          <div className="kc-scr">
            <p className="m-k">INV-2291 · History</p>
            <H ini="MA" agent who="Marco" what="set the amount to ₱1,318,750.00, and held it" meta="Today, 9:12 AM" />
            <H ini="AR" who="Ana" what="changed the amount, ₱1,318,750.00 → ₱1,250,000.00" meta="Today, 9:10 AM" />
          </div>
        </Demo>
      </Pair>

      <Demo wide caption={<><b>A short claim, only where money moves.</b> Tomorrow at 9:00 AM, run #0318 sends its 32 payments to BDO. For the few seconds that takes, the send from BDO ••4471 belongs to that run, so two batches can’t cross or pay twice. Marco’s payables session, ready to send Luzon’s payment that Ramon approved, waits its turn, then sends.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <div className="wh-ws ks-two">
            <Chat title="Payables due by 5 Oct">
              <Day label="Tue 29 Sep" />
              <Steps items={[[true, 'Ramon approved paying INV-2291 today, 8:59 AM'], [true, 'Ready to send ₱1,250,000.00 to Luzon Packaging'], [false, 'Waiting a few seconds: run #0318 is sending from BDO ••4471']]} />
            </Chat>
            <Drawer title="Run #0318" sub="32 payments · ₱48,650,000.00">
              <p className="ks-send"><b>Sending to BDO…</b><span>This run has the send from BDO ••4471. Other sessions wait a few seconds.</span></p>
              <div className="kc-meter" style={{ '--kc-fill': '72%' } as CSSProperties}><p><span>Sent</span><span>23 of 32</span></p><i /></div>
            </Drawer>
          </div>
        </AgentFrame>
      </Demo>

      <Section title="Who waits, and when">
        <When head={['When a session is', 'What happens', 'Who waits']} rows={[
          ['Reading a record', 'It reads the latest version, and remembers which one it read', 'Nobody. Reads never wait.'],
          ['Changing a record', 'The save goes through only if the record hasn’t changed since the read. If it has, the Agent re-reads and redoes that step, or asks', 'Nobody. The late save is refused, not queued.'],
          ['Sending money or a batch', 'The session claims the send for the seconds it takes', 'Other sessions sending from that account, for seconds'],
          ['Starting while others run', 'It starts at once, side by side with the rest', 'Nobody. Sessions never queue behind each other.'],
        ]} />
        <p className="g-see">The same rule as people editing a record: say who changed what, and never overwrite it. See <a className="m-link" href="#/management/records/edit">The edit page</a>. Every change shows in {link('explaining/history', 'the history')}.</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One session per piece of work, per person.', 'Ramon’s payables, Ana’s Cebu calls, and the bank lines run side by side.'],
            ['Start every session at once.', 'A new ask never waits behind another; each says what it’s doing now.'],
            ['Save only if nothing moved since the read.', 'Each session keeps the version it read; a save against a newer one is refused.'],
            ['Redo the one step, or ask.', 'Say who changed what, and when. Ask if the change touches the decision.'],
            ['Claim for seconds, only where money moves.', 'Sending a batch to the bank. Everything else uses the version check.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['One long session everyone shares.', 'Ana’s question lands in the middle of Ramon’s payables, and neither can follow it.'],
            ['A queue behind other work.', 'Ana’s quick question waits for Ramon’s payables to finish.'],
            ['Last save wins.', 'Marco saves the copy he read at 9:02, and Ana’s correction is gone.'],
            ['Redoing the whole session.', 'One changed invoice restarts all 18, and Ramon waits another half hour.'],
            ['Locking records while an Agent works.', 'Ana can’t correct INV-2291 while Marco’s session is reading payables.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
