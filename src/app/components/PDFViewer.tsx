import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Globe,
  AlertCircle,
} from "lucide-react";
import type { Project } from "../data/projects";

interface PDFViewerProps {
  project: Project | null;
  onClose: () => void;
}

export function PDFViewer({ project, onClose }: PDFViewerProps) {
  const [iframeBlocked, setIframeBlocked] = useState(false);

  // Reset blocked state when project changes
  useEffect(() => {
    setIframeBlocked(false);
  }, [project?.id]);

  // Lock body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Escape to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Neither siteUrl nor pdfUrl → nothing to show
  if (!project || (!project.siteUrl && !project.pdfUrl)) return null;

  const isSite = Boolean(project.siteUrl);
  const previewUrl = isSite ? project.siteUrl! : project.pdfUrl!;
  const label = isSite ? project.name : `${project.name} — Case Study.pdf`;

  // Detect iframe block via load event — if the iframe loads but is empty
  // (X-Frame-Options), we show a fallback after a short timeout
  function handleIframeLoad(e: React.SyntheticEvent<HTMLIFrameElement>) {
    try {
      // If X-Frame-Options blocked it, contentDocument will be null or empty
      const doc = (e.target as HTMLIFrameElement).contentDocument;
      if (!doc || doc.body?.innerHTML === "") {
        setIframeBlocked(true);
      }
    } catch {
      // cross-origin access throws — means it loaded (good) or was blocked
      // We can't distinguish reliably, so leave iframeBlocked as false
    }
  }

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="viewer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            key="viewer-dialog"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 sm:p-8"
          >
            <div
              className="relative w-full flex flex-col rounded-2xl overflow-hidden pointer-events-auto"
              style={{
                maxWidth: "1400px",
                height: "88vh",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.35), 0 4px 24px rgba(0,0,0,0.15)",
                backgroundColor: "#323639",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Toolbar ──────────────────────────────── */}
              <div
                className="flex items-center justify-between px-4 h-12 flex-shrink-0"
                style={{ backgroundColor: "#323639" }}
              >
                {/* Icon + label */}
                <div className="flex items-center gap-2 min-w-0">
                  {isSite ? (
                    <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-red-400 flex-shrink-0" />
                  )}
                  <span
                    className="text-sm text-gray-200 truncate"
                    style={{ fontWeight: 500 }}
                  >
                    {label}
                  </span>
                  {isSite && (
                    <span className="hidden sm:inline text-xs text-gray-500 truncate ml-1">
                      {previewUrl}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {/* Download — only for PDFs */}
                  {!isSite && (
                    <a
                      href={previewUrl}
                      download={label}
                      title="Download PDF"
                      className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}

                  {/* Open in new tab */}
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                    className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <div className="w-px h-4 bg-white/10 mx-1" />

                  {/* Close */}
                  <button
                    onClick={onClose}
                    title="Close"
                    className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Content iframe ───────────────────────── */}
              <div className="flex-1 overflow-hidden bg-white">
                {iframeBlocked ? (
                  /* Fallback when X-Frame-Options blocks embedding */
                  <div
                    className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                      <AlertCircle className="w-7 h-7 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold text-base mb-1">
                        Preview not available
                      </p>
                      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                        This site has restricted embedding. Open it directly in
                        a new tab to view it.
                      </p>
                    </div>
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 h-10 rounded-xl text-white text-sm transition-all"
                      style={{ backgroundColor: "#0776BD", fontWeight: 600 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open {isSite ? "Website" : "PDF"} in New Tab
                    </a>
                  </div>
                ) : (
                  <iframe
                    key={previewUrl}
                    src={previewUrl}
                    title={label}
                    className="w-full h-full border-none"
                    onLoad={isSite ? handleIframeLoad : undefined}
                    sandbox={
                      isSite
                        ? "allow-scripts allow-same-origin allow-forms allow-popups"
                        : undefined
                    }
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
