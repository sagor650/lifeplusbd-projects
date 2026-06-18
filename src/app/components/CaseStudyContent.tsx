import type React from "react";
import { motion } from "motion/react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Layers,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import type { Project } from "../data/projects";

interface CaseStudyContentProps {
  project: Project;
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  return (
    <div className="min-h-full">
      {/* ── Hero ──────────────────────────────────────── */}
      <div
        className="relative overflow-hidden px-8 sm:px-12 pt-12 pb-14"
        style={{ background: project.cardBg }}
      >
        {/* Ambient blobs */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30"
          style={{ backgroundColor: project.logoColor }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 -translate-x-1/2 translate-y-1/2"
          style={{ backgroundColor: project.logoColor }}
        />

        <div className="relative z-10 max-w-3xl">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 h-32 rounded-2xl flex items-center justify-center mb-6 shadow-xl"
          >
            <img src={project.logo} alt={project.id} width={100} />
          </motion.div>

          {/* Category chip */}
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="inline-block text-xs px-3 py-1 rounded-full mb-4"
            style={{
              backgroundColor: project.logoColor + "20",
              color: project.logoColor,
              fontWeight: 600,
            }}
          >
            LifePlus Tech Case Study · {project.category}
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-gray-900 mb-3"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {project.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="text-gray-500 mb-8"
            style={{ fontSize: "1.0625rem", lineHeight: 1.65 }}
          >
            {project.tagline}
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.18 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { icon: Calendar, label: "Shipped", value: project.year },
              { icon: Clock, label: "Timeline", value: project.duration },
              { icon: User, label: "Team", value: project.role },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-400">{label}:</span>
                <span
                  className="text-sm text-gray-700"
                  style={{ fontWeight: 600 }}
                >
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="px-8 sm:px-12 py-12 max-w-3xl space-y-14">
        {/* Overview */}
        <Section
          icon={Layers}
          title="Project Overview"
          accentColor={project.logoColor}
        >
          <p
            className="text-gray-600 dark:text-gray-400 leading-relaxed"
            style={{ fontSize: "1.0625rem" }}
          >
            {project.overview}
          </p>
        </Section>

        {/* Problem */}
        <Section icon={Zap} title="The Problem" accentColor={project.logoColor}>
          <div
            className="rounded-2xl p-6 border-l-4"
            style={{
              backgroundColor: project.logoColor + "0c",
              borderLeftColor: project.logoColor,
            }}
          >
            <p
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              style={{ fontSize: "1.0625rem" }}
            >
              {project.problem}
            </p>
          </div>
        </Section>

        {/* Process */}
        <Section
          icon={Layers}
          title="Design Process"
          accentColor={project.logoColor}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="rounded-2xl border border-gray-100 dark:border-white/[0.07] p-5 bg-white dark:bg-white/[0.02]"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      backgroundColor: project.logoColor,
                      fontWeight: 800,
                      fontSize: "0.75rem",
                    }}
                  >
                    {i + 1}
                  </div>
                  <h4
                    className="text-gray-900 dark:text-white"
                    style={{ fontWeight: 700, fontSize: "0.875rem" }}
                  >
                    {step.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Mockups */}
        <Section
          icon={Layers}
          title="High-Fidelity Designs"
          accentColor={project.logoColor}
        >
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.07]"
                style={{ background: project.cardBg }}
              >
                <div className="aspect-[2/3] flex items-center justify-center p-4">
                  <MockupFrame project={project} />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center mt-3">
            Representative screens — {project.name} built by LifePlus Tech ·{" "}
            {project.year}
          </p>
        </Section>

        {/* Key Features */}
        <Section
          icon={CheckCircle2}
          title="Key Features"
          accentColor={project.logoColor}
        >
          <div className="space-y-3">
            {project.features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex gap-4 p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: project.logoColor }}
                />
                <div>
                  <p
                    className="text-gray-900 dark:text-white mb-1"
                    style={{ fontWeight: 700, fontSize: "0.875rem" }}
                  >
                    {feat.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Results */}
        <Section
          icon={TrendingUp}
          title="Results &amp; Impact"
          accentColor={project.logoColor}
        >
          <div className="grid grid-cols-2 gap-3">
            {project.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-5 text-center border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
              >
                <p
                  style={{
                    fontWeight: 800,
                    fontSize: "2rem",
                    color: project.logoColor,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {metric.value}
                </p>
                <p
                  className="text-gray-700 dark:text-gray-300 mt-1.5 mb-1"
                  style={{ fontWeight: 700, fontSize: "0.75rem" }}
                >
                  {metric.label}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-600 leading-tight">
                  {metric.change}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Tags + Download */}
        <div className="flex flex-col gap-6 pt-6 border-t border-gray-100 dark:border-white/[0.07]">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-400"
                style={{ fontWeight: 500 }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 text-center"
            style={{ background: project.cardBg }}
          >
            <h3
              className="text-gray-900 mb-2"
              style={{
                fontWeight: 700,
                fontSize: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              Get the full case study
            </h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto leading-relaxed">
              Download the complete PDF — covering strategy, technical
              architecture, design decisions, and outcome data.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 24px rgba(7,118,189,0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-6 h-11 rounded-xl text-white text-sm"
                style={{ backgroundColor: "#0776BD", fontWeight: 600 }}
              >
                <Download className="w-4 h-4" />
                Download Case Study PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 h-11 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-white transition-colors"
                style={{ fontWeight: 500 }}
              >
                Discuss This Project
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Spacer at bottom */}
        <div className="h-8" />
      </div>
    </div>
  );
}

/* ─── Section wrapper ────────────────────────────────────── */

function Section({
  icon: Icon,
  title,
  accentColor,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.38 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: accentColor + "18" }}
        >
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
        </div>
        <h2
          className="text-gray-900 dark:text-white"
          style={{
            fontWeight: 700,
            fontSize: "1.125rem",
            letterSpacing: "-0.015em",
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

/* ─── Mockup Frame ───────────────────────────────────────── */

function MockupFrame({ project }: { project: Project }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div
        className="h-6 flex items-center gap-1.5 px-3"
        style={{ backgroundColor: project.logoColor }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="h-2 bg-gray-100 rounded-full w-3/4" />
        <div className="h-2 bg-gray-50 rounded-full w-1/2" />
        <div
          className="mt-1 h-10 rounded-lg"
          style={{ backgroundColor: project.logoColor + "18" }}
        />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-7 rounded-lg bg-gray-50" />
          <div
            className="h-7 rounded-lg"
            style={{ backgroundColor: project.logoColor + "22" }}
          />
        </div>
        <div className="h-2 bg-gray-50 rounded-full w-2/3" />
        <div className="h-2 bg-gray-50 rounded-full w-4/5" />
      </div>
    </div>
  );
}
