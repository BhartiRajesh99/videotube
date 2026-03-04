import Reveal from "./Reveal";

export default function Creators({ revealed, reg }) {
  const CREATORS = [
    {
      id: 1,
      name: "Lex Fridman",
      handle: "@lexfridman",
      subs: "4.2M",
      category: "AI & Science",
      videos: 412,
      views: "840M",
      initials: "LF",
      ring: "ring-sky-300",
      bg: "bg-sky-50",
      iconBg: "bg-sky-600",
      statBg: "bg-sky-50 border-sky-200",
      badge: "🏆 Elite Creator",
      badgeClass: "bg-sky-100 text-sky-700",
    },
    {
      id: 2,
      name: "3Blue1Brown",
      handle: "@3b1b",
      subs: "6.1M",
      category: "Mathematics",
      videos: 128,
      views: "1.2B",
      initials: "3B",
      ring: "ring-blue-300",
      bg: "bg-blue-50",
      iconBg: "bg-blue-600",
      statBg: "bg-blue-50 border-blue-200",
      badge: "✦ Legend",
      badgeClass: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      name: "Marques Brownlee",
      handle: "@mkbhd",
      subs: "18M",
      category: "Technology",
      videos: 1840,
      views: "4.8B",
      initials: "MB",
      ring: "ring-cyan-300",
      bg: "bg-cyan-50",
      iconBg: "bg-cyan-600",
      statBg: "bg-cyan-50 border-cyan-200",
      badge: "◈ Diamond",
      badgeClass: "bg-cyan-100 text-cyan-700",
    },
    {
      id: 4,
      name: "Veritasium",
      handle: "@veritasium",
      subs: "15M",
      category: "Science",
      videos: 290,
      views: "3.6B",
      initials: "VT",
      ring: "ring-indigo-300",
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-600",
      statBg: "bg-indigo-50 border-indigo-200",
      badge: "⚡ Power",
      badgeClass: "bg-indigo-100 text-indigo-700",
    },
  ];

  const CHART = [28, 42, 35, 58, 47, 72, 55, 80, 63, 88, 74, 100];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-sky-50/50 to-blue-50/60 py-20 lg:py-25">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-200 to-transparent" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-150 w-150 -translate-y-1/2 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <Reveal id="cr-hd" revealed={revealed} reg={reg}>
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100 px-4 py-2">
              <span className="text-sm text-sky-500">✦</span>
              <span className="text-xs font-black tracking-widest text-sky-700 uppercase">
                Creator Spotlight
              </span>
            </div>
            <h2 className="mb-5 text-4xl font-black tracking-tight text-gray-900 lg:text-5xl">
              The world's most extraordinary minds,
              <span className="block pb-1.5 bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                {" "}
                publishing here.
              </span>
            </h2>
            <p className="mx-auto max-w-xl text-base font-light text-gray-500">
              From Nobel laureates to startup founders, VideoTube hosts the
              thinkers, builders, and storytellers shaping what comes next.
            </p>
          </div>
        </Reveal>

        {/* Creator cards */}
        <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CREATORS.map((c, i) => (
            <Reveal
              key={c.id}
              id={`cr-${c.id}`}
              revealed={revealed}
              reg={reg}
              delay={`delay-[${i * 80}ms]`}
            >
              <article
                className={`group cursor-pointer rounded-2xl border border-sky-100 bg-white p-7 transition-all duration-400 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/60`}
              >
                {/* Badge */}
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${c.badgeClass} mb-5 border border-current/10`}
                >
                  {c.badge}
                </span>

                {/* Avatar + name */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="relative">
                    <div
                      className={`h-13 w-13 ${c.iconBg} flex items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg transition-transform group-hover:scale-110`}
                    >
                      {c.initials}
                    </div>
                    <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-sky-500">
                      <svg
                        className="h-2.5 w-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base leading-tight font-black text-gray-900">
                      {c.name}
                    </h3>
                    <p className="text-xs font-semibold text-sky-500">
                      {c.handle}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-5 inline-block rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs text-gray-400">
                  {c.category}
                </div>

                {/* Metrics */}
                <div className="mb-5 grid grid-cols-3 gap-2">
                  {[
                    { l: "Subscribers", v: c.subs },
                    { l: "Videos", v: c.videos },
                    { l: "Total Views", v: c.views },
                  ].map((m) => (
                    <div
                      key={m.l}
                      className={`${c.statBg} rounded-xl border p-2.5 text-center`}
                    >
                      <p className="mb-0.5 text-xs font-black text-gray-800">
                        {m.v}
                      </p>
                      <p className="text-[10px] text-gray-400">{m.l}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full cursor-pointer rounded-lg bg-gray-900 py-2.5 text-xs font-bold text-white transition-all group-hover:scale-[1.02] hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/15">
                  Visit Channel →
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Dashboard + copy split */}
        <Reveal id="cr-dash" revealed={revealed} reg={reg}>
          <div className="overflow-hidden rounded-3xl border border-sky-200 bg-white shadow-xl shadow-sky-100/40">
            <div className="grid gap-0 lg:grid-cols-2">
              {/* Dashboard mock */}
              <div className="border-b border-sky-100 bg-linear-to-br from-sky-50 to-blue-50/60 p-8 lg:border-r lg:border-b-0 lg:p-12">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Revenue Dashboard
                    </p>
                    <p className="text-4xl font-black tracking-tight text-gray-900">
                      $14,820
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    ↑ 34.2%
                  </span>
                </div>

                {/* Chart */}
                <div className="mb-6 flex h-24 items-end gap-1.5">
                  {CHART.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm ${i === 11 ? "bg-sky-500" : i > 8 ? "bg-sky-300" : "bg-sky-100"} transition-all`}
                    />
                  ))}
                </div>

                {/* Revenue breakdown */}
                <div className="space-y-4">
                  {[
                    {
                      l: "Subscriptions",
                      v: "$8,240",
                      p: "71%",
                      c: "bg-sky-500",
                    },
                    {
                      l: "Ad Revenue",
                      v: "$3,920",
                      p: "42%",
                      c: "bg-blue-400",
                    },
                    {
                      l: "Tips & Gifts",
                      v: "$2,660",
                      p: "28%",
                      c: "bg-cyan-400",
                    },
                  ].map((r) => (
                    <div key={r.l}>
                      <div className="mb-1.5 flex justify-between">
                        <span className="text-xs font-medium text-gray-500">
                          {r.l}
                        </span>
                        <span className="text-xs font-black text-gray-800">
                          {r.v}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-sky-100">
                        <div className={`h-full ${r.c} rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copy */}
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-100 px-4 py-2">
                  <span className="text-xs font-black tracking-widest text-sky-700 uppercase">
                    Creator Economy
                  </span>
                </div>
                <h3 className="mb-5 text-3xl leading-tight font-black tracking-tight text-gray-900 lg:text-4xl">
                  Your content.
                  <span className="block bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                    Your rules. Your income.
                  </span>
                </h3>
                <p className="mb-8 text-base leading-relaxed font-light text-gray-500">
                  VideoTube's creator-first model means you keep 85% of
                  everything you earn. Multiple revenue streams, a built-in
                  sponsorship marketplace, and merchandise tools — all in one
                  dashboard.
                </p>
                <ul className="mb-10 space-y-3">
                  {[
                    "Keep 85% of subscription & tip revenue",
                    "Integrated merch storefront at zero cost",
                    "Live streaming with real-time gifting",
                    "Sponsorship marketplace with vetted brands",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-sky-300 bg-sky-100 text-[10px] text-sky-600">
                        ✓
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 cursor-pointer rounded-lg bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-all hover:scale-102 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20">
                    Start Earning Today →
                  </button>
                  <button className="flex items-center gap-2 cursor-pointer rounded-lg border-2 border-sky-200 bg-sky-50 px-6 py-3 text-sm font-bold text-sky-600 transition-all hover:border-sky-400 hover:bg-sky-100 hover:text-sky-700">
                    View Creator Plans
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
