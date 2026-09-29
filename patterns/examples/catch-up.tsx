import type { ReactNode } from 'react';
import { Section, Demo, Rules, Avoid, Sk } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps } from '../agents/agent-kit';
import { AgentWindow, Flow, Saved, Who, go, type Sess } from './b-kit';

// Catching up: Ramon is back on Monday and asks Marco what changed on his accounts since Friday. Marco reads only
// Ramon’s records (the customers assigned to him, and the runs he approves), from when he last signed out, and
// answers in groups, each line a link, ending on what needs him first.

const sessions: Sess[] = [
  ['marco', 'Catch-up since Friday', 'Answered', '9:30 AM'],
  ['marco', 'Payment run #0318', 'Waiting on you', '7:40 AM'],
  ['nico', 'Baguio collections in September', 'Answered', 'Wed'],
];

/** A group in the catch-up: a heading with its count, then one linked line per item. */
function Grp({ title, n, first, children }: { title: string; n: number; first?: boolean; children: ReactNode }) {
  return <div className={first ? 'exb-dg first' : 'exb-dg'}><p className="exb-dg-h"><b>{title}</b><em>{n}</em></p>{children}</div>;
}

/** One line of a group: the record as a link, what happened, and a small line under it. */
const It = ({ link, children, sub }: { link: string; children: ReactNode; sub?: ReactNode }) => (
  <p className="exb-it"><a className="m-link">{link}</a><span>{children}{sub && <small>{sub}</small>}</span></p>
);

/** Marco’s answer, as it reads in the Agents window: what needs Ramon, what went wrong, and the rest in one line. */
function Digest() {
  return (
    <div className="exb-dig">
      <p className="exb-dig-top">Since you signed out, Fri 25 Sep, 6:10 PM · your 38 customers, and the runs you approve</p>
      <Grp title="Needs you" n={2} first>
        <It link="Run #0319" sub="Answer by today, 5:00 PM">Payment reminders for overdue invoices in Cebu</It>
        <It link="Run #0318" sub="Answer by Tue 29 Sep, 8:30 AM, the bank’s cut-off">₱48,650,000.00 to 32 suppliers, 3 held</It>
      </Grp>
      <Grp title="Promises broken" n={2}>
        <It link="Metro Fuels" sub="INV-1038 · promised by Joy Santos">₱420,000.00 due Fri 25 Sep; nothing came</It>
        <It link="Metro Fuels Trading" sub="INV-0977 · Baguio">₱510,000.00 due Sat 26 Sep; ₱200,000.00 came</It>
      </Grp>
      <p className="exb-dig-end">Also: <a className="m-link">5 invoices gone overdue</a>, ₱3,126,000.00 · <a className="m-link">14 payments in</a>, ₱6,284,500.00, all matched · <a className="m-link">2 things Agents did</a></p>
    </div>
  );
}

/** Home behind the right bar: quiet, since the answer is the point. */
function Home() {
  return (
    <div className="as-a-page">
      <p className="as-crumb"><b>Home</b></p>
      <div className="as-a-head"><div><p className="m-title">Good morning, Ramon</p><p className="as-meta"><span>Monday 28 Sep · Finance</span></p></div></div>
      {[82, 68, 76, 58].map(w => <Sk key={w} w={`${w}%`} />)}
    </div>
  );
}

export default function CatchUp() {
  return (
    <>
      <Demo wide caption={<><b>1. The ask.</b> Ramon is back on Monday. On Home he opens Marco in the right bar, shares his recent activity for this session, and asks. Marco says what he read: from when Ramon last signed out, only Ramon’s own customers and the runs he approves.</>}>
        <div className="exa-mid">
          <AgentFrame as="lead" on="Home" loud overlay={
            <ChatPanel agent="marco" status="Catching you up" onPage="Home · your activity since Friday, shared">
              <Day label="Today" />
              <Me>What changed on my accounts since Friday?</Me>
              <Steps items={[
                [true, 'From when you signed out: Fri 25 Sep, 6:10 PM'],
                [true, 'Your 38 customers, and the runs you approve'],
                [true, 'Left out 212 changes on other people’s accounts'],
              ]} />
              <Msg>2 things need you: one by 5:00 PM today, one by 8:30 AM tomorrow. <a className="m-link">Open the full catch-up</a></Msg>
            </ChatPanel>
          }>
            <Home />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<><b>2. The answer, grouped.</b> Short groups in the order Ramon acts on them: what needs him, with when it’s due, then what went wrong, then the rest in one line. Every line is a link to the run, customer, or invoice, so he opens the real record, not a copy. The bell’s list, 46 since Friday in time order, can’t do this: see {go('management/shell/notifications', 'Notifications')}.</>}>
        <AgentFrame as="lead" on="Agents">
          <AgentWindow agent="marco" status="Answered" session="Catch-up since Friday" sessions={sessions}>
            <Me>What changed on my accounts since Friday?</Me>
            <Msg><Digest /></Msg>
          </AgentWindow>
        </AgentFrame>
      </Demo>

      <Section title="The workflow">
        <Flow rows={[
          [<Who>Ramon</Who>, 'On Home, shares his recent activity for this session and asks.', go('agentic/chat/context', 'What the Agent can see')],
          [<Who agent="marco">Marco</Who>, 'Finds when Ramon last signed out, and which records are his.', go('agentic/agents/access', 'Giving an Agent access')],
          [<Who agent="marco">Marco</Who>, 'Groups what changed: needs you, promises broken, then the rest.', go('agentic/chat/replies', 'Agent replies')],
          [<Who agent="marco">Marco</Who>, 'Ends on what needs Ramon first, with when it’s due.', go('agentic/approvals/waiting', 'Waiting on you')],
          [<Who>Ramon</Who>, 'Opens each link on the real screen, and decides.', go('agentic/chat/open-screen', 'Open the real screen')],
        ]} />
      </Section>

      <Section title="Why it saves time">
        <Saved
          rows={[
            ['Finding what needs you', '30 minutes through 46 notifications and the weekend’s email', '2 approvals at the top, with when each is due'],
            ['Checking payments and promises', '40 minutes in the aged receivables report and notes', '2 broken promises named, each a link'],
          ]}
          total={['About 1¼ hours', '5 minutes reading']}
          still="Ramon still decides what to act on, and in what order. The catch-up sorts by when things are due; he knows which customer to call first."
        />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Only your records, since you were last in.', 'Ramon’s customers and runs, since Fri 25 Sep, 6:10 PM, said at the top.'],
            ['Grouped by what you’ll do.', 'Needs you first, then what went wrong, then the rest.'],
            ['Every line is a link.', 'To the run, customer, or invoice, where the work is done.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Everything, for everyone.', '237 changes, and Ramon’s 2 approvals are somewhere among them.'],
            ['A story in time order.', 'The broken promise is in the fourth paragraph.'],
            ['Summaries with no way in.', '“Some payments came in.” Which, and from whom?'],
          ]} />
        </Section>
      </div>
    </>
  );
}
