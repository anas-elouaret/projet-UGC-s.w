import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const navKeys = [
  { key: "home",    path: "/" },
  { key: "catalog", path: "/catalog" },
  { key: "contact", path: "/contact" },
  { key: "blog",    path: "/blog" },
];

const LANGUAGES = [
  { code: "fr", label: "Français",  flag: "🇫🇷" },
  { code: "en", label: "English",   flag: "🇬🇧" },
  { code: "ar", label: "العربية",   flag: "🇲🇦" },
];

/* ── SVG icons ───────────────────────────────── */
const Globe      = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const ChevronDown = ({ open }) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="m6 9 6 6 6-6"/></svg>;
const UserCircle  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
const LogoutIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const SparkleIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;

export default function Navbar({ isScrolled, onLogout }) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen,   setLangOpen]   = useState(false);
  const [authOpen,   setAuthOpen]   = useState(false);
  const langRef = useRef(null);
  const authRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!onLogout;

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (authRef.current && !authRef.current.contains(e.target)) setAuthOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close mobile menu on navigate */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogin  = () => { setAuthOpen(false); navigate("/auth?mode=login"); };
  const handleJoin   = () => { setAuthOpen(false); navigate("/auth?mode=register"); };
  const handleLogout = () => { setAuthOpen(false); onLogout?.(); };

  const navItems = navKeys.map(n => ({ ...n, name: t[n.key] }));
  const activeLang = LANGUAGES.find(l => l.code === lang);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm py-3" : "bg-white py-5"
    }`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo + Nav ─────────────────── */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center group-hover:bg-[#d1ff00] transition-colors duration-300">
              <div className="w-3.5 h-3.5 bg-[#d1ff00] group-hover:bg-black rounded-full transition-colors duration-300" />
            </div>
            <span className="text-xl font-black tracking-tight text-black">creato.</span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.key} to={item.path}
                  className={`relative px-4 py-2 text-[13px] font-bold rounded-xl transition-all ${
                    isActive ? "text-black bg-gray-100" : "text-gray-500 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                  {isActive && <motion.div layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#d1ff00] rounded-full" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ── Right Controls ──────────────── */}
        <div className="hidden items-center gap-2 lg:flex">

          {/* ── Language Switcher ── */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => { setLangOpen(p => !p); setAuthOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-bold text-gray-500 hover:text-black hover:bg-gray-50 transition-all"
            >
              <Globe />
              <span className="text-base leading-none">{activeLang.flag}</span>
              <span>{activeLang.label}</span>
              <ChevronDown open={langOpen} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-black/10 overflow-hidden z-50"
                >
                  <div className="px-4 pt-3 pb-2 border-b border-gray-50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Language / Langue</p>
                  </div>
                  {LANGUAGES.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-bold transition-colors ${
                        lang === l.code ? "bg-[#d1ff00]/15 text-black" : "text-gray-500 hover:bg-gray-50 hover:text-black"
                      }`}
                    >
                      <span className="text-lg">{l.flag}</span>
                      <span className="flex-1 text-left">{l.label}</span>
                      {lang === l.code && <span className="w-2 h-2 bg-black rounded-full shrink-0" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Divider ── */}
          <div className="w-px h-5 bg-gray-200 mx-1" />

          {/* ── Auth Area ── */}
          {isLoggedIn ? (
            /* Logged-in: avatar dropdown */
            <div ref={authRef} className="relative">
              <button
                onClick={() => setAuthOpen(p => !p)}
                className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full border-2 border-gray-100 hover:border-gray-200 transition-all group"
              >
                <div className="w-7 h-7 rounded-full bg-[#d1ff00] flex items-center justify-center text-black font-black text-xs">
                  U
                </div>
                <span className="text-[13px] font-bold text-gray-700 group-hover:text-black">Mon Compte</span>
                <ChevronDown open={authOpen} />
              </button>

              <AnimatePresence>
                {authOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-black/10 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#d1ff00] flex items-center justify-center font-black text-black text-sm">U</div>
                        <div>
                          <p className="text-sm font-black text-black leading-tight">Utilisateur</p>
                          <p className="text-[11px] text-gray-400 font-medium">Compte actif ✓</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button onClick={() => navigate("/profile")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">
                        <UserCircle /> {t.myAccount}
                      </button>
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-red-500 hover:bg-red-50 transition-colors mt-1">
                        <LogoutIcon /> {t.logout}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Not logged in: Login + Join */
            <div ref={authRef} className="flex items-center gap-2">
              {/* Login — opens dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setAuthOpen(p => !p); setLangOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 hover:text-black hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
                >
                  <UserCircle />
                  {t.login}
                  <ChevronDown open={authOpen} />
                </button>

                <AnimatePresence>
                  {authOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50"
                    >
                      {/* Header */}
                      <div className="bg-black p-5 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#d1ff00]/10 blur-2xl rounded-full" />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Bienvenue sur</p>
                        <p className="text-xl font-black text-white tracking-tight">creato.<span className="text-[#d1ff00]">ma</span></p>
                        <p className="text-xs text-gray-400 font-medium mt-1">La plateforme UGC #1 au Maroc</p>
                      </div>

                      {/* Actions */}
                      <div className="p-3 space-y-2">
                        <button onClick={handleLogin}
                          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                              <UserCircle />
                            </div>
                            <div className="text-left">
                              <p className="text-[13px] font-black text-black">{t.login}</p>
                              <p className="text-[10px] text-gray-400">Accéder à mon compte</p>
                            </div>
                          </div>
                          <span className="text-gray-300 group-hover:text-black transition-colors font-bold">→</span>
                        </button>

                        <button onClick={handleJoin}
                          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#d1ff00] hover:bg-[#c8f500] transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-sm">
                              <SparkleIcon />
                            </div>
                            <div className="text-left">
                              <p className="text-[13px] font-black text-black">{t.join} — Gratuit</p>
                              <p className="text-[10px] text-black/50">Créer mon compte</p>
                            </div>
                          </div>
                          <span className="text-black/40 group-hover:text-black transition-colors font-bold">→</span>
                        </button>
                      </div>

                      <div className="px-4 pb-4">
                        <p className="text-[10px] text-center text-gray-400 font-medium">
                          En continuant, vous acceptez nos <span className="underline cursor-pointer">CGU</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Join CTA pill */}
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={handleJoin}
                className="flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-[13px] font-black text-white hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
              >
                <SparkleIcon />
                {t.join}
              </motion.button>
            </div>
          )}
        </div>

        {/* ── Mobile hamburger ─────────────── */}
        <button type="button" aria-label="Toggle menu"
          onClick={() => setMobileOpen(p => !p)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 lg:hidden"
        >
          <div className="flex flex-col gap-1.5 w-5">
            <div className={`h-0.5 w-full bg-black rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`h-0.5 w-full bg-black rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <div className={`h-0.5 w-full bg-black rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* ── Mobile Menu ──────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white border-t border-gray-100 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-6">
              {/* Nav links */}
              {navItems.map(item => (
                <Link key={item.key} to={item.path}
                  className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    location.pathname === item.path ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-px bg-gray-100 my-3" />

              {/* Language pills */}
              <div className="px-2 pb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 px-2">Langue / Language</p>
                <div className="flex gap-2">
                  {LANGUAGES.map(l => (
                    <button key={l.code} onClick={() => setLang(l.code)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
                        lang === l.code ? "bg-black text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {l.flag} {l.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 my-3" />

              {/* Auth */}
              {isLoggedIn ? (
                <button onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogoutIcon /> {t.logout}
                </button>
              ) : (
                <div className="space-y-2 px-2">
                  <button onClick={handleLogin}
                    className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-gray-50 text-base font-bold text-black hover:bg-gray-100 transition-colors"
                  >
                    <UserCircle /> {t.login}
                  </button>
                  <button onClick={handleJoin}
                    className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-black text-white font-black text-sm tracking-wide hover:bg-gray-800 transition-colors"
                  >
                    <SparkleIcon /> {t.join} →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
