import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useCart } from "../../context/CartContext";
import CartIcon from "../cart/CartIcon";
import { Volume2, VolumeX } from "lucide-react";

const navItems = [
  { key: "home", fallback: "Home", to: "/" },
  { key: "services", fallback: "Services", to: "/services" },
  { key: "packages", fallback: "Packages", to: "/packages" },
  { key: "printing", fallback: "Printing", to: "/printing" },
];

export default function HybridNavbar() {
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { muted, setMuted } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070707]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-black tracking-[-0.02em] text-white">
          growstack<span className="text-[#7CFF5B]">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? "text-[#08140a]" : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {active && <span className="absolute inset-0 -z-10 rounded-full bg-[#7CFF5B]" />}
                {t[item.key] || item.fallback}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <label className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/[0.02] px-3 py-2 text-xs text-zinc-200 md:flex">
            <span>{t.langLabel || "Language"}</span>
            <select
              value={lang}
              onChange={(event) => setLang(event.target.value)}
              className="bg-transparent text-xs font-semibold text-white outline-none"
            >
              <option value="fr" className="bg-[#0e0e0e]">Français</option>
              <option value="ar" className="bg-[#0e0e0e]">العربية</option>
              <option value="en" className="bg-[#0e0e0e]">English</option>
            </select>
          </label>
          <CartIcon />
          <button
            onClick={() => setMuted(!muted)}
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/[0.05]"
            title={muted ? "Unmute sounds" : "Mute sounds"}
          >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <Link
            to="/dashboard/client"
            className="hidden rounded-full border border-white/20 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.05] sm:block"
          >
            {t.clientDashboard || "Client Dashboard"}
          </Link>
          <Link
            to="/start-project"
            className="rounded-full bg-[#7CFF5B] px-4 py-2 text-sm font-bold text-[#041107] transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(124,255,91,0.35)]"
          >
            {t.startProject || "Start a project"}
          </Link>
        </div>
      </div>
    </header>
  );
}
