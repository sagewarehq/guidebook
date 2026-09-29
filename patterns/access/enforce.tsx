import { Section, Demo, Rules, Avoid, When, Win } from '../../site/kit';
import '../records/foundations.css';

// Checking access: three questions, answered on the server for every request. Hiding a button is a courtesy; the
// server is the gate. Here, for Liza, who manages the Cebu branch.

const checks: [string, string, string, string][] = [
  ['1', 'Who are you?', 'Signed in as Liza, Branch manager · Cebu.', 'Laravel auth · Django auth'],
  ['2', 'May you do this?', 'Her role can view invoices and edit terms. It can’t void payments.', 'Laravel policy · Django permission'],
  ['3', 'Which ones?', 'Only Cebu’s records, in every list, search, report, and export.', 'A scope on every query'],
];

export default function Enforce() {
  return (
    <>
      <Demo wide caption="Every request, every time: who, may they, and which records. The same three checks run for people and Agents alike.">
        <ol className="ce-checks">{checks.map(([n, q, a, fw]) => <li key={n}><span className="ce-n">{n}</span><div><b>{q}</b><p>{a}</p><small>{fw}</small></div></li>)}</ol>
      </Demo>

      <Demo wide caption="What Liza sees. The list shows Cebu only; the Void button isn’t there; and if she opens the void page from a link, it says who can.">
        <div className="ce-shots">
          <Win title="Invoices · Liza" className="ce-win"><p className="ce-scope">Cebu · 42 invoices</p>{['INV-1038 · Metro Fuels', 'INV-1044 · Northstar Supply', 'INV-1047 · Pacific Cartons'].map(r => <p key={r} className="ce-row"><span>{r}</span><em>Cebu</em></p>)}</Win>
          <Win title="PAY-0921 / Void · Liza" className="ce-win"><p className="ce-no"><b>You can’t void payments.</b> Finance can. <a className="m-link">Ask Ramon</a></p></Win>
        </div>
      </Demo>

      <Section title="Where each check lives">
        <When head={['On screen', 'On the server']} rows={[
          ['Hide menu items, tabs, and buttons the role can’t use', 'Refuse the request anyway, with 403'],
          ['Show only in-scope records', 'Filter the query, so other records never leave the database'],
          ['Say the real state on a page reached by link', 'Answer with that state: another branch, archived, in the trash; 404 only when deleted'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['The server checks every request.', 'Who, may they, and which records, on every click, API call, and job.'],
            ['Hide what a role can’t use.', 'No buttons that only lead to “no”. Hiding is a courtesy, not the check.'],
            ['Filter the query, not the screen.', 'Records out of scope never leave the database, so they can’t leak into an export.'],
            ['Say no plainly, and who can.', '“You can’t void payments. Finance can.” when a link leads somewhere forbidden.'],
            ['Agents pass the same checks.', 'An Agent signs in with its own account and role, and is refused like anyone else.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Checks only in the browser.', 'Anyone who types the URL, or calls the API, gets through.'],
            ['Greyed-out buttons everywhere.', 'People click them to find out why, and learn nothing.'],
            ['Filtering records after loading them.', 'The whole table reaches the browser, and the export.'],
            ['403 Forbidden on a blank page.', 'Liza doesn’t know what she tried, or who to ask.'],
            ['Agents that skip the checks.', 'An Agent voids a payment no person in its role could.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
