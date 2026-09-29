import { Section, Demo, Rules, Avoid, Win, Btn, Pill, Sk } from '../../site/kit';
import './foundations.css';

// Every screen has five states: loading, empty, no results, error, and full. Drawn on one invoice list.

const Head = ({ chips }: { chips?: boolean }) => (
  <div className="stt-bar">
    <span className="stt-search">Search invoices…</span>
    {chips && <><span className="stt-chip">Overdue ×</span><span className="stt-chip">Baguio ×</span></>}
  </div>
);

export default function States() {
  return (
    <>
      <div className="stt-grid">
        <Demo caption={<><b>Loading.</b> The layout appears at once, with grey bars where rows will be. No spinner over a blank page.</>}>
          <Win title="Invoices"><Head />{[82, 70, 76, 64].map(w => <p key={w} className="stt-row"><Sk w={`${w}%`} /></p>)}</Win>
        </Demo>
        <Demo caption={<><b>Empty.</b> Nothing has been made yet. Say what goes here, and offer the first step.</>}>
          <Win title="Invoices">
            <div className="stt-empty">
              <b>No invoices yet.</b>
              <p>Invoices you create or import show up here.</p>
              <span className="stt-btns"><Btn>Import</Btn><Btn kind="pri">New invoice</Btn></span>
            </div>
          </Win>
        </Demo>
        <Demo caption={<><b>No results.</b> Things exist, but the filters hide them. Say which filters, and offer to clear them.</>}>
          <Win title="Invoices">
            <Head chips />
            <div className="stt-empty">
              <b>No overdue invoices in Baguio.</b>
              <p>31 invoices in Baguio are open or paid.</p>
              <span className="stt-btns"><Btn>Clear filters</Btn></span>
            </div>
          </Win>
        </Demo>
        <Demo caption={<><b>Error.</b> Say what failed in plain words, keep what was already shown, and offer a retry.</>}>
          <Win title="Invoices">
            <Head />
            <p className="stt-err"><b>Couldn’t load the latest invoices.</b> Showing the list from 9:14 AM. <a>Try again</a></p>
            {['INV-1038', 'INV-1044'].map(n => <p key={n} className="stt-row stale"><span>{n}</span><Pill tone="bad">Overdue</Pill></p>)}
          </Win>
        </Demo>
        <Demo caption={<><b>Full.</b> The state everyone designs. Also check it with 500 rows and the longest customer name.</>}>
          <Win title="Invoices">
            <Head />
            {[['INV-1038', 'Metro Fuels'], ['INV-1044', 'Northstar Supply'], ['INV-1047', 'Mindanao Integrated Agricultural Cooperative']].map(([n, c]) => (
              <p key={n} className="stt-row"><span>{n}</span><span className="stt-c">{c}</span><Pill tone="bad">Overdue</Pill></p>
            ))}
          </Win>
        </Demo>
      </div>

      <div className="g-duo">
        <Section title="Guidelines">
        <Rules items={[
          ['Design all five before building one.', 'Loading, empty, no results, error, and full. Draw them in the prototype, not after the first bug report.'],
          ['Loading keeps the layout.', 'Skeleton rows in the shape of the content, so nothing jumps when it arrives. Under half a second, show nothing at all.'],
          ['Empty is an invitation.', 'Say what will be here, why it’s useful, and offer the first action: create, import, or connect.'],
          ['No results is not empty.', 'Name the filters hiding things, say how many exist without them, and offer Clear filters.'],
          ['Errors keep what’s there.', 'Show the last good data, marked as stale, with the time. A failed refresh never blanks the screen.'],
          ['Partial is a state too.', 'When some parts load and others fail, show what worked, and mark the part that didn’t, in place.'],
          ['Test the extremes.', 'One record, 500 records, the longest name, the biggest number, and a slow connection.'],
        ]} />
      </Section>
        <Section title="Avoid">
        <Avoid items={[
          'A full-page spinner.',
          '“No data”, “No records found”, or an empty table with only headers.',
          'Error codes on screen: “Error 500”, “Request failed with status 422”.',
          'Clearing the screen when a background refresh fails.',
        ]} />
      </Section>
      </div>

    </>
  );
}
