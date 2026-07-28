import { useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";

const navigationItems = [
  { label: "Home", to: "/" },
  { label: "About", href: "/profile" },
  { label: "Contact", href: "#contact" },
  { label: "Terms & Conditions", href: "#terms" },
];

function NavigationLinks({ onNavigate, className }) {
  return (
    <nav aria-label="Primary navigation" className={className}>
      {navigationItems.map((item) =>
        item.to ? (
          <Link key={item.label} to={item.to} onClick={onNavigate}>
            {item.label}
          </Link>
        ) : (
          <a key={item.label} href={item.href} onClick={onNavigate}>
            {item.label}
          </a>
        ),
      )}
    </nav>
  );
}

export default function AppHeader({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const initial = user?.fname?.charAt(0)?.toUpperCase() ?? "U";

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="relative z-20 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
        >
          AuthWeb
        </Link>

        <NavigationLinks className="hidden items-center gap-4 text-sm font-medium text-slate-600 md:flex lg:gap-7" />

        <div className="hidden md:block">
          <Link
            to="/profile"
            aria-label="Open profile"
            className="grid size-10 place-items-center rounded-full bg-blue-500 text-xl font-bold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {initial}
          </Link>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? (
            <HiXMark className="size-7" />
          ) : (
            <HiBars3 className="size-7" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-4 top-full mt-2 rounded-xl border border-slate-200 bg-white p-4 shadow-xl md:hidden"
        >
          <NavigationLinks
            className="flex flex-col gap-1 text-sm font-medium text-slate-700"
            onNavigate={closeMenu}
          />
          <Link
            to="/profile"
            onClick={closeMenu}
            className="mt-3 flex items-center gap-3 border-t border-slate-200 pt-3 font-medium text-slate-800"
          >
            <span className="grid size-9 place-items-center rounded-full bg-blue-500 font-bold text-white">
              {initial}
            </span>
            View profile
          </Link>
        </div>
      )}
    </header>
  );
}
