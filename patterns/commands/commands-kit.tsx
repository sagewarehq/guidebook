// Drawings for the Slash commands pages: the commands themselves, the chat panel with a / menu over its message box,
// the message box with a command and its inputs filled in, and the Agents window. The head of Marco’s page is the kit’s AgentHead.
// Not a page itself: catalog.ts has no "commands-kit".
import type { ReactNode } from 'react';
import { Btn } from '../../site/kit';
import { AgentAva, agentsCast, type AgentId } from '../agents/agent-kit';
import { cx } from '../../lib/cx';
import './commands.css';

/* ---------- the commands ---------- */

/** A command: its name, one line on what it does, and who made it and for whom (built-in commands have neither). */
export type Cmd = { name: string; desc: string; by?: string; who?: string };

/** The six built-in commands for an Agent, the same for every Agent, always first in the menu. */
export function builtInsFor(agent: AgentId = 'marco'): Cmd[] {
  const a = agentsCast[agent].name;
  const his = agentsCast[agent].him === 'her' ? 'her' : 'his';
  return [
    { name: '/new', desc: `Start a new session with ${a}.` },
    { name: '/status', desc: `What ${a} is doing now, in every session.` },
    { name: '/runs', desc: `Open ${a}’s runs, newest first.` },
    { name: '/pause', desc: `Pause ${a} now, everywhere. Same as Pause.` },
    { name: '/share', desc: 'Share your recent activity with this session.' },
    { name: '/help', desc: `What ${a} can do, and ${his} commands.` },
  ];
}

/** Marco’s built-in commands. */
export const builtIns = builtInsFor('marco');

/** Marco’s team commands at Metro Lending: made by people, for the asks they make often. */
export const teamCmds: Record<'payrun' | 'remind' | 'explain' | 'receipts', Cmd> = {
  payrun: { name: '/payrun', desc: 'Prepare a week’s payment run, holding anything unsure.', by: 'Ramon Cruz', who: 'Finance' },
  remind: { name: '/remind-overdue', desc: 'Draft reminders for overdue invoices in your branch.', by: 'Ana Reyes', who: 'Everyone who can use Marco' },
  explain: { name: '/explain', desc: 'Why a figure on this page is what it is, with sources.', by: 'Carlo Mendoza', who: 'Everyone who can use Marco' },
  receipts: { name: '/match-receipts', desc: 'Match a week’s delivery receipts to their POs.', by: 'Ramon Cruz', who: 'Just me' },
};

/* ---------- the chat panel ---------- */

/** The chat header, as the kit draws it: who, their role, what they’re doing, Pause, and ×. */
export function CmdHead({ agent = 'marco', status, pausedBy }: { agent?: AgentId; status: ReactNode; pausedBy?: string }) {
  const a = agentsCast[agent];
  return (
    <div className="ag-head">
      <AgentAva id={agent} />
      <div className="ag-who"><b>{a.name}</b><small>{a.role}</small><span className={cx('ag-st', pausedBy && 'paused')}>{pausedBy ?? status}</span></div>
      <span className={cx('ag-pause', pausedBy && 'paused')}>{pausedBy ? '▶ Resume…' : 'Pause'}</span>
      <span className="ag-x">×</span>
    </div>
  );
}

/**
 * The right bar with a message box that can hold a command: the kit’s chat panel, with `foot` in place of the plain
 * message box (a / menu over it, or a command with its inputs filled in).
 */
export function CmdPanel({ agent = 'marco', status = 'Ready', pausedBy, onPage, foot, children }: {
  agent?: AgentId; status?: ReactNode; pausedBy?: string; onPage?: ReactNode; foot: ReactNode; children?: ReactNode;
}) {
  return (
    <div className="ag-panel">
      <CmdHead agent={agent} status={status} pausedBy={pausedBy} />
      {onPage && <p className="ag-on">Looking at <b>{onPage}</b></p>}
      <div className="ag-feed">{children}</div>
      <div className="cm-foot">{foot}</div>
    </div>
  );
}

