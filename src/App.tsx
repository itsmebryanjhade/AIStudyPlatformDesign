import { useMemo, useState } from "react";

type IconName =
  | "home" | "book" | "chart" | "search" | "bell" | "plus"
  | "file" | "chat" | "arrow" | "upload" | "check" | "more"
  | "close" | "send" | "user";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.5V21h13V9.5M9.5 21v-7h5v7"/></>,
    book: <><path d="M4 4.5A3.5 3.5 0 0 1 7.5 1H20v17H7.5A3.5 3.5 0 0 0 4 21.5z"/><path d="M4 4.5v17M8 6h8M8 10h6"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    search: <><circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    chat: <><path d="M21 12a8 8 0 0 1-8 8H5l-3 2 1-5a9 9 0 1 1 18-5z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v5h16v-5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    send: <><path d="m3 3 19 9-19 9 4-9z"/><path d="M7 12h15"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const nav = [
  { id: "home", label: "Home", icon: "home" },
  { id: "library", label: "Library", icon: "book" },
  { id: "upload", label: "Upload", icon: "plus" },
  { id: "progress", label: "Progress", icon: "chart" },
  { id: "profile", label: "Profile", icon: "user" },
] as const;

const courses = [
  { title: "Cognitive Psychology", detail: "Chapter 4 · Memory systems", progress: 68, icon: "CP" },
  { title: "Organic Chemistry", detail: "Unit 2 · Molecular structure", progress: 42, icon: "OC" },
  { title: "Macroeconomics", detail: "Week 6 · Monetary policy", progress: 81, icon: "ME" },
];

function ProgressRing({ value, size = 72 }: { value: number; size?: number }) {
  const radius = 30;
  const dash = 2 * Math.PI * radius;
  return (
    <div className="progress-ring" style={{ width: size, height: size }} role="img" aria-label={`${value}% mastery`}>
      <svg viewBox="0 0 72 72">
        <circle className="ring-track" cx="36" cy="36" r={radius}/>
        <circle className="ring-value" cx="36" cy="36" r={radius} strokeDasharray={dash} strokeDashoffset={dash * (1 - value / 100)}/>
      </svg>
      <strong>{value}%</strong>
    </div>
  );
}

function Sidebar({ active, setActive, onUpload }: { active: string; setActive: (id: string) => void; onUpload: () => void }) {
  return (
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">O</div><span>Omnave</span></div>
      <nav className="sidebar-links" aria-label="Primary">
        {nav.map((item) => <button key={item.id} aria-current={active === item.id ? "page" : undefined} className={`nav-item ${active === item.id ? "active" : ""} ${item.id === "upload" ? "nav-upload" : ""}`} onClick={() => item.id === "upload" ? onUpload() : setActive(item.id)}><Icon name={item.icon}/><span>{item.label}</span></button>)}
      </nav>
      <div className="sidebar-spacer"/>
      <div className="upgrade-card">
        <strong>Study without limits</strong>
        <p>Unlimited uploads and lesson tools with Omnave Pro.</p>
        <button>Explore Pro</button>
      </div>
      <div className="profile-row">
        <div className="avatar">AM</div>
        <div><strong>Alex Morgan</strong><span>Free plan</span></div>
        <button className="icon-button quiet" aria-label="Account options"><Icon name="more"/></button>
      </div>
    </aside>
  );
}

function Header({ title, onUpload }: { title: string; onUpload: () => void }) {
  return (
    <header className="topbar">
      <div className="mobile-brand"><div className="brand-mark">O</div><span>Omnave</span></div>
      <div className="page-title">{title}</div>
      <div className="header-actions">
        <label className="search-box"><Icon name="search" size={18}/><input placeholder="Search anything" aria-label="Search"/><kbd>⌘ K</kbd></label>
        <button className="icon-button" aria-label="Notifications"><Icon name="bell"/></button>
        <button className="upload-button" onClick={onUpload}><Icon name="plus" size={18}/><span>Upload material</span></button>
        <div className="mobile-avatar" aria-label="Alex Morgan">AM</div>
      </div>
    </header>
  );
}

