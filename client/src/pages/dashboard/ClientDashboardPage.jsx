import HybridNavbar from "../../components/hybrid/HybridNavbar";

export default function ClientDashboardPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <HybridNavbar />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black">Client Dashboard</h1>
        <p className="mt-3 text-zinc-300">Manage projects, files, invoices, and creator communication from one place.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Order services", "Track projects", "Chat with creators", "Upload files", "View invoices", "Request revisions"].map((item) => (
            <article key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
