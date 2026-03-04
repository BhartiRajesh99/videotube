import Reveal from "./Reveal";

export default function Stats({ revealed, reg }) {
  const STATS = [
    { n: "2.4B+", label: "Monthly Viewers", sub: "+340M year-over-year" },
    { n: "50M+", label: "Active Creators", sub: "Across 195 countries" },
    { n: "99.99%", label: "Platform Uptime", sub: "Enterprise SLA" },
    { n: "$2.1B", label: "Creator Earnings", sub: "85% revenue share" },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-r from-sky-600 via-blue-600 to-sky-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-size-[40px_40px] opacity-10" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-700/10 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 divide-x divide-white/20 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={i}
              id={`stat-${i}`}
              revealed={revealed}
              reg={reg}
              delay={`delay-[${i * 80}ms]`}
            >
              <div className="group px-8 py-12 text-center transition-colors hover:bg-white/5">
                <p className="mb-2 text-4xl leading-none font-black tracking-tight text-white transition-transform group-hover:scale-105 xl:text-5xl">
                  {s.n}
                </p>
                <p className="mb-0.5 text-sm font-semibold text-sky-100">
                  {s.label}
                </p>
                <p className="text-xs text-sky-200/70">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
