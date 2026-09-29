import { Section, Demo, Rules, Avoid, When, Btn, Pill, Win } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import './foundations.css';

// Deleting: every delete goes through a confirmation page that checks what depends on the record. Nothing depends on
// it: confirm, and it's gone. Anything does: it can't be deleted, the page names what, and offers archive or void.

type Dep = [string, number, string];

function DeletePage({ name, what, deps }: { name: string; what: string; deps?: Dep[] }) {
  const blocked = !!deps;
  return (
    <div className="as-a-page">
      <p className="as-crumb">Customers <span>/</span> {name} <span>/</span> <b>Delete</b></p>
      <div className="as-a-head">
        <div><p className="m-title">{blocked ? `${name} can’t be deleted.` : `Delete ${name}?`}</p>
          <p className="as-meta"><span>{blocked ? 'Other records depend on it. Deleting it would change their numbers and break their links.' : what}</span></p></div>
      </div>
      <div className="as-a-content dl-body">
        {blocked ? (
          <>
            <p className="m-k">What depends on it</p>
            <table className="m-tbl dl-deps"><tbody>
              {deps.map(([t, n, note]) => <tr key={t}><td><a className="m-link dl-dep">{n} {t} →</a></td><td>{note}</td></tr>)}
            </tbody></table>
            <div className="dl-alt"><b>Archive it instead.</b> It stays in every report, total, and history, and every link still works. It just leaves the everyday lists and can’t be picked for new invoices or loans. You can restore it any time.</div>
          </>
        ) : (
          <>
            <p className="m-k">Checked</p>
            <table className="m-tbl dl-deps ok"><tbody>
              {['invoices', 'payments', 'loans', 'quotes', 'contacts'].map(t => <tr key={t}><td>✓ No {t}</td><td /></tr>)}
            </tbody></table>
            <p className="dl-gone">Nothing refers to it, so no number or link changes. It moves to the trash for 30 days, where it can be restored, then it’s gone for good.</p>
          </>
        )}
      </div>
      <div className="as-a-actbar">
        {blocked
          ? <><Btn>Back to {name}</Btn><span className="as-grow" /><Btn kind="pri">Archive customer</Btn></>
          : <><Btn>Cancel</Btn><span className="as-grow" /><Btn kind="danger">Delete customer</Btn></>}
      </div>
    </div>
  );
}

export default function Deleting() {
  return (
    <>
      <Demo wide caption="Nothing depends on it: a duplicate made by mistake this morning. The confirmation page shows what was checked, then the delete.">
        <Frame on="Customers"><DeletePage name="Metro Fuel Corp" what="Created today by Ana. A duplicate of Metro Fuels." /></Frame>
      </Demo>

      <Demo wide caption={<>Other records depend on it: the delete isn’t possible. The page names each one, with a link, and offers what the business really wants: stop using it. There is no Delete button at all, not even a disabled one. Archive it, and its status becomes <Pill tone="off">Archived</Pill>.</>}>
        <Frame on="Customers"><DeletePage name="Metro Fuels" what="" deps={[
          ['invoices', 38, '3 unpaid, ₱1,642,000 owing'],
          ['payments', 61, 'In the 2025 and 2026 books'],
          ['loans', 2, '1 active'],
          ['contacts', 4, 'Joy Santos and 3 more'],
        ]} /></Frame>
      </Demo>

      <Demo wide caption="Each link opens that record type’s list, filtered to this customer, with the count to match. People can settle the 3 unpaid invoices from there, and see exactly why the delete was blocked.">
        <Win title="Loans OS · Invoices" className="dl-list">
          <p className="as-crumb">Invoices <span>/</span> <b>Customer: Metro Fuels</b></p>
          <div className="m-row"><p className="m-title">Invoices</p><Btn kind="pri">New invoice</Btn></div>
          <p className="dl-chips"><span className="dl-chip">Customer is Metro Fuels <i>×</i></span><span className="dl-from">From: Delete Metro Fuels · <a className="m-link">Back</a></span></p>
          <table className="m-tbl">
            <thead><tr><th>Invoice</th><th>Issued</th><th>Status</th><th className="r">Balance</th></tr></thead>
            <tbody>
              <tr><td>INV-1038</td><td>3 Aug 2026</td><td><Pill tone="bad">Overdue 26 days</Pill></td><td className="r">₱420,000.00</td></tr>
              <tr><td>INV-1061</td><td>2 Sep 2026</td><td><Pill>Open</Pill></td><td className="r">₱684,000.00</td></tr>
              <tr><td>INV-1072</td><td>14 Sep 2026</td><td><Pill>Open</Pill></td><td className="r">₱538,000.00</td></tr>
              <tr><td>INV-0987</td><td>6 Jul 2026</td><td><Pill tone="ok">Paid</Pill></td><td className="r">₱0.00</td></tr>
            </tbody>
            <tfoot><tr><td colSpan={3}>38 invoices</td><td className="r">₱1,642,000.00</td></tr></tfoot>
          </table>
        </Win>
      </Demo>

      <Section title="Delete, archive, or void">
        <p>Decide per record type, in System Analysis, and use the same word everywhere for it.</p>
        <When head={['Use', 'For', 'What happens', 'Example']} rows={[
          ['Delete', 'Anything nothing depends on: a mistake, a duplicate, an empty draft.', 'Into the trash for 30 days, restorable, then gone for good. Opening it after that is Not found.', 'A duplicate customer, a draft invoice with no number, a note'],
          ['Archive', 'Records finished with, that other records point to.', 'Stays in reports, totals, history, and links. Leaves everyday lists; can’t be picked for new work. Can be restored.', 'A customer, a product, a branch'],
          ['Void', 'Money, and anything with a number in the books.', 'Stays, marked Void, with who, when, and why. Its effect is reversed: void a payment, and its invoice goes back to Overdue.', 'A payment, an issued invoice, a loan release'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Every delete gets a confirmation page.', 'Its own URL, /customers/88/delete, which checks what depends on the record before offering anything.'],
            ['Anything depends on it? It can’t be deleted.', 'The page lists what depends on it in red, each a link to its list, filtered to this record.'],
            ['Offer the right alternative.', 'Archive for records finished with, Void for money. It’s the primary button on a blocked page.'],
            ['Name it, and show what was checked.', 'Delete Metro Fuel Corp?, with the record types checked and found empty.'],
            ['Archived isn’t hidden.', 'Archived records still show in reports, history, and on the records that point to them. See Archived records.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Deleting straight from a button or a modal.', 'Nothing checks what depends on it, and one stray click removes it.'],
            ['A Delete button that’s only disabled.', 'People can’t see why. Show what depends on it, and the alternative.'],
            ['Cascading deletes.', 'A customer’s invoices and payments go with it, and last year’s totals change.'],
            ['“Are you sure?”', 'It names nothing and checks nothing, so people click Yes by habit.'],
            ['Soft deletes that hide rows from every query.', 'Totals change and links break: the harm deleting was meant to avoid.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
