import Reveal from "./Reveal";

export default function Hero({ revealed, reg }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-br from-sky-50 via-white to-blue-50 pt-6">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-175 w-175 animate-[blobpulse_10s_ease-in-out_infinite] rounded-full bg-linear-to-br from-sky-200/60 to-blue-200/40 blur-3xl" />
        <div className="absolute top-1/4 -right-40 h-150 w-150 animate-[blobpulse_13s_ease-in-out_infinite_2s] rounded-full bg-linear-to-bl from-blue-200/50 to-cyan-200/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-125 w-125 animate-[blobpulse_16s_ease-in-out_infinite_5s] rounded-full bg-linear-to-tr from-sky-100/80 to-indigo-200/40 blur-3xl" />
      </div>

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#bae6fd_1px,transparent_1px)] bg-size-[36px_36px] opacity-[0.35]" />

      {/* Diagonal stripe accent top-right */}
      <div className="pointer-events-none absolute top-0 right-0 h-120 w-120 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-linear-to-bl from-sky-300 to-transparent" />
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-150 bg-sky-400"
            style={{
              top: `${i * 52}px`,
              left: "-100px",
              transform: `rotate(-35deg)`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left */}
          <div>
            {/* Announcement badge */}
            <Reveal
              id="hero-badge"
              revealed={revealed}
              reg={reg}
              delay="delay-75"
            >
              <div className="mb-8 inline-flex cursor-default items-center gap-2.5 rounded-full border border-sky-200 bg-white py-2 pr-5 pl-2 shadow-sm shadow-sky-100 transition-shadow hover:shadow-md hover:shadow-sky-100">
                <span className="flex items-center gap-1.5 rounded-full bg-sky-500 px-3 py-1 text-xs font-black text-white">
                  NEW
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  AI Platform 3.0 is live · Series A $120M
                </span>
                <svg
                  className="h-4 w-4 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal
              id="hero-h1"
              revealed={revealed}
              reg={reg}
              delay="delay-100"
            >
              <h1 className="mb-6 text-5xl leading-none font-black tracking-tight text-gray-900 sm:text-6xl xl:text-[76px]">
                The Future
                <span className="block bg-linear-to-r from-sky-500 via-blue-500 to-sky-600 bg-clip-text text-transparent">
                  of Video
                </span>
                <span className="block">is Here.</span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal
              id="hero-desc"
              revealed={revealed}
              reg={reg}
              delay="delay-150"
            >
              <p className="mb-10 max-w-xl text-lg leading-relaxed font-light text-gray-500">
                VideoTube is the world's first AI-native video platform —
                engineered for the next generation of creators, viewers, and
                enterprises. Experience intelligent discovery, zero-buffer 8K
                streaming, and creator economics that actually work.
              </p>
            </Reveal>

            {/* CTA buttons */}
            <Reveal
              id="hero-ctas"
              revealed={revealed}
              reg={reg}
              delay="delay-200"
            >
              <div className="mb-14 flex flex-wrap items-center gap-4">
                {/* Primary - black */}
                <button className="group flex cursor-pointer items-center gap-3 rounded-lg bg-neutral-900 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-101 hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/25">
                  <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Start Watching Free
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                </button>
                {/* Secondary */}
                <button className="group flex cursor-pointer items-center gap-3 rounded-lg border-2 border-sky-200 bg-white/70 px-8 py-3 text-base font-semibold text-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-sky-400 hover:bg-sky-50 hover:text-gray-900 hover:shadow-lg hover:shadow-sky-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200 bg-sky-100 transition-colors group-hover:bg-sky-200">
                    <svg
                      className="h-3 w-3 fill-sky-600"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  Watch Demo
                </button>
              </div>
            </Reveal>

            {/* Social proof */}
            <Reveal
              id="hero-proof"
              revealed={revealed}
              reg={reg}
              delay="delay-[250ms]"
            >
              <div className="flex flex-wrap items-center gap-8 border-t border-sky-200/60 pt-6">
                {[
                  { v: "2.4B+", l: "Viewers" },
                  { v: "50M+", l: "Creators" },
                  { v: "8K HDR", l: "Max Quality" },
                ].map((s) => (
                  <div key={s.l} className="flex items-center gap-2.5">
                    <span
                      className="text-2xl font-black text-gray-900"
                    >
                      {s.v}
                    </span>
                    <span
                      className="text-sm font-medium text-gray-400"
                    >
                      {s.l}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[
                      "bg-sky-500",
                      "bg-blue-600",
                      "bg-cyan-500",
                      "bg-indigo-500",
                    ].map((c, i) => (
                      <div
                        key={i}
                        className={`h-7 w-7 ${c} flex items-center justify-center rounded-full border-2 border-white text-[10px] font-black text-white`}
                      >
                        {["AK", "PG", "LF", "KZ"][i]}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm text-amber-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-xs font-medium text-gray-400"
                  >
                    4.9 / 120K+ reviews
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: product preview */}
          <Reveal
            id="hero-ui"
            revealed={revealed}
            reg={reg}
            delay="delay-200"
            dir="right"
          >
            <div className="relative -top-28">
              {/* Card glow */}
              <div className="absolute inset-0 translate-y-4 scale-95 rounded-3xl bg-linear-to-br from-sky-200/60 to-blue-200/40 blur-2xl" />

              {/* Main player card */}
              <div className="relative overflow-hidden rounded-2xl border border-sky-200/80 bg-white shadow-2xl shadow-sky-200/40">
                {/* Video thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600">
                  <div className="absolute inset-0 opacity-30">
                    <svg className="h-full w-full" viewBox="0 0 700 394">
                      <defs>
                        <radialGradient id="hg" cx="40%" cy="40%" r="60%">
                          <stop
                            offset="0%"
                            stopColor="white"
                            stopOpacity="0.4"
                          />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                      </defs>
                      <rect width="700" height="394" fill="url(#hg)" />
                      {[...Array(5)].map((_, i) => (
                        <circle
                          key={i}
                          cx={140 + i * 110}
                          cy={197 + Math.sin(i * 0.9) * 70}
                          r={50 + i * 20}
                          fill="none"
                          stroke="rgba(255,255,255,0.25)"
                          strokeWidth="0.8"
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Video label */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm"
                    >
                      AI & TECH
                    </span>
                    <span
                      className="rounded-full bg-black/30 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                    >
                      4K HDR
                    </span>
                  </div>

                  {/* Duration */}
                  <div
                    className="absolute top-4 right-4 rounded-md bg-black/50 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm"
                  >
                    1:24:38
                  </div>

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-white/50 bg-white/20 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30">
                      <svg
                        className=" h-7 w-7 fill-white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-5">
                    <p
                      className="mb-0.5 text-sm font-bold text-white"
                    >
                      Building AGI: The Road to Superintelligence
                    </p>
                    <p
                      className="text-xs text-white/60"
                    >
                      Andrej Karpathy · 4.2M views
                    </p>
                    {/* Progress */}
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/20">
                      <div className="relative h-full w-2/5 rounded-full bg-linear-to-r from-sky-300 to-white">
                        <div className="absolute top-1/2 right-0 h-3 w-3 translate-x-1.5 -translate-y-1/2 rounded-full bg-white shadow-lg" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3 p-5">
                  {[
                    {
                      label: "Live Viewers",
                      value: "142,849",
                      icon: "●",
                      iconClass: "text-red-500",
                    },
                    {
                      label: "Trending Rank",
                      value: "#1 Today",
                      icon: "▲",
                      iconClass: "text-emerald-500",
                    },
                    {
                      label: "AI Score",
                      value: "98.4 / 100",
                      icon: "◈",
                      iconClass: "text-sky-500",
                    },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-sky-100 bg-sky-50 p-3 transition-colors hover:bg-sky-100/60"
                    >
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <span className={`text-xs ${m.iconClass}`}>
                          {m.icon}
                        </span>
                        <span
                          className="text-xs font-medium text-gray-400"
                        >
                          {m.label}
                        </span>
                      </div>
                      <p
                        className="text-sm font-black text-gray-800"
                      >
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating chip: Revenue */}
              <div className="absolute -top-5 -right-5 animate-[floatup_6s_ease-in-out_infinite] rounded-2xl border border-sky-200 bg-white px-4 py-3 shadow-xl shadow-sky-100/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-lg">
                    📈
                  </div>
                  <div>
                    <p
                      className="mb-0.5 text-xs font-medium text-gray-400"
                    >
                      This month
                    </p>
                    <p
                      className="text-sm font-black text-gray-900"
                    >
                      $28,440{" "}
                      <span className="text-xs font-bold text-emerald-500">
                        ↑ 42%
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating chip: AI match */}
              <div className="absolute -bottom-5 -left-5 animate-[floatup_8s_ease-in-out_infinite_1.5s] rounded-2xl border border-sky-200 bg-white px-4 py-3 shadow-xl shadow-sky-100/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-lg">
                    🤖
                  </div>
                  <div>
                    <p
                      className="mb-0.5 text-xs font-medium text-gray-400"
                    >
                      AI matched you
                    </p>
                    <p
                      className="text-sm font-bold text-sky-600"
                    >
                      1,284 new viewers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}