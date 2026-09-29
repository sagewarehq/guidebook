import { Section, Demo, Pair, Rules, Avoid, When } from '../../site/kit';
import { InShell, Palette, M } from './palette-kit';

// Results in the palette: grouped by record type, a few per group, each with the facts that tell it apart, the match
// marked, and a way to see everything. An exact number opens straight away.

export default function Results() {
  return (
    <>
      <Demo wide caption="“metro” finds customers, invoices, payments, loans, contacts, and a payment run. Each group shows its best few and its count; each row shows what tells it apart from the others, with the match marked. The first row is ready for Enter.">
        <InShell as="lead">
          <Palette q="metro" groups={[
            ['Customers', [
              { t: 'Customer', name: <><M>Metro</M> Fuels</>, facts: 'Cebu · TIN 204-311-580-000 · 3 unpaid', on: true },
              { t: 'Customer', name: <><M>Metro</M> Fuels Trading</>, facts: 'Baguio · TIN 118-902-447-000' },
            ], '3'],
            ['Invoices', [
              { t: 'Invoice', name: 'INV-1038', facts: <><M>Metro</M> Fuels · Overdue 26 days · ₱420,000.00</> },
              { t: 'Invoice', name: 'INV-1061', facts: <><M>Metro</M> Fuels · Open · ₱684,000.00</> },
            ], '56'],
            ['Loans', [{ t: 'Loan', name: 'LN-2198', facts: <><M>Metro</M> Fuels · ₱1,180,000.00 · Active</> }], '3'],
          ]} foot={<><a className="m-link">See all 152 results for “metro”</a><span>Customers 3 · Invoices 56 · Payments 82 · Loans 3 · Contacts 7 · Runs 1</span></>} />
        </InShell>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Grouped, and each row says which one it is: branch, TIN, status, amount.">
          <Palette q="metro" hint={false} groups={[
            ['Customers', [
              { t: 'Customer', name: <><M>Metro</M> Fuels</>, facts: 'Cebu · TIN 204-311-580-000', on: true },
              { t: 'Customer', name: <><M>Metro</M> Fuels Trading</>, facts: 'Baguio · TIN 118-902-447-000' },
            ]],
            ['Invoices', [{ t: 'Invoice', name: 'INV-1038', facts: <><M>Metro</M> Fuels · Overdue · ₱420,000.00</> }], '56'],
          ]} />
        </Demo>
        <Demo verdict="avoid" caption="One flat list of names from different tables. Which Metro Fuels is the customer, which is an invoice, and which one is in Cebu?">
          <div className="sr-pal">
            <p className="sr-in"><span className="sr-glass">⌕</span><b>metro</b></p>
            <div className="sr-body sr-flat">{['Metro Fuels', 'Metro Fuels', 'Metro Fuels Trading', 'Metro Fuels', 'metro fuels (old)', 'Metro Fuels'].map((x, i) => <p key={i}>{x}</p>)}</div>
          </div>
        </Demo>
      </Pair>

      <Section title="What each record type shows">
        <When head={['Record', 'Name', 'Facts that tell it apart']} rows={[
          ['Customer', 'Metro Fuels', 'Branch, TIN, and anything overdue'],
          ['Invoice', 'INV-1038', 'Customer, status, balance'],
          ['Loan', 'LN-2198', 'Borrower, amount, status'],
          ['Payment', 'PAY-0921', 'What it paid, amount, date'],
          ['Contact', 'Joy Santos', 'Customer, role'],
          ['Page or saved view', 'Invoices › Overdue in Cebu', 'Whose view, and its count'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Group by record type.', 'The group with the best match first. Each shows its best three to five, and its count.'],
            ['Two facts that tell them apart.', 'The ones people use to pick: branch and TIN for a customer, status and balance for an invoice.'],
            ['Mark the match.', 'So people see why a result is there, especially when it matched a contact or a reference rather than the name.'],
            ['The first result is ready, and opens the record.', 'It’s highlighted, so Enter opens the record’s page. An exact number is the first result, alone.'],
            ['See all, one step away.', 'The last row opens All results, with counts per type. When nothing matches, say so, and what to try.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['One flat list of names from different tables.', 'People can’t tell the customer from the invoice.'],
            ['The table name or an ID as the facts: tbl_customer, #88.', 'It tells people nothing they use to pick.'],
            ['Results with no sign of why they’re there.', 'A match on a contact or a reference looks like a mistake.'],
            ['Results that jump around, or a preview instead of the record.', 'Enter opens the wrong one, or stops one step short of the page.'],
            ['A dead end when nothing matches.', 'People don’t know whether to fix the spelling or search another way.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