function Home({ onUpload, onOpen, onLibrary }: { onUpload: () => void; onOpen: () => void; onLibrary: () => void }) {
  const stops = [
    { state: "complete", step: 6, title: "Attention & perception", meta: "Mastered with 92% recall" },
    { state: "complete", step: 7, title: "Encoding information", meta: "Completed yesterday" },
  ];
  return (
    <div className="page-content atlas-home">
      <section className="atlas-welcome">
        <div><h1>Good morning, Alex.</h1><p>Pick up where your curiosity left off.</p></div>
        <div className="atlas-streak"><span>7</span><div><strong>Day rhythm</strong><small>One session keeps it going</small></div></div>
      </section>

      <section className="atlas-card" aria-labelledby="current-path-title">
        <header className="atlas-card-head">
          <div>
            <p className="atlas-kicker">Current path</p>
            <h2 id="current-path-title">Cognitive Psychology</h2>
            <p className="atlas-dek">How the mind receives, stores, and recalls the world.</p>
          </div>
          <div className="atlas-mastery"><ProgressRing value={68} size={64}/><div><strong>Path mastery</strong><span>Growing steadily</span></div></div>
        </header>

        <ol className="atlas-route" aria-label="Learning path checkpoints">
          {stops.map((stop) => (
            <li className="route-stop complete" key={stop.step}>
              <span className="route-node" aria-hidden="true"><Icon name="check" size={14}/></span>
              <div className="route-text"><strong>{stop.title}</strong><p><span>Checkpoint {stop.step}</span> · {stop.meta}</p></div>
            </li>
          ))}
          <li className="route-stop current" aria-current="step">
            <span className="route-node" aria-hidden="true">8</span>
            <div className="current-lesson">
              <p className="current-meta">Checkpoint 8 · Current lesson</p>
              <h3>Memory systems & processes</h3>
              <p className="current-summary">Explore how working, sensory, and long-term memory work together.</p>
              <div className="current-actions">
                <button className="atlas-continue" onClick={onOpen}><span>Continue learning</span><Icon name="arrow" size={18}/></button>
                <ul className="lesson-details"><li>12 min remaining</li><li>3 concepts</li><li>1 knowledge check</li></ul>
              </div>
            </div>
          </li>
          <li className="route-stop next">
            <span className="route-node" aria-hidden="true">9</span>
            <div className="route-text"><strong>Retrieval & forgetting</strong><p><span>Up next</span> · Unlocks after this lesson</p></div>
          </li>
        </ol>

        <footer className="atlas-foot">
          <div className="atlas-foot-progress"><span>8 of 12 checkpoints</span><div className="atlas-progress" role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} aria-label="Path progress"><i/></div></div>
          <p>Four checkpoints remain on this path</p>
        </footer>
      </section>

      <section className="atlas-lower" aria-labelledby="other-paths-title">
        <div className="atlas-section-title"><h2 id="other-paths-title">Your other paths</h2><button onClick={onLibrary}>View library <Icon name="arrow" size={16}/></button></div>
        <ul className="quiet-paths">
          {courses.slice(1).map((course) => (
            <li key={course.title}>
              <span className="path-monogram" aria-hidden="true">{course.icon}</span>
              <div className="quiet-text"><strong>{course.title}</strong><p>{course.detail}</p></div>
              <div className="quiet-meter"><div className="quiet-progress" aria-hidden="true"><i style={{width:`${course.progress}%`}}/></div><span className="quiet-value">{course.progress}%</span></div>
            </li>
          ))}
          <li className="quiet-add-row"><button className="atlas-add" onClick={onUpload}><span className="atlas-add-icon"><Icon name="plus" size={16}/></span><span>Add material</span></button></li>
        </ul>
      </section>
    </div>
  );
}

