import { Section, Demo, Rules, Avoid, When } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { ConfirmPage } from '../records/confirm-kit';
import '../records/foundations.css';
import '../jobs/exports.css';

// Full data export: an admin can take every record and file the account holds, in one download, at any time. It
// runs like any export, in the background, and arrives as a zip of CSVs, files, and a manifest.

export default function FullExport() {
  return (
    <>
      <Demo wide caption="Administration › Export everything opens a confirmation page: how much there is, what the file will hold, and who’s told. It runs as a background job, and the file lands in Jobs.">
        <Frame as="admin" on="">
          <ConfirmPage crumb={['Administration', 'Export everything']} title="Export all of Metro Lending’s data?" meta="Every record and file in the account, as of the moment the export starts."
            facts={[['Records', '184,220'], ['Files', '3,412 · 2.1 GB'], ['Ready in', 'About 20 minutes']]}
            what={[
              <><b>Every record type, as CSV,</b> one file each, with every field and every archived or voided record.</>,
              <><b>Every file,</b> documents and uploads, in folders named for their records.</>,
              <><b>A manifest</b> listing each file, its row count, and what its columns mean.</>,
              <><b>All admins are notified,</b> and the export is logged in the audit trail.</>,
            ]}
            back="Back to Administration" action="Export everything" danger={false} />
        </Frame>
      </Demo>

      <Demo wide caption="What arrives: one zip, readable without Loans OS. Plain CSVs a spreadsheet or another system can open, the files, and a README that says what everything is.">
        <div className="dx-tree">
          <p><b>metro-lending_full-export_2026-09-28.zip</b></p>
          <p className="i">README.txt <span>What’s here, and how the files relate</span></p>
          <p className="i">manifest.json <span>Each file, its row count, and its columns</span></p>
          <p className="i"><b>data/</b></p>
          <p className="ii">customers.csv <span>1,204 rows</span></p>
          <p className="ii">invoices.csv <span>18,930 rows</span></p>
          <p className="ii">payments.csv <span>14,210 rows</span></p>
          <p className="ii">loans.csv <span>2,318 rows</span></p>
          <p className="ii">… 22 more <span>history, users, roles, settings</span></p>
          <p className="i"><b>files/</b></p>
          <p className="ii">customers/metro-fuels/credit-agreement_v2.pdf</p>
          <p className="ii">… 3,411 more</p>
        </div>
      </Demo>

      <Section title="Full export, or a snapshot">
        <When head={['', 'Full data export', 'Snapshot']} rows={[
          ['For', 'Taking the data out: to keep, audit, or move to another system', 'Putting the system back: to restore, or make a copy'],
          ['Format', 'Plain CSVs and files, readable anywhere', 'Our format, loaded back by the system'],
          ['Who', 'Admins, any time', 'Admins; restoring over live needs the owner'],
          ['See', 'This page', <a className="m-link" href="#/management/admin/snapshots">Snapshots</a>],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['The data is the client’s.', 'An admin can export everything, any time, without asking us.'],
            ['Everything, not just what’s active.', 'Every record type, archived and voided records, history, and files.'],
            ['Readable without the system.', 'Plain CSV, UTF-8, dates as 2026-09-28, with a README and a manifest.'],
            ['Say how much before it starts.', 'Records, files, size, and how long it will take, on a confirmation page.'],
            ['Tell every admin, and log it.', 'Taking all the data is a big event. Nobody should find out later.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Making the client ask us for their data.', 'It feels like we’re holding it, and it takes days.'],
            ['Exporting only active records.', 'The history and the closed accounts, the part auditors want, are missing.'],
            ['A database dump.', 'Nobody outside can read it without our system.'],
            ['Starting a 2 GB export on one click.', 'People don’t know what they’ve asked for, or when it’ll arrive.'],
            ['Quiet full exports.', 'The whole customer list leaves, and no one else knows.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
