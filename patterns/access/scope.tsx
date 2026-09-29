import { Section, Demo, Rules, Avoid, When } from '../../site/kit';
import { Frame, ListPage } from '../shell/shell-kit';
import '../records/foundations.css';

// Branches and data scope: a role says what someone can do; their scope says which records. People see their branch,
// unless their role covers more, in every list, search, report, and export.

export default function Scope() {
  return (
    <>
      <Demo wide caption="Ramon, in Finance, sees every branch, and has narrowed this list to Cebu: the Branch chip is a filter he can clear. Ana, in Collections, gets the same list with no Branch chip: Cebu is her scope, not a filter, so there’s nothing to clear, and every list, search, report, and export shows Cebu’s records only.">
        <Frame on="Invoices" as="lead"><ListPage plain /></Frame>
      </Demo>

      <Section title="Who sees what">
        <When head={['Role', 'Scope', 'Example']} rows={[
          ['Collections', 'Their branch', 'Ana sees Cebu’s invoices, payments, and customers'],
          ['Branch manager', 'Their branch, all of it', 'Liza sees everything in Cebu, and can switch between Cebu’s views'],
          ['Finance', 'All branches, with a branch filter', 'Ramon sees every branch, and can narrow to one'],
          ['Admin', 'People and settings, not records', 'Carlo manages users, but doesn’t see customer balances'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Role says what; scope says which.', 'Collections can record payments, in Cebu. Both are set on the person.'],
            ['Scope applies everywhere.', 'Lists, search, ⌘K, reports, exports, notifications, and Agents all see the same records.'],
            ['Say what they’re seeing.', 'The branch in the switcher and in list headers: “Cebu · 42 invoices”.'],
            ['Wider roles can narrow down.', 'Finance sees all branches, with a branch filter, never the other way round.'],
            ['Out of scope says where it is.', 'A Baguio invoice opened by Ana says it’s in Baguio, and who can help. See Access › Record access.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Scope as a filter people can clear.', 'Ana clears it, and sees every branch’s customers.'],
            ['Lists scoped, but search and exports not.', 'The export Ana downloads has every branch in it.'],
            ['Scoped records with no sign of it.', 'Liza thinks the company has 42 invoices overdue.'],
            ['One role per branch.', '“Collections Cebu”, “Collections Baguio”: ten roles for one job.'],
            ['A blank page, or “Not found”.', 'Ana thinks the invoice was deleted, and raises it with Finance.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
