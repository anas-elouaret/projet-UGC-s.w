import { Link } from "react-router-dom";
import HybridNavbar from "../components/hybrid/HybridNavbar";
import { serviceItems } from "../components/hybrid/hybridData";
import AddToCartButton from "../components/cart/AddToCartButton";
import { formatMAD } from "../utils/currency";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <HybridNavbar />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7CFF5B]">Services</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Agency-grade services with marketplace speed.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          Choose the exact support your brand needs, then launch with transparent scope, timelines, and progress tracking.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {serviceItems.map((service) => (
            <article key={service.id} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{service.title}</h2>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#7CFF5B]">{formatMAD(service.price)}</p>
                  <p className="text-xs text-zinc-400">One-time</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-zinc-200">
                {service.benefits.map((benefit) => (
                  <li key={benefit}>- {benefit}</li>
                ))}
              </ul>
              <div className="mt-7 flex gap-3">
                <AddToCartButton 
                  item={{
                    id: service.id,
                    name: service.title,
                    price: service.price,
                  }}
                />
                <Link
                  to="/start-project"
                  className="rounded-full border border-white/20 bg-white/[0.02] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/[0.05]"
                >
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
