import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08040f]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-semibold uppercase tracking-[0.28em] text-white">
          Agencia
        </NavLink>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-[0.2em] transition ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="h-5 w-5 relative">
            <span
              className={`absolute left-0 top-1/2 h-[2px] w-5 rounded-full bg-white transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[2px] w-5 rounded-full bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[2px] w-5 rounded-full bg-white transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </span>
        </button>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden border-t border-white/10 bg-[#07030e]/95 md:hidden"
      >
        <div className="space-y-4 px-4 py-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                  isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
