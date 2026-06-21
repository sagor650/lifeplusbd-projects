import { useEffect, useState, type ReactNode } from "react";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";

/**
 * Shared shell for every page (Multi-Page App — each route is its own
 * document with a full page load). `active` highlights the current nav item.
 */
export function PageShell({
  active,
  children,
}: {
  active: string;
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  // Restore + persist the theme so it survives full page navigations.
  useEffect(() => {
    setIsDark(localStorage.getItem("lpt-dark") === "1");
  }, []);
  useEffect(() => {
    localStorage.setItem("lpt-dark", isDark ? "1" : "0");
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : ""}>
      <div
        className="min-h-screen flex flex-col transition-colors duration-300"
        style={{ backgroundColor: isDark ? "#0D0D12" : "#ffffff" }}
      >
        <SiteNav active={active} isDark={isDark} onToggleDark={() => setIsDark((d) => !d)} />
        <main className="flex-1">{children}</main>
        <SiteFooter isDark={isDark} />
      </div>
    </div>
  );
}
