import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleDot,
  CircuitBoard,
  Cpu,
  ExternalLink,
  FileCheck2,
  Flag,
  Gauge,
  GitBranch,
  Handshake,
  Layers3,
  MonitorSmartphone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import {
  getProductMilestones,
  getReferences,
  milestoneBySlug,
  milestones,
  months,
  productById,
  products,
  references,
  type Product,
  type ProductId,
} from "./data";

const productIcons: Record<ProductId, LucideIcon> = {
  luna: BrainCircuit,
  "digital-rm": Handshake,
  medpac: ScanLine,
  teleicu: Activity,
  pacman: Cpu,
  "interface-board": CircuitBoard,
};

type FilterId = "all" | "software" | "hardware" | ProductId;

const filterOptions: { id: FilterId; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All lanes", icon: Layers3 },
  { id: "software", label: "Software", icon: MonitorSmartphone },
  { id: "hardware", label: "Hardware", icon: Cpu },
  ...products.map((product) => ({ id: product.id, label: product.name, icon: productIcons[product.id] })),
];

const stateLabels = {
  verified: "Verified",
  committed: "Committed",
  target: "Planning target",
  external: "External gate",
};

const productStyle = (product: Product) => ({
  "--product-accent": product.accent,
  "--product-ink": product.ink,
  "--product-wash": product.wash,
}) as CSSProperties;

function BrandHeader({ detail = false }: { detail?: boolean }) {
  return (
    <header className={`site-header${detail ? " detail-header" : ""}`}>
      <a className="brand-link" href="/" aria-label="Labaid AI product delivery map home">
        <img src="/labaid-ai-logo.png" alt="Labaid AI" />
      </a>
      {detail ? (
        <a className="header-link" href="/#roadmap"><ArrowLeft size={15} aria-hidden /> All delivery lanes</a>
      ) : (
        <div className="header-actions">
          <span className="period-chip">Aug — Dec 2026</span>
          <a className="header-link" href="#roadmap">Roadmap <ArrowDown size={14} aria-hidden /></a>
        </div>
      )}
    </header>
  );
}

