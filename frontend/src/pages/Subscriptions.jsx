import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Subscriptions() {
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: "CodeWithRaj",
      subscribers: "248K",
      category: "AI & System Design",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "React Mastery",
      subscribers: "180K",
      category: "Frontend Architecture",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      id: 3,
      name: "Backend Simplified",
      subscribers: "95K",
      category: "Node & Scaling",
      avatar: "https://i.pravatar.cc/150?img=45",
    },
  ]);

  const handleUnsubscribe = (id) => {
    setChannels((prev) => prev.filter((ch) => ch.id !== id));
  };

  return (
    <div className="mt-10 min-h-screen px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_60%)]" />

      {/* ================= HEADER ================= */}
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-800">
          Your Subscribed Channels
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Stay updated with your favorite creators and AI-curated content.
          Manage your subscriptions seamlessly.
        </p>
      </div>

      {/* ================= CHANNEL GRID ================= */}
      <div className="mx-auto mt-14 grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition"
          >
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl" />
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="relative h-20 w-20 rounded-full border-2 border-white object-cover shadow-md"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {channel.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {channel.subscribers} subscribers
                </p>
                <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  {channel.category}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <NavLink to={"/channel"} className="text-sm font-medium text-sky-600 transition hover:text-sky-700">
                View Channel
              </NavLink>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUnsubscribe(channel.id)}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Subscribed ✓
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= EMPTY STATE ================= */}
      {channels.length === 0 && (
        <div className="mt-20 text-center">
          <h3 className="text-xl font-semibold text-slate-700">
            You're not subscribed to any channels yet.
          </h3>
          <p className="mt-3 text-slate-500">
            Discover creators and start building your AI-powered learning
            journey.
          </p>
        </div>
      )}
    </div>
  );
}
