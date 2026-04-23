export default function AboutSection() {
  const rows = [
    { feature: "Verified creators", creato: true, agencies: true, freelancers: false, influencer: false },
    { feature: "Secure payment", creato: true, agencies: false, freelancers: false, influencer: false },
    { feature: "Performance tracking", creato: true, agencies: false, freelancers: false, influencer: false },
    { feature: "Full usage rights", creato: true, agencies: true, freelancers: false, influencer: false },
  ];

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-400 px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32"
    >
      <div className="js-reveal mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#3b3b3b]">
          Comparison
        </p>
        <h2 className="mt-4 text-center text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-[#121212]">
          Creato vs. <span className="creato-highlight">The Alternatives</span>
        </h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-black/8 bg-white">
          <table className="w-full border-collapse text-sm text-[#212121]">
            <thead>
              <tr className="border-b border-black/8 bg-[#f8f8f8]">
                <th className="px-4 py-4 text-left text-xs uppercase tracking-[0.14em] text-[#666666]">Feature</th>
                <th className="px-4 py-4 text-center text-xs uppercase tracking-[0.14em] text-[#111111]">Creato</th>
                <th className="px-4 py-4 text-center text-xs uppercase tracking-[0.14em] text-[#666666]">Agencies</th>
                <th className="px-4 py-4 text-center text-xs uppercase tracking-[0.14em] text-[#666666]">Freelancers</th>
                <th className="px-4 py-4 text-center text-xs uppercase tracking-[0.14em] text-[#666666]">Influencers</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b border-black/6 last:border-b-0">
                  <td className="px-4 py-4 font-medium">{row.feature}</td>
                  <td className="px-4 py-4 text-center">{row.creato ? "✓" : "—"}</td>
                  <td className="px-4 py-4 text-center">{row.agencies ? "✓" : "✕"}</td>
                  <td className="px-4 py-4 text-center">{row.freelancers ? "✓" : "✕"}</td>
                  <td className="px-4 py-4 text-center">{row.influencer ? "✓" : "✕"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
