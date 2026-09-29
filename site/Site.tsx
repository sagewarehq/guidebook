// The guidebook: a sidebar with every part and search, and four kinds of page (home, part, chapter, pattern).
// Routes live in the hash (#/business/foundations/app-shell) so the built single file works from file:// too.
import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { editions, allPatterns, type Chapter, type Edition, type Pattern, type Status } from '../catalog';
import { cx } from '../lib/cx';

// Written pattern pages, keyed "chapter/id".
const pages = Object.fromEntries(
  Object.entries(import.meta.glob('../patterns/*/*.tsx', { eager: true })).map(([path, mod]) => [
    path.replace('../patterns/', '').replace(/\.tsx$/, ''),
    (mod as { default: ComponentType }).default,
  ]),
);

type Route = { edition?: Edition; chapter?: Chapter; pattern?: Pattern };

function parse(hash: string): Route {
  const [e, c, pt] = hash.replace(/^#\/?/, '').split('/');
  const edition = editions.find(x => x.id === e);
  const chapter = edition?.chapters.find(x => x.id === c);
  const pattern = chapter?.patterns.find(x => x.id === pt);
  return { edition, chapter, pattern };
}

const href = (...parts: string[]) => `#/${parts.join('/')}`;

function useRoute() {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    const on = () => { setHash(location.hash); window.scrollTo(0, 0); };
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  return parse(hash);
}

const statusName: Record<Status, string> = { written: 'Written', draft: 'Draft', planned: 'Planned' };
const Dot = ({ s }: { s: Status }) => <i className={cx('g-dot', s)} title={statusName[s]} aria-label={statusName[s]} />;

function count(ch: Chapter) {
  return ch.patterns.filter(p => p.status === 'written' || p.status === 'draft').length;
}

/* ---------- sidebar ---------- */

function Crumbs({ route }: { route: Route }) {
  const { edition, chapter, pattern } = route;
  const steps: [string, string][] = [['Guidebook', '#/']];
  if (edition) steps.push([edition.name, href(edition.id)]);
  if (edition && chapter) steps.push([chapter.name, href(edition.id, chapter.id)]);
  if (edition && chapter && pattern) steps.push([pattern.name, href(edition.id, chapter.id, pattern.id)]);
  return (
    <nav className="g-crumb" aria-label="Breadcrumb">
      <ol>
        {steps.map(([name, to], i) => (
          <li key={to}>{i < steps.length - 1 ? <a href={to}>{name}</a> : <span aria-current="page">{name}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

function Sidebar({ route }: { route: Route }) {
  const [q, setQ] = useState('');
  const edition = route.edition ?? editions[0];
  // Parts opened by hand; the part you're in is always open.
  const [openParts, setOpenParts] = useState<string[]>([]);
  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return allPatterns.filter(({ pattern: p, chapter: c }) =>
      [p.name, p.title, p.summary, c.name].join(' ').toLowerCase().includes(s)).slice(0, 30);
  }, [q]);

  return (
    <nav className="g-side" aria-label="Guidelines">
      <a className="g-brand" href="#/"><b>Sageware</b> Guidebook</a>
      <input className="g-search" type="search" placeholder="Search the guidebook…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search patterns" />

      {q.trim() ? (
        <ul className="g-hits">
          {hits.length === 0 && <li className="g-none">{`Nothing matches “${q.trim()}”.`}</li>}
          {hits.map(({ edition: e, chapter: c, pattern: p }) => (
            <li key={`${e.id}/${c.id}/${p.id}`}>
              <a href={href(e.id, c.id, p.id)} onClick={() => setQ('')}>
                <Dot s={p.status} /><span><b>{p.name}</b><small>{`${e.name} · ${c.name}`}</small></span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="g-browse">
          {editions.map(ed => {
            const here = ed.id === edition.id;
            const shown = here || openParts.includes(ed.id);
            const done = ed.chapters.reduce((n, c) => n + count(c), 0);
            const all = ed.chapters.reduce((n, c) => n + c.patterns.length, 0);
            return (
              <section key={ed.id} className={cx('g-part', shown && 'open', here && 'here')}>
                <button type="button" className="g-part-h" aria-expanded={shown}
                  onClick={() => setOpenParts(o => (o.includes(ed.id) ? o.filter(x => x !== ed.id) : [...o, ed.id]))}>
                  <span>{ed.name}</span><small>{`${done}/${all}`}</small><i>{shown ? '▾' : '▸'}</i>
                </button>
                {shown && (
                  <ol className="g-chapters">
                    {ed.chapters.map(c => {
                      const open = here && route.chapter?.id === c.id;
                      return (
                        <li key={c.id} className={cx(open && 'open')}>
                          <a className={cx('g-ch', open && !route.pattern && 'on')} href={href(ed.id, c.id)}>
                            <span>{c.name}</span><small>{`${count(c)}/${c.patterns.length}`}</small>
                          </a>
                          {open && (
                            <ul className="g-pats">
                              {c.patterns.map(p => (
                                <li key={p.id}>
                                  <a className={cx(route.pattern?.id === p.id && 'on', p.status)} href={href(ed.id, c.id, p.id)}>
                                    <Dot s={p.status} />{p.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                )}
              </section>
            );
          })}
        </div>
      )}
      <p className="g-legend"><span><Dot s="written" />Written</span><span><Dot s="draft" />Draft</span><span><Dot s="planned" />Planned</span></p>
    </nav>
  );
}

/* ---------- pages ---------- */

function Home() {
  const written = allPatterns.filter(x => x.pattern.status === 'written').length;
  return (
    <div className="g-home">
      <p className="g-eyebrow">Sageware</p>
      <h1>Guidebook</h1>
      <p className="g-lede">How Sageware engineers design and build Intelligent Management Systems: the system a business runs on, the portal its customers use, and the Agents that work inside it. It starts with UX; engineering practices join as they’re written.</p>
      <p className="g-meta">{`${written} of ${allPatterns.length} patterns written · three parts`}</p>
      <div className="g-editions">
        {editions.map(e => (
          <section key={e.id} className="g-edition">
            <h2><a href={href(e.id)}>{e.name}</a></h2>
            <p>{e.summary}</p>
            <ol>
              {e.chapters.map(c => (
                <li key={c.id}>
                  <a href={href(e.id, c.id)}>{c.name}</a>
                  {c.layer && <em>{c.layer}</em>}
                  <small>{`${count(c)}/${c.patterns.length}`}</small>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

function EditionPage({ edition }: { edition: Edition }) {
  return (
    <div className="g-chapter">
      <p className="g-eyebrow">Part</p>
      <h1>{edition.name}</h1>
      <p className="g-lede">{edition.summary}</p>
      <ol className="g-links">
        {edition.chapters.map(c => (
          <li key={c.id}>
            <a href={href(edition.id, c.id)}>{c.name}</a>
            <span>{c.summary}</span>
            <small>{`${count(c)} of ${c.patterns.length}`}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ChapterPage({ edition, chapter }: { edition: Edition; chapter: Chapter }) {
  return (
    <div className="g-chapter">
      <p className="g-eyebrow">{edition.name}{chapter.layer ? ` · ${chapter.layer} layer` : ''}</p>
      <h1>{chapter.name}</h1>
      <p className="g-lede">{chapter.summary}</p>
      <ol className="g-links">
        {chapter.patterns.map(p => (
          <li key={p.id} className={p.status}>
            <a href={href(edition.id, chapter.id, p.id)}>{p.name}</a>
            <span>{p.summary}</span>
            {p.status !== 'written' && <small><Dot s={p.status} />{statusName[p.status]}</small>}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PatternPage({ edition, chapter, pattern }: Required<Route>) {
  const Body = pages[`${chapter.id}/${pattern.id}`];
  const flat = edition.chapters.flatMap(c => c.patterns.map(p => ({ c, p })));
  const i = flat.findIndex(x => x.p === pattern);
  const prev = flat[i - 1];
  const next = flat[i + 1];
  return (
    <article className="g-pattern">
      <p className="g-eyebrow">{pattern.name}</p>
      <h1>{pattern.title}</h1>
      <p className="g-lede">{pattern.summary}</p>
      {pattern.status === 'draft' && <p className="g-draft"><b>Draft.</b> Imagined, not settled yet. Treat it as a sketch to discuss, not a rule to follow.</p>}

      {Body ? <Body /> : (
        <div className={cx('g-todo', pattern.status)}>
          <p><b>Planned.</b> This pattern is on the list for {chapter.name}, and hasn’t been written yet.</p>
        </div>
      )}

      <nav className="g-pn">
        {prev ? <a href={href(edition.id, prev.c.id, prev.p.id)}><small>Previous</small>{prev.p.name}</a> : <span />}
        {next && <a className="nx" href={href(edition.id, next.c.id, next.p.id)}><small>Next</small>{next.p.name}</a>}
      </nav>
    </article>
  );
}

export function Site() {
  const route = useRoute();
  const { edition, chapter, pattern } = route;
  useEffect(() => {
    document.title = [pattern?.name ?? chapter?.name ?? edition?.name, 'Sageware UX Guidelines'].filter(Boolean).join(' · ');
  }, [edition, chapter, pattern]);
  return (
    <div className="g-shell">
      <Sidebar route={route} />
      <main className="g-main">
        {edition && <Crumbs route={route} />}
        {edition && chapter && pattern ? <PatternPage edition={edition} chapter={chapter} pattern={pattern} />
          : edition && chapter ? <ChapterPage edition={edition} chapter={chapter} />
          : edition ? <EditionPage edition={edition} />
          : <Home />}
      </main>
    </div>
  );
}
