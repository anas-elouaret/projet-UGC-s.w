import HybridNavbar from "../../components/hybrid/HybridNavbar";
import CreatorCatalogSection from "../../components/home/CreatorCatalogSection";

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <HybridNavbar />
      <section className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7CFF5B]">Creator Catalog</p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">Find vetted creators by niche, pricing, and rating.</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          Book creators directly or request a managed assignment through the Done-For-You flow.
        </p>
      </section>
      <div className="pb-12">
        <CreatorCatalogSection />
      </div>
    </main>
  );
}
