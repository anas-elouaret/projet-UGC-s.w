import HybridNavbar from "../../components/hybrid/HybridNavbar";

export default function CreatorDashboardPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <HybridNavbar />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black">Creator Dashboard</h1>
        <p className="mt-3 text-zinc-300">Control your profile, portfolio, active orders, and payouts with full visibility.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Profile management", "Portfolio uploads", "Active orders", "Delivery queue", "Earnings", "Performance metrics"].map((item) => (
            <article key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
