import { createRoot } from "react-dom/client";
import { PageShell } from "../app/PageShell";
import { ContactSection } from "../app/components/MarketingSections";
import "../styles/index.css";

createRoot(document.getElementById("root")!).render(
  <PageShell active="Contact">
    <ContactSection />
  </PageShell>,
);
