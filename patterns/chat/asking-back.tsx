import { Section, Demo, Pair, Rules, Avoid, Win, Btn, Ini } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, ChatPanel, AgentAva, Day, Me, Msg, Steps, Ask, ApprovalCard, Line, Reason, Source } from '../agents/agent-kit';
import './chat.css';

// When it asks back: an Agent that isn’t sure stops and asks, with the facts and two or three answers as buttons. It
// carries on with the rest meanwhile, shows it’s waiting wherever people look, and records the answer.

const question = <>INV-2291 from Luzon Packaging is <b>₱68,750 over</b> PO-4431, and I can’t find the new price agreed anywhere. Pay it, hold it, or ask Luzon for a corrected invoice?</>;
const options = ['Pay it', 'Hold it', 'Ask Luzon for a corrected invoice'];

export default function AskingBack() {
  return (
    <>
      <Demo wide caption={<>7:48 AM. Marco is preparing this week’s payment run and finds an invoice over its PO with no agreed price. It isn’t his call, so he asks: the facts, the records, and three answers as buttons. Ramon can also type something else. Meanwhile Marco carries on with the other 34 suppliers.</>}>
        <div className="ct-mid">
          <AgentFrame as="lead" loud waiting={1} overlay={
            <ChatPanel agent="marco" status="Waiting on you · a question on INV-2291" onPage="Invoices · Overdue in Cebu" composer="Answer, or tell Marco something else…">
              <Day label="Today" />
              <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
              <Steps items={[[true, 'Read the invoices due this week from 35 suppliers'], [true, 'Matched 30 suppliers cleanly to PO and delivery'], ['flag', 'INV-2291 is over its PO, and no new price was agreed'], [false, 'Checking the other 4…']]} />
              <Msg>
                <Ask question={question} options={options} />
                <span className="ag-line-s"><Source>INV-2291</Source><Source>PO-4431</Source><Source>Luzon emails, Sep</Source></span>
                <span className="ct-wait">Waiting on you since 7:48 AM. I’m carrying on with the rest.</span>
              </Msg>
            </ChatPanel>}>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<>Waiting shows wherever Ramon looks: the badge on Agents counts it, and on the Agents page Marco’s row says what he’s waiting for, since when, with Answer. The chat header says the same.</>}>
        <AgentFrame as="lead" on="Agents" waiting={1}>
          <div className="ct-under">
            <p className="as-crumb"><b>Agents</b></p>
            <div className="as-a-head"><div><p className="m-title">Agents</p><p className="as-meta"><span>3 Agents · 1 waiting on you</span></p></div></div>
            <table className="m-tbl ct-agents">
              <thead><tr><th>Agent</th><th>Doing now</th><th>Waiting on you</th><th>Owner</th><th /></tr></thead>
              <tbody>
                <tr className="ag-wait">
                  <td><span className="ag-cell"><AgentAva id="marco" size="sm" />Marco</span></td>
                  <td>Preparing this week’s payment run<small>Run #0318 · started 7:40 AM</small></td>
                  <td><b>A question on INV-2291</b><small>Since 7:48 AM</small><Btn kind="pri">Answer</Btn></td>
                  <td>Ramon Cruz</td>
                  <td><span className="ag-pause">Pause</span></td>
                </tr>
                <tr>
                  <td><span className="ag-cell"><AgentAva id="nico" size="sm" />Nico</span></td>
                  <td>Nothing running<small>Last: September collections report, Fri 25 Sep</small></td>
                  <td><span className="ag-none">—</span></td>
                  <td>Ramon Cruz</td>
                  <td><span className="ag-pause">Pause</span></td>
                </tr>
                <tr>
                  <td><span className="ag-cell"><AgentAva id="bea" size="sm" />Bea</span></td>
                  <td>Drafting a proposal for Cebu Grains<small>Run #0315 · started Thu 24 Sep</small></td>
                  <td><span className="ag-none">—</span></td>
                  <td>Liza Tan</td>
                  <td><span className="ag-pause">Pause</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo caption={<>7:51 AM. Ramon taps Ask Luzon for a corrected invoice. The answer stays marked, with who chose it and when, and Marco says what he did about it.</>}>
          <div className="ct-box tall">
            <ChatPanel agent="marco" status="Preparing this week’s payment run" onPage="Invoices · Overdue in Cebu">
              <Msg>
                <Ask question={question} options={options} picked="Ask Luzon for a corrected invoice" />
              </Msg>
              <p className="ct-chose">Ramon chose <b>Ask Luzon for a corrected invoice</b> · 7:51 AM</p>
              <Steps items={[[true, 'Emailed Luzon Packaging for a corrected invoice'], [true, 'Held INV-2291 out of run #0318']]} />
              <Msg>Done. When the corrected invoice comes in, I’ll match it to PO-4431 and put it in next week’s run.</Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo caption={<>The same answer, on the invoice’s history: the question, Ramon’s choice, and what Marco did, each linked to the run.</>}>
          <Win title="INV-2291 · Luzon Packaging · History">
            <div className="ct-hist">
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> held it out of payment run #0318<small>Today, 7:51 AM · <Reason>Ramon: ask Luzon for a corrected invoice.</Reason> <Source>Run #0318</Source></small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> emailed Luzon Packaging for a corrected invoice<small>Today, 7:51 AM · <Source>Email</Source></small></span></p>
              <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> answered: Ask Luzon for a corrected invoice<small>Today, 7:51 AM · <Source>Run #0318</Source></small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> asked: pay, hold, or ask for a corrected invoice?<small>Today, 7:48 AM · <Reason>₱68,750 over PO-4431, no new price agreed.</Reason></small></span></p>
              <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> read it in from the payables inbox<small>Thu 24 Sep</small></span></p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption={<>Marco asks, and the run waits on one invoice. On the run, Luzon Packaging is held with the reason.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Waiting on you · a question on INV-2291" onPage="Invoices · Overdue in Cebu">
              <Msg>
                <Ask question={question} options={options} />
                <span className="ct-wait">Waiting on you since 7:48 AM. I’m carrying on with the rest.</span>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>Marco guessed. INV-2291 is paid in full, ₱68,750 over its PO, and nothing on the card says so: it’s one line in the total.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Waiting on you · payment run #0318" onPage="Invoices · Overdue in Cebu">
              <Msg>Payment run #0318 is ready.</Msg>
              <ApprovalCard
                title="Payment run #0318"
                facts={[['To pay', '₱49,968,750.00'], ['Suppliers', '33 of 35'], ['Held', '2']]}
                lines={[
                  <Line name="30 suppliers, matched to PO and delivery" amount="₱39,723,500.00" />,
                  <Line name="Luzon Packaging" amount="₱1,318,750.00" />,
                ]}
              />
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Ask when the call isn’t the Agent’s.', 'Over its PO, a likely duplicate, goods not received: stop and ask.'],
            ['Give the facts and the choices.', 'The amount, the records, and two or three answers as buttons; typing still works.'],
            ['Hold one item, not the run.', 'The question holds INV-2291; the other 34 suppliers carry on.'],
            ['Show it’s waiting, everywhere.', 'The header, the badge on Agents, and the Agents page say what and since when.'],
            ['Record the answer.', 'Who chose what, and when, in the chat and on the record’s history.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Guessing silently.', 'An overpayment goes out as one line in a ₱49.9M total.'],
            ['“What should I do?”', 'An open question with no facts sends people digging through the invoice themselves.'],
            ['One question stopping everything.', 'Thirty-four suppliers wait on one invoice.'],
            ['A question only in the chat.', 'Ramon closed the panel, and the run sits until Friday.'],
            ['Answers that vanish.', 'Next month nobody knows why INV-2291 wasn’t paid.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
