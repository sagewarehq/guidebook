import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Ini } from '../../site/kit';
import { ConfirmPage } from '../records/confirm-kit';
import { AgentFrame, AgentAva, Source, agentsCast, type AgentId } from '../agents/agent-kit';
import './control.css';

// Decommissioning: retiring an Agent for good. Decommission… waits in the ••• menu, for the owner or an admin; a
// confirmation page checks first and hands open work to named people; access ends; everything it did is kept.
// Tess, a fourth Agent who texted borrowers before each repayment, was retired on Mon 14 Sep.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** Tess’s round initials, with the AI badge: she isn’t in the kit’s cast, because she’s retired. */
const Tess = ({ size }: { size?: 'sm' | 'lg' }) => <span className={`ag-ava ${size ?? ''}`}><Ini n="TE" agent /></span>;

/** The Agents page, on its Active or Decommissioned view. */
function AgentsPage({ view, children }: { view: 'Active' | 'Decommissioned'; children: ReactNode }) {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Agents <span>/</span> <b>{view}</b></p>
      <div className="as-a-head"><div><p className="m-title">Agents</p><p className="as-meta"><span>Your Agents, what they’re doing, and what waits on you</span></p></div></div>
      <p className="as-views2">
        <span className={view === 'Active' ? 'on' : undefined}>Active<em>{view === 'Active' ? 4 : 3}</em></span>
        <span className={view === 'Decommissioned' ? 'on' : undefined}>Decommissioned<em>{view === 'Active' ? 0 : 1}</em></span>
      </p>
      {children}
    </div>
  );
}

const activeRow = (id: AgentId, doing: string) => (
  <tr key={id}>
    <td><span className="ag-cell"><AgentAva id={id} size="sm" /><span>{agentsCast[id].name}<small>{agentsCast[id].role}</small></span></span></td>
    <td>{doing}</td><td>{agentsCast[id].owner}</td>
    <td className="r"><span className="as-acts"><span className="ag-pause">Pause</span><Btn kind="quiet">•••</Btn></span></td>
  </tr>
);

