const projects = [
  {
    title: "Yasmine T",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Mehdi R",
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sara L",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="mx-auto w-full max-w-400 px-4 pb-24 sm:px-6 lg:px-8 lg:pb-30"
    >
      <div className="mx-auto max-w-6xl">
        <div className="js-reveal text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#404040]">
            Top Creators
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold tracking-[-0.02em] text-[#121212]">
            <span className="creato-highlight">Top Creators</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[#666666]">
            The best UGC creators verified with strict standards and performance.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="creator-card js-reveal"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="creator-card-image"
                loading="lazy"
              />
              <div className="creator-card-overlay">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {project.category}
                </p>
                <h3 className="mt-1 text-xl font-bold tracking-[-0.01em] text-white">
                  {project.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
