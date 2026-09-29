import type React from 'react';
import { Section, Demo, Rules, Avoid, When, Toast, Pill } from '../../site/kit';
import { Frame, ListPage } from '../shell/shell-kit';
import '../records/foundations.css';
import './exports.css';

// How jobs run: anything that takes more than a moment (an export, a batch of statements, an import, a snapshot, a
// restore) runs as a background job. It's a record with a state and a result; the person is told when it's done,
// and collects the result from Jobs.

const steps: [string, string, React.ReactNode][] = [
  ['1 · Start', 'From where the work is', <>Export on a list, Generate statements on Customers, Import on a list. The page says it’s started, and people carry on.</>],
  ['2 · Queue', 'A job record', <>The server saves a <code>Job</code>: its kind, who started it, its inputs, and Queued, then queues the work.</>],
  ['3 · Run', 'In the background', <>A worker does the work in batches, updating progress, with the access of the person who started it.</>],
  ['4 · Result', 'Saved with the job', <>A file in the job’s <code>file</code> field, or a summary of what was made, sent, and skipped.</>],
  ['5 · Hand over', 'Notified, then collected', <>A notification links to the job in Jobs, where the result waits.</>],
];

export default function HowJobs() {
  return (
    <>
      <Demo wide caption="Every job, from the button to the result. Nothing slow happens while the person waits.">
        <div className="dx-flow">{steps.map(([k, b, t]) => <p key={k} className="dx-step"><small>{k}</small><b>{b}</b><span>{t}</span></p>)}</div>
      </Demo>

      <Demo wide caption="Step 1 in the app: Export on the list starts a job, and a toast says so, with a link to follow it in Jobs. People keep working.">
        <Frame on="Invoices">
          <ListPage plain />
          <p className="dx-toastrow"><Toast action="See in Jobs">Exporting 12 invoices. We’ll let you know when it’s ready.</Toast></p>
        </Frame>
      </Demo>

      <Section title="Kinds of job">
        <When head={['Job', 'Started from', 'Result']} rows={[
          ['Export', 'A list, a report, or Export everything', 'A file to download, kept 7 days'],
          ['Batch generation', 'Generate statements, reminders, or vouchers', 'The documents on their records, and a summary'],
          ['Import', 'Import on a list', 'The new records, and a list of rows that failed, with why'],
          ['Snapshot or restore', 'Administration › Snapshots, or before a big change', 'The snapshot, or the restored account'],
          ['Bulk update', 'A batch action on many records', 'What changed, and what couldn’t, with why'],
        ]} />
      </Section>

      <Section title="A job’s states">
        <When head={['State', 'Shows']} rows={[
          [<Pill>Queued</Pill>, 'Who started it, and when'],
          [<Pill>Running</Pill>, 'Progress: 780 of 1,188 statements'],
          [<Pill tone="ok">Done</Pill>, 'The result: Download, or Open summary'],
          [<Pill tone="bad">Needs attention</Pill>, 'Done, but some items failed: how many, and Review'],
          [<Pill tone="bad">Failed</Pill>, 'What went wrong, in plain words, and Try again'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Anything slow is a job.', 'Exports, batches, imports, snapshots, and bulk updates queue a job and return at once.'],
            ['A job is a record.', 'Its kind, who started it, its inputs, state, progress, and result, saved together.'],
            ['Run with the starter’s access.', 'The job sees and changes only what the person who started it could.'],
            ['Say it’s started, then say it’s done.', 'A toast on start; a notification when Done, Needs attention, or Failed, linking to the job.'],
            ['Partial results are results.', '1,185 made and 3 bounced is Needs attention, with the 3 listed, not Failed.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Doing slow work in the request.', 'The page freezes, times out, and people click again.'],
            ['Jobs with no record.', 'Nobody can see who ran what, or collect the result again.'],
            ['Jobs that run as an admin.', 'Ana’s export includes every branch, not just Cebu.'],
            ['Silent jobs.', 'People wait on the page, or forget they started it.'],
            ['All or nothing.', 'One bad row fails an import of 1,200 customers.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
