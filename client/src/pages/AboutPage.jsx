import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import SectionHeading from "../components/common/SectionHeading";
import StatsSection from "../components/about/StatsSection";
import TeamSection from "../components/about/TeamSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#05030d] text-white">
      <Navbar />
      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          pretitle="About"
          title="We help ambitious brands move faster with digital excellence."
          description="Since launch, we’ve partnered with founders and creative leaders to shape premium campaigns, products, and social-first ecosystems."
        />

        <section className="mx-auto mt-16 max-w-5xl rounded-[2rem] border border-white/10 bg-[#0c0718]/90 p-10 shadow-2xl shadow-black/30">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.28em] text-indigo-300/80">Our story</p>
              <p className="text-lg leading-8 text-white/70">
                We are a modern creative agency built for digital-first teams. Our work blends brand strategy, motion, and storytelling into high-impact digital experiences.
              </p>
              <p className="text-lg leading-8 text-white/70">
                Every brief starts with research, audience clarity, and a strong visual direction. Then we move fast to create work that feels premium and performs.
              </p>
            </div>
            <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-indigo-300/80">Approach</p>
              <ul className="space-y-4 text-white/70">
                <li>Discovery & positioning</li>
                <li>Brand systems & motion</li>
                <li>Data-driven content strategy</li>
                <li>UX-first web experiences</li>
              </ul>
            </div>
          </div>
        </section>

        <StatsSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
