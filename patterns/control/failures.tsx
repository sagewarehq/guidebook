import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill } from '../../site/kit';
import { AgentFrame, AgentAva, ChatPanel, Day, Me, Msg, Steps, Source, RunTable } from '../agents/agent-kit';
import './control.css';

// When a run can’t finish, the Agent hands it to a named person: a card in the chat and in Waiting on you that says
// what’s done, what’s left, what went wrong in plain words, and what to do next, as buttons.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** The hand-back card: who has it now, what’s done, what’s left, what went wrong, and the ways on. */
function HandBack() {
  return (
    <div className="ag-card">
      <div className="ag-card-h"><b>Run #0321 couldn’t finish</b><small>Handed to Ramon Cruz, Marco’s owner · 11:05 AM</small></div>
      <p className="ag-facts"><span><small>Done</small>41 deposits</span><span><small>Left</small>63 deposits</span><span><small>Tried</small>3 times</span></p>
      <div className="cs-hb">
        <p><small>What’s done</small><span><b>41 Metrobank deposits, ₱8,214,300.00,</b> matched to 38 invoices and recorded as payments.</span></p>
        <p className="left"><small>What’s left</small><span><b>63 BDO deposits from Fri 25 Sep.</b> None were recorded, so nothing needs undoing.</span></p>
        <p><small>What went wrong</small><span>BDO’s online banking didn’t respond at 10:45, 10:55, or 11:05 AM. BDO says it’s down for maintenance until 1:00 PM.</span></p>
      </div>
      <p className="ag-acts"><Btn kind="pri">Retry at 1:00 PM</Btn><Btn>Upload BDO’s statement…</Btn><Btn kind="quiet">I’ll do it myself</Btn><small>Reference for support: R0321-3. <Source>Run #0321</Source></small></p>
    </div>
  );
}

