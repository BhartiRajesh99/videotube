import { useState } from "react";
import { motion } from "framer-motion";
import CustomVideoPlayer from "../components/VideoPlayer"

export default function VideoWatchPage() {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const recommended = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: "Advanced React Patterns Explained",
    views: "18K",
    time: "3 days ago",
    thumbnail: `https://picsum.photos/400/250?random=${i + 20}`,
  }));

  return (
    <div className="mt-12 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 xl:grid-cols-3 gap-10">

        {/* ================= MAIN VIDEO SECTION ================= */}
        <div className="xl:col-span-2 space-y-6">

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-transparent"
          >
            <CustomVideoPlayer />
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-800">
            Building AI-Native Scalable Applications
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">

            <div>
              24K views • 2 days ago
            </div>

            <div className="flex gap-4">

              <button
                onClick={() => setLiked(!liked)}
                className={`px-4 py-2 rounded-full border transition ${
                  liked
                    ? "bg-sky-100 border-sky-300 text-sky-600"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                👍 Like
              </button>

              <button className="px-4 py-2 rounded-full border bg-white border-slate-200 hover:bg-slate-50">
                🔗 Share
              </button>

              <button className="px-4 py-2 rounded-full border bg-white border-slate-200 hover:bg-slate-50">
                💾 Save
              </button>

            </div>
          </div>

          {/* Channel Info */}
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">

            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="channel"
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold text-slate-800">
                  CodeWithRaj
                </h3>
                <p className="text-sm text-slate-500">
                  248K subscribers
                </p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubscribed(!subscribed)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                subscribed
                  ? "bg-slate-200 text-slate-700"
                  : "bg-sky-500 text-white hover:bg-sky-600"
              }`}
            >
              {subscribed ? "Subscribed ✓" : "Subscribe"}
            </motion.button>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-700 text-sm leading-relaxed">
              {expanded
                ? `In this video, we dive deep into designing scalable AI-native systems
                   using React, Node.js, and cloud infrastructure. You'll learn real
                   production architecture patterns used in product-based companies,
                   focusing on performance, reliability, and AI integrations.`
                : `In this video, we dive deep into designing scalable AI-native systems
                   using React and Node.js...`}
            </p>

            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-sky-600 text-sm font-medium"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>

        </div>

        {/* ================= RECOMMENDED SIDEBAR ================= */}
        <div className="space-y-6">

          <h3 className="text-lg font-semibold text-slate-800">
            Recommended
          </h3>

          {recommended.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.02 }}
              className="flex gap-4 cursor-pointer"
            >
              <div className="w-36 rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-24 object-cover"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  {video.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {video.views} views • {video.time}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}