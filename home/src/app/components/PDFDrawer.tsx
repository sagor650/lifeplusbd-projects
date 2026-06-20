import { motion, AnimatePresence } from "motion/react";
import { X, Download, ArrowRight, FileText, Clock, HardDrive, Eye } from "lucide-react";
import type { Project } from "../data/projects";

interface PDFDrawerProps {
  project: Project | null;
  onClose: () => void;
  onViewCaseStudy: (project: Project) => void;
}

export function PDFDrawer({ project, onClose, onViewCaseStudy }: PDFDrawerProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col overflow-hidden"
            style={{ boxShadow: "-8px 0 40px rgba(0,0,0,0.12), -2px 0 8px rgba(0,0,0,0.06)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: project.logoColor }}
                >
                  <span className="text-white text-xs" style={{ fontWeight: 700 }}>
                    {project.logoInitial}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-900" style={{ fontWeight: 600 }}>
                    {project.name}
                  </p>
                  <p className="text-xs text-gray-400">{project.category}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* PDF Preview */}
              <div className="mx-6 mt-6 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                {/* PDF thumbnail */}
                <div
                  className="h-52 relative flex flex-col items-center justify-center gap-3"
                  style={{ background: project.cardBg }}
                >
                  {/* Mock PDF page */}
                  <div className="w-28 h-36 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                    <div
                      className="h-8 flex items-center justify-center"
                      style={{ backgroundColor: project.logoColor }}
                    >
                      <span className="text-white text-xs" style={{ fontWeight: 700 }}>
                        {project.logoInitial}
                      </span>
                    </div>
                    <div className="flex-1 p-2 flex flex-col gap-1.5">
                      <div className="h-1.5 bg-gray-200 rounded-full w-full" />
                      <div className="h-1.5 bg-gray-200 rounded-full w-4/5" />
                      <div className="h-1.5 bg-gray-200 rounded-full w-3/5" />
                      <div className="mt-1 h-8 bg-gray-100 rounded" />
                      <div className="h-1.5 bg-gray-200 rounded-full w-full" />
                      <div className="h-1.5 bg-gray-200 rounded-full w-2/3" />
                    </div>
                  </div>

                  {/* PDF badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-600" style={{ fontWeight: 600 }}>
                      PDF
                    </span>
                  </div>
                </div>

                {/* File info bar */}
                <div className="bg-white px-4 py-3 flex items-center justify-between">
                  <p className="text-sm text-gray-700" style={{ fontWeight: 500 }}>
                    {project.name} Case Study.pdf
                  </p>
                  <Eye className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Project summary */}
              <div className="px-6 mt-5">
                <h3 className="text-gray-900 mb-2" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                  Project Summary
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {project.overview.slice(0, 160)}...
                </p>
              </div>

              {/* File details */}
              <div className="mx-6 mt-5 rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs text-gray-500" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    File Information
                  </p>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { icon: FileText, label: "Format", value: "PDF Document" },
                    { icon: HardDrive, label: "File Size", value: "4.2 MB" },
                    { icon: Clock, label: "Last Updated", value: `${project.year} · ${project.duration}` },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm text-gray-500">{label}</span>
                      </div>
                      <span className="text-sm text-gray-700" style={{ fontWeight: 500 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key metrics preview */}
              <div className="px-6 mt-5">
                <p className="text-xs text-gray-400 mb-3" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Key Results
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {project.metrics.slice(0, 4).map((metric) => (
                    <div key={metric.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.125rem", lineHeight: 1.2 }}>
                        {metric.value}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-tight">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-6" />
            </div>

            {/* Footer actions */}
            <div className="px-6 py-5 border-t border-gray-100 bg-white flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-11 rounded-xl flex items-center justify-center gap-2.5 text-white text-sm transition-all"
                style={{ backgroundColor: "#0776BD", fontWeight: 600 }}
                onClick={() => {
                  // Mock download
                  const link = document.createElement("a");
                  link.download = `${project.name}-Case-Study.pdf`;
                  link.href = "#";
                  link.click();
                }}
              >
                <Download className="w-4 h-4" />
                Download PDF Case Study
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-11 rounded-xl border border-gray-200 flex items-center justify-center gap-2.5 text-sm transition-all hover:bg-gray-50"
                style={{ color: "#374151", fontWeight: 500 }}
                onClick={() => {
                  onClose();
                  onViewCaseStudy(project);
                }}
              >
                View Full Case Study
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
