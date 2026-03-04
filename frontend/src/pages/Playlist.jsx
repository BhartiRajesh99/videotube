import React from "react";
import { motion } from "framer-motion";

const playlists = [
  {
    id: 1,
    title: "React Mastery",
    videos: 42,
    duration: "5h 24m",
    updated: "2 days ago",
    visibility: "Public",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: 2,
    title: "System Design Interview",
    videos: 18,
    duration: "3h 12m",
    updated: "1 week ago",
    visibility: "Private",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

function PlaylistSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white/60 shadow-lg backdrop-blur-lg">
      <div className="h-44 bg-slate-200" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-200" />
        <div className="h-3 w-1/3 rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default function Playlist() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 px-6 pt-23 pb-20">
      {/* HEADER */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Your Playlists
          </h1>
          <p className="mt-1 text-slate-500">
            {playlists.length} saved playlists
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex w-full gap-4 md:w-auto">
          <input
            type="text"
            placeholder="Search playlists..."
            className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2 backdrop-blur focus:ring-2 focus:ring-sky-400 focus:outline-none md:w-72"
          />

          <select className="rounded-xl border border-slate-200 bg-white/70 px-4 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none">
            <option>Recently Updated</option>
            <option>Most Videos</option>
            <option>A–Z</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 shadow-lg backdrop-blur-lg transition-all duration-300 hover:shadow-2xl"
          >
            {/* Thumbnail */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                <button className="rounded-full bg-white px-5 py-2 font-medium text-slate-800 shadow-md transition hover:bg-sky-500 hover:text-white">
                  ▶ Play
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2 p-5">
              <h3 className="text-lg font-semibold text-slate-800 transition group-hover:text-sky-600">
                {playlist.title}
              </h3>

              <div className="flex justify-between text-sm text-slate-500">
                <span>{playlist.videos} videos</span>
                <span>{playlist.duration}</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Updated {playlist.updated}
                </span>

                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    playlist.visibility === "Public"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {playlist.visibility}
                </span>
              </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute top-3 right-3 opacity-0 transition group-hover:opacity-100">
              <button className="rounded-full bg-white/80 p-2 shadow backdrop-blur hover:bg-slate-100">
                ⋮
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State Example */}
      {playlists.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6 h-24 w-24 rounded-full bg-slate-200" />
          <h2 className="text-xl font-semibold text-slate-700">
            No Playlists Yet
          </h2>
          <p className="mt-2 text-slate-500">
            Start saving videos to create your first playlist.
          </p>
        </div>
      )}
    </div>
  );
}
