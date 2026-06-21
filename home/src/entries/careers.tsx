import { createRoot } from "react-dom/client";
import { PageShell } from "../app/PageShell";
import { CareersSection } from "../app/components/MarketingSections";
import "../styles/index.css";

createRoot(document.getElementById("root")!).render(
  <PageShell active="Careers">
    <CareersSection />
  </PageShell>,
);
