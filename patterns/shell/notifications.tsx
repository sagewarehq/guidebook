import type React from 'react';
import { Section, Demo, Rules, Avoid, When, Ini, Sk } from '../../site/kit';
import { Frame } from './shell-kit';
import { H } from './places-kit';
import './shell.css';

// Notifications: the bell in the top bar, and a panel of links. Each one says who did what to which record, and
// opens the place it happened. No actions inside the panel, for now.

type N = [ini: string, agent: boolean, text: React.ReactNode, where: string, when: string, unread?: boolean];

const items: N[] = [
  ['MA', true, <><b>Marco</b> prepared payment run <b>#0318</b>: 35 suppliers, ₱48.65M. It needs your approval.</>, 'Payments › Run #0318', '5 min ago', true],
  ['AR', false, <><b>Ana</b> changed the terms on <b>INV-1072</b> from Net 30 to Net 45.</>, 'Invoices › INV-1072 › History', '2 hours ago', true],
  ['LT', false, <><b>Liza</b> approved <b>LN-2231</b> for release.</>, 'Loans › LN-2231', 'Yesterday, 4:12 PM'],
  ['RC', false, <><b>Your export is ready:</b> 1,204 invoices.</>, 'Jobs › Export invoices, 27 Sep', 'Yesterday, 11:03 AM'],
];

export default function Notifications() {
  return (
    <>
      <Demo wide caption="The bell (1) shows how many are unread. It opens a panel from the right, the full height of the window, like a drawer. Each notification is one link: who did what to which record, where it opens, and when. Clicking it goes there, and marks it read.">
        <Frame loud as="lead" on="Invoices" top={<><H n={1}><span className="as-bell">2</span></H><Ini n="RC" /></>}>
          <div className="pd-big sh-notifwrap">
            <div className="as-a-page sh-dimpage"><p className="as-crumb">Invoices <span>/</span> <b>Overdue in Cebu</b></p><p className="m-title">Invoices</p>{[80, 66, 74, 58, 70].map(x => <Sk key={x} w={`${x}%`} />)}</div>
            <div className="sh-notif">
              <p className="sh-notif-h"><b>Notifications</b><span><a className="m-link">Mark all read</a><span className="sh-x">×</span></span></p>
              {items.map(([i, ag, t, where, when, unread], k) => (
                <a key={k} className={`sh-n${unread ? ' unread' : ''}`}>
                  <Ini n={i} agent={ag} />
                  <span><span className="sh-n-t">{t}</span><small>{where} · {when}</small></span>
                  {unread && <i className="sh-dot" />}
                </a>
              ))}
              <p className="sh-notif-f"><a className="m-link">See all notifications</a></p>
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="What’s worth a notification">
        <When head={['Notify', 'Don’t notify']} rows={[
          ['Something waits for this person: an approval, an assignment, a mention.', 'Things they did themselves.'],
          ['Someone changed a record this person owns or follows.', 'Every change to every record they can see. That’s what History is for.'],
          ['Background work this person started has finished, or failed.', 'Routine jobs they never asked about.'],
          ['An Agent finished work for them, or flagged something.', 'Each step an Agent took. Link to its run instead.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['The bell, top right, counting unread.', 'Just left of you. The count is unread items only, and disappears at zero.'],
            ['Each one is a link to where it happened.', 'The record, the history entry, or the page that needs them. Clicking opens it and marks it read.'],
            ['Who, what, which record.', '“Ana changed the terms on INV-1072 from Net 30 to Net 45.” Agents marked as Agents.'],
            ['Say where it opens, and when.', 'A small line under each: Invoices › INV-1072 › History · 2 hours ago.'],
            ['Opens like a drawer, newest first.', 'From the right, the full height of the window, a dot on each unread. On a phone it’s the full screen.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A count that includes things already read.', 'The number never reaches zero, so people stop looking.'],
            ['Approve or reply buttons in the panel.', 'They skip the check the page does. For now, the link takes people there.'],
            ['“You have a new notification.”', 'It says nothing, so people have to open it to find out.'],
            ['Opening Home or a list instead of the exact place.', 'People hunt for the record the notification was about.'],
            ['Unread that looks the same as read.', 'People can’t tell what’s new, and open the same ones twice.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
