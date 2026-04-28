import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-br from-[#5a2dff]/30 via-transparent to-[#2e1d5d]/0 blur-3xl" />
      <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-[#8c7bff]/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="space-y-8"
        >
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-md">
            Creative agency</span>
          <h1 className="text-[clamp(3.25rem,6vw,5.75rem)] font-black leading-[0.95] tracking-[-0.03em] text-white">
            We Build Digital Experiences
          </h1>
          <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Crafting elegant digital products, bold brand systems, and memorable content for fast-growing teams.
            Every project is designed with premium clarity and built for results.
          </p>

          <div className="flex flex-wrap gap-4">
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase text-[#09040d] shadow-xl shadow-[#5f3bff]/20 transition hover:-translate-y-0.5 hover:bg-white/95"
            >
              Get Started
            </NavLink>
            <NavLink
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 text-sm font-semibold uppercase text-white/80 transition hover:border-white/20 hover:text-white"
            >
              View Work
            </NavLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0718]/80 p-6 shadow-2xl shadow-black/30 sm:p-8"
        >
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#5c3cff]/20 via-transparent to-transparent" />
          <div className="grid gap-6 sm:grid-cols-2">
            <article className="rounded-[1.75rem] border border-white/10 bg-[#110b22] p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-indigo-300/70">Strategy</p>
              <h3 className="mt-4 text-xl font-semibold text-white">Brand systems that scale</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                We align messaging, visuals and digital systems to create unforgettable brand moments.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-white/10 bg-[#110b22] p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-indigo-300/70">Design</p>
              <h3 className="mt-4 text-xl font-semibold text-white">Experiences built to convert</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                Every interface is designed for clarity, speed, and a premium user experience.
              </p>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
