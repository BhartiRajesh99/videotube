import Reveal from "./Reveal";
import { useState } from "react";

export default function VideoCard({ v, idx, revealed, reg }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal id={`vc-${v.id}`} revealed={revealed} reg={reg} delay={`delay-150`}>
      <article
        className="group cursor-pointer overflow-hidden rounded-2xl border border-sky-100 bg-white transition-all duration-400 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/60"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Thumbnail */}
        <div
          className={`relative bg-linear-to-br ${v.thumb} aspect-video overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-30">
            <svg className="h-full w-full" viewBox="0 0 400 225">
              <defs>
                <radialGradient id={`vg-${v.id}`} cx="30%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <rect width="400" height="225" fill={`url(#vg-${v.id})`} />
            </svg>
          </div>
          <div className="absolute top-2.5 left-2.5 rounded-full border border-white/30 bg-white/20 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
            {v.category}
          </div>
          <div className="absolute right-2.5 bottom-2.5 rounded-md bg-black/60 px-2 py-0.5 text-xs font-bold text-white">
            {v.duration}
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 ${hov ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-sm transition-transform hover:scale-110">
              <svg className="ml-0.5 h-5 w-5 fill-white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex gap-3">
            <div
              className={`h-9 w-9 bg-linear-to-br ${v.thumb} flex shrink-0 items-center justify-center rounded-full text-xs font-black text-white shadow-sm transition-transform group-hover:scale-110`}
            >
              {v.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1.5 line-clamp-2 text-sm leading-snug font-bold text-gray-800 transition-colors group-hover:text-gray-900">
                {v.title}
              </h3>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="text-xs font-medium text-gray-500 transition-colors hover:text-sky-600">
                  {v.channel}
                </span>
                {v.verified && (
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
              </div>
              <p className="text-xs font-medium text-gray-400">
                {v.views} views · {v.timestamp}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