export default function Decommission() {
  return (
    <>
      <Demo wide caption={<>Mon 14 Sep. Reminders to borrowers now go out from a scheduled job, so Ramon, Tess’s owner, retires her. Decommission… waits in the ••• menu on her row and on her profile, away from Pause, and only her owner and admins see it. Pause stays one click, beside it.</>}>
        <AgentFrame on="Agents" as="lead">
          <AgentsPage view="Active">
            <table className="m-tbl cs-agents">
              <thead><tr><th>Agent</th><th>Doing now</th><th>Owner</th><th /></tr></thead>
              <tbody>
                {activeRow('marco', 'Matching supplier invoices to POs')}
                {activeRow('nico', 'Idle')}
                {activeRow('bea', 'Drafting a proposal for Cebu Grains')}
                <tr>
                  <td><span className="ag-cell"><Tess size="sm" /><span>Tess<small>Loan Reminders Agent</small></span></span></td>
                  <td>Texting borrowers due this week<small>Run #0288 · 74 of 112 sent</small></td><td>Ramon Cruz</td>
                  <td className="r"><span className="as-acts"><span className="ag-pause">Pause</span>
                    <span className="cs-more"><Btn kind="quiet">•••</Btn>
                      <span className="cs-menu"><p>Open profile</p><p>Change owner…</p><p>Download her runs</p><p className="bad">Decommission…</p><small>Owner and admins only</small></span>
                    </span></span></td>
                </tr>
              </tbody>
            </table>
            <div className="cs-space" />
          </AgentsPage>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>The confirmation page checks first. It lists what’s running, what waits on people, and what’s scheduled, and says who each piece goes to, by name. Access ends at once; everything Tess did stays, read-only, with her name on it. The button is red because it can’t be taken back: to have an Agent do this work again, you set up a new one.</>}>
        <AgentFrame on="Agents" as="lead">
          <ConfirmPage crumb={['Agents', 'Tess', 'Decommission']} title="Decommission Tess?" meta="Loan Reminders Agent · owner Ramon Cruz · working since 2 Mar 2026"
            facts={[['Runs so far', '1,204'], ['Running now', '1'], ['Waiting on people', '2']]}
            what={[
              <><b>Run #0288 stops after the text she’s sending.</b> The 38 borrowers not yet texted go to Liza Tan, as tasks.</>,
              <><b>2 approvals waiting go back to people:</b> the new Cebu reminder wording to Liza Tan, and the 6 Baguio late notices to you.</>,
              <><b>Her 3 schedules are turned off:</b> the 8:00 AM daily reminders, Friday’s due list, and the month-end summary.</>,
              <><b>Her access ends now:</b> her role, her SMS provider key, and her sessions are revoked.</>,
              <><b>Her 1,204 runs, her chats, and her skills are kept, read-only.</b> Her name and badge stay on every record she touched.</>,
            ]}
            reason="Reminders now go out from a scheduled job in Loans OS."
            back="Keep Tess" action="Decommission Tess" />
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>Afterwards, Tess moves to the Decommissioned view, greyed, with who retired her and when. There’s no Pause or Resume, because there’s nothing to resume; her runs stay one click away.</>}>
        <AgentFrame on="Agents" as="lead">
          <AgentsPage view="Decommissioned">
            <table className="m-tbl cs-agents">
              <thead><tr><th>Agent</th><th>Decommissioned</th><th>Owner</th><th>Kept</th></tr></thead>
              <tbody>
                <tr className="cs-gone">
                  <td><span className="ag-cell"><Tess size="sm" /><span>Tess<small>Loan Reminders Agent</small></span></span></td>
                  <td>By Ramon, 14 Sep<small>“Reminders now go out from a scheduled job in Loans OS.”</small></td>
                  <td>Ramon Cruz</td>
                  <td><a className="m-link">1,204 runs</a><small>Chats and skills, read-only</small></td>
                </tr>
              </tbody>
            </table>
          </AgentsPage>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="On a loan’s history, Tess’s work keeps her name and badge, marked Decommissioned, with the run behind it. People can still see who texted the borrower, and why.">
          <Win title="LN-2173 · History">
            <p className="as-h"><Ini n="AR" /><span><b>Ana</b> recorded ₱18,500<small>10 Sep</small></span></p>
            <p className="as-h"><Ini n="TE" agent /><span><b>Tess</b><span className="cs-gone-tag">Decommissioned</span> texted a repayment reminder<small>8 Sep · Due in 2 days. <Source>Run #0279</Source></small></span></p>
            <p className="as-h"><Ini n="LT" /><span><b>Liza</b> released the loan<small>10 Jun</small></span></p>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="The Agent was deleted, so its work shows as “Unknown”, with no run behind it. Nobody can tell who texted the borrower, or check what it said.">
          <Win title="LN-2173 · History">
            <p className="as-h"><Ini n="AR" /><span><b>Ana</b> recorded ₱18,500<small>10 Sep</small></span></p>
            <p className="as-h"><Ini n="?" /><span><b>Unknown</b> sent an SMS<small>8 Sep</small></span></p>
            <p className="as-h"><Ini n="LT" /><span><b>Liza</b> released the loan<small>10 Jun</small></span></p>
          </Win>
        </Demo>
      </Pair>

      <Section title="Pause, or decommission">
        <When head={['', 'Pause', 'Decommission']} rows={[
          ['For', <>A while: something looks wrong, or needs checking. See {link('control/pause', 'Pausing an Agent')}.</>, 'Good: the work is gone, or done another way.'],
          ['How', 'One click, anywhere the Agent appears. No page.', 'Decommission… in •••, then a confirmation page. Owner or admin.'],
          ['Runs going', 'Pause after their current step, and wait.', 'Stop after their current step. What’s left goes to named people.'],
          ['Approvals waiting', 'Keep waiting for a person.', 'Go back to named people.'],
          ['Access', 'Kept.', 'Ended: role, keys, and sessions. Schedules off.'],
          ['Coming back', <>Resume…, on a confirmation page.</>, 'Never. Set up a new Agent instead.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Put Decommission… in the ••• menu.', 'On the Agent’s row and profile, away from Pause, for its owner and admins only.'],
            ['Check first, on a confirmation page.', 'What’s running, what waits on people, and what’s scheduled, before the red button.'],
            ['Hand open work to named people.', 'Each run left and each approval waiting goes to a person, by name.'],
            ['End access, keep the record.', 'Role, keys, sessions, and schedules end at once; runs, chats, and skills stay, read-only.'],
            ['Keep its name on everything it touched.', 'Like a deactivated person: its name and badge stay, marked Decommissioned.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Decommission beside Pause.', 'One slip, and an Agent meant to rest for an hour is gone for good.'],
            ['Decommissioning in one click.', 'Nobody sees the run still going, or the 2 approvals waiting, until they’re lost.'],
            ['Open work left with a retired Agent.', 'Approvals wait for someone who will never answer.'],
            ['Deleting the Agent.', 'Its runs and reasons vanish, and nobody can check what it did.'],
            ['“Unknown” in the history.', 'People can’t tell who texted a borrower, or why.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
