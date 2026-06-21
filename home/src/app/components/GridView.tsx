import { ArrowUpRight, ExternalLink, FileText, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { projects, type Project } from "../data/projects";

interface GridViewProps {
  onCardClick: (project: Project) => void;
}

export function GridView({ onCardClick }: GridViewProps) {
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    return (
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q)
    );
  });

  const liveCount = projects.filter(
    (p) => p.siteUrl && p.siteUrl.trim(),
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-28">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-xs mb-2 tracking-[0.1em] uppercase"
            style={{ fontWeight: 700, color: "#0776BD" }}
          >
            Our Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-gray-900 dark:text-white"
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 3vw, 2.125rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Products &amp; Platforms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="text-sm text-gray-500 dark:text-gray-400 mt-2"
          >
            {projects.length} products shipped · {liveCount} with live demos
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full sm:w-56 h-10 pl-9 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0776BD]/20 focus:border-[#0776BD]/40 transition-all"
          />
        </motion.div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((project, i) => (
              <GridCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => onCardClick(project)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-4">
              <Search className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">No matching projects found.</p>
            <button
              onClick={() => setSearch("")}
              className="mt-3 text-sm transition-colors"
              style={{ color: "#0776BD", fontWeight: 600 }}
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Grid Card ─────────────────────────────────────────── */

function GridCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const accent = project.logoColor;
  const isLive = !!project.siteUrl && project.siteUrl.trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 7) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative text-left bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-100 dark:border-white/[0.07] overflow-hidden w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0776BD]/40 focus-visible:ring-offset-2"
      style={{
        boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.03)",
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 18px 48px ${accent}24, 0 4px 12px rgba(0,0,0,0.06)`,
      }}
      whileTap={{ scale: 0.985 }}
    >
      {/* Visual header */}
      <div
        className="h-44 relative flex items-center justify-center overflow-hidden"
        style={{ background: project.cardBg }}
      >
        {/* dot-grid texture */}
        <div
          className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-90"
          style={{
            backgroundImage: `radial-gradient(${accent}33 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 75%)",
          }}
        />
        {/* accent glow that intensifies on hover */}
        <motion.div
          className="absolute -inset-8 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${accent}2e 0%, transparent 60%)`,
          }}
          initial={{ opacity: 0.45 }}
          whileHover={{ opacity: 0.9, scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        {/* Logo tile */}
        <motion.div
          className="relative z-10 w-[88px] h-[88px] rounded-2xl bg-white/90 dark:bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg"
          style={{ border: `1px solid ${accent}22` }}
          whileHover={{ scale: 1.06, rotate: -1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            className="max-w-[70%] max-h-[70%] object-contain"
          />
        </motion.div>

        {/* Top-left: year (uniform across all cards) */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/70 dark:bg-black/30 backdrop-blur-sm">
          <span
            className="text-[10px] text-gray-600 dark:text-gray-300"
            style={{ fontWeight: 600 }}
          >
            {project.year}
          </span>
        </div>

        {/* Hover arrow */}
        <motion.div
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm"
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
        >
          <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
        </motion.div>

        {/* Action pills */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5">
          {isLive && (
            <button
              type="button"
              title="Open live demo"
              aria-label={`Open ${project.name} live demo`}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.siteUrl, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white shadow-sm transition-transform hover:scale-105 cursor-pointer"
              style={{ backgroundColor: accent, fontWeight: 600 }}
            >
              <ExternalLink className="w-3 h-3" />
              <span className="text-[11px]">Demo</span>
            </button>
          )}
          {project.pdfUrl && project.pdfUrl.trim() !== "" && (
            <button
              type="button"
              title="Open PDF brief"
              aria-label={`Open ${project.name} PDF brief`}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.pdfUrl, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 dark:bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              <FileText className="w-3.5 h-3.5" style={{ color: accent }} />
              <span className="text-[11px] text-gray-700">PDF</span>
            </button>
          )}
        </div>

        {/* Bottom accent sweep on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent}00)`,
            scaleX: 0,
            originX: 0,
          }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <h3
          className="text-gray-900 dark:text-white mb-1.5"
          style={{
            fontWeight: 700,
            fontSize: "0.9375rem",
            letterSpacing: "-0.01em",
          }}
        >
          {project.name}
        </h3>
        <p className="text-xs mb-3" style={{ color: accent, fontWeight: 600 }}>
          {project.category}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed min-h-[2.5rem]">
          {project.tagline}
        </p>

        {/* Tags + view affordance */}
        <div className="flex items-center justify-between gap-2 mt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-md bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/[0.06]"
                style={{ fontWeight: 500 }}
              >
                {t}
              </span>
            ))}
          </div>
          <span
            className="hidden sm:inline-flex items-center gap-0.5 text-[11px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0 cursor-pointer"
            style={{ color: accent, fontWeight: 600 }}
          >
            View <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
