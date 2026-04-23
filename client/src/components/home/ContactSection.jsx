export default function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-400 px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32"
    >
      <div className="js-reveal mx-auto max-w-6xl rounded-[2rem] border border-black/20 bg-[#111319] p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-12">
        <div className="text-center">
          <h2 className="mt-1 text-[clamp(2rem,4vw,3.6rem)] font-extrabold tracking-[-0.02em] text-white">
            Ready to boost your brand with
            <br />
            <span className="text-[#b8ff16]">authentic content?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/66 sm:text-base">
            Join hundreds of brands scaling their advertising ROI with verified creators.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-full bg-[#b8ff16] px-8 py-4 text-sm font-bold text-[#101010]">
            Get Started Now
          </button>
          <button className="rounded-full border border-white/70 px-8 py-4 text-sm font-semibold text-white">
            Browse Catalog
          </button>
        </div>
      </div>
    </section>
  );
}
