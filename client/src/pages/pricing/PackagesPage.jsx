import { Link } from "react-router-dom";
import HybridNavbar from "../../components/hybrid/HybridNavbar";
import { packageItems } from "../../components/hybrid/hybridData";
import AddToCartButton from "../../components/cart/AddToCartButton";

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <HybridNavbar />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7CFF5B]">Pricing</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Productized packages for predictable growth.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          Clear scope, fixed pricing, and execution timelines designed for startup teams that need speed without chaos.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {packageItems.map((pack) => (
            <article key={pack.id} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-7">
              <h2 className="text-xl font-bold tracking-tight">{pack.name}</h2>
              <p className="mt-3 text-4xl font-black tracking-tight">{pack.price}</p>
              <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                {pack.features.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
              <div className="mt-7 flex gap-3">
                <AddToCartButton 
                  item={{
                    id: pack.id,
                    name: pack.name,
                    price: pack.priceNum,
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
