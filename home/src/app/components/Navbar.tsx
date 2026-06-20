import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Mail, Menu, Moon, Sun } from "lucide-react";
import logo from "../../imports/Lifeplus_tech.png";

interface NavbarProps {
  mode: "grid" | "split";
  isDark: boolean;
  onToggleDark: () => void;
  onBack: () => void;
  onOpenMobileNav?: () => void;
  selectedName?: string;
}

export function Navbar({ mode, isDark, onToggleDark, onBack, onOpenMobileNav, selectedName }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#0D0D12]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="h-full flex items-center justify-between px-5 sm:px-7">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <AnimatePresence mode="wait">
            {mode === "split" ? (
              <motion.div
                key="split-left"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-3 min-w-0"
              >
                {/* Mobile menu */}
                <button
                  onClick={onOpenMobileNav}
                  className="md:hidden w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center"
                >
                  <Menu className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

                {/* Back button */}
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                  style={{ fontWeight: 500 }}
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="hidden sm:inline">Products</span>
                </button>

                {selectedName && (
                  <>
                    <span className="text-gray-200 dark:text-gray-700 hidden sm:block">/</span>
                    <span
                      className="text-sm text-gray-600 dark:text-gray-300 truncate hidden sm:block"
                      style={{ fontWeight: 600 }}
                    >
                      {selectedName}
                    </span>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-3"
              >
                <img src={logo} alt="LifePlus Tech" className="h-8 w-auto flex-shrink-0" />
                <span
                  className="text-gray-900 dark:text-white hidden sm:block"
                  style={{ fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.01em" }}
                >
                  LifePlus Tech
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center nav – grid only */}
        <AnimatePresence>
          {mode === "grid" && (
            <motion.nav
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2"
            >
              {["Products", "Services", "About", "Careers", "Contact"].map((item) => (
                <button
                  key={item}
                  className="px-4 h-8 rounded-lg text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  style={{ fontWeight: 500 }}
                >
                  {item}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDark}
            className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Sun className="w-4 h-4 text-gray-400" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Moon className="w-4 h-4 text-gray-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <AnimatePresence>
            {mode === "grid" && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-1.5 px-4 h-8 rounded-xl text-white text-sm"
                style={{ backgroundColor: "#0776BD", fontWeight: 600 }}
              >
                <Mail className="w-3.5 h-3.5" />
                Contact
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
