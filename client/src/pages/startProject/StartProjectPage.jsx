import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import HybridNavbar from "../../components/hybrid/HybridNavbar";

const serviceOptions = ["UGC Content", "Photography", "Website Development", "Web Application", "Printing"];

export default function StartProjectPage() {
  const [service, setService] = useState(serviceOptions[0]);

  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <HybridNavbar />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7CFF5B]">Done For You</p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">Start a project in minutes.</h1>
        <p className="mt-3 text-zinc-300">Select a service, submit your brief, and we auto-assign the best creator or specialist.</p>

        <form className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
          <label className="block">
            <span className="text-sm font-semibold">Select service</span>
            <select
              value={service}
              onChange={(event) => setService(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm outline-none"
            >
              {serviceOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Project brief</span>
            <textarea
              rows={5}
              placeholder="Describe goals, target audience, timeline, and expected deliverables."
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Budget range</span>
            <input
              type="text"
              placeholder={t.budgetRangePh}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm outline-none"
            />
          </label>

          <button type="button" className="w-full rounded-full bg-[#7CFF5B] px-5 py-3 text-sm font-black text-[#061207]">
            Submit brief and auto-assign creator
          </button>
        </form>
      </section>
    </main>
  );
}
