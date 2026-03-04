export default function Footer() {
  const COLS = {
    Product: [
      "Trending",
      "Live",
      "Creator Studio",
      "Premium",
      "VideoTube Kids",
      "Mobile Apps",
    ],
    Creators: [
      "Get Started",
      "Monetization",
      "Analytics",
      "Academy",
      "Community",
      "Success Stories",
    ],
    Company: ["About", "Blog", "Careers", "Press", "Investors", "Contact"],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "DMCA",
      "Cookie Settings",
      "Accessibility",
      "Sitemap",
    ],
  };

  return (
    <footer className="relative overflow-hidden border-t border-sky-100 bg-white">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-sky-50/40 to-white" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Main */}
        <div className="grid grid-cols-2 gap-10 py-8 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-10 border-2 border-off-white/75 items-center justify-center rounded-lg bg-linear-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-200/60">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-lg font-black text-gray-900">
                Video
                <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                  Tube
                </span>
              </span>
            </div>
            <p className="mb-6 max-w-56 text-sm leading-relaxed font-light text-gray-400">
              The world's most advanced AI-native video platform for the next
              billion creators.
            </p>
            <div className="flex gap-2">
              {[{ ic: "𝕏" }, { ic: "in" }, { ic: "▶" }, { ic: "◉" }].map(
                (s, i) => (
                  <button
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sm text-gray-500 transition-all hover:scale-110 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                  >
                    {s.ic}
                  </button>
                ),
              )}
            </div>
          </div>

          {Object.entries(COLS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-5 text-xs font-black tracking-[0.15em] text-gray-800 uppercase">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-400 transition-colors hover:text-sky-600"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-sky-100 py-8 sm:flex-row">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-xs text-gray-400">
              © 2026 VideoTube, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs text-gray-400">
                All systems operational
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-1 text-xs text-gray-400">Backed by</span>
            {["Y21", "a16z", "Sequoia"].map((v) => (
              <span
                key={v}
                className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-bold text-gray-500"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
