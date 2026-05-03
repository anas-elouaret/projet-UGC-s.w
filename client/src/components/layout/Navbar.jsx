import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  { name: "Business Cards", path: "/business-cards" },
  { name: "Flyers", path: "/flyers" },
  { name: "Packaging", path: "/packaging" },
  { name: "Merch", path: "/merch" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08040f]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-semibold uppercase tracking-[0.28em] text-white">
          Agencia
        </NavLink>

        <nav className="hidden items-center gap-4 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold uppercase tracking-[0.2em] transition duration-300 ${
                isActive ? "text-[#22c55e]" : "text-white/70 hover:text-[#22c55e]"
              }`
            }
          >
            Accueil
          </NavLink>

          {services.map((service) => (
            <NavLink
              key={service.path}
              to={service.path}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-[0.2em] transition duration-300 ${
                  isActive ? "text-[#22c55e]" : "text-white/70 hover:text-[#22c55e]"
                }`
              }
            >
              {service.name}
            </NavLink>
          ))}

          <NavLink
            to="/dashboard/client"
            className={({ isActive }) =>
              `text-sm font-semibold uppercase tracking-[0.2em] transition duration-300 ${
                isActive ? "text-[#22c55e]" : "text-white/70 hover:text-[#22c55e]"
              }`
            }
          >
            Espace Client
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/start-project"
            className="hidden rounded-full bg-[#22c55e] px-5 py-2 text-sm font-black text-black transition duration-300 hover:bg-[#16a34a] md:inline-flex"
          >
            Démarrer un projet
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:border-white/20 hover:bg-white/10 md:hidden"
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
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden border-t border-white/10 bg-[#07030e]/95 md:hidden"
      >
        <div className="space-y-4 px-4 py-5">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 ${
                isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            Accueil
          </NavLink>

          {services.map((service) => (
            <NavLink
              key={service.path}
              to={service.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 ${
                  isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {service.name}
            </NavLink>
          ))}

          <NavLink
            to="/dashboard/client"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 ${
                isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            Espace Client
          </NavLink>

          <NavLink
            to="/start-project"
            onClick={() => setOpen(false)}
            className="block rounded-2xl bg-[#22c55e] px-4 py-3 text-sm font-black text-black transition duration-300 hover:bg-[#16a34a]"
          >
            Démarrer un projet
          </NavLink>
        </div>
      </motion.div>
    </header>
  );
}
