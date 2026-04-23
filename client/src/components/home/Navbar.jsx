import { useState } from "react";

const navItems = ["Home", "Creator Catalog", "Contact", "Blog & Resources"];

export default function Navbar({ isScrolled, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        isScrolled
          ? "border-black/10 bg-[#f2f2f2]/95 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md"
          : "border-black/8 bg-[#f2f2f2]"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-400 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="text-xl font-extrabold text-[#111111]"
        >
          creato.
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="agency-nav-link">
              {item}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/20 text-[#111111] transition hover:border-black/45 md:hidden"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-black/10 bg-[#f2f2f2] px-4 transition-all duration-400 md:hidden ${
          mobileOpen ? "max-h-90 py-4" : "max-h-0 py-0"
        }`}
      >
        <nav className="mx-auto flex max-w-400 flex-col gap-4 sm:px-2">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="agency-nav-link w-fit text-sm"
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            className="mt-2 w-fit rounded-full border border-black/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-black/90"
          >
            Join
          </a>
          {onLogout ? (
            <button
              type="button"
              onClick={onLogout}
              className="mt-2 w-fit rounded-full border border-black/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-black/90"
            >
              Logout
            </button>
          ) : null}
        </nav>
      </div>

      <div className="mx-auto hidden h-0 w-full max-w-400 items-center justify-end gap-2 px-4 md:flex md:h-0 md:px-6 lg:px-8">
        <span className="rounded-full border border-black/14 px-3 py-1 text-[11px] font-semibold text-black/70">Support</span>
        <span className="rounded-full bg-black px-4 py-1 text-[11px] font-semibold text-white">Join</span>
      </div>
    </header>
  );
}
