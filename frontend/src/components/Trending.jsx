import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import VideoCard from "./VideoCard";
import SkeletonCard from "./SkeletonCard"
import { NavLink } from "react-router-dom";

export default function Trending({ revealed, reg }) {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("All");

  const TRENDING_VIDEOS = [
    {
      id: 1,
      title: "Building AGI: The Road to Superintelligence",
      channel: "Andrej Karpathy",
      views: "4.2M",
      duration: "1:24:38",
      timestamp: "2 days ago",
      category: "AI & Tech",
      thumb: "from-sky-400 to-blue-600",
      avatar: "AK",
      verified: true,
    },
    {
      id: 2,
      title: "Why Every Startup Fails at Product-Market Fit",
      channel: "Paul Graham",
      views: "2.8M",
      duration: "38:14",
      timestamp: "5 days ago",
      category: "Startups",
      thumb: "from-cyan-400 to-sky-600",
      avatar: "PG",
      verified: true,
    },
    {
      id: 3,
      title: "The Cinematic Language of Christopher Nolan",
      channel: "Every Frame",
      views: "6.1M",
      duration: "52:07",
      timestamp: "1 week ago",
      category: "Film",
      thumb: "from-blue-400 to-indigo-600",
      avatar: "EF",
      verified: true,
    },
    {
      id: 4,
      title: "Mastering Rust in 2025: Zero to Production",
      channel: "Jon Gjengset",
      views: "1.9M",
      duration: "3:12:44",
      timestamp: "3 days ago",
      category: "Engineering",
      thumb: "from-sky-300 to-cyan-600",
      avatar: "JG",
      verified: false,
    },
    {
      id: 5,
      title: "How DeepMind Solved Protein Folding",
      channel: "Kurzgesagt",
      views: "11.4M",
      duration: "18:33",
      timestamp: "2 weeks ago",
      category: "Science",
      thumb: "from-indigo-400 to-sky-700",
      avatar: "KZ",
      verified: true,
    },
    {
      id: 6,
      title: "The Architecture of Modern Data Centers",
      channel: "Fireship",
      views: "3.3M",
      duration: "22:18",
      timestamp: "4 days ago",
      category: "Engineering",
      thumb: "from-cyan-500 to-blue-700",
      avatar: "FF",
      verified: true,
    },
    {
      id: 7,
      title: "Live Coding: Building a Compiler from Scratch",
      channel: "ThePrimeagen",
      views: "890K",
      duration: "2:48:09",
      timestamp: "1 day ago",
      category: "Coding",
      thumb: "from-sky-500 to-indigo-700",
      avatar: "TP",
      verified: true,
    },
    {
      id: 8,
      title: "Philosophy of Time: Eternalism vs Presentism",
      channel: "Sean Carroll",
      views: "2.1M",
      duration: "1:07:22",
      timestamp: "6 days ago",
      category: "Philosophy",
      thumb: "from-blue-300 to-sky-600",
      avatar: "SC",
      verified: true,
    },
  ];

  const FILTERS = [
    "All",
    "AI & Tech",
    "Startups",
    "Science",
    "Engineering",
    "Coding",
    "Film",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), 1000);

    return () => clearTimeout(timer);
  });

  const videos =
    active === "All"
      ? TRENDING_VIDEOS
      : TRENDING_VIDEOS.filter(
          (v) => v.category.toLowerCase() === active.toLowerCase(),
        );

  return (
    <section className="relative bg-linear-to-b from-sky-50/60 to-white py-20 lg:py-25">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-200 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <Reveal id="trend-hd" revealed={revealed} reg={reg}>
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100 px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <span
                  className="text-xs font-black tracking-widest text-sky-700 uppercase"
                >
                  Trending Now
                </span>
              </div>
              <h2
                className="mb-3 text-4xl font-black tracking-tight text-gray-900 lg:text-5xl"
              >
                What the world is
                <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  watching.
                </span>
              </h2>
              <p
                className="text-base font-light text-gray-500"
              >
                Updated every 60 seconds by VideoTube's neural ranking engine.
              </p>
            </div>
            {/* Black CTA */}
            <NavLink
              to={"/all-videos"}
              className="flex items-center cursor-pointer gap-2 self-start rounded-lg bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-all hover:scale-102 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 lg:self-auto"
            >
              Browse all Videos
              <svg
                className="h-4 w-4"
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
            </NavLink>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal id="trend-flt" revealed={revealed} reg={reg} delay="delay-75">
          <div className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 hover:scale-105 ${active === f ? "border-gray-900 bg-gray-900 text-white shadow-lg shadow-gray-900/20" : "border-sky-200 bg-white text-gray-500 hover:border-sky-400 hover:bg-sky-50 hover:text-gray-900"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        {!loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((v, i) => (
              <VideoCard
                key={v.id}
                v={v}
                idx={i}
                revealed={revealed}
                reg={reg}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
