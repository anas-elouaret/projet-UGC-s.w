import { Link, useNavigate } from "react-router-dom";
import HybridNavbar from "../../components/hybrid/HybridNavbar";
import { creatorHighlights, packageItems } from "../../components/hybrid/hybridData";
import { useLanguage } from "../../context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const tx = (key, fallback) => t?.[key] || fallback;
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <HybridNavbar />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,255,91,0.16),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-[#7CFF5B]/35 bg-[#7CFF5B]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#7CFF5B]">
            {tx("hybridBadge", "Hybrid Growth Platform")}
          </p>
          <div className="mt-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                {tx("hybridHeroTitle", "One platform for business growth: creators, digital services, and print production in one workflow.")}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                {tx("hybridHeroSub", "Launch campaigns faster with a model that combines a creator marketplace, digital agency execution, and a streamlined project system.")}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/start-project" className="rounded-full bg-[#7CFF5B] px-7 py-3 text-sm font-black text-[#061207] shadow-[0_12px_40px_rgba(124,255,91,0.24)] transition hover:-translate-y-0.5">
                  {tx("startProject", "Start a project")}
                </Link>
                <Link to="/marketplace" className="rounded-full border border-white/20 bg-white/[0.02] px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.05]">
                  {tx("browseCreators", "Browse creators")}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="hero-scene">
                <div className="scene-canvas">
                  <div className="scene-orbit" aria-hidden="true">
                    <div className="scene-item scene-laptop" style={{ transform: "translate3d(0,-4rem,0) rotateX(14deg) rotateY(-6deg)" }}>
                      <div className="scene-laptop-screen">
                        <div className="scene-screen-top">
                          <span className="scene-dot scene-dot--green" />
                          <span className="scene-dot scene-dot--yellow" />
                          <span className="scene-dot scene-dot--red" />
                        </div>
                        <div className="scene-screen-content">
                          <div className="scene-bar" />
                          <div className="scene-panel" />
                          <div className="scene-row">
                            <div className="scene-chip scene-chip--accent" />
                            <div className="scene-chip scene-chip--muted" />
                          </div>
                          <div className="scene-row scene-row--dense">
                            <div className="scene-block" />
                            <div className="scene-block scene-block--short" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="scene-item scene-camera" style={{ transform: "translate3d(10rem,-3rem,0) rotateX(28deg) rotateY(20deg)" }}>
                      <div className="scene-camera-lens" />
                      <div className="scene-camera-strip" />
                    </div>

                    <div className="scene-item scene-box" style={{ transform: "translate3d(-9rem,3.5rem,0) rotateX(12deg) rotateY(-24deg)" }}>
                      <div className="scene-box-edge" />
                      <div className="scene-box-label">PRINT</div>
                    </div>

                    <div className="scene-item scene-frame" style={{ transform: "translate3d(5rem,4rem,0) rotateX(8deg) rotateY(12deg)" }}>
                      <div className="scene-frame-screen">
                        <div className="scene-frame-play" />
                        <div className="scene-frame-tags">
                          <span>UGC</span>
                          <span>Studio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="scene-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight">{tx("servicesOverview", "Services Overview")}</h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">{tx("servicesOverviewSub", "Everything you need to market, build, and deliver your brand experience from one team.")}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {["UGC", "Photography", "Web", "Print"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => navigate(`/services?service=${encodeURIComponent(item)}`)}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6 text-left shadow-[0_10px_35px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:border-[#7CFF5B]/40"
            >
              <p className="text-lg font-bold tracking-tight">{item}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{tx("executionReady", "Execution-ready delivery focused on conversion, speed, and measurable outcomes.")}</p>
              <span className="mt-4 inline-flex text-xs font-semibold text-[#7CFF5B]">
                {tx("exploreServices", "Explore services")} →
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight">{tx("howItWorks", "How It Works")}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            tx("step1", "Choose a service, creator, or package"),
            tx("step2", "Share your brief, files, and goals"),
            tx("step3", "Get managed delivery with clear tracking"),
          ].map((step, index) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7CFF5B]">Step {index + 1}</p>
              <p className="mt-3 text-lg font-semibold tracking-tight">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tight">{tx("featuredCreators", "Featured Creators")}</h2>
          <Link to="/marketplace" className="text-sm font-semibold text-[#7CFF5B]">{tx("viewMarketplace", "View marketplace")}</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {creatorHighlights.map((creator) => (
            <article key={creator.name} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7CFF5B]/40">
              <p className="text-lg font-bold tracking-tight">{creator.name}</p>
              <p className="mt-1 text-sm text-zinc-300">{creator.niche}</p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-zinc-300">Rating {creator.rating}</span>
                <span className="font-bold">{creator.startingAt}</span>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/marketplace?creator=${encodeURIComponent(creator.name)}`)}
                className="mt-5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#7CFF5B]/40 hover:text-[#7CFF5B]"
              >
                {tx("browseCreators", "Browse creators")} →
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tight">{tx("pricingPackages", "Pricing Packages")}</h2>
          <Link to="/packages" className="text-sm font-semibold text-[#7CFF5B]">{tx("seePricing", "See pricing")}</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {packageItems.map((pack) => (
            <div key={pack.name} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-6">
              <p className="text-lg font-bold tracking-tight">{pack.name}</p>
              <p className="mt-2 text-4xl font-black tracking-tight">{pack.price}</p>
              <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                {pack.features.slice(0, 3).map((feature) => <li key={feature}>- {feature}</li>)}
              </ul>
              <Link to="/start-project" className="mt-6 inline-flex rounded-full border border-[#7CFF5B]/40 px-5 py-2 text-sm font-semibold text-[#7CFF5B] transition hover:bg-[#7CFF5B]/10">
                {tx("choosePackage", "Choose package")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight">{tx("trustedTeams", "Trusted by fast-moving teams")}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <blockquote className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6 text-zinc-300">
            {`"${tx("testimonial1", "We replaced three vendors with one platform and cut campaign launch time by half.")}"`}
          </blockquote>
          <blockquote className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6 text-zinc-300">
            {`"${tx("testimonial2", "The done-for-you workflow feels like having an in-house growth team on demand.")}"`}
          </blockquote>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#7CFF5B]/30 bg-gradient-to-br from-[#7CFF5B]/15 via-[#7CFF5B]/10 to-transparent p-8 sm:p-12">
          <h3 className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">{tx("finalCtaTitle", "Ready to scale your brand with one growth partner?")}</h3>
          <p className="mt-4 max-w-2xl text-sm text-zinc-300">{tx("finalCtaSub", "Start a project once and manage creators, agency services, and printing in a single platform experience.")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/start-project" className="rounded-full bg-[#7CFF5B] px-7 py-3 text-sm font-black text-[#061207]">
              {tx("startProject", "Start a project")}
            </Link>
            <Link to="/services" className="rounded-full border border-white/20 bg-white/[0.02] px-7 py-3 text-sm font-semibold text-white">
              {tx("exploreServices", "Explore services")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