export default function Failures() {
  return (
    <>
      <Demo wide caption={<>Marco couldn’t reach BDO’s online banking, so run #0321 can’t finish. He tried three times, ten minutes apart, then handed it to Ramon, who asked for it. The card says what’s done, what’s left, and what went wrong, and offers three ways on. It sits in Waiting on you too, at the top, and the badge on Agents now counts 3.</>}>
        <AgentFrame on="Agents" as="lead" waiting={3} loud overlay={
          <ChatPanel agent="marco" status="Waiting on you · run #0321 handed back" onPage="Agents · Waiting on you">
            <Day label="Today" />
            <Me>Match Friday’s deposits to their invoices, from both banks.</Me>
            <Steps items={[[true, 'Downloaded Friday’s Metrobank statement: 41 deposits'], [true, 'Matched all 41 to 38 invoices, and recorded them'], ['flag', 'BDO online banking didn’t respond, 3 times']]} />
            <Msg>I couldn’t finish, so I’ve handed the rest to you.</Msg>
            <HandBack />
          </ChatPanel>}>
          <div className="as-a-page">
            <p className="as-crumb">Agents <span>/</span> <b>Waiting on you</b></p>
            <div className="as-a-head"><div><p className="m-title">Waiting on you</p><p className="as-meta"><span>3 things · the oldest since 9:15 AM</span></p></div></div>
            <table className="m-tbl cs-agents">
              <thead><tr><th>Run</th><th>What</th><th>Since</th></tr></thead>
              <tbody>
                <tr className="cs-off"><td><a className="m-link">#0321</a></td><td><span className="ag-cell"><AgentAva id="marco" size="sm" /><span>Couldn’t finish: Friday’s deposits<small>63 BDO deposits left for you</small></span></span></td><td><Pill tone="bad">Handed back</Pill> 11:05 AM</td></tr>
                <tr><td><a className="m-link">#0319</a></td><td><span className="ag-cell"><AgentAva id="marco" size="sm" /><span>6 reminders ready to send<small>Overdue invoices in Cebu</small></span></span></td><td>9:15 AM</td></tr>
                <tr><td><a className="m-link">#0320</a></td><td><span className="ag-cell"><AgentAva id="marco" size="sm" /><span>14 invoices held from Q3 matching<small>Partly done: 1,180 of 1,200 matched</small></span></span></td><td>10:38 AM</td></tr>
              </tbody>
            </table>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="What went wrong, in words Finance reads, then what to do. The technical detail goes in the log, and the reference lets support find it. See Writing › Errors.">
          <Win title="Chat · Marco">
            <div className="cs-feed">
              <Msg>
                <span>I couldn’t reach BDO’s online banking. I tried at 10:45, 10:55, and 11:05 AM, and BDO says it’s down for maintenance until 1:00 PM.</span>
                <span>The 41 Metrobank deposits are recorded. None of the 63 BDO deposits are, so nothing needs undoing.</span>
                <span className="cs-btns"><Btn kind="pri">Retry at 1:00 PM</Btn><Btn>Upload BDO’s statement…</Btn></span>
                <small className="cs-foot">Reference for support: R0321-3</small>
              </Msg>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="A stack trace. It means nothing to Ramon, doesn’t say whether the 41 Metrobank deposits were kept, and offers no way on.">
          <Win title="Chat · Marco">
            <div className="cs-feed">
              <Msg>
                <span>Run #0321 failed.</span>
                <span className="cs-code">ConnectTimeout: HTTPSConnectionPool(host='online.bdo.com.ph', port=443): Max retries exceeded with url: /api/v2/statements?date=2026-09-25 (Caused by ConnectTimeoutError)</span>
              </Msg>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Demo wide verdict="do" caption="The runs list tells the truth: Partly done, with the count, and who has the rest.">
        <Win title="Agents / Runs">
          <RunTable rows={[
            { no: '#0321', agent: 'marco', task: 'Match Friday’s deposits', started: 'Today, 10:40 AM', state: 'Partly done', result: '41 of 104 matched; 63 with Ramon' },
            { no: '#0320', agent: 'marco', task: 'Match Q3 supplier invoices', started: 'Today, 10:04 AM', state: 'Partly done', result: '1,180 of 1,200 matched; 14 held, 6 not fetched' },
          ]} />
        </Win>
      </Demo>
      <Demo wide verdict="avoid" caption="A silent failure. The run says Done, and 63 BDO deposits sit unmatched until someone asks why Cebu’s collections look low at month-end.">
        <Win title="Agents / Runs">
          <RunTable rows={[
            { no: '#0321', agent: 'marco', task: 'Match Friday’s deposits', started: 'Today, 10:40 AM', state: 'Done', result: '41 deposits matched' },
            { no: '#0320', agent: 'marco', task: 'Match Q3 supplier invoices', started: 'Today, 10:04 AM', state: 'Partly done', result: '1,180 of 1,200 matched; 14 held, 6 not fetched' },
          ]} />
        </Win>
      </Demo>

      <Section title="What the Agent does, and who gets it">
        <When head={['What went wrong', 'What the Agent does', 'Who gets it']} rows={[
          ['Something outside is down: a bank portal, an email server.', 'Tries 3 times, 10 minutes apart, then hands back what’s left.', 'The person who asked.'],
          ['Something is missing: a PO, a delivery, a document.', 'Holds that line, says what would clear it, and carries on with the rest.', <>Whoever can supply it. See {link('explaining/holds', 'Holds and flags')}.</>],
          ['It isn’t allowed: outside its role.', 'Stops at once, and says who can.', <>The person who asked. See {link('agents/access', 'Giving an Agent access')}.</>],
          ['A scheduled run can’t finish.', 'The same as above.', 'The Agent’s owner, named on its page: Ramon, for Marco.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Hand it to a named person.', 'The person who asked, or the Agent’s owner for scheduled work: never “the team”.'],
            ['Say what’s done and what’s left.', 'With counts and amounts, and whether anything needs undoing.'],
            ['Say what went wrong in plain words.', 'What happened, then what to do, with a reference for support. See Writing › Errors.'],
            ['Offer the ways on as buttons.', 'Retry, do it another way, or take it yourself.'],
            ['Put it where decisions wait.', 'In the chat, at the top of Waiting on you, on the badge, and as Partly done in the runs list.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A failure nobody owns.', 'It lands in a shared inbox, and everyone assumes someone else has it.'],
            ['“The run failed.”', 'Nobody knows the 41 Metrobank deposits were kept, so someone records them twice.'],
            ['A stack trace.', 'A timeout and a URL mean nothing to Finance, and give support nothing to quote.'],
            ['A dead end.', 'The message explains, but the only way on is to brief the Agent again from scratch.'],
            ['Failing silently.', 'The run says Done, and 63 deposits sit unmatched until month-end.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