/** A command’s name with what was typed so far marked, as the menu shows it: “/pa” in /payrun. */
function Name({ name, typed }: { name: string; typed?: string }) {
  if (!typed || !name.startsWith(typed)) return <b>{name}</b>;
  return <b><mark>{typed}</mark>{name.slice(typed.length)}</b>;
}

/**
 * The / menu over the message box. `built` draws the built-in commands as a compact row (when nothing is typed yet);
 * each group is a label and its commands, each with one line on what it does and who made it. `on` is highlighted.
 */
export function Menu({ typed, built, groups, on, foot }: {
  typed?: string; built?: boolean; groups: [string, Cmd[]][]; on?: string; foot?: ReactNode;
}) {
  return (
    <div className="cm-menu">
      {built && <><p className="m-k">Built-in</p><p className="cm-built">{builtIns.map(c => <span key={c.name}>{c.name}</span>)}</p></>}
      {groups.map(([label, cmds]) => (
        <div key={label}>
          <p className="m-k">{label}</p>
          {cmds.map(c => (
            <p key={c.name} className={cx('cm-row', c.name === on && 'on')}>
              <Name name={c.name} typed={typed} /><span>{c.desc}</span>
              {c.by && <small>{`${c.by} · ${c.who}`}</small>}
            </p>
          ))}
        </div>
      ))}
      <p className="cm-menu-f">{foot ?? '↑↓ to choose · Enter to pick · Esc to close'}</p>
    </div>
  );
}

/** An input of a command, filled in: its name, small, then its value. `on` is the one being edited. */
export const Chip = ({ k, v, on }: { k: string; v: ReactNode; on?: boolean }) => (
  <span className={cx('cm-chip', on && 'on')}><small>{k}</small>{v}</span>
);

export const Caret = () => <i className="cm-caret" />;

/**
 * The message box. `children` is what’s typed: plain text, or a command and its chips. `tag` (“Drafts”) and `preview` say
 * what will happen before it runs; `where` says which session it runs in.
 */
export function Composer({ children, tag, preview, where }: { children: ReactNode; tag?: string; preview?: ReactNode; where?: ReactNode }) {
  return (
    <div className="cm-comp">
      <p className="cm-line">{children}</p>
      {preview && <p className="cm-prev">{tag && <span className="cm-lvl">{tag}</span>}<span>{preview}</span></p>}
      <p className="cm-bar">{where ?? <span>Type / for commands</span>}<i>↑</i></p>
    </div>
  );
}

/** A command as sent, in Ramon’s bubble: the name and its inputs. Use inside Me. */
export const Sent = ({ name, inputs }: { name: string; inputs: [string, string][] }) => (
  <span className="cm-sent"><span className="cm-tok">{name}</span>{inputs.map(([k, v]) => <Chip key={k} k={k} v={v} />)}</span>
);

/* ---------- the Agents window ---------- */

/** A session in the list: the Agent, its title, where it stands, when. */
export type Sess = [AgentId, string, string, string, boolean?];

/** The Agents window without its detail drawer: sessions on the left, one conversation on the right. */
export function CmdWindow({ sessions, title, agent = 'marco', foot, overlay, children }: {
  sessions: Sess[]; title: ReactNode; agent?: AgentId; foot?: ReactNode; overlay?: ReactNode; children: ReactNode;
}) {
  return (
    <div className="cm-ws">
      <div className="cm-sess">
        <p className="cm-sess-h"><b>Sessions</b><Btn>New</Btn></p>
        {sessions.map(([id, t, st, at, on]) => (
          <p key={t} className={cx('cm-s', on && 'on')}>
            <AgentAva id={id} size="sm" />
            <span><b>{t}</b><small>{`${agentsCast[id].name} · ${st}`}</small></span>
            <em>{at}</em>
          </p>
        ))}
      </div>
      <div className="cm-chat">
        <p className="cm-chat-h"><AgentAva id={agent} size="sm" /><b>{title}</b><small>{`with ${agentsCast[agent].name}`}</small></p>
        <div className="ag-feed">{children}</div>
        {foot && <div className="cm-foot">{foot}</div>}
        {overlay}
      </div>
    </div>
  );
}
