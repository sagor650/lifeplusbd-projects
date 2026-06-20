import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  Cpu,
  Database,
  Heart,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
const BLUE = "#0776BD";
const GREEN = "#60BB46";

/* ── Shared section heading ─────────────────────────────────────────────── */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mb-12"
    >
      <span
        className="text-xs uppercase tracking-wider"
        style={{ color: BLUE, fontWeight: 700, letterSpacing: "0.08em" }}
      >
        {eyebrow}
      </span>
      <h2
        className="text-gray-900 dark:text-white mt-3"
        style={{
          fontWeight: 800,
          fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-gray-500 dark:text-gray-400 mt-4"
          style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ── Services ───────────────────────────────────────────────────────────── */
const services = [
  {
    icon: Cpu,
    title: "Industrial Automation & SCADA",
    desc: "Real-time monitoring and control platforms for plants and processes — our OptiPanel SCADA suite.",
    color: "#8B5CF6",
  },
  {
    icon: Activity,
    title: "Medical Imaging & PACS",
    desc: "Vendor-neutral archives and browser DICOM viewers with a built-in AI second opinion — medpac.",
    color: "#D11F3C",
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    desc: "Autonomous digital employees with explicit agentic reasoning — DigitalRM (Aria).",
    color: "#F59E0B",
  },
  {
    icon: Building2,
    title: "Enterprise Platforms",
    desc: "Asset management, pharmacy (PMS), estate and operations systems for large organizations.",
    color: BLUE,
  },
  {
    icon: Database,
    title: "Data Infrastructure",
    desc: "A proto-driven, multi-database broker (UDB) with typed APIs, auth, audit and change-data-capture.",
    color: GREEN,
  },
  {
    icon: Rocket,
    title: "Product Engineering",
    desc: "Zero-to-one product design, engineering and scale — from concept to category-defining platform.",
    color: "#0EA5E9",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24"
    >
      <SectionHeading
        eyebrow="Services"
        title="Software for healthcare, industry & AI"
        subtitle="One product team building the systems that run hospitals, plants and enterprises — engineered in-house, end to end."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(({ icon: Icon, title, desc, color }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: color + "18" }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <h3
              className="text-gray-900 dark:text-white mb-2"
              style={{ fontWeight: 700, fontSize: "1rem" }}
            >
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── About ──────────────────────────────────────────────────────────────── */
const values = [
  {
    icon: ShieldCheck,
    title: "Engineering-first",
    desc: "We build our own foundations — data brokers, parsers, runtimes — not glue over black boxes.",
  },
  {
    icon: Heart,
    title: "Healthcare DNA",
    desc: "Born inside the Lifeplus / Labaid healthcare group, with deep clinical and operational domain knowledge.",
  },
  {
    icon: Zap,
    title: "Built to scale",
    desc: "From a single clinic to enterprise rollouts — typed contracts, audit trails and HA from day one.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-gray-50/70 dark:bg-white/[0.02] border-y border-black/[0.05] dark:border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeading
              eyebrow="About us"
              title="The product-technology company behind Lifeplus Bangladesh"
            />
            <div className="space-y-4 text-gray-500 dark:text-gray-400" style={{ fontSize: "1.05rem", lineHeight: 1.75 }}>
              <p>
                LifePlus Tech designs, engineers and scales enterprise software
                from Dhaka, Bangladesh. We turn hard, domain-heavy problems —
                medical imaging, industrial control, autonomous AI — into
                dependable products that organizations run every day.
              </p>
              <p>
                Rather than assemble off-the-shelf parts, we build the
                foundations ourselves: a typed data broker, lossless protocol
                engines, and agentic AI runtimes — so every product on top is
                fast, auditable and built to last.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.07] p-5"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: BLUE + "12" }}
                >
                  <Icon className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Careers ────────────────────────────────────────────────────────────── */
const roles = [
  "Software Engineers (Rust · TypeScript · Go)",
  "Product & UI/UX Designers",
  "AI / ML Engineers",
  "DevOps & Platform Engineers",
];

export function CareersSection() {
  return (
    <section
      id="careers"
      className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24"
    >
      <div className="rounded-3xl overflow-hidden relative border border-black/[0.06] dark:border-white/[0.08]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 0% 0%, rgba(7,118,189,0.10) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(96,187,70,0.10) 0%, transparent 55%)",
          }}
        />
        <div className="relative px-6 sm:px-12 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs uppercase tracking-wider" style={{ color: GREEN, fontWeight: 700, letterSpacing: "0.08em" }}>
              Careers
            </span>
            <h2
              className="text-gray-900 dark:text-white mt-3 mb-4"
              style={{ fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.1rem)", letterSpacing: "-0.03em", lineHeight: 1.12 }}
            >
              Build the future of enterprise software with us
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
              We're a small, senior team shipping ambitious products from Dhaka.
              If you like owning hard problems end to end, we'd love to talk.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl text-white text-sm transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: BLUE, fontWeight: 600 }}
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <ul className="grid gap-2.5">
            {roles.map((r) => (
              <li
                key={r}
                className="flex items-center gap-3 rounded-xl bg-white dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.07] px-4 py-3 text-sm text-gray-700 dark:text-gray-300"
                style={{ fontWeight: 500 }}
              >
                <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ────────────────────────────────────────────────────────────── */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-gray-50/70 dark:bg-white/[0.02] border-t border-black/[0.05] dark:border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something that matters"
              subtitle="Tell us about your product or platform — we'll get back within one business day."
            />
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@labaidinsuretech.com"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-xl text-white text-sm transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: BLUE, fontWeight: 600 }}
              >
                <Mail className="w-4 h-4" />
                Email us
              </a>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.07] p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: BLUE + "12" }}>
                <Mail className="w-5 h-5" style={{ color: BLUE }} />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1" style={{ fontWeight: 600 }}>EMAIL</p>
              <a href="mailto:info@labaidinsuretech.com" className="text-sm text-gray-800 dark:text-gray-200 hover:underline break-all">
                info@labaidinsuretech.com
              </a>
            </div>
            <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.07] p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: GREEN + "18" }}>
                <MapPin className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1" style={{ fontWeight: 600 }}>LOCATION</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
