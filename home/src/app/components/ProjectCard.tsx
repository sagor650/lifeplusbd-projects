import { ArrowUpRight, FileText } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onClick(project)}
      className="group relative bg-white rounded-2xl border border-black/[0.06] overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
      }}
      whileTap={{ scale: 0.985 }}
    >
      {/* Card visual header */}
      <div
        className="h-44 relative overflow-hidden flex items-center justify-center"
        style={{ background: project.cardBg }}
      >
        {/* Decorative pattern */}
        <MockupPattern
          pattern={project.mockupPattern}
          color={project.logoColor}
        />

        {/* Logo badge */}
        <LogoBadge
          logo={project.logo}
          logoInitial={project.logoInitial}
          logoColor={project.logoColor}
          name={project.name}
        />

        {/* Arrow on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <ArrowUpRight
            className="w-4 h-4"
            style={{ color: project.logoColor }}
          />
        </motion.div>

        {/* Year badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm">
          <span className="text-xs text-gray-600" style={{ fontWeight: 500 }}>
            {project.year}
          </span>
        </div>

        {/* PDF button — opens the brief directly without triggering the card's site/demo view */}
        {project.pdfUrl && project.pdfUrl.trim() !== "" && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.pdfUrl, "_blank", "noopener,noreferrer");
            }}
            title="Open PDF brief"
            aria-label={`Open ${project.name} PDF brief`}
            className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
            style={{ fontWeight: 600 }}
          >
            <FileText
              className="w-3.5 h-3.5"
              style={{ color: project.logoColor }}
            />
            <span className="text-xs text-gray-700">PDF</span>
          </button>
        )}
      </div>

      {/* Card content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3
              className="text-gray-900"
              style={{ fontWeight: 600, fontSize: "1rem", lineHeight: 1.3 }}
            >
              {project.name}
            </h3>
            <p
              className="text-xs mt-0.5"
              style={{ color: project.logoColor, fontWeight: 500 }}
            >
              {project.category}
            </p>
          </div>
          <motion.div
            className="w-7 h-7 rounded-full border border-black/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-colors" />
          </motion.div>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100"
              style={{ fontWeight: 500 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: project.logoColor, scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
}

// ── See More Card ────────────────────────────────────────────────────────────

interface SeeMoreCardProps {
  index: number;
  onClick: () => void;
}

export function SeeMoreCard({ index, onClick }: SeeMoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      className="group relative bg-white rounded-2xl border border-dashed border-gray-200 overflow-hidden cursor-pointer min-h-[260px] flex flex-col items-center justify-center gap-4"
      whileHover={{ y: -4, borderColor: "#0776BD" }}
      whileTap={{ scale: 0.985 }}
    >
      <motion.div
        className="w-14 h-14 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center"
        whileHover={{ borderColor: "#0776BD", backgroundColor: "#EEF4FF" }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          className="text-2xl text-gray-300 group-hover:text-[#0776BD] transition-colors"
          whileHover={{ scale: 1.2, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </motion.div>
      <div className="text-center px-4">
        <p
          className="text-sm text-gray-400 group-hover:text-[#0776BD] transition-colors"
          style={{ fontWeight: 600 }}
        >
          See More Projects
        </p>
        <p className="text-xs text-gray-300 mt-1">
          View the complete portfolio
        </p>
      </div>
    </motion.div>
  );
}

// ── Logo Badge ───────────────────────────────────────────────────────────────

interface LogoBadgeProps {
  logo: string;
  logoInitial: string;
  logoColor: string;
  name: string;
}

function LogoBadge({ logo, logoInitial, logoColor, name }: LogoBadgeProps) {
  const [imgError, setImgError] = useState(false);

  if (logo && !imgError) {
    return (
      <div
        className="relative z-10 w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center"
        style={{ border: `2px solid ${logoColor}22` }}
      >
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-full h-full object-contain p-1"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback: colored square with initials
  return (
    <div
      className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
      style={{ backgroundColor: logoColor }}
    >
      <span
        className="text-white text-lg tracking-tight"
        style={{ fontWeight: 700 }}
      >
        {logoInitial}
      </span>
    </div>
  );
}

// ── Mockup Patterns ──────────────────────────────────────────────────────────

function MockupPattern({ pattern, color }: { pattern: string; color: string }) {
  const fill = color + "26"; // ~15% opacity

  if (pattern === "finance") {
    return (
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 280 176"
        fill="none"
      >
        <rect x="16" y="24" width="80" height="48" rx="8" fill={fill} />
        <rect x="104" y="24" width="160" height="48" rx="8" fill={fill} />
        <rect x="16" y="84" width="248" height="8" rx="4" fill={fill} />
        <rect x="16" y="100" width="160" height="8" rx="4" fill={fill} />
        <rect x="16" y="116" width="80" height="8" rx="4" fill={fill} />
        <rect x="200" y="84" width="64" height="40" rx="8" fill={fill} />
      </svg>
    );
  }
  if (pattern === "health") {
    return (
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 280 176"
        fill="none"
      >
        <circle cx="40" cy="40" r="24" fill={fill} />
        <rect x="80" y="20" width="184" height="12" rx="6" fill={fill} />
        <rect x="80" y="40" width="120" height="12" rx="6" fill={fill} />
        <rect x="16" y="84" width="248" height="1" fill={fill} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x={16 + i * 64}
              y="96"
              width="56"
              height="56"
              rx="10"
              fill={fill}
            />
          </g>
        ))}
      </svg>
    );
  }
  if (pattern === "shop") {
    return (
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 280 176"
        fill="none"
      >
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x={16 + i * 88}
              y="16"
              width="72"
              height="96"
              rx="10"
              fill={fill}
            />
            <rect
              x={16 + i * 88}
              y="120"
              width="72"
              height="10"
              rx="5"
              fill={fill}
            />
            <rect
              x={16 + i * 88}
              y="138"
              width="40"
              height="10"
              rx="5"
              fill={fill}
            />
          </g>
        ))}
      </svg>
    );
  }
  if (pattern === "ai") {
    return (
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 280 176"
        fill="none"
      >
        <circle cx="140" cy="88" r="48" fill={fill} />
        <circle cx="140" cy="88" r="28" fill={fill} />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={140 + 52 * Math.cos(rad)}
              y1={88 + 52 * Math.sin(rad)}
              x2={140 + 72 * Math.cos(rad)}
              y2={88 + 72 * Math.sin(rad)}
              stroke={color}
              strokeWidth="3"
              strokeOpacity="0.2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    );
  }
  if (pattern === "travel") {
    return (
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 280 176"
        fill="none"
      >
        <ellipse cx="140" cy="88" rx="110" ry="64" fill={fill} />
        <ellipse cx="140" cy="88" rx="70" ry="64" fill={fill} />
        <line
          x1="30"
          y1="88"
          x2="250"
          y2="88"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.2"
        />
        <line
          x1="140"
          y1="24"
          x2="140"
          y2="152"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.2"
        />
        <circle cx="140" cy="88" r="6" fill={color} fillOpacity="0.25" />
      </svg>
    );
  }
  if (pattern === "logistics") {
    return (
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 280 176"
        fill="none"
      >
        <rect x="16" y="64" width="88" height="48" rx="8" fill={fill} />
        <rect x="176" y="64" width="88" height="48" rx="8" fill={fill} />
        <rect x="104" y="80" width="72" height="16" rx="6" fill={fill} />
        <circle cx="16" cy="88" r="6" fill={color} fillOpacity="0.3" />
        <circle cx="140" cy="88" r="6" fill={color} fillOpacity="0.3" />
        <circle cx="264" cy="88" r="6" fill={color} fillOpacity="0.3" />
        <line
          x1="22"
          y1="88"
          x2="104"
          y2="88"
          stroke={color}
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="176"
          y1="88"
          x2="258"
          y2="88"
          stroke={color}
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>
    );
  }
  return null;
}
