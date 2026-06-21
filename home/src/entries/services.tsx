import { createRoot } from "react-dom/client";
import { PageShell } from "../app/PageShell";
import { ServicesSection } from "../app/components/MarketingSections";
import "../styles/index.css";

createRoot(document.getElementById("root")!).render(
  <PageShell active="Services">
    <ServicesSection />
  </PageShell>,
);
