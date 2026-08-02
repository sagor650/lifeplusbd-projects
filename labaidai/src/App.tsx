import { useEffect, type CSSProperties } from "react";
import { ArrowLeft, Factory, ScanFace, Star } from "lucide-react";
import {
  milestoneBySlug,
  milestones,
  months,
  productById,
  products,
  type Product,
} from "./data";

const periodLabels = {
  PRIOR: "DELIVERED",
  AUGUST: "AUGUST",
  SEPTEMBER: "SEPTEMBER",
  OCTOBER: "OCTOBER",
  NOVEMBER: "NOVEMBER",
  DECEMBER: "DECEMBER",
};

const productStyle = (product: Product) => ({
  "--product-accent": product.accent,
  "--product-ink": product.ink,
  "--product-wash": product.wash,
}) as CSSProperties;

function ProductVisual({ product }: { product: Product }) {
  if (product.visual === "face-scan") {
    return (
      <span className="product-visual oem-visual" aria-label="Face liveness and verification engine">
        <ScanFace size={27} strokeWidth={1.8} aria-hidden />
        <small>FLVE</small>
      </span>
    );
  }

  if (product.visual === "oem") {
    return (
      <span className="product-visual oem-visual" aria-label="OEM manufacturing partner">
        <Factory size={25} strokeWidth={1.8} aria-hidden />
        <small>OEM</small>
      </span>
    );
  }

  return (
    <span className="product-visual">
      <img
        src={product.image}
        alt={product.imageAlt ?? ""}
        style={{ objectPosition: product.imagePosition }}
      />
    </span>
  );
}

function TimelinePage() {
  useEffect(() => {
    document.title = "Labaid AI · Product Development Timeline";
  }, []);

  return (
    <main className="timeline-page">
      <section className="timeline-view" aria-labelledby="timeline-title">
        <header className="timeline-titlebar">
          <div>
            <h1 id="timeline-title">Product development timeline</h1>
            <p>Delivered releases + August–December 2026</p>
          </div>
          <div className="timeline-key" aria-label="Timeline legend">
            <span><Star size={15} fill="currentColor" aria-hidden /> Release</span>
            <span>Hover a card for its exact date</span>
          </div>
        </header>

        <div className="timeline-shell">
          <div className="timeline-scroll" tabIndex={0} aria-label="Product timeline; scroll horizontally if needed">
            <div className="timeline-header">
              <div className="product-column-title">Product</div>
              <div className="month-grid month-header">
                {months.map((month) => <div key={month}>{periodLabels[month]}</div>)}
              </div>
            </div>

            {products.map((product) => (
              <article className="timeline-row" style={productStyle(product)} key={product.id}>
                <header className="product-cell">
                  <ProductVisual product={product} />
                  <div>
                    <span className="division-label">{product.division}</span>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                  </div>
                </header>

                <div className="month-grid milestone-grid">
                  {months.map((month) => {
                    const entries = milestones.filter(
                      (milestone) => milestone.productId === product.id && milestone.month === month,
                    );

                    return (
                      <div className="month-slot" key={month} aria-label={`${product.name} ${month} deliverables`}>
                        {entries.map((milestone) => (
                          <a
                            className="timeline-card"
                            data-date={`Exact date · ${milestone.exactDate}`}
                            data-release={milestone.release || undefined}
                            href={`/kpi/${milestone.slug}/`}
                            title={`Exact date: ${milestone.exactDate}`}
                            key={milestone.slug}
                          >
                            <span className="card-meta">
                              <span>{milestone.version ?? milestone.status}</span>
                              {milestone.release ? <Star size={15} fill="currentColor" aria-label="Release" /> : null}
                            </span>
                            <strong>{milestone.title}</strong>
                            <span className="card-kpi"><small>KPI</small>{milestone.kpi}</span>
                          </a>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailPage({ slug }: { slug: string }) {
  const milestone = milestoneBySlug[slug];

  useEffect(() => {
    document.title = milestone
      ? `${milestone.title} · Labaid AI Timeline`
      : "Timeline item not found · Labaid AI";
  }, [milestone]);

  if (!milestone) {
    return (
      <main className="detail-page">
        <a className="back-link" href="/"><ArrowLeft size={17} aria-hidden /> Timeline</a>
        <section className="detail-box not-found">
          <h1>Timeline item not found</h1>
        </section>
      </main>
    );
  }

  const product = productById[milestone.productId];

  return (
    <main className="detail-page" style={productStyle(product)}>
      <a className="back-link" href="/"><ArrowLeft size={17} aria-hidden /> Timeline</a>

      <article className="detail-box">
        <header className="detail-header">
          <div className="detail-product">
            <ProductVisual product={product} />
            <div>
              <span>{product.name} · {product.division}</span>
              <time>{milestone.exactDate}</time>
            </div>
          </div>
          <div className="detail-status">
            <span>{milestone.status}</span>
            {milestone.release ? <span><Star size={15} fill="currentColor" aria-hidden /> Release</span> : null}
          </div>
          <h1>{milestone.title}</h1>
        </header>

        <div className="detail-facts">
          <section>
            <span>Version / target</span>
            <strong>{milestone.version ? `${milestone.version} · ${milestone.title}` : milestone.title}</strong>
          </section>
          <section>
            <span>KPI</span>
            <strong>{milestone.kpi}</strong>
          </section>
        </div>
      </article>
    </main>
  );
}

export function App() {
  const match = window.location.pathname.match(/^\/kpi\/([^/]+)/);
  return match ? <DetailPage slug={decodeURIComponent(match[1])} /> : <TimelinePage />;
}
