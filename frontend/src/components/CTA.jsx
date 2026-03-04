import Reveal from "./Reveal";

export default function CTA({ revealed, reg }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-sky-600 via-blue-700 to-sky-800 py-20 lg:py-25">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-size-[32px_32px]"
      />
      {/* Blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-sky-400/30 blur-3xl" />
      <div className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-blue-400/30 blur-3xl" />
      {/* Center ring */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-175 w-175 rounded-full border border-white/10" />
        <div className="absolute h-125 w-125 rounded-full border border-white/8" />
        <div className="absolute h-75 w-75 rounded-full border border-white/6" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal id="cta-body" revealed={revealed} reg={reg}>
          <p
            className="mb-8 text-xs font-black tracking-[0.3em] text-sky-200 uppercase"
          >
            — Ready to start? —
          </p>
          <h2
            className="mb-7 text-5xl leading-none font-black tracking-tight text-white lg:text-7xl"
          >
            The stage
            <br />
            is yours.
          </h2>
          <p
            className="mx-auto mb-14 max-w-lg text-xl leading-relaxed font-light text-sky-100/80"
          >
            Join 50 million creators who chose VideoTube. Upload your first
            video in under 60 seconds. No friction. No limits.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              className="group flex items-center gap-2.5 rounded-lg bg-gray-900 px-10 py-4 text-base font-black whitespace-nowrap text-white transition-all hover:scale-101 cursor-pointer hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/40"
            >
              Create Free Account
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
            <button
              className="flex items-center gap-2 cursor-pointer rounded-lg border-2 border-white/25 bg-white/8 px-10 py-3.5 text-base font-bold whitespace-nowrap text-white/90 backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15 hover:text-white"
            >
              Talk to Sales
            </button>
          </div>
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {[
              "No credit card required",
              "Cancel anytime",
              "Free forever plan",
              "GDPR compliant",
            ].map((b) => (
              <div
                key={b}
                className="flex items-center gap-1.5 text-xs font-medium text-sky-200/80"
              >
                <svg
                  className="h-3.5 w-3.5 text-sky-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {b}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}