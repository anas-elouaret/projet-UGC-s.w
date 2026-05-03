import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { ScrollReveal, StaggerContainer, HoverGlow } from "../animations";

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    { key: "svc1", emoji: "⭐" },
    { key: "svc2", emoji: "📈" },
    { key: "svc3", emoji: "💎" },
    { key: "svc4", emoji: "🔑" },
    { key: "svc5", emoji: "⚡" },
    { key: "svc6", emoji: "🎯" },
  ];

  return (
    <section id="services" className="relative mx-auto w-full max-w-7xl px-4 pb-32 pt-24 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        animate={{ x: [0, 80, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute top-1/2 right-0 -z-10 w-[600px] h-[600px] bg-[#d1ff00]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"
      />

      <ScrollReveal className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <span className="w-2 h-2 bg-[#d1ff00] rounded-full"></span> {t.servicesBadge}
        </div>
        <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-black">
          {t.servicesTitle1}<br /><span className="text-[#d1ff00] [-webkit-text-stroke:2px_black]">{t.servicesTitle2}</span>
        </h2>
        <p className="mt-8 text-gray-400 font-medium max-w-2xl mx-auto text-xl">{t.servicesSub}</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, index) => (
          <HoverGlow key={svc.key} glowColor="rgba(209, 255, 0, 0.3)">
            <ScrollReveal delay={index * 0.1} direction="up" distance={40}>
              <article className="group relative bg-white border-2 border-gray-50 rounded-[2.5rem] p-10 hover:border-[#d1ff00] hover:shadow-2xl hover:shadow-[#d1ff00]/10 transition-all duration-500 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-[#d1ff00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gray-50 group-hover:bg-[#d1ff00] rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 text-2xl">{svc.emoji}</div>
                  <h3 className="text-xl font-black text-black tracking-tight mb-4">{t[svc.key].title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">{t[svc.key].desc}</p>
                </div>
                <div className="absolute bottom-8 right-8 w-10 h-10 bg-gray-50 group-hover:bg-black rounded-full flex items-center justify-center transition-colors duration-500">
                  <span className="text-gray-300 group-hover:text-[#d1ff00] transition-colors text-lg font-black">→</span>
                </div>
              </article>
            </ScrollReveal>
          </HoverGlow>
        ))}
      </div>

      <ScrollReveal delay={0.3} className="mt-20 bg-black rounded-[3rem] p-16 text-center relative overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-64 h-64 bg-[#d1ff00]/10 blur-[80px] rounded-full" />
        <div className="relative z-10">
          <h3 className="text-4xl font-black text-white tracking-tight mb-6">{t.servicesCtaTitle}</h3>
          <p className="text-gray-400 font-medium mb-10 text-lg">{t.servicesCtaSub}</p>
          <HoverGlow glowColor="rgba(209, 255, 0, 0.5)">
            <button className="bg-[#d1ff00] text-black font-black px-14 py-5 rounded-[2rem] text-sm uppercase tracking-widest shadow-xl shadow-[#d1ff00]/30">
              {t.servicesCtaBtn}
            </button>
          </HoverGlow>
        </div>
      </ScrollReveal>
    </section>
  );
}
