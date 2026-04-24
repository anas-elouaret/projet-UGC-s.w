import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collageItems = [
  { name: "@yasmine", video: "https://cdn.coverr.co/videos/coverr-smiling-woman-using-a-phone-1577/1080p.mp4" },
  { name: "@anas_b", video: "https://cdn.coverr.co/videos/coverr-aerial-view-of-a-futuristic-city-at-night-1579/1080p.mp4" },
  { name: "@mehdi", video: "https://cdn.coverr.co/videos/coverr-thinking-man-in-office-1576/1080p.mp4" },
  { name: "@sara", video: "https://cdn.coverr.co/videos/coverr-girl-walking-on-the-street-1571/1080p.mp4" },
];

const stats = [
  { value: "2.4K+", label: "Verified Creators" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "7 Days", label: "Avg. Delivery" },
];

export default function HeroSection({ loading }) {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  const stats = [
    { value: "2.4K+", label: t.statCreators },
    { value: "98%",   label: t.statSatisfaction },
    { value: "7 Jrs", label: t.statDelivery },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length || !sectionRef.current) return;
      const offsets = [-70, -120, -50, -95];
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: offsets[index] ?? -70,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12 overflow-hidden">

      {/* Ambient Glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -top-40 left-1/4 -z-10 w-[700px] h-[700px] bg-[#d1ff00]/15 blur-[140px] rounded-full"
      />

      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl"
        >
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="w-2 h-2 bg-[#d1ff00] rounded-full animate-pulse"></span> {t.heroBadge}
            </span>
            <span className="inline-flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">
              {t.heroEscrow}
            </span>
          </div>

          <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-black leading-[0.88] tracking-[-0.04em] text-black">
            {t.heroTitle1}<br />
            <span className="text-[#d1ff00] [-webkit-text-stroke:2px_black]">{t.heroTitle2}</span><br />
            {t.heroTitle3}
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-500 font-medium">
            {t.heroSub}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/catalog")}
              type="button"
              disabled={loading}
              className="bg-black text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-black/20 hover:shadow-[#d1ff00]/20 transition-all"
            >
              {t.heroCta}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, x: 4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/contact")}
              type="button"
              className="flex items-center gap-3 text-sm font-black text-black uppercase tracking-widest"
            >
              {t.heroCtaContact}
              <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">→</span>
            </motion.button>
          </div>

          {/* Stats Row */}
          <div className="mt-16 flex flex-wrap items-center gap-10 pt-10 border-t border-gray-100">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="text-3xl font-black text-black tracking-tighter">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Video Collage */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-2 gap-4"
        >
          {collageItems.map((item, index) => (
            <motion.article
              key={item.name}
              ref={(node) => { cardRefs.current[index] = node; }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className={`creato-card group relative overflow-hidden rounded-[2rem] bg-black ${index % 2 === 1 ? "mt-6" : ""}`}
            >
              <video className="creato-card-video" autoPlay muted loop playsInline preload="metadata">
                <source src={item.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 w-full p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-400 opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#d1ff00] rounded-full"></div>
                  <span className="text-white text-xs font-black">{item.name}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
