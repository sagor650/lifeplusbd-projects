export function SiteFooter({ isDark }: { isDark: boolean }) {
  return (
    <footer
      className="border-t border-gray-100 mt-4"
      style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : undefined }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-400" style={{ fontWeight: 400 }}>
          © {new Date().getFullYear()} LifePlus Tech. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 text-xs text-gray-400">
          <a href="/" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Products</a>
          <a href="/services" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Services</a>
          <a href="/about" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">About</a>
          <a href="/careers" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Careers</a>
          <a href="/contact" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
