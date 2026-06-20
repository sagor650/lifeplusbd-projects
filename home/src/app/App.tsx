import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "./data/projects";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { GridView } from "./components/GridView";
import { SplitWorkspace } from "./components/SplitWorkspace";
import { PDFViewer } from "./components/PDFViewer";

type Mode = "grid" | "split";

export default function App() {
  const [mode, setMode] = useState<Mode>("grid");
  const [selected, setSelected] = useState<Project | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pdfProject, setPdfProject] = useState<Project | null>(null);

  // Card click → open full-screen PDF-style viewer, no navigation
  function handleCardClick(project: Project) {
    setPdfProject(project);
  }

  function handleBack() {
    setMode("grid");
    setSelected(null);
    setMobileNavOpen(false);
  }

  function handleSelect(project: Project) {
    setSelected(project);
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: isDark ? "#0D0D12" : "#ffffff" }}
      >
        {/* Navbar */}
        <Navbar
          mode={mode}
          isDark={isDark}
          onToggleDark={() => setIsDark((d) => !d)}
          onBack={handleBack}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          selectedName={selected?.name}
        />

        {/* Main view */}
        <AnimatePresence mode="wait">
          {mode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.995 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <HeroSection />
              <GridView onCardClick={handleCardClick} />

              {/* Footer */}
              <footer
                className="border-t border-gray-100 mt-4"
                style={{
                  borderColor: isDark ? "rgba(255,255,255,0.07)" : undefined,
                }}
              >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p
                    className="text-sm text-gray-400"
                    style={{ fontWeight: 400 }}
                  >
                    © {new Date().getFullYear()} LifePlus Tech. All rights
                    reserved.
                  </p>
                  <p
                    className="text-xs text-gray-300"
                    style={{ fontWeight: 400 }}
                  >
                    Built by LifePlus Tech · Bangladesh
                  </p>
                </div>
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="split"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex overflow-hidden"
              style={{ height: "calc(100vh - 64px)" }}
            >
              {selected && (
                <SplitWorkspace
                  selected={selected}
                  onSelect={handleSelect}
                  onBack={handleBack}
                  isDark={isDark}
                  mobileNavOpen={mobileNavOpen}
                  onCloseMobileNav={() => setMobileNavOpen(false)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDF Viewer — fullscreen, same tab, no navigation */}
        <PDFViewer project={pdfProject} onClose={() => setPdfProject(null)} />
      </div>
    </div>
  );
}
