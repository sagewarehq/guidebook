import { Section, Demo, Rules, Avoid, Btn, Pill } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps, Ask } from '../agents/agent-kit';
import { Flow, Saves, Under, alink, mlink } from './a-kit';

// Asking about a record: Ramon asks Marco how Metro Fuels stands. Three customers match, so Marco asks which, with
// something to tell them apart; then he answers with a short summary and a link to the full page. The figures add
// up: INV-1038 ₱420,000 (after PAY-0921, ₱760,000) + INV-1061 ₱684,000 + INV-1072 ₱538,000 = ₱1,642,000 owing, ₱420,000 of it overdue; credit limit
// ₱2,000,000, so ₱358,000 left. The overdue invoices and the missed promise match Chasing overdue customers.

const options = ['Metro Fuels · Cebu · Joy Santos', 'Metro Fuels Trading · Baguio · Dan Aquino', 'Metrobuild Supply · Baguio · archived'];

/** The customers list, drawn quietly under the chat. */
const Customers = () => <Under crumb={['Customers']} title="Customers" meta={<span>All branches · 4,812 customers</span>} />;

/** Marco’s summary of Metro Fuels: three key numbers, three lines, and the way to the full page. */
function Summary() {
  return (
    <div className="exa-sum">
      <p className="exa-sum-h"><b>Metro Fuels</b><small>Customer · Cebu · Net 30</small></p>
      <p className="ag-facts"><span><small>Owing</small>₱1,642,000.00</span><span><small>Overdue</small>₱420,000.00</span><span><small>Credit left</small>₱358,000.00</span></p>
      <div className="exa-sum-l">
        <p><small>Unpaid</small><span><a className="m-link">INV-1038</a> ₱420,000.00<Pill tone="bad">26 days overdue</Pill><br /><a className="m-link">INV-1061</a> ₱684,000.00, due 2 Oct<br /><a className="m-link">INV-1072</a> ₱538,000.00, due 14 Oct</span></p>
        <p><small>Last paid</small><span><a className="m-link">PAY-0921</a>, ₱760,000.00 on 18 Sep, against INV-1038</span></p>
        <p><small>Promised</small><span>₱420,000.00 by Fri 25 Sep, from Joy Santos<Pill tone="bad">Missed</Pill></span></p>
      </div>
      <p className="exa-sum-f"><Btn kind="pri">Open Metro Fuels</Btn><small>As of 10:31 AM. The full page has every invoice, payment, and note.</small></p>
    </div>
  );
}

export default function Lookup() {
  return (
    <>
      <Demo wide caption={<><b>1. Ask, and it checks which.</b> Three customers match “Metro Fuels”, so Marco asks rather than guess. Each option carries what tells them apart, and only customers Ramon may open are offered. On Metro Fuels’ own page, the page says which, so there’s no question.</>}>
        <div className="exa-mid">
          <AgentFrame as="lead" loud on="Customers" overlay={
            <ChatPanel agent="marco" status="Ready" onPage="Customers · All branches">
              <Day label="Today" />
              <Me>What’s the status of Metro Fuels?</Me>
              <Steps items={[[true, 'Searched customers for “Metro Fuels”: 3 close matches']]} />
              <Msg><Ask question="Three customers are close. Which one?" options={options} /></Msg>
            </ChatPanel>
          }>
            <Customers />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<><b>2. A summary, and the way in.</b> Ramon picks the Cebu one. Marco answers with what “how do they stand?” needs: what they owe and what’s overdue, the last payment, and the promise on file. Every invoice and payment is a link, and Open Metro Fuels goes to the full page.</>}>
        <div className="exa-mid">
          <AgentFrame as="lead" loud on="Customers" overlay={
            <ChatPanel agent="marco" status="Ready" onPage="Customers · All branches">
              <Me>What’s the status of Metro Fuels?</Me>
              <Msg><Ask question="Three customers are close. Which one?" options={options} picked={options[0]} /></Msg>
              <Msg><Summary /></Msg>
            </ChatPanel>
          }>
            <Customers />
          </AgentFrame>
        </div>
      </Demo>

      <Section title="The workflow">
        <Flow rows={[
          ['Ramon', 'Asks about a customer by name, from any page.', alink('chat/asking', 'Asking an Agent')],
          ['Marco', 'Uses the page as context: on Metro Fuels’ page, that’s the answer to which.', alink('chat/context', 'What the Agent can see')],
          ['Marco', 'Otherwise searches, and if more than one matches, asks which.', alink('chat/asking-back', 'When it asks back')],
          ['Marco', 'Answers with a short summary, every figure linked to its record.', <>{alink('chat/replies', 'Agent replies')}, {alink('explaining/sources', 'Sources')}</>],
          ['Ramon', 'Opens the full page for anything more.', <>{alink('chat/open-screen', 'Open the real screen')}, {mlink('records/detail', 'View record')}</>],
        ]} />
      </Section>

      <Section title="Why it saves time">
        <Saves rows={[
          ['Find the right customer', 'Search, and open two to tell them apart', 'Pick one of three'],
          ['Add up what’s owed, paid, and promised', 'Invoices tab, payments tab, then the notes', 'Three numbers and three lines'],
        ]} total={['3 to 4 minutes, 5 screens', 'About 20 seconds']} />
        <p className="g-see">Collections asks this about 30 times a day: about 2 hours back. People still decide what to do about it: call Joy, or send a reminder.</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Ask which when more than one matches.', 'Two or three options, each with the branch and one fact to tell them apart.'],
            ['Answer with a summary, not the record.', 'What they owe and what’s overdue, the last payment, and any promise.'],
            ['Link every figure, and the full page.', 'INV-1038 opens the invoice; Open Metro Fuels opens everything else.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Taking the first match.', 'Ramon reads Metro Fuels Trading’s balance as Metro Fuels’.'],
            ['The whole record in the chat.', 'Twelve fields, two tables, and the history, in a narrow bar.'],
            ['Figures with no way in.', 'Ramon searches for INV-1038 by hand to check it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
