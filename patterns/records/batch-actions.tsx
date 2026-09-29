import { Section, Demo, Rules, Avoid, When, Btn, Toast, Win } from '../../site/kit';
import { Frame, ListPage } from '../shell/shell-kit';
import './foundations.css';

// Batch actions: select rows on the list page, act on all of them from the bulk bar, confirm the count when it
// matters, and say what worked and what didn't.

export default function BatchActions() {
  return (
    <>
      <Demo wide caption={<>Selecting rows on the <a className="m-link" href="#/management/records/list">List records</a> shows the bulk bar above the table: the count, “Select all 12” for the whole filtered set, and the actions that work on many.</>}>
        <Frame on="Invoices"><ListPage plain /></Frame>
      </Demo>

      <div className="ba-row">
        <Demo caption={<><b>Confirm the count,</b> on a confirmation page, when the action sends something or can’t be undone. Say how many, and who’s skipped.</>}>
          <Win title="Invoices / Overdue in Cebu / Send reminders" className="ba-win">
            <p className="m-title">Send reminders for 12 invoices?</p>
            <ul className="cf-what">
              <li><b>10 customers get an email today,</b> from Collections, Cebu.</li>
              <li><b>2 are skipped:</b> Pacific Cartons and Abad Trucking have no email address.</li>
            </ul>
            <p className="sh-bar-lite"><Btn>Back to the list</Btn><span className="as-grow" /><Btn kind="pri">Send 10 reminders</Btn></p>
          </Win>
        </Demo>
        <Demo caption={<><b>Say what happened.</b> What worked, what didn’t, and a link to the ones that didn’t, so they can be fixed.</>}>
          <div className="ba-toasts">
            <Toast action="See the 2">10 reminders sent. 2 customers have no email.</Toast>
            <Toast action="Undo">12 invoices assigned to Ana.</Toast>
            <Toast action="Download">Your export is ready: 12 invoices.</Toast>
          </div>
        </Demo>
      </div>

      <Section title="Which actions work on many">
        <When head={['Action', 'Batch?', 'Confirm first?']} rows={[
          ['Assign, add a tag, change a branch', 'Yes', 'No: do it, and offer Undo'],
          ['Send reminders, send statements', 'Yes', 'Yes: say how many go, and who’s skipped'],
          ['Export', 'Yes', 'No: large exports run in the background and say when they’re ready'],
          ['Archive', 'Yes', 'No: do it, and offer Undo'],
          ['Record payment, void, approve', 'No', 'One at a time, from the record: each needs its own check'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Selecting shows the bar.', 'Above the table, only while rows are selected, with the count first.'],
            ['Select all means the filter, and says so.', '“Select all 12” takes the whole filtered set, not just this page. After it: “All 12 selected · Clear”.'],
            ['Only actions that make sense for many.', 'Money actions, approvals, and voids stay one at a time, on the record.'],
            ['Confirm the count when it matters.', 'Sending and anything that can’t be undone open a confirmation page, naming who’s skipped. The button says the number: Send 10 reminders.'],
            ['Report what worked and what didn’t.', '“10 reminders sent. 2 customers have no email.” with a link to the 2, which stay selected.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Bulk actions in the page header’s ••• menu.', 'They sit far from the selected rows, and people don’t find them.'],
            ['“Select all” that takes only this page.', 'People think they acted on all 12, and the rest are left undone.'],
            ['Voids and payments in the bulk bar.', 'Each needs its own check, and in a batch nobody checks any of them.'],
            ['“Are you sure?” with no count.', 'People don’t know how many go, or who’s skipped, until it’s done.'],
            ['“Operation completed”, or stopping at the first failure.', 'Nobody knows which records were done, and which to fix.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
