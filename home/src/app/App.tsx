import { useState } from "react";
import type { Project } from "./data/projects";
import { PageShell } from "./PageShell";
import { HeroSection } from "./components/HeroSection";
import { GridView } from "./components/GridView";
import { PDFViewer } from "./components/PDFViewer";

/** Home page — hero + the product portfolio grid. */
export default function App() {
  const [pdfProject, setPdfProject] = useState<Project | null>(null);

  return (
    <PageShell active="Products">
      <HeroSection />
      <div id="products" className="scroll-mt-20">
        <GridView onCardClick={(p) => setPdfProject(p)} />
      </div>
      <PDFViewer project={pdfProject} onClose={() => setPdfProject(null)} />
    </PageShell>
  );
}
