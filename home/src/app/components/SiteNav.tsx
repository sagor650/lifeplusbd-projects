import { Mail, Moon, Sun } from "lucide-react";
import logo from "../../imports/Lifeplus_tech.png";

const NAV = [
  { label: "Products", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav({
  active,
  isDark,
  onToggleDark,
}: {
  active: string;
  isDark: boolean;
  onToggleDark: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#0D0D12]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="h-full max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-7 relative">
        {/* Brand → home */}
        <a href="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={logo} alt="LifePlus Tech" className="h-10 w-auto" />
          <span
            className="text-gray-900 dark:text-white hidden sm:block"
            style={{ fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.01em" }}
          >
            LifePlus Tech
          </span>
        </a>

        {/* Center nav — real links, full page navigation */}
        <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {NAV.map((item) => {
            const isActive = active === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  "px-4 h-8 rounded-lg text-sm flex items-center transition-all " +
                  (isActive
                    ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5")
                }
                style={{ fontWeight: isActive ? 600 : 500 }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-gray-400" />
            ) : (
              <Moon className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <a
            href="/contact"
            className="hidden sm:flex items-center gap-1.5 px-4 h-8 rounded-xl text-white text-sm"
            style={{ backgroundColor: "#0776BD", fontWeight: 600 }}
          >
            <Mail className="w-3.5 h-3.5" />
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
