const collageItems = [
  {
    name: "@yasmine",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "@anas_b",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "@mehdi",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "@sara",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HeroSection({ loading }) {
  return (
    <section id="home" className="mx-auto w-full max-w-400 px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="js-reveal max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="creato-chip">Escrow Protected</span>
            <span className="creato-chip">Fast Delivery</span>
          </div>

          <h1 className="mt-8 text-[clamp(2.5rem,6.4vw,5.3rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[#121212]">
            Find the Best
            <br />
            <span className="creato-highlight">UGC Creators</span> For
            <br />
            your business.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5f5f5f]">
            Connect with verified Moroccan creators. Secure payments via escrow.
            Performance-focused UGC delivered in days, not weeks.
          </p>

          <button
            type="button"
            className="creato-cta mt-10 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em]"
            disabled={loading}
          >
            View All Creators
          </button>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="creato-subchip">Secure Payments</span>
            <span className="creato-subchip">Fast Delivery</span>
          </div>
        </div>

        <div className="js-reveal grid grid-cols-2 gap-4">
          {collageItems.map((item, index) => (
            <article
              key={item.name}
              className={`creato-card bg-[#121212] ${index % 2 === 1 ? "mt-4 sm:mt-6" : ""}`}
            >
              <img src={item.image} alt={item.name} className="creato-card-image" loading="lazy" />
              <p className="creato-card-user">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