function Library({ onUpload, onOpen }: { onUpload: () => void; onOpen: (title: string) => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "complete">("all");
  const paths = [
    { title: "Cognitive Psychology", type: "PDF · 38 pages", lesson: "Memory systems & processes", progress: 68, status: "active" },
    { title: "Organic Chemistry", type: "Course · 10 lessons", lesson: "Molecular structure", progress: 42, status: "active" },
    { title: "Macroeconomics", type: "PDF · 54 pages", lesson: "Monetary policy", progress: 81, status: "active" },
    { title: "Human Anatomy", type: "Presentation · 64 slides", lesson: "The nervous system", progress: 24, status: "active" },
    { title: "Research Methods", type: "PDF · 29 pages", lesson: "Drawing sound conclusions", progress: 100, status: "complete" },
  ];
  const visiblePaths = paths.filter((path) => {
    const matchesQuery = `${path.title} ${path.lesson}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || path.status === filter;
    return matchesQuery && matchesFilter;
  });
  const filters = [
    { id: "all", label: "All", count: paths.length },
    { id: "active", label: "In progress", count: 4 },
    { id: "complete", label: "Completed", count: 1 },
  ] as const;

  return <div className="page-content">
    <section className="library-intro">
      <div><h1>Learning paths</h1><p>Return to a path, review your progress, or begin somewhere new.</p></div>
      <button className="library-add" onClick={onUpload} aria-label="Add material"><Icon name="plus" size={18}/><span>Add material</span></button>
    </section>

    <section className="library-controls" aria-label="Library controls">
      <label className="library-search"><Icon name="search" size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your library" aria-label="Search your library"/></label>
      <div className="library-filters" role="group" aria-label="Filter paths">
        {filters.map((item) => <button key={item.id} aria-pressed={filter === item.id} className={filter === item.id ? "active" : ""} onClick={() => setFilter(item.id)}>{item.label} <span>{item.count}</span></button>)}
      </div>
    </section>

    <section className="path-list">
      <div className="path-list-head" aria-hidden="true"><span>Path</span><span>Current lesson</span><span>Mastery</span><span/></div>
      {visiblePaths.map((path, index) => <article className="path-row" key={path.title}>
        <div className="path-identity"><span className="path-index">{String(index + 1).padStart(2, "0")}</span><div><h2>{path.title}</h2><span className="path-type">{path.type}</span></div></div>
        <div className="path-lesson"><span>Now studying</span><strong>{path.lesson}</strong></div>
        <div className="path-mastery"><div><span>{path.progress === 100 ? "Mastered" : "Mastery"}</span><strong>{path.progress}%</strong></div><div className="path-progress"><i style={{width: `${path.progress}%`}}/></div></div>
        <button className="path-continue" onClick={() => onOpen(path.title)} aria-label={`${path.progress === 100 ? "Review" : "Continue"} ${path.title}`}><span>{path.progress === 100 ? "Review" : "Continue"}</span><Icon name="arrow" size={16}/></button>
      </article>)}
      {visiblePaths.length === 0 && <div className="library-empty"><strong>No paths found</strong><p>Try another search or filter.</p></div>}
    </section>
  </div>
}

function LessonWorkspace({ title, onBack }: { title: string; onBack: () => void }) {
  const [tool, setTool] = useState<"lesson" | "summary" | "flashcards" | "quiz" | "tutor">("lesson");
  const tools = [
    { id: "lesson", label: "Lesson" },
    { id: "summary", label: "Summary" },
    { id: "flashcards", label: "Flashcards" },
    { id: "quiz", label: "Quiz" },
    { id: "tutor", label: "AI Tutor" },
  ] as const;
  return <div className="page-content lesson-workspace">
    <nav className="workspace-back" aria-label="Breadcrumb"><button onClick={onBack}>Library</button><span aria-hidden="true">/</span><span>{title}</span></nav>
    <section className="workspace-head">
      <div><h1>{title}</h1><p>Memory systems & processes · Lesson 8 of 12</p></div>
      <div className="workspace-mastery"><div><span>Path mastery</span><strong>68%</strong></div><div className="workspace-bar"><i/></div></div>
    </section>
    <nav className="lesson-tools" aria-label="Lesson tools">
      {tools.map((item) => <button key={item.id} aria-current={tool === item.id ? "page" : undefined} className={tool === item.id ? "active" : ""} onClick={() => setTool(item.id)}>{item.label}</button>)}
    </nav>
    <section className="lesson-surface">
      {tool === "lesson" && <div className="reading-content"><span className="atlas-label">Lesson 8</span><h2>Memory systems & processes</h2><p className="reading-lead">Memory is not a single store. It is a living system of processes that encode, hold, and retrieve information across different timescales.</p><h3>Three connected systems</h3><p>Sensory memory briefly holds impressions from the environment. Working memory brings a small amount of that information into focus, while long-term memory preserves knowledge and experience over time.</p><div className="knowledge-note"><strong>Key idea</strong><p>Attention is the bridge between sensory input and information that can enter working memory.</p></div><button className="atlas-continue">Continue lesson <Icon name="arrow" size={18}/></button></div>}
      {tool === "summary" && <div className="tool-content"><span className="atlas-label">Lesson summary</span><h2>Memory systems at a glance</h2><p>Your source distilled into the concepts that matter most.</p><ol className="summary-list">{["Sensory memory holds raw input for a fraction of a second.","Working memory actively processes a limited amount of information.","Long-term memory stores knowledge through encoding and consolidation."].map((text, i) => <li className="summary-point" key={text}><span>{i + 1}</span><p>{text}</p></li>)}</ol></div>}
      {tool === "flashcards" && <div className="tool-content centered-tool"><span className="atlas-label">Card 4 of 18</span><div className="study-card"><small>Concept</small><h2>What is working memory?</h2><p>Tap to reveal the answer</p></div><button className="atlas-continue">Reveal answer</button></div>}
      {tool === "quiz" && <div className="tool-content"><span className="atlas-label">Question 2 of 8</span><h2>Which system actively manipulates information?</h2><div className="quiz-options">{["Sensory memory","Working memory","Episodic memory","Procedural memory"].map((answer) => <button key={answer}>{answer}</button>)}</div></div>}
      {tool === "tutor" && <div className="tool-content tutor-tool"><div className="ai-avatar"><Icon name="chat"/></div><h2>Ask your AI Tutor</h2><p>Explore a difficult concept or test your understanding. Answers are grounded in this material.</p><div className="workspace-composer"><input placeholder="Ask about memory systems…" aria-label="Ask the AI Tutor"/><button aria-label="Send"><Icon name="send" size={18}/></button></div></div>}
    </section>
  </div>
}

function Profile() {
  return <div className="page-content profile-page">
    <section className="profile-intro"><div className="profile-monogram">AM</div><div className="profile-name"><h1>Alex Morgan</h1><p>alex.morgan@example.com</p></div><button>Edit profile</button></section>
    <section className="profile-grid">
      <article><span className="atlas-label">Learning rhythm</span><h2>7 day streak</h2><p>You studied on 18 days this month.</p></article>
      <article><span className="atlas-label">Current plan</span><h2>Omnave Free</h2><p>3 learning paths · 2 uploads remaining</p></article>
    </section>
    <section className="settings-list"><h2>Preferences</h2>{["Study reminders","Weekly progress report","Account & privacy"].map((item) => <button key={item}><span>{item}</span><Icon name="arrow" size={18}/></button>)}</section>
  </div>
}

function Progress() {
  const stats = [["6.4h","Study time","+18% this week"],["24","Lessons complete","4 this week"],["82%","Quiz accuracy","+6% improvement"],["7","Day streak","Best: 12 days"]];
  return <div className="page-content progress-page">
    <section className="page-intro"><div><h1>Progress</h1><p>Your consistency, knowledge growth, and recent achievements.</p></div><span className="date-range">Last 7 days</span></section>
    <section className="stat-grid">
      {stats.map(([value, label, note]) => <div className="stat-card" key={label}><p>{label}</p><strong>{value}</strong><span>{note}</span></div>)}
    </section>
    <section className="progress-panels">
      <article className="activity-card"><div className="card-heading"><div><h2>Study activity</h2><p>Minutes studied each day</p></div><span className="trend">Up 18%</span></div><div className="chart-area">{[48,72,40,88,62,95,68].map((v,i)=><div className="chart-col" key={i}><div className="chart-bar"><i style={{height:`${v}%`}}/></div><span>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span></div>)}</div></article>
      <article className="mastery-card"><div className="card-heading"><div><h2>Course mastery</h2><p>Based on lessons and quizzes</p></div></div>{courses.map(c=><div className="mastery-row" key={c.title}><ProgressRing value={c.progress} size={56}/><div><strong>{c.title}</strong><span>{c.detail.split("·")[0].trim()}</span></div></div>)}</article>
    </section>
  </div>
}

function UploadModal({ close }: { close: () => void }) {
  return <div className="modal-backdrop" onMouseDown={close}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="upload-title" onMouseDown={(e)=>e.stopPropagation()}>
    <div className="modal-head"><div><span className="atlas-label">Create a study set</span><h2 id="upload-title">Upload learning material</h2></div><button className="icon-button" onClick={close} aria-label="Close"><Icon name="close"/></button></div>
    <label className="dropzone"><input type="file"/><span className="upload-orb"><Icon name="upload" size={24}/></span><strong>Drop your file here</strong><p>or click to browse from your device</p><span>PDF, DOCX, PPTX or TXT, up to 50 MB</span></label>
    <div className="modal-note"><p><strong>We’ll do the heavy lifting.</strong> Your content becomes a structured, guided learning path.</p></div>
    <button className="primary-button wide" onClick={close}>Choose a file <Icon name="arrow" size={18}/></button>
  </div></div>
}

export default function App() {
  const [active, setActive] = useState("home");
  const [upload, setUpload] = useState(false);
  const [openMaterial, setOpenMaterial] = useState<string | null>(null);
  const title = useMemo(() => nav.find((x) => x.id === active)?.label ?? "Home", [active]);
  const openLesson = (material: string) => { setOpenMaterial(material); setActive("library"); };
  const navigate = (id: string) => { setOpenMaterial(null); setActive(id); };
  return <div className="app-shell">
    <Sidebar active={active} setActive={navigate} onUpload={() => setUpload(true)}/>
    <main className="main">
      <Header title={title} onUpload={() => setUpload(true)}/>
      {active === "home" && <Home onUpload={() => setUpload(true)} onOpen={() => openLesson("Cognitive Psychology")} onLibrary={() => navigate("library")}/>}
      {active === "library" && (openMaterial ? <LessonWorkspace title={openMaterial} onBack={() => setOpenMaterial(null)}/> : <Library onUpload={() => setUpload(true)} onOpen={openLesson}/>)}
      {active === "progress" && <Progress/>}
      {active === "profile" && <Profile/>}
    </main>
    <nav className="bottom-nav" aria-label="Primary">{nav.map((item)=><button key={item.id} aria-current={active===item.id ? "page" : undefined} className={`${active===item.id?"active":""} ${item.id==="upload"?"bottom-upload":""}`} onClick={()=>item.id === "upload" ? setUpload(true) : navigate(item.id)}><span className="bottom-icon"><Icon name={item.icon}/></span><span>{item.label}</span></button>)}</nav>
    {upload && <UploadModal close={() => setUpload(false)}/>}
  </div>;
}
