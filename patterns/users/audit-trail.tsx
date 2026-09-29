import type React from 'react';
import { Section, Demo, Rules, Avoid, When, Ini, Btn } from '../../site/kit';
import { Frame, DetailPage } from '../shell/shell-kit';
import '../records/foundations.css';
import '../shell/shell.css';

// Audit trail: every change in the system, on its own full-screen page in Administration. The latest activity first,
// grouped by day, with filters people actually use: who, which record, what kind of change, when, and Agents only.
// Each record's History shows its own slice, in the side panel.

type E = [ini: string, agent: boolean, who: string, what: React.ReactNode, time: string, diff?: [string, string]];
const days: [string, E[]][] = [
  ['Today', [
    ['RC', false, 'Ramon Cruz', <>changed the terms on <a className="m-link">INV-1072</a></>, '9:31 AM', ['Net 30', 'Net 45']],
    ['AR', false, 'Ana Reyes', <>recorded <a className="m-link">PAY-0955</a>, ₱120,000.00, for Metro Fuels</>, '9:18 AM'],
    ['MA', true, 'Marco', <>held a payment to <a className="m-link">Cebu Paperworks</a>: “a likely resend of INV-8807”</>, '7:40 AM'],
  ]],
  ['Yesterday', [
    ['CM', false, 'Carlo Mendoza', <>changed <a className="m-link">Liza Tan</a>’s roles</>, '4:40 PM', ['Collections', 'Branch manager']],
    ['RC', false, 'Ramon Cruz', <>changed the approval limit for payments</>, '2:15 PM', ['₱300,000.00', '₱500,000.00']],
  ]],
];

export default function AuditTrail() {
  return (
    <>
      <Demo wide caption="Administration › Audit trail, on its own full page. Search and filters across the top: who, which record, what kind of change, when, and Agents only. The latest activity first, grouped by day; edits show what changed, from and to; every record is a link.">
        <Frame loud as="admin" on="" foot={<><p className="as-nav">Jobs</p><p className="as-nav">Settings</p><p className="as-nav on">Administration</p><p className="as-nav">Help</p></>}>
          <div className="as-a-page">
            <p className="as-crumb">Administration <span>/</span> <b>Audit trail</b></p>
            <div className="as-a-head"><div><p className="m-title">Audit trail</p><p className="as-meta"><span>Every change in Metro Lending, kept for 10 years</span></p></div><span className="as-acts"><Btn>Export</Btn></span></div>
            <p className="as-filters"><span className="as-lsearch2">⌕ Search changes: a person, a record, a value…</span></p>
            <p className="as-filters"><span className="as-chip">Anyone ▾</span><span className="as-chip">Any record ▾</span><span className="as-chip">Any change ▾</span><span className="as-chip">Last 7 days ▾</span><span className="au-toggle"><i />Agents only</span></p>
            <div className="au-days">
              {days.map(([d, es]) => (
                <div key={d}>
                  <p className="m-k">{d}</p>
                  <div className="au-list">{es.map(([i, ag, who, what, t, diff], k) => (
                    <p key={k} className="au-row"><Ini n={i} agent={ag} /><span><b>{who}</b> {what}{diff && <span className="au-diff"><span className="au-old">{diff[0]}</span> → <b>{diff[1]}</b></span>}</span><small className="au-t">{t}</small></p>
                  ))}</div>
                </div>
              ))}
            </div>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="The same trail, one record at a time: INV-1038’s History in its side panel. Anyone who can see the invoice sees its history; the full trail is for admins.">
        <Frame on="Invoices"><DetailPage plain /></Frame>
      </Demo>

      <Section title="Filters people use">
        <When head={['Filter', 'Answers']} rows={[
          ['Who', 'What did Ana do this week? What did Marco, an Agent, change?'],
          ['Which record', 'Everything that happened to INV-1038, or to Metro Fuels and its invoices'],
          ['Kind of change', 'Only voids, only role changes, only settings changes'],
          ['When', 'Today, last 7 days, this month, or a range'],
          ['Agents only', 'Every change an Agent made, with the reason it gave'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Its own full page.', 'Administration › Audit trail, with room for search, filters, and a day of activity at a glance.'],
            ['Latest first, grouped by day.', 'Today, Yesterday, then dates. Each change with its time.'],
            ['Say what changed, from and to.', '“Changed the terms on INV-1072: Net 30 → Net 45.” Every record is a link.'],
            ['Filter by who, what, which, and when.', 'Plus Agents only, and a search across people, records, and values.'],
            ['Nobody can edit or delete it.', 'Not admins, not us. Export it for the auditor; the trail only grows.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['The trail squeezed into a settings panel.', 'Three changes fit on screen, and the one you need is on page 40.'],
            ['One long unsorted log.', 'Finding what happened on Tuesday means scrolling past a month.'],
            ['“Record updated.”', 'Nobody can tell what changed, or what it was before.'],
            ['A log you can only scroll.', 'Finding one change from March takes an afternoon.'],
            ['An audit trail admins can clear.', 'The person with the most access can hide their own changes.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
