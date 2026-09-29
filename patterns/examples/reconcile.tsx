import { Section, Demo, Rules, Avoid, Btn } from '../../site/kit';
import { Day, Me, Msg, Steps } from '../agents/agent-kit';
import { FocusView, Event, Statement, statementTitle } from '../chat/focus-kit';
import { Flow, Saves, FileChip, alink, mlink } from './a-kit';

// Reconciling a bank statement: Ramon drops BDO ••4471’s September statement into Marco’s chat. Marco checks the file
// itself, matches its lines to the system, and drafts a fix for each line that doesn’t match. The session opens full
// screen (Chat › Record and chat, full screen): the statement large on the left, the chat on the right, each draft
// marked under its line. Ramon approves, edits, or rejects each one, and applies them on one confirmation page. The
// figures add up: 18,402,315.60 opening + 24,118,420.00 in − 20,975,610.25 out = 21,545,125.35 closing; 214 lines in
// the file, one repeated, so 213 real lines (131 in, 82 out), 207 matched and 6 to fix.

/** Ramon’s ask, with the statement attached. */
const Asked = () => (
  <>
    <Day label="Today" />
    <p className="exa-files"><FileChip name="BDO-4471-Sep-2026.csv" meta="214 lines · 38 KB" /></p>
    <Me>Here’s the BDO statement to 25 Sep. Check it, reconcile it, and tell me how to fix what doesn’t match.</Me>
  </>
);

export default function Reconcile() {
  return (
    <>
      <Demo wide caption={<><b>1. Upload and ask.</b> Ramon drops the statement into a new session with Marco. The session is about one file, so it opens full screen: the statement on the left, the chat on the right. Marco checks the file on its own first: the export repeated line 88 as line 89, so he counts it once, and says so.</>}>
        <div className="exa-fv">
          <FocusView title={statementTitle} sub="with Marco" status="Working · checking the file" record={<Statement view="check" />} chat={<>
            <Asked />
            <Steps items={[[true, 'Read 214 lines, 1–25 Sep 2026, BDO ••4471'], ['flag', 'Line 89 repeats line 88'], [true, 'Added up every line to the closing balance']]} />
            <Msg>The file adds up once line 89 is counted once. Matching it to the system now.</Msg>
          </>} />
        </div>
      </Demo>

      <Demo wide caption={<><b>2. A fix drafted under each mismatch.</b> 207 of 213 lines match. The other 6 show in the statement, each with Marco’s drafted fix under it and Approve, Edit, and Reject; the deposit he can’t place, he asks about in place. Ramon approves line 162, and asks for the bank charges in two. Apply fixes… opens a confirmation page that says what changes in the books.</>}>
        <div className="exa-fv">
          <FocusView title={statementTitle} sub="with Marco" status="Waiting on you · 5 fixes" record={<>
            <Statement view="split" />
            <p className="exa-fv-more"><span>⋯ 4 more: line 162, approved; lines 178, 211–212, and 213, drafted</span><Btn kind="pri">Apply 1 fix…</Btn></p>
          </>} chat={<>
            <Steps items={[[true, 'Matched 207 of 213 lines'], [true, 'Drafted a fix for 5 of the other 6'], ['flag', '1 deposit I can’t place']]} />
            <Msg>Each fix is marked under its line; line 131 is a question for you.</Msg>
            <Event>You approved <b>line 162</b> · 10:14 AM</Event>
          </>} composer="Split the bank charges into the service charge and the transfer fees." />
        </div>
      </Demo>

      <Section title="The workflow">
        <Flow rows={[
          ['Ramon', 'Drops the statement into Marco’s chat and asks. The session opens full screen.', <>{alink('chat/asking', 'Asking an Agent')}, {alink('chat/focus', 'Record and chat, full screen')}</>],
          ['Marco', 'Checks the file: the period, the balances, repeated and unreadable lines.', alink('explaining/holds', 'Holds and flags')],
          ['Marco', 'Matches 207 of 213 lines, and drafts a fix for each of the rest, or asks.', <>{alink('explaining/reasons', 'Reasons')}, {alink('chat/asking-back', 'When it asks back')}</>],
          ['Ramon', 'Approves, edits, or rejects each draft in the statement.', <>{alink('approvals/partial', 'Approving part')}, {alink('approvals/edit-first', 'Changing before approving')}</>],
          ['Ramon', 'Applies the fixes on one confirmation page; each lands in its record’s history.', <>{mlink('records/record-actions', 'Record actions')}, {alink('explaining/history', 'In the history')}</>],
        ]} />
      </Section>

      <Section title="Why it saves time">
        <Saves rows={[
          ['Check and match 213 lines', 'Half a day with a calculator, line by line', 'Done before Ramon looks'],
          ['Work out and enter the 6 fixes', 'An hour and a half of searching and typing', '10 minutes reading 6 drafts'],
        ]} total={['About 6 hours', 'About 15 minutes']} />
        <p className="g-see">Ramon still decides every fix, and answers the one Marco can’t place, because each one changes the books.</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Check the file before matching.', 'The period, the balances, and repeated or unreadable lines, said up front.'],
            ['Draft one fix per mismatch.', 'Record, void, correct, or add, each linking to the bank line and the record.'],
            ['Nothing changes until a person applies it.', 'Approve, edit, or reject each draft; apply them on one confirmation page.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Matching a file that doesn’t add up.', 'A line repeated in the export becomes a ₱152,000.00 deposit nobody made.'],
            ['A list of unmatched lines, and nothing else.', 'Ramon still has to work out every fix himself.'],
            ['Fixes posted as it goes.', 'The books change while Ramon is still reading them.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
