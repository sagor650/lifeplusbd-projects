import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Moon, Sun, Briefcase, Mail, ExternalLink, Filter } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { ProjectCard, SeeMoreCard } from "./ProjectCard";

const CATEGORIES = ["All", "Fintech", "Healthcare", "E-Commerce", "Productivity", "Travel", "Logistics"];

interface PortfolioHomeProps {
  onCardClick: (project: Project) => void;
  onViewCaseStudy: (project: Project) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export function PortfolioHome({ onCardClick, onViewCaseStudy, isDark, onToggleDark }: PortfolioHomeProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || p.tags.includes(activeCategory) || p.category.includes(activeCategory);
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0776BD, #60BB46)" }}
            >
              <span className="text-white text-xs" style={{ fontWeight: 800 }}>
                JP
              </span>
            </div>
            <span className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>
              Jamie Porter
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {["Work", "About", "Process", "Contact"].map((item) => (
              <button
                key={item}
                className="px-4 h-9 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-all"
                style={{ fontWeight: 500 }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleDark}
              className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-400" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-4 h-9 rounded-xl text-sm text-white"
              style={{ backgroundColor: "#0776BD", fontWeight: 600 }}
            >
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-700" style={{ fontWeight: 600 }}>
              Available for opportunities · Based in San Francisco
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            className="text-gray-900 dark:text-white mb-6 max-w-3xl"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Product Designer{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0776BD 0%, #60BB46 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              crafting experiences
            </span>{" "}
            that scale.
          </h1>

          <p className="text-gray-500 dark:text-gray-400 max-w-xl mb-10" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            I design intuitive, high-impact digital products for startups and enterprises — from zero-to-one concepts to
            full-scale design system overhauls. 6 years, 20+ products shipped.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mb-12">
            {[
              { value: "20+", label: "Products Shipped" },
              { value: "6 yrs", label: "Experience" },
              { value: "4", label: "Design Awards" },
              { value: "12M+", label: "Users Reached" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: "1.375rem" }}>
                  {value}
                </p>
                <p className="text-xs text-gray-400" style={{ fontWeight: 500 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 h-12 rounded-xl text-white text-sm"
              style={{ backgroundColor: "#0776BD", fontWeight: 600 }}
            >
              <Briefcase className="w-4 h-4" />
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 h-12 rounded-xl border border-gray-200 text-gray-700 text-sm hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-gray-300"
              style={{ fontWeight: 500 }}
            >
              Download Resume
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Decorative gradient blob */}
        <div
          className="absolute top-0 right-0 w-1/2 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(7,118,189,0.06) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
      </section>

      {/* Work section */}
      <section className="max-w-6xl mx-auto px-6 pb-24" id="work">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs mb-2"
              style={{ fontWeight: 600, color: "#0776BD", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-900 dark:text-white"
              style={{ fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              Case Studies & Projects
            </motion.h2>
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 h-10 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-transparent dark:bg-gray-900 dark:border-gray-700 dark:text-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          <Filter className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 h-8 rounded-full text-sm transition-all"
              style={{
                fontWeight: 500,
                backgroundColor: activeCategory === cat ? "#0776BD" : "transparent",
                color: activeCategory === cat ? "white" : "#6B7280",
                border: activeCategory === cat ? "1px solid #0776BD" : "1px solid #E5E7EB",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={onCardClick}
                />
              ))}
              <SeeMoreCard index={filtered.length} onClick={() => {}} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm">No projects match your search.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-3 text-sm hover:underline"
                style={{ color: "#0776BD", fontWeight: 500 }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* About strip */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <p className="text-xs mb-4" style={{ fontWeight: 600, color: "#0776BD", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                About
              </p>
              <h2 className="text-gray-900 dark:text-white mb-4" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
                Designing with purpose, shipping with precision.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                I'm a product designer with 6 years of experience across fintech, healthcare, and enterprise SaaS. I
                specialize in translating complex problems into clear, elegant experiences — from early discovery and
                strategy through to pixel-perfect delivery.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Figma", "Prototyping", "User Research", "Design Systems", "Interaction Design", "Data Viz"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                      style={{ fontWeight: 500 }}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Previously at", value: "Stripe · Notion · Figma" },
                { label: "Education", value: "RISD, BFA Graphic Design" },
                { label: "Based in", value: "San Francisco, CA" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 mb-1" style={{ fontWeight: 500 }}>{label}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300" style={{ fontWeight: 600 }}>{value}</p>
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 flex items-center gap-2 px-5 h-10 rounded-xl text-white text-sm self-start"
                style={{ backgroundColor: "#60BB46", fontWeight: 600 }}
              >
                <Mail className="w-3.5 h-3.5" />
                Say Hello
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2024 Jamie Porter. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "Dribbble", "Behance"].map((social) => (
              <button key={social} className="text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors" style={{ fontWeight: 500 }}>
                {social}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