function Roadmap() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [releaseOnly, setReleaseOnly] = useState(false);

  const visibleProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    if (activeFilter === "software") return products.filter((product) => product.division === "Software");
    if (activeFilter === "hardware") return products.filter((product) => product.division === "Hardware");
    return products.filter((product) => product.id === activeFilter);
  }, [activeFilter]);

  return (
    <section className="roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><CalendarDays size={15} aria-hidden /> Aug — Dec 2026</p>
          <h2 id="roadmap-title">One portfolio. Six delivery lanes.</h2>
          <p>Choose a lane, then open any KPI card for its executive brief.</p>
        </div>
        <div className="release-note"><Star size={17} fill="currentColor" aria-hidden /> Star = release</div>
      </div>

      <div className="control-bar" aria-label="Roadmap controls">
        <div className="filter-scroller" role="group" aria-label="Filter product lanes">
          {filterOptions.map((option) => {
            const Icon = option.icon;
            const selected = activeFilter === option.id;
            return (
              <button
                className="filter-chip"
                data-selected={selected}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveFilter(option.id)}
                key={option.id}
              >
                <Icon size={15} strokeWidth={2.2} aria-hidden /> {option.label}
              </button>
            );
          })}
        </div>
        <button
          className="release-toggle"
          data-selected={releaseOnly}
          type="button"
          aria-pressed={releaseOnly}
          onClick={() => setReleaseOnly((value) => !value)}
        >
          <Star size={15} fill={releaseOnly ? "currentColor" : "none"} aria-hidden />
          Releases only
          {releaseOnly ? <Check size={14} aria-hidden /> : null}
        </button>
      </div>

      <div className="timeline-shell">
        <div className="timeline-scroll" tabIndex={0} aria-label="Scrollable product delivery timeline">
          <div className="month-header" aria-hidden="true">
            <div className="lane-header-cell">Product / status</div>
            <div className="month-grid">
              {months.map((month) => (
                <div className="month-cell" key={month}>
                  <span>{month}</span>
                  <small>{month === "DECEMBER" ? "01" : month === "SEPTEMBER" || month === "NOVEMBER" ? "01 — 30" : "01 — 31"}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="today-rail" aria-hidden="true"><span>Today · 02 Aug</span></div>

          {visibleProducts.map((product, index) => {
            const Icon = productIcons[product.id];
            const visibleMilestones = milestones.filter(
              (milestone) => milestone.productId === product.id && (!releaseOnly || milestone.release),
            );
            const showDivision = index === 0 || visibleProducts[index - 1]?.division !== product.division;

            return (
              <div key={product.id}>
                {showDivision ? <div className="division-label">{product.division} division</div> : null}
                <article className="timeline-row" style={productStyle(product)}>
                  <div className="product-cell">
                    <div className="product-thumb">
                      <img src={product.image} alt="" loading="lazy" />
                      <span className="product-icon"><Icon size={20} strokeWidth={2.1} aria-hidden /></span>
                    </div>
                    <div className="product-copy">
                      <span className="product-code">{product.shortName}</span>
                      <h3>{product.name}</h3>
                      <p>{product.tagline}</p>
                      <span className="status-pill">{product.status}</span>
                    </div>
                  </div>

                  <div className="month-grid milestone-grid">
                    {months.map((month) => {
                      const monthMilestones = visibleMilestones.filter((milestone) => milestone.month === month);
                      return (
                        <div className="milestone-month" key={month} aria-label={`${month} goals`}>
                          {monthMilestones.map((milestone) => (
                            <a
                              className="kpi-card"
                              data-release={milestone.release || undefined}
                              href={`/kpi/${milestone.slug}/`}
                              key={milestone.slug}
                              aria-label={`Open ${product.name} KPI brief: ${milestone.title}`}
                            >
                              <span className="kpi-topline">
                                <span className="kpi-date">{milestone.date}</span>
                                {milestone.release ? <Star size={15} fill="currentColor" aria-label="Release" /> : <Sparkles size={14} aria-hidden />}
                              </span>
                              <strong>{milestone.version ? `${milestone.version} · ` : ""}{milestone.title}</strong>
                              <span className="kpi-value">{milestone.kpi}</span>
                              <span className="card-open">Open brief <ArrowUpRight size={14} aria-hidden /></span>
                            </a>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const releaseCount = milestones.filter((milestone) => milestone.release).length;

  useEffect(() => {
    document.title = "Labaid AI · Product Delivery Map";
  }, []);

  return (
    <main id="top">
      <BrandHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={16} aria-hidden /> Executive delivery view</p>
          <h1>From product promise<br />to <span>visible proof.</span></h1>
          <p className="hero-lede">A clear, clickable delivery map for LUNA, Digital RM, MedPAC, TeleICU, and the hardware that makes the December pilot possible.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#roadmap">Explore the timeline <ArrowRight size={17} aria-hidden /></a>
            <span className="target-note"><ShieldCheck size={17} aria-hidden /> KPI values are planning targets</span>
          </div>
        </div>

        <div className="hero-collage" aria-label="Labaid AI product imagery">
          <figure className="collage-card collage-main">
            <img src="/luna-clinical-ai.jpg" alt="Doctor using clinical imaging on a tablet" />
            <figcaption><span>LUNA</span><b>Live now</b></figcaption>
          </figure>
          <figure className="collage-card collage-rm">
            <img src="/digital-rm-care.jpg" alt="Clinicians coordinating on a tablet" />
            <figcaption><span>Digital RM</span><b>Monthly</b></figcaption>
          </figure>
          <figure className="collage-card collage-medpac">
            <img src="/medpac-imaging.jpg" alt="Clinician operating a medical scanner" />
            <figcaption><span>MedPAC</span><b>Release train</b></figcaption>
          </figure>
          <figure className="collage-card collage-teleicu">
            <img src="/teleicu-monitoring.jpg" alt="Clinician operating a bedside monitor" />
            <figcaption><span>TeleICU</span><b>Starts 28 Sep</b></figcaption>
          </figure>
        </div>
      </section>

      <section className="snapshot" aria-label="Portfolio snapshot">
        <div className="snapshot-intro"><Layers3 size={23} aria-hidden /><div><small>Portfolio pulse</small><strong>Software + hardware, one decision view</strong></div></div>
        <div className="stat"><strong>{products.length}</strong><span>delivery lanes</span></div>
        <div className="stat"><strong>{releaseCount}</strong><span>starred releases</span></div>
        <div className="stat"><strong>{milestones.length}</strong><span>clickable KPI briefs</span></div>
        <div className="stat convergence-stat"><strong>01 Dec</strong><span>portfolio convergence</span></div>
      </section>

      <Roadmap />

      <section className="decision-strip" aria-label="December decision">
        <div className="decision-visual" aria-hidden><span className="orbit orbit-one"></span><span className="orbit orbit-two"></span><Star size={38} fill="currentColor" /></div>
        <div>
          <p className="eyebrow">Decision point · 01 December</p>
          <h2>Five streams converge. “Done” means something different for each.</h2>
          <p>Open the starred release cards to see the evidence expected for software rollout, site readiness, manufacturing readiness, and an EVT pilot pack.</p>
        </div>
        <a href="#roadmap">Review release stars <ArrowRight size={17} aria-hidden /></a>
      </section>

      <section className="research-section" aria-labelledby="research-title">
        <div className="section-heading compact-heading">
          <div><p className="eyebrow">Context, not compliance theatre</p><h2 id="research-title">Built on recognizable healthcare delivery patterns.</h2></div>
          <p>Internal dates drive the plan. These external references sharpen what credible evidence should look like.</p>
        </div>
        <div className="reference-grid">
          {references.map((reference) => (
            <a className="reference-card" href={reference.url} target="_blank" rel="noreferrer" key={reference.id}>
              <span>{reference.publisher}</span><strong>{reference.title}</strong><p>{reference.use}</p><ExternalLink size={16} aria-hidden />
            </a>
          ))}
        </div>
      </section>

      <footer>
        <img src="/labaid-ai-logo.png" alt="Labaid AI" />
        <p>Product Delivery Map · validated 02 Aug 2026</p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}

function DetailPage({ slug }: { slug: string }) {
  const milestone = milestoneBySlug[slug];

  useEffect(() => {
    if (!milestone) {
      document.title = "KPI not found · Labaid AI";
      return;
    }
    document.title = `${productById[milestone.productId].name} · ${milestone.title} · Labaid AI`;
  }, [milestone]);

  if (!milestone) {
    return (
      <main className="detail-page">
        <BrandHeader detail />
        <section className="not-found">
          <p className="eyebrow">KPI brief</p>
          <h1>This delivery brief was not found.</h1>
          <a className="primary-button" href="/#roadmap">Return to roadmap <ArrowRight size={17} aria-hidden /></a>
        </section>
      </main>
    );
  }

  const product = productById[milestone.productId];
  const productMilestones = getProductMilestones(product.id);
  const milestoneIndex = productMilestones.findIndex((item) => item.slug === milestone.slug);
  const previous = productMilestones[milestoneIndex - 1];
  const next = productMilestones[milestoneIndex + 1];
  const contextReferences = getReferences(milestone.sourceIds);

  return (
    <main className="detail-page" style={productStyle(product)}>
      <BrandHeader detail />

      <section className="detail-hero">
        <div className="detail-photo">
          <img src={product.image} alt={product.imageAlt} />
          <div className="photo-overlay"><span>{product.shortName}</span><div><small>{product.division}</small><strong>{product.name}</strong></div></div>
        </div>
        <div className="detail-intro">
          <div className="detail-meta">
            <span className="state-chip" data-state={milestone.state}>{stateLabels[milestone.state]}</span>
            <span>{milestone.date}</span>
            {milestone.release ? <span className="release-chip"><Star size={14} fill="currentColor" aria-hidden /> Release</span> : null}
          </div>
          <p className="eyebrow">{product.name} · {milestone.version ?? "Delivery gate"}</p>
          <h1>{milestone.title}</h1>
          <p className="detail-meaning">{milestone.plainMeaning}</p>
          <div className="hero-kpi"><Gauge size={22} aria-hidden /><div><small>KPI / decision signal</small><strong>{milestone.kpi}</strong></div></div>
        </div>
      </section>

      <section className="meaning-grid" aria-label="Executive meaning">
        <article className="meaning-card primary-meaning"><Target size={23} aria-hidden /><p className="eyebrow">Why it matters</p><h2>{milestone.businessValue}</h2></article>
        <article className="meaning-card"><GitBranch size={22} aria-hidden /><p className="eyebrow">Critical dependency</p><h3>{milestone.dependency}</h3></article>
      </section>

      <section className="proof-flow" aria-labelledby="proof-title">
        <div className="section-heading compact-heading">
          <div><p className="eyebrow">The executive logic</p><h2 id="proof-title">Target → behavior → proof → decision</h2></div>
          <p>One screen tells management what the number means and what must exist before it can be claimed.</p>
        </div>
        <div className="flow-grid">
          <article><Target size={21} aria-hidden /><small>01 · Target</small><strong>{milestone.kpi}</strong></article>
          <ArrowRight className="flow-arrow" size={21} aria-hidden />
          <article><CircleDot size={21} aria-hidden /><small>02 · Behavior</small><strong>{milestone.successSignals[0]}</strong></article>
          <ArrowRight className="flow-arrow" size={21} aria-hidden />
          <article><FileCheck2 size={21} aria-hidden /><small>03 · Proof</small><strong>{milestone.evidence[0]}</strong></article>
          <ArrowRight className="flow-arrow" size={21} aria-hidden />
          <article><Flag size={21} aria-hidden /><small>04 · Decision</small><strong>{milestone.release ? "Release only with accepted evidence" : "Advance only when the gate is clear"}</strong></article>
        </div>
      </section>

      <section className="criteria-grid">
        <article className="criteria-panel">
          <div className="panel-heading"><CheckCircle2 size={22} aria-hidden /><div><small>Success looks like</small><h2>Observable operating behavior</h2></div></div>
          <ol>{milestone.successSignals.map((signal, index) => <li key={signal}><span>0{index + 1}</span><strong>{signal}</strong></li>)}</ol>
        </article>
        <article className="criteria-panel evidence-panel">
          <div className="panel-heading"><ShieldCheck size={22} aria-hidden /><div><small>Evidence gate</small><h2>What management should ask to see</h2></div></div>
          <ol>{milestone.evidence.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}</ol>
        </article>
      </section>

      {contextReferences.length ? (
        <section className="detail-references" aria-labelledby="reference-title">
          <div><p className="eyebrow">Research context</p><h2 id="reference-title">Standards and implementation guidance behind the brief.</h2><p>These references inform the evidence pattern. They do not certify the product or replace local clinical, legal, security, or regulatory review.</p></div>
          <div className="detail-reference-list">
            {contextReferences.map((reference) => <a href={reference.url} target="_blank" rel="noreferrer" key={reference.id}><span>{reference.publisher}</span><strong>{reference.title}</strong><ExternalLink size={16} aria-hidden /></a>)}
          </div>
        </section>
      ) : null}

      <nav className="milestone-nav" aria-label={`${product.name} milestone navigation`}>
        {previous ? <a href={`/kpi/${previous.slug}/`}><ArrowLeft size={17} aria-hidden /><span><small>Previous · {previous.date}</small><strong>{previous.title}</strong></span></a> : <span />}
        {next ? <a href={`/kpi/${next.slug}/`}><span><small>Next · {next.date}</small><strong>{next.title}</strong></span><ArrowRight size={17} aria-hidden /></a> : <a href="/#roadmap"><span><small>Back to portfolio</small><strong>All delivery lanes</strong></span><ArrowRight size={17} aria-hidden /></a>}
      </nav>

      <footer className="detail-footer"><span>Planning view · validated 02 Aug 2026</span><a href={product.imageCreditUrl} target="_blank" rel="noreferrer">Photo: {product.imageCredit}</a></footer>
    </main>
  );
}

export function App() {
  const match = window.location.pathname.match(/^\/kpi\/([^/]+)/);
  return match ? <DetailPage slug={decodeURIComponent(match[1])} /> : <HomePage />;
}
