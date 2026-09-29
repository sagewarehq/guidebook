import { Section, Demo, Pair, Rules, Avoid, When, Btn } from '../../site/kit';
import { Day, Me, Msg, Steps } from '../agents/agent-kit';
import { FocusView, Event, Draft, Statement, statementTitle } from './focus-kit';
import './chat.css';

// Record and chat, full screen: when a session is about one record or file, the record gets the screen. It sits large
// on the left, the chat on the right, and nothing else: no app sidebar, no sessions. As people keep talking, the record
// updates in place: drafted changes are marked where they land, with Approve / Reject / Edit, and the chat says what
// moved. The example is BDO ••4471’s September statement, as in Examples › Reconciling a bank statement.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** The chat so far: Ramon’s ask, what Marco did, and where the fixes are. */
const Drafted = () => (
  <>
    <Day label="Today" />
    <Me>Reconcile the BDO statement with the system. Tell me how to fix anything that doesn’t match.</Me>
    <Steps items={[[true, 'Matched 207 of 213 lines to payments and transfers'], [true, 'Checked the other 6 against open invoices and bills'], ['flag', '1 deposit I can’t place']]} />
    <Msg>I’ve drafted a fix for 5 of the 6, marked in the statement beside each line. Line 131 I can’t place, so I’ve asked you there.</Msg>
  </>
);

export default function Focus() {
  return (
    <>
      <Demo wide caption={<><b>Full screen, on the statement.</b> Ramon opened the September statement from the chat (the file chip, or Open full screen on the drawer). The app sidebar and the sessions column go; the statement takes about two thirds of the window, at full size, and Marco’s chat keeps the rest. Each of the 6 lines that don’t match has its drafted fix under it, marked Draft, with Approve, Edit, and Reject. Nothing in the books changes until Ramon applies them.</>}>
        <FocusView title={statementTitle} sub="with Marco" status="Waiting on you · 6 fixes" record={<Statement view="drafted" />} chat={<Drafted />} />
      </Demo>

      <Demo wide caption={<><b>Keep talking; the record follows.</b> Ramon approves line 162 in the statement, and the chat notes it. Then he asks for the bank charges in two. Marco changes that one draft, marks it Changed just now, and says in the chat exactly what moved and that nothing else did. Ramon is already typing the next ask.</>}>
        <FocusView title={statementTitle} sub="with Marco" status="Waiting on you · 5 fixes" composer="Leave line 131 for now; I’ll ask Liza." record={<Statement view="split" />} chat={<>
          <Me>Reconcile the BDO statement with the system. Tell me how to fix anything that doesn’t match.</Me>
          <Msg>I’ve drafted a fix for 5 of the 6, marked in the statement beside each line. Line 131 I can’t place, so I’ve asked you there.</Msg>
          <Event>You approved <b>line 162</b> · ₱318,000.00 from Pacific Cartons · 10:14 AM</Event>
          <Me>Split the bank charges into the service charge and the transfer fees.</Me>
          <Msg><span><b>Changed the draft for lines 211–212:</b> ₱250.00 service charge, and ₱1,000.00 for 5 transfers at ₱200.00 each. Nothing else moved.</span></Msg>
        </>} />
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>The change shows where it lands: under lines 211–212, marked Changed just now, with its answers beside it. The chat says it in one line.</>}>
          <div className="fv-mini">
            <table className="m-tbl fv-tbl">
              <tbody>
                <tr><td>211–212</td><td>25 Sep</td><td>Service charge, 5 transfer fees</td><td className="r">− 1,250.00</td></tr>
                <tr className="fv-sub"><td /><td colSpan={3}><Draft kind="Add expenses" state="changed" what="₱250.00 service charge, and ₱1,000.00 for 5 transfers" why="Split in two at Ramon’s ask." sources={['Line 211', 'Line 212']} /></td></tr>
              </tbody>
            </table>
            <Msg><span><b>Changed the draft for lines 211–212.</b> Nothing else moved.</span></Msg>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>The change lives only in the chat. The statement looks the same as before, so Ramon scrolls 214 lines to find what moved, and can’t tell whether anything else did.</>}>
          <div className="fv-mini">
            <table className="m-tbl fv-tbl">
              <tbody>
                <tr><td>211–212</td><td>25 Sep</td><td>Service charge, 5 transfer fees</td><td className="r">− 1,250.00</td></tr>
                <tr><td>213</td><td>25 Sep</td><td>Interest earned</td><td className="r">+ 1,212.40</td></tr>
              </tbody>
            </table>
            <Msg><span>Done! I’ve updated the reconciliation with your changes. <Btn kind="quiet">Show details</Btn></span></Msg>
          </div>
        </Demo>
      </Pair>

      <Section title="Right bar, Agents window, or full screen">
        <When head={['When people', 'Use', 'Why']} rows={[
          ['Ask a quick question about the page they’re on', 'The right bar', 'Beside the page, which stays in view; the answer is short'],
          ['Hand over work, or keep several pieces going', 'The Agents window', 'Sessions on the left, one per piece of work, the chat in the middle'],
          ['Glance at a run or record mid-conversation', 'The window’s drawer', 'A quick look; Open full screen to work on it'],
          ['Check or change one record or file with the Agent', 'Full screen', 'The record large, the chat beside it, drafts marked in place'],
        ]} />
        <p className="g-see">Full screen is the same session: ← Agents and Exit full screen go back to the window with the chat and every draft as they were. See {link('agents/overview', 'Where the Agent lives')}, and {link('examples/reconcile', 'Reconciling a bank statement')} for the whole workflow.</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Give one record the screen.', 'When a session is about one record or file, Open full screen hides the sidebar and sessions.'],
            ['The record large on the left, the chat on the right.', 'About two thirds for the record, at full size; a third for the chat and its box.'],
            ['Mark drafts where they land.', 'Under the line or field they change, marked Draft, with Approve, Edit, Reject.'],
            ['Say in the chat what moved.', 'Which line, from what to what, and that nothing else changed.'],
            ['One way back, nothing lost.', '← Agents and Exit full screen return to the window, session and drafts intact.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A 214-line statement in a narrow drawer.', 'Columns wrap, amounts cut off, and people lose their place.'],
            ['Record and chat squeezed beside sessions.', 'Four columns at once, and none of them readable.'],
            ['Changes only in the chat.', 'People scroll the statement to find what moved.'],
            ['“Done! I’ve updated it.”', 'Nobody knows which draft changed, or whether others did too.'],
            ['Full screen as a dead end.', 'Leaving it closes the session, or drops the drafts.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
