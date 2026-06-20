import type React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Download,
  Clock,
  User,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Layers,
} from "lucide-react";
import type { Project } from "../data/projects";

interface CaseStudyPageProps {
  project: Project;
  onBack: () => void;
}

export function CaseStudyPage({ project, onBack }: CaseStudyPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-white"
    >
      {/* Sticky nav */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            style={{ fontWeight: 500 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </motion.button>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: project.logoColor }}
            >
              <span className="text-white text-xs" style={{ fontWeight: 700 }}>
                {project.logoInitial}
              </span>
            </div>
            <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>
              {project.name}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm text-white"
            style={{ backgroundColor: "#0776BD", fontWeight: 500 }}
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </motion.button>
        </div>
      </div>

      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: project.cardBg, minHeight: "320px" }}
      >
        {/* Background shapes */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
          style={{ backgroundColor: project.logoColor }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: project.logoColor }}
        />

        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl mb-6"
          >
            <img src={project.logo} alt={project.id} width={50} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-block text-xs px-3 py-1 rounded-full mb-4"
              style={{
                backgroundColor: project.logoColor + "22",
                color: project.logoColor,
                fontWeight: 600,
              }}
            >
              Case Study · {project.category}
            </span>
            <h1
              className="text-gray-900 mb-4"
              style={{
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              {project.name}
            </h1>
            <p
              className="text-gray-600 max-w-2xl"
              style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              {project.tagline}
            </p>
          </motion.div>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-6 mt-8"
          >
            {[
              { icon: Calendar, label: "Year", value: project.year },
              { icon: Clock, label: "Duration", value: project.duration },
              { icon: User, label: "Role", value: project.role },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">{label}:</span>
                <span
                  className="text-sm text-gray-700"
                  style={{ fontWeight: 500 }}
                >
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Overview */}
        <Section
          icon={Layers}
          title="Project Overview"
          color={project.logoColor}
        >
          <p
            className="text-gray-600 leading-relaxed"
            style={{ fontSize: "1.0625rem" }}
          >
            {project.overview}
          </p>
        </Section>

        {/* Problem */}
        <Section
          icon={TrendingUp}
          title="The Problem"
          color={project.logoColor}
        >
          <div
            className="rounded-2xl p-6 border-l-4"
            style={{
              backgroundColor: project.logoColor + "0d",
              borderColor: project.logoColor,
            }}
          >
            <p
              className="text-gray-700 leading-relaxed"
              style={{ fontSize: "1.0625rem" }}
            >
              {project.problem}
            </p>
          </div>
        </Section>

        {/* Design Process */}
        <Section icon={Layers} title="Design Process" color={project.logoColor}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-gray-100 p-5 bg-white"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
                    style={{
                      backgroundColor: project.logoColor,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </div>
                  <h4
                    className="text-gray-900"
                    style={{ fontWeight: 600, fontSize: "0.9375rem" }}
                  >
                    {step.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Mock high-fidelity screens */}
        <Section
          icon={Layers}
          title="High-Fidelity Designs"
          color={project.logoColor}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border border-gray-100"
                style={{ background: project.cardBg }}
              >
                <div className="aspect-[3/4] relative flex items-center justify-center p-6">
                  <MockScreen project={project} variant={i} />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-3 text-center">
            Representative design mockups — {project.name} {project.year}
          </p>
        </Section>

        {/* Key Features */}
        <Section
          icon={CheckCircle2}
          title="Key Features"
          color={project.logoColor}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: project.logoColor }}
                />
                <div>
                  <h4
                    className="text-gray-900 mb-1"
                    style={{ fontWeight: 600, fontSize: "0.9375rem" }}
                  >
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Results */}
        <Section
          icon={TrendingUp}
          title="Results & Impact"
          color={project.logoColor}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-gray-100 p-5 text-center bg-white"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
              >
                <p
                  className="mb-1"
                  style={{
                    fontWeight: 800,
                    fontSize: "1.875rem",
                    color: project.logoColor,
                    lineHeight: 1.1,
                  }}
                >
                  {metric.value}
                </p>
                <p
                  className="text-gray-900 mb-1"
                  style={{ fontWeight: 600, fontSize: "0.8125rem" }}
                >
                  {metric.label}
                </p>
                <p className="text-xs text-gray-400 leading-tight">
                  {metric.change}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-100">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-4 py-2 rounded-full border border-gray-200 text-gray-600"
              style={{ fontWeight: 500 }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: project.cardBg }}
        >
          <h3
            className="text-gray-900 mb-2"
            style={{ fontWeight: 700, fontSize: "1.375rem" }}
          >
            Want the full case study?
          </h3>
          <p className="text-gray-500 mb-6 text-sm">
            Download the complete PDF with detailed design decisions, research
            findings, and process documentation.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 h-11 rounded-xl text-white text-sm"
              style={{ backgroundColor: "#0776BD", fontWeight: 600 }}
            >
              <Download className="w-4 h-4" />
              Download PDF Case Study
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBack}
              className="flex items-center gap-2 px-6 h-11 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-white transition-colors"
              style={{ fontWeight: 500 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Section({
  icon: Icon,
  title,
  color,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="mb-14"
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: color + "1a" }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <h2
          className="text-gray-900"
          style={{ fontWeight: 700, fontSize: "1.25rem" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function MockScreen({
  project,
  variant,
}: {
  project: Project;
  variant: number;
}) {
  const labels = [
    ["Overview", "Dashboard", "Analytics"],
    ["Detail View", "Settings", "Profile"],
    ["Reports", "Activity", "History"],
  ];
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div
        className="h-6 flex items-center gap-1.5 px-3"
        style={{ backgroundColor: project.logoColor }}
      >
        {[0, 1, 2].map((d) => (
          <div key={d} className="w-1.5 h-1.5 rounded-full bg-white/50" />
        ))}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="h-2 bg-gray-200 rounded-full w-3/4" />
        <div className="h-2 bg-gray-100 rounded-full w-1/2" />
        <div
          className="mt-1 h-12 rounded-lg"
          style={{ backgroundColor: project.logoColor + "18" }}
        />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-8 rounded-lg bg-gray-100" />
          <div
            className="h-8 rounded-lg"
            style={{ backgroundColor: project.logoColor + "22" }}
          />
        </div>
        <div className="h-2 bg-gray-100 rounded-full w-2/3" />
        <div className="h-2 bg-gray-100 rounded-full w-4/5" />
      </div>
    </div>
  );
}
