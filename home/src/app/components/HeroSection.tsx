import { motion } from "motion/react";
import { ArrowRight, Building2, Layers, Users } from "lucide-react";
import logo from "../../imports/Lifeplus_tech.png";
import { scrollToSection } from "../lib/scroll";

const stats = [
  { icon: Building2, value: "140+", label: "Enterprise clients" },
  { icon: Layers, value: "20+", label: "Products shipped" },
  { icon: Users, value: "45", label: "Team members" },
];

export function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-20 relative overflow-hidden">
      {/* Ambient background — subtle grid + slow-drifting gradient orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(7,118,189,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(7,118,189,0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 72% 0%, black, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 72% 0%, black, transparent 78%)",
          }}
        />
        <motion.div
          className="absolute -top-24 right-0 w-[460px] h-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(7,118,189,0.16), transparent 65%)",
          }}
          animate={{ y: [0, 26, 0], x: [0, -18, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-24 -left-20 w-[380px] h-[380px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(96,187,70,0.13), transparent 65%)",
          }}
          animate={{ y: [0, -22, 0], x: [0, 20, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Company badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/30 mb-8"
      >
        <img
          src={logo}
          alt="LifePlus Tech"
          className="h-5 w-auto flex-shrink-0"
        />
        <span
          className="text-xs text-blue-700 dark:text-blue-400"
          style={{ fontWeight: 600 }}
        >
          LifePlus Tech — Product Technology Company · Bangladesh
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-gray-900 dark:text-white mb-6 max-w-[780px]"
        style={{
          fontWeight: 800,
          fontSize: "clamp(2.5rem, 6.5vw, 4.25rem)",
          lineHeight: 1.04,
          letterSpacing: "-0.038em",
        }}
      >
        We build{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #0776BD 10%, #60BB46 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          software
        </span>{" "}
        that defines categories.
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.46, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="text-gray-500 dark:text-gray-400 max-w-[540px] mb-10"
        style={{ fontSize: "1.125rem", lineHeight: 1.72 }}
      >
        LifePlus Tech is a product technology company that designs, engineers,
        and scales enterprise software. From zero-to-one concepts to
        category-defining platforms — we ship what matters.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.26 }}
        className="flex flex-wrap items-center gap-3 mb-16"
      >
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 8px 24px rgba(7,118,189,0.25)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollToSection("products")}
          className="flex items-center gap-2 px-5 h-11 rounded-xl text-white text-sm transition-shadow"
          style={{ backgroundColor: "#0776BD", fontWeight: 600 }}
        >
          Explore Our Products
          <ArrowRight className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { window.location.href = "/contact"; }}
          className="flex items-center gap-2 px-5 h-11 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          style={{ fontWeight: 500 }}
        >
          Work With Us
          <ArrowRight className="w-3.5 h-3.5 opacity-60" />
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap gap-8 sm:gap-12 mb-14"
      >
        {stats.map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.33 + i * 0.07 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#0776BD12" }}
            >
              <Icon className="w-4 h-4" style={{ color: "#0776BD" }} />
            </div>
            <div>
              <p
                className="text-gray-900 dark:text-white"
                style={{
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                {value}
              </p>
              <p
                className="text-xs text-gray-400 dark:text-gray-500 mt-0.5"
                style={{ fontWeight: 500 }}
              >
                {label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
