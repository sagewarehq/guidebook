import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Win, Ini } from '../../site/kit';
import { Palette, M } from '../search/palette-kit';
import '../records/foundations.css';
import '../search/search.css';

// Only what you may see: search, ⌘K, counts, lookups, exports, and notifications run the same role and scope check as
// opening the record. Two people type the same word and get different answers, each one complete for them.

/** Who is searching, above their palette: initials, name, role, and scope. */
const Who = ({ ini, agent, name, role }: { ini: string; agent?: boolean; name: string; role: string }) => (
  <p className="pm-who"><Ini n={ini} agent={agent} /><b>{name}</b><span>{role}</span></p>
);

const Side = ({ who, children }: { who: ReactNode; children: ReactNode }) => <div className="pm-side">{who}{children}</div>;

export default function Permissions() {
  return (
    <>
      <Demo wide caption="Ana and Ramon both type “metro”. Ana works in Collections, in Cebu: she gets Cebu’s customer, invoices, payments, loans, and contacts, 106 in all, and no Payment runs, which her role can’t open. Ramon, in Finance, sees every branch and payment runs: 152. Each list is complete for the person reading it, with nothing to say what’s missing.">
        <div className="pm-duo">
          <Side who={<Who ini="AR" name="Ana Reyes" role="Collections · Cebu" />}>
            <Palette q="metro" hint={false} groups={[
              ['Customers', [{ t: 'Customer', name: <><M>Metro</M> Fuels</>, facts: 'Cebu · TIN 204-311-580-000 · 3 unpaid', on: true }], '1'],
              ['Invoices', [
                { t: 'Invoice', name: 'INV-1038', facts: <><M>Metro</M> Fuels · Overdue 26 days · ₱420,000.00</> },
                { t: 'Invoice', name: 'INV-1061', facts: <><M>Metro</M> Fuels · Open · ₱684,000.00</> },
              ], '38'],
              ['Loans', [{ t: 'Loan', name: 'LN-2198', facts: <><M>Metro</M> Fuels · ₱1,180,000.00 · Active</> }], '2'],
              ['Contacts', [{ t: 'Contact', name: 'Joy Santos', facts: <><M>Metro</M> Fuels · Accounts payable</> }], '4'],
            ]} foot={<><a className="m-link">See all 106 results</a><span>Customers 1 · Invoices 38 · Payments 61 · Loans 2 · Contacts 4</span></>} />
          </Side>
          <Side who={<Who ini="RC" name="Ramon Cruz" role="Finance · All branches" />}>
            <Palette q="metro" hint={false} groups={[
              ['Customers', [
                { t: 'Customer', name: <><M>Metro</M> Fuels</>, facts: 'Cebu · TIN 204-311-580-000 · 3 unpaid', on: true },
                { t: 'Customer', name: <><M>Metro</M> Fuels Trading</>, facts: 'Baguio · TIN 118-902-447-000' },
              ], '3'],
              ['Invoices', [
                { t: 'Invoice', name: 'INV-1038', facts: <><M>Metro</M> Fuels · Cebu · Overdue 26 days · ₱420,000.00</> },
                { t: 'Invoice', name: 'INV-2114', facts: <><M>Metro</M> Fuels Trading · Baguio · Open · ₱212,500.00</> },
              ], '56'],
              ['Loans', [{ t: 'Loan', name: 'LN-2198', facts: <><M>Metro</M> Fuels · ₱1,180,000.00 · Active</> }], '3'],
              ['Contacts', [{ t: 'Contact', name: 'Joy Santos', facts: <><M>Metro</M> Fuels · Accounts payable</> }], '7'],
              ['Payment runs', [{ t: 'Run', name: 'Run #0318', facts: <>Pays <M>Metro</M> Packaging Supply and 34 others · Waiting for approval</> }], '1'],
            ]} foot={<><a className="m-link">See all 152 results</a><span>Customers 3 · Invoices 56 · Payments 82 · Loans 3 · Contacts 7 · Runs 1</span></>} />
          </Side>
        </div>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="The count is what Ana can open. Invoices 38, and See all 106: open the page and there are 106 rows.">
          <Palette q="metro" hint={false} groups={[
            ['Invoices', [
              { t: 'Invoice', name: 'INV-1038', facts: <><M>Metro</M> Fuels · Overdue 26 days · ₱420,000.00</>, on: true },
              { t: 'Invoice', name: 'INV-1061', facts: <><M>Metro</M> Fuels · Open · ₱684,000.00</> },
            ], '38'],
          ]} foot={<><a className="m-link">See all 106 results</a><span>Customers 1 · Invoices 38 · Payments 61 · Loans 2 · Contacts 4</span></>} />
        </Demo>
        <Demo verdict="avoid" caption="The count comes from every branch, the rows from Ana’s. She’s told 151, opens the page, and finds 106. Worse, the hint tells her Baguio has a Metro customer she was never meant to know about.">
          <Palette q="metro" hint={false} groups={[
            ['Invoices', [
              { t: 'Invoice', name: 'INV-1038', facts: <><M>Metro</M> Fuels · Overdue 26 days · ₱420,000.00</>, on: true },
              { t: 'Invoice', name: 'INV-1061', facts: <><M>Metro</M> Fuels · Open · ₱684,000.00</> },
            ], '56'],
          ]} foot={<><a className="m-link">See all 151 results</a><span className="pm-leak">45 more in other branches you can’t see</span></>} />
        </Demo>
      </Pair>

      <Section title="Agents search with their own role">
        <p>When Ramon asks Marco to find Metro’s unpaid invoices, Marco searches as Marco, not as Ramon. His role is invoices, payments, and payment runs, in every branch: no loans, no contacts, no customer notes. So his answer can never hold something his role couldn’t open, whoever asked.</p>
        <Demo wide caption="Marco’s search for “metro”, as his role sees it. The same word, a narrower answer: 56 invoices, 82 payments, and 1 payment run. Loans and contacts don’t appear, and nothing says they exist.">
          <div className="pm-duo pm-one">
            <Side who={<Who ini="MA" agent name="Marco" role="Finance Operations Agent · Invoices, payments, and runs · All branches" />}>
              <Palette q="metro" hint={false} groups={[
                ['Invoices', [
                  { t: 'Invoice', name: 'INV-1038', facts: <><M>Metro</M> Fuels · Cebu · Overdue 26 days · ₱420,000.00</>, on: true },
                  { t: 'Invoice', name: 'INV-2114', facts: <><M>Metro</M> Fuels Trading · Baguio · Open · ₱212,500.00</> },
                ], '56'],
                ['Payment runs', [{ t: 'Run', name: 'Run #0318', facts: <>Pays <M>Metro</M> Packaging Supply and 34 others · Waiting for approval</> }], '1'],
              ]} foot={<span>Invoices 56 · Payments 82 · Runs 1</span>} />
            </Side>
          </div>
        </Demo>
      </Section>

      <Pair>
        <Demo verdict="do" caption="The server filters the query. Ana’s role and branch are part of the search itself, so only her 106 results ever leave the database.">
          <Win title="Search · “metro” · Ana" className="pm-net">
            <p className="pm-step"><b>Asked</b><span>“metro”, in Cebu, in the record types Collections may open</span></p>
            <p className="pm-step"><b>Sent to the browser</b><span>106 results</span></p>
            <p className="pm-step"><b>Shown</b><span>106 results</span></p>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="The server sends everything and the browser hides what Ana can’t open. The rows are still in the response: anyone who looks, or exports, has all 152.">
          <Win title="Search · “metro” · Ana" className="pm-net">
            <p className="pm-step"><b>Asked</b><span>“metro”</span></p>
            <p className="pm-step"><b>Sent to the browser</b><span className="pm-leak">152 results, every branch, payment runs too</span></p>
            <p className="pm-step"><b>Shown</b><span>106 results, 46 hidden on screen</span></p>
          </Win>
        </Demo>
      </Pair>

      <Section title="Where the check applies">
        <When head={['Where', 'What Ana gets', 'Example']} rows={[
          ['⌘K palette', 'Only records and commands her role may open, in Cebu', '“metro”: 106 results, no Payment runs, no Void payment'],
          [<a className="m-link" href="#/management/search/results-page">All results</a>, 'The same 106, with counts per type that match the rows', 'Customers 1 · Invoices 38 · Payments 61 · Loans 2 · Contacts 4'],
          ['Counts and badges', 'Counts of what she can open, never of the whole company', 'Invoices list header: “Cebu · 42 invoices”, not every branch’s total'],
          ['Typeahead in fields and lookups', 'Only customers and records she could pick from a list', 'Customer field on a new invoice offers Metro Fuels, not Metro Fuels Trading'],
          ['Exports', 'The rows she can see, nothing more', 'Invoices export: Cebu’s 38 Metro invoices'],
          ['Notifications that link to records', 'Only about records she can open, checked again when she clicks', 'No alert about a Baguio invoice; if one moves to Baguio later, the link says where it went'],
        ]} />
      </Section>

      <p className="g-see">Scope decides which records each person reaches: see <a className="m-link" href="#/management/access/scope">Record scope</a>. The server makes the check on every request: see <a className="m-link" href="#/management/access/enforce">Checking access</a>.</p>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One check, everywhere.', 'Search, ⌘K, counts, lookups, exports, and notifications ask the same as opening the record.'],
            ['Counts match what can be opened.', 'Invoices 38 means 38 rows when Ana opens the page.'],
            ['Say nothing about the rest.', 'The list is complete for its reader. No “more you can’t see”.'],
            ['Agents search as themselves.', 'Marco’s answer uses Marco’s role, never the wider role of whoever asked.'],
            ['Filter in the query.', 'Role and scope are part of the search on the server, so hidden records never leave the database.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Search that skips the check.', 'Ana types “metro” and finds Baguio’s customers and payment runs.'],
            ['Counts from the whole table.', 'She’s told 151, opens the page, and finds 106.'],
            ['Hints about hidden records.', '“45 more in other branches” tells her they exist, and roughly what they are.'],
            ['Agents searching as the person who asked.', 'Marco reads Ramon’s loans and contacts, which his role doesn’t allow.'],
            ['Hiding rows in the browser.', 'The response still carries all 152, and so does the export.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
