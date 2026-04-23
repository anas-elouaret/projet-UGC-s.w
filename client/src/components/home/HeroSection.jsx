import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collageItems = [
  {
    name: "@yasmine",
    video:
      "https://cdn.coverr.co/videos/coverr-smiling-woman-using-a-phone-1577/1080p.mp4",
  },
  {
    name: "@anas_b",
    video:
      "https://cdn.coverr.co/videos/coverr-aerial-view-of-a-futuristic-city-at-night-1579/1080p.mp4",
  },
  {
    name: "@mehdi",
    video:
      "https://cdn.coverr.co/videos/coverr-thinking-man-in-office-1576/1080p.mp4",
  },
  {
    name: "@sara",
    video:
      "https://cdn.coverr.co/videos/coverr-girl-walking-on-the-street-1571/1080p.mp4",
  },
];

export default function HeroSection({ loading }) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length || !sectionRef.current) {
        return;
      }

      const offsets = [-70, -120, -50, -95];
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: offsets[index] ?? -70,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="mx-auto w-full max-w-400 px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
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
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={`creato-card bg-[#121212] ${index % 2 === 1 ? "mt-4 sm:mt-6" : ""}`}
            >
              <video
                className="creato-card-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={item.video} type="video/mp4" />
              </video>
              <p className="creato-card-user">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
