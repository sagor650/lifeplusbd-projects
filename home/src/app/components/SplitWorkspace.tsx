import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Download, X } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { CaseStudyContent } from "./CaseStudyContent";

interface SplitWorkspaceProps {
  selected: Project;
  onSelect: (p: Project) => void;
  onBack: () => void;
  isDark: boolean;
  mobileNavOpen: boolean;
  onCloseMobileNav: () => void;
}

export function SplitWorkspace({
  selected,
  onSelect,
  onBack,
  isDark,
  mobileNavOpen,
  onCloseMobileNav,
}: SplitWorkspaceProps) {
  return (
    <>
      {/* Desktop: side-by-side */}
      <div className="flex w-full h-full overflow-hidden">
        {/* ── Left nav ─────────────────────────────────── */}
        <aside className="hidden md:flex flex-col w-[272px] flex-shrink-0 border-r border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#0D0D12] overflow-hidden">
          <LeftNavContent
            selected={selected}
            onSelect={onSelect}
            onBack={onBack}
          />
        </aside>

        {/* ── Right content ────────────────────────────── */}
        <main className="flex-1 overflow-y-auto bg-gray-50/40 dark:bg-[#0D0D12]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <CaseStudyContent project={selected} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Mobile drawer ────────────────────────────────── */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={onCloseMobileNav}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 w-[272px] z-50 flex flex-col md:hidden bg-white dark:bg-[#0D0D12] border-r border-gray-100 dark:border-white/[0.07] shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.07]">
                <span
                  className="text-[10px] tracking-[0.12em] uppercase text-gray-400 dark:text-gray-600"
                  style={{ fontWeight: 700 }}
                >
                  Products
                </span>
                <button
                  onClick={onCloseMobileNav}
                  className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                {projects.map((p, i) => (
                  <NavItem
                    key={p.id}
                    project={p}
                    isSelected={selected.id === p.id}
                    index={i}
                    onClick={() => {
                      onSelect(p);
                      onCloseMobileNav();
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Left nav content (reused in both desktop + mobile) ── */

function LeftNavContent({
  selected,
  onSelect,
  onBack,
}: {
  selected: Project;
  onSelect: (p: Project) => void;
  onBack: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex-shrink-0">
        <p
          className="text-[10px] tracking-[0.12em] uppercase text-gray-400 dark:text-gray-600 mb-1"
          style={{ fontWeight: 700 }}
        >
          Products
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600">
          {projects.length} products built
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-hide">
        {projects.map((p, i) => (
          <NavItem
            key={p.id}
            project={p}
            isSelected={selected.id === p.id}
            index={i}
            onClick={() => onSelect(p)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-gray-100 dark:border-white/[0.07]">
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 h-9 rounded-xl border border-gray-200 dark:border-white/[0.08] text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          style={{ fontWeight: 500 }}
        >
          ← All Products
        </button>
      </div>
    </>
  );
}

/* ─── Nav Item ───────────────────────────────────────────── */

function NavItem({
  project,
  isSelected,
  index,
  onClick,
}: {
  project: Project;
  isSelected: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left transition-all group"
      style={{
        backgroundColor: isSelected ? project.logoColor + "12" : "transparent",
      }}
      whileHover={{
        backgroundColor: isSelected
          ? project.logoColor + "18"
          : "rgba(0,0,0,0.03)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active indicator */}
      {isSelected && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
          style={{ backgroundColor: project.logoColor }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Logo */}
      <img src={project.logo} alt={project.id} width={25} />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm truncate"
          style={{
            fontWeight: isSelected ? 700 : 500,
            color: isSelected ? project.logoColor : undefined,
          }}
        >
          <span
            className={isSelected ? "" : "text-gray-700 dark:text-gray-300"}
          >
            {project.name}
          </span>
        </p>
        <p className="text-[10px] text-gray-400 dark:text-gray-600 truncate mt-0.5">
          {project.category}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight
        className="w-3.5 h-3.5 flex-shrink-0 transition-all"
        style={{
          color: isSelected ? project.logoColor : "#D1D5DB",
          opacity: isSelected ? 1 : 0,
          transform: isSelected ? "translateX(0)" : "translateX(-4px)",
        }}
      />
    </motion.button>
  );
}
