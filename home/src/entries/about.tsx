import { createRoot } from "react-dom/client";
import { PageShell } from "../app/PageShell";
import { AboutSection } from "../app/components/MarketingSections";
import "../styles/index.css";

createRoot(document.getElementById("root")!).render(
  <PageShell active="About">
    <AboutSection />
  </PageShell>,
);
