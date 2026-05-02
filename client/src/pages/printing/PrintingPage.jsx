import HybridNavbar from "../../components/hybrid/HybridNavbar";
import { printingItems } from "../../components/hybrid/hybridData";

export default function PrintingPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <HybridNavbar />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7CFF5B]">Printing Services</p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">Print assets that complete your brand experience.</h1>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {printingItems.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 h-24 rounded-xl bg-gradient-to-br from-[#7CFF5B]/30 to-transparent" />
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="mt-2 text-sm text-zinc-300">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <h3 className="text-2xl font-bold">Ready to print?</h3>
          <p className="mt-2 max-w-2xl text-sm text-zinc-300">
            Upload your design files, select quantity and finishing options, and request a print quote or direct production.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-full bg-[#7CFF5B] px-5 py-2 text-sm font-bold text-[#061207]">Upload your design</button>
            <button className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white">Request print</button>
          </div>
        </div>
      </section>
    </main>
  );
}
