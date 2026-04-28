import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/home/Navbar";
import FooterSection from "../../components/home/FooterSection";
import { useLanguage } from "../../context/LanguageContext";

const SearchIcon = ({ size = 28, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

export default function BlogPage() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="min-h-screen bg-white text-[#141414] overflow-hidden">
      <Navbar isScrolled={isScrolled} />
      <div className="relative pt-48 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div animate={{ x: [0, -50, 0], y: [0, 50, 0], rotate: [0, 10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-0 -z-10 w-[500px] h-[500px] bg-[#d1ff00]/10 blur-[130px] rounded-full -translate-x-1/2" />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <span className="w-2 h-2 bg-[#d1ff00] rounded-full"></span> {t.blogBadge}
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-black tracking-tighter leading-[0.9]">
            {t.blogTitle1} <span className="text-[#d1ff00] italic">Creato.</span>
          </h1>
          <p className="mt-10 text-gray-400 font-medium max-w-2xl mx-auto text-xl leading-relaxed">{t.blogSub}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="mt-16 max-w-3xl mx-auto relative group">
          <div className="absolute inset-0 bg-[#d1ff00]/5 blur-3xl rounded-[3rem] opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <SearchIcon className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={28} />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder={t.blogSearchPh}
            className="relative w-full bg-white border-2 border-gray-100 rounded-[3rem] py-8 pl-20 pr-10 text-xl font-bold text-black shadow-xl shadow-black/5 focus:ring-0 focus:border-[#d1ff00] outline-none transition-all" />
          <AnimatePresence>
            {query && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setQuery("")}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-2xl font-black">
                ×
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-20 bg-white border-2 border-gray-50 rounded-[4rem] p-32 text-center shadow-2xl shadow-black/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d1ff00] to-transparent" />
          <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 border-2 border-gray-100 shadow-inner group cursor-pointer hover:bg-[#d1ff00] transition-colors duration-500">
            <SearchIcon size={40} className="text-gray-300 group-hover:text-black transition-colors" />
          </div>
          <h2 className="text-4xl font-black text-black mb-6 tracking-tight">{t.blogEmptyTitle}</h2>
          <p className="text-gray-400 font-medium mb-12 text-lg max-w-md mx-auto">{t.blogEmptySub}</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setQuery("")}
            className="bg-black text-white font-black px-12 py-5 rounded-[2rem] tracking-widest uppercase text-sm shadow-xl shadow-black/20">
            {t.blogReset}
          </motion.button>
        </motion.div>
      </div>
      <FooterSection />
    </main>
  );
}
