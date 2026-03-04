import Reveal from "./Reveal";

export default function Features({ revealed, reg }) {
  const FEATURES = [
    {
      icon: "◈",
      title: "Neural Recommendation Engine",
      desc: "Our proprietary AI analyzes 200+ behavioral signals in real-time, delivering hyper-personalized content that keeps viewers engaged 3× longer than legacy platforms.",
      tag: "AI-Powered",
      tagClass: "bg-sky-100 text-sky-700 border-sky-200",
      iconClass: "text-sky-600",
      cardClass: "border-sky-100 hover:border-sky-300 hover:shadow-sky-100",
    },
    {
      icon: "⚡",
      title: "Quantum-Speed Global CDN",
      desc: "340 edge locations across 6 continents with adaptive bitrate streaming — guaranteeing zero-buffer 8K HDR playback even on constrained mobile connections.",
      tag: "Infrastructure",
      tagClass: "bg-blue-100 text-blue-700 border-blue-200",
      iconClass: "text-blue-600",
      cardClass: "border-blue-100 hover:border-blue-300 hover:shadow-blue-100",
    },
    {
      icon: "◎",
      title: "Creator Revenue Intelligence",
      desc: "Real-time analytics dashboards, predictive revenue modeling, and automated sponsorship matching. Top creators on VideoTube earn 2.4× more than any rival platform.",
      tag: "Monetization",
      tagClass: "bg-cyan-100 text-cyan-700 border-cyan-200",
      iconClass: "text-cyan-600",
      cardClass: "border-cyan-100 hover:border-cyan-300 hover:shadow-cyan-100",
    },
    {
      icon: "△",
      title: "Studio-Grade Live Broadcasting",
      desc: "Broadcast to millions with sub-200ms latency. Full multi-camera support, AI noise cancellation, live captions, interactive polls, and real-time gifting built-in.",
      tag: "Live",
      tagClass: "bg-indigo-100 text-indigo-700 border-indigo-200",
      iconClass: "text-indigo-600",
      cardClass:
        "border-indigo-100 hover:border-indigo-300 hover:shadow-indigo-100",
    },
    {
      icon: "▷",
      title: "Intelligent Content Protection",
      desc: "Enterprise-grade DRM with AI-powered copyright detection across 50M+ content fingerprints. DMCA automation and proactive takedown alerts protect your IP globally.",
      tag: "Security",
      tagClass: "bg-sky-100 text-sky-700 border-sky-200",
      iconClass: "text-sky-600",
      cardClass: "border-sky-100 hover:border-sky-300 hover:shadow-sky-100",
    },
    {
      icon: "✦",
      title: "Collaborative Creation Suite",
      desc: "Co-edit in real-time with your team. Built-in scriptwriting, AI auto-chapters, subtitle generation in 65 languages, and one-click cross-platform publishing.",
      tag: "Collaboration",
      tagClass: "bg-blue-100 text-blue-700 border-blue-200",
      iconClass: "text-blue-600",
      cardClass: "border-blue-100 hover:border-blue-300 hover:shadow-blue-100",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-sky-50/40 to-white py-20 lg:py-25">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-300/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <Reveal id="feat-hd" revealed={revealed} reg={reg}>
          <div className="mb-15 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100 px-4 py-2">
              <span className="text-sm font-bold text-sky-500">◈</span>
              <span className="text-xs font-black tracking-widest text-sky-700 uppercase">
                Platform Capabilities
              </span>
            </div>
            <h2 className="mb-6 text-4xl leading-tight font-black tracking-tight text-gray-900 lg:text-6xl">
              Not just a platform.
              <span className="block bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                An unfair advantage.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-gray-500">
              Every feature was engineered with a single goal: give creators the
              intelligence, infrastructure, and economics to build
              category-defining channels at warp speed.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal
              key={i}
              id={`feat-${i}`}
              revealed={revealed}
              reg={reg}
              delay={`delay-[${(i % 3) * 90}ms]`}
            >
              <div
                className={`group border bg-white ${f.cardClass} cursor-default rounded-2xl p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className="mb-5 flex items-start justify-between">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${f.tagClass}`}
                  >
                    {f.tag}
                  </span>
                  <span
                    className={`text-3xl font-light ${f.iconClass} inline-block transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    {f.icon}
                  </span>
                </div>
                <h3 className="mb-3 text-lg leading-snug font-black text-gray-900">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed font-light text-gray-500">
                  {f.desc}
                </p>
                <div className="mt-5 flex translate-y-1 items-center gap-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className={`text-xs font-bold ${f.iconClass}`}>
                    Explore feature
                  </span>
                  <svg
                    className={`h-3.5 w-3.5 ${f.iconClass}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
