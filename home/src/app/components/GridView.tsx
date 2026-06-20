import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Plus, Search } from "lucide-react";
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-28">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs mb-2 tracking-[0.1em] uppercase"
            style={{ fontWeight: 700, color: "#0776BD" }}
          >
            Our Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-gray-900 dark:text-white"
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Products
          </motion.h2>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-52 h-9 pl-9 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0776BD]/20 focus:border-[#0776BD]/40 transition-all"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
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
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      className="group text-left bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-100 dark:border-white/[0.07] overflow-hidden w-full"
      style={{
        boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 12px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
      }}
      whileTap={{ scale: 0.985 }}
    >
      {/* Visual header */}
      <div className="h-40 relative flex items-center justify-center overflow-hidden">
        {/* Logo */}
        <img src={project.logo} alt={project.id} width={100} />

        {/* Hover arrow */}
        <motion.div
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
        >
          <ArrowUpRight
            className="w-3.5 h-3.5"
            style={{ color: project.logoColor }}
          />
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: project.logoColor, scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            className="text-gray-900 dark:text-white"
            style={{
              fontWeight: 700,
              fontSize: "0.9375rem",
              letterSpacing: "-0.01em",
            }}
          >
            {project.name}
          </h3>
          <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors flex-shrink-0 mt-0.5" />
        </div>
        <p
          className="text-xs mb-3"
          style={{ color: project.logoColor, fontWeight: 600 }}
        >
          {project.category}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-md bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-white/[0.06]"
              style={{ fontWeight: 500 }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
