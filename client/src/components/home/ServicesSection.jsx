const services = [
  {
    title: "Verified Creators",
    description:
      "Every creator goes through a strict verification process before joining our network.",
    icon: "M12 2l2.6 5.5 6 .9-4.4 4.3 1 6-5.2-2.8-5.2 2.8 1-6L3.4 8.4l6-.9L12 2z",
  },
  {
    title: "Performance-Focused UGC",
    description:
      "Content optimized to convert with real ROI, not just vanity metrics.",
    icon: "M3 5.8A2.8 2.8 0 0 1 5.8 3h12.4A2.8 2.8 0 0 1 21 5.8v12.4a2.8 2.8 0 0 1-2.8 2.8H5.8A2.8 2.8 0 0 1 3 18.2V5.8zm4.5 3.7h9m-9 5h6",
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden fees. Know exactly what you pay for before launch.",
    icon: "M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8zm8-4v4l3 2",
  },
  {
    title: "Full Usage Rights",
    description:
      "Clear licenses included, so your content works across paid and organic.",
    icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v18",
  },
  {
    title: "Fast Delivery",
    description: "Campaign-ready videos delivered in days, not weeks.",
    icon: "M12 2l2.6 5.5 6 .9-4.4 4.3 1 6-5.2-2.8-5.2 2.8 1-6L3.4 8.4l6-.9L12 2z",
  },
  {
    title: "Dedicated Support",
    description: "Our team handles creator coordination and campaign setup.",
    icon: "M3 5.8A2.8 2.8 0 0 1 5.8 3h12.4A2.8 2.8 0 0 1 21 5.8v12.4a2.8 2.8 0 0 1-2.8 2.8H5.8A2.8 2.8 0 0 1 3 18.2V5.8zm4.5 3.7h9m-9 5h6",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="mx-auto w-full max-w-400 px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-30"
    >
      <div className="mx-auto max-w-6xl">
        <p className="js-reveal text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f2f2f]">
          Why Creato
        </p>
        <h2 className="js-reveal mt-4 text-center text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold tracking-[-0.02em] text-[#121212]">
          Built for brands that <span className="creato-highlight">want results.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-card-light js-reveal rounded-2xl p-5"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="service-icon-wrap-light mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d={service.icon} />
                </svg>
              </div>

              <h3 className="text-base font-bold tracking-[-0.01em] text-[#141414]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#666666]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
