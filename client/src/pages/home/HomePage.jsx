import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import HybridNavbar from "../../components/hybrid/HybridNavbar";
import { HoverGlow } from "../../components/animations";
import { useLanguage } from "../../context/LanguageContext";
import { creatorHighlights, packageItems } from "../../components/hybrid/hybridData";
import HologramScene from "../../components/home/HologramLogo";

export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const tx = (key, fallback) => t?.[key] || fallback;
  const [activeFaq, setActiveFaq] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useTransform(pointerX, [-120, 120], [16, -16]);
  const rotateX = useTransform(pointerY, [-80, 80], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerX.set(x * 20);
    pointerY.set(y * 10);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const faqItems = [
    {
      question: "How quickly can I start a premium campaign?",
      answer: "Most clients begin with a kickoff in under 7 days and a polished launch-ready package within 2 weeks.",
    },
    {
      question: "Can I combine creators, web and print in one project?",
      answer: "Yes. Our platform supports blended programs across digital content, branding, and premium print services.",
    },
    {
      question: "Are revisions included?",
      answer: "Every premium package includes review rounds, approval checkpoints, and quality control before final delivery.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#04050C] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_20%)]" />
      <HybridNavbar />

      {/* Hologram Hero Section */}
      <HologramScene />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7CFF5B]">Why choose us</p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Built for fast, polished campaigns that outperform.</h2>
            <p className="max-w-xl text-base leading-8 text-zinc-400">A premium service layer, creator coordination, and modern delivery tools designed to move brands forward.</p>
          </div>
          <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
            {[
              "Strategic creative planning",
              "Designer-led branding and motion",
              "One platform for campaign visibility",
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-[#06070f] p-4 text-sm text-zinc-300">{item}</div>
            ))}
          </div>
          <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
            {[
              "Dedicated creative support",
              "Quality reviews at every milestone",
              "Flexible revision rounds",
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-[#06070f] p-4 text-sm text-zinc-300">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7CFF5B]">Overview</p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">A premium digital service experience for fast-growing brands.</h2>
            <p className="max-w-xl text-base leading-8 text-zinc-400">We bring creators, storytelling, and campaign execution into one premium workflow with clarity, speed, and measurable results.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Studio-level creative", description: "Professional content and motion designed for high-performance channels." },
              { title: "Performance-first delivery", description: "Fast briefs, clear approvals, and review-ready assets every step of the way." },
              { title: "Flexible scaling", description: "Move from one launch to a full creative system with ease." },
              { title: "Transparent operations", description: "Project timelines, budgets and quality controls visible in real time." },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-zinc-300 shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
                <p className="text-sm uppercase tracking-[0.24em] text-[#c2c2ea]">{item.title}</p>
                <p className="mt-4 text-sm leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-white">What we offer</h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">Curated creative services built for premium brands and high-impact campaigns.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "UGC Creation", description: "Authentic video content with creator-led storytelling." },
            { title: "Brand Design", description: "Identity, motion, and visual systems that feel premium." },
            { title: "Video Production", description: "Ads, reels, and launch content with cinematic polish." },
            { title: "Social Strategy", description: "Performance-minded planning and channel orchestration." },
            { title: "Print & Packaging", description: "Tactile, branded print that supports premium campaigns." },
            { title: "Web Experiences", description: "Conversion-first digital landing pages and product showcases." },
          ].map((item) => (
            <HoverGlow key={item.title} glowColor="rgba(124, 255, 91, 0.18)" className="group">
              <div className="rounded-[2rem] border border-white/10 bg-[#08090f]/95 p-7 transition duration-300 hover:-translate-y-1 hover:border-[#7CFF5B]/30">
                <p className="text-sm uppercase tracking-[0.24em] text-[#7CFF5B]">Service</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
              </div>
            </HoverGlow>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#7CFF5B]">Creator focus</p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Featured creators and campaign specialists.</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-[#7CFF5B]">Explore services</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {creatorHighlights.map((creator) => (
            <motion.article
              key={creator.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.18)]"
            >
              <p className="text-lg font-semibold text-white">{creator.name}</p>
              <p className="mt-1 text-sm text-zinc-400">{creator.niche}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-zinc-300">
                <span>Rating {creator.rating}</span>
                <span>{creator.startingAt}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.18)]">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#7CFF5B]">Trusted by brands</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Modern teams trust us for premium campaigns.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">From product launches to seasonal activations, our premium workflow is built to keep delivery fast, polished, and on brand.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Growth", "Lifestyle", "Retail"
              ].map((label) => (
                <div key={label} className="rounded-3xl bg-[#06070f] p-5 text-sm text-zinc-300 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                  <p className="font-semibold text-white">{label}</p>
                  <p className="mt-2 text-xs text-zinc-400">Premium campaign partner</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-white">Pricing packages</h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">Choose the premium package that matches your launch goals.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {packageItems.map((pack) => (
            <div key={pack.id} className="rounded-[2rem] border border-white/10 bg-[#08090f]/95 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#7CFF5B]">{pack.name}</p>
              <p className="mt-4 text-4xl font-black text-white">{pack.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-400">
                {pack.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="leading-7">{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => navigate("/start-project")}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#7CFF5B] px-5 py-3 text-sm font-semibold text-[#061207] transition hover:bg-[#95ff81]"
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            { label: "Launch speed", detail: "+42% faster delivery" },
            { label: "Creative depth", detail: "Studio-grade assets" },
            { label: "Performance", detail: "Built for measurable growth" },
          ].map((item) => (
            <div key={item.label} className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#7CFF5B]">{item.label}</p>
              <p className="mt-4 text-2xl font-semibold text-white">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[3rem] border border-white/10 bg-[#07080f]/90 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#7CFF5B]">FAQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Common questions for premium clients.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">Everything you need to know before launching your first project.</p>
            </div>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={item.question} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                    className="flex w-full items-center justify-between text-left text-white"
                  >
                    <span className="text-base font-semibold">{item.question}</span>
                    <span className="text-2xl text-[#7CFF5B]">{activeFaq === index ? "−" : "+"}</span>
                  </button>
                  {activeFaq === index && (
                    <p className="mt-4 text-sm leading-7 text-zinc-300">{item.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[3rem] bg-gradient-to-br from-[#7CFF5B]/20 via-[#38bdf8]/10 to-[#0f172a]/95 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#7CFF5B]">Ready for premium</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Book a launch or talk to our growth team today.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300">Create, launch and scale with a premium workflow built for ambitious brands and creative leaders.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/start-project"
                className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#04070f] shadow-[0_20px_60px_rgba(255,255,255,0.16)] transition hover:-translate-y-0.5"
              >
                Start a project
              </Link>
              <Link
                to="/services"
                className="inline-flex min-w-[170px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
  
