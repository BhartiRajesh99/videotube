import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Channel() {
  const [subscribed, setSubscribed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [subCount] = useState(248000);
  const [visibleCount, setVisibleCount] = useState(0);

  // Animated Subscriber Counter
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = subCount / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= subCount) {
        start = subCount;
        clearInterval(counter);
      }
      setVisibleCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [subCount]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-800">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-slate-200">

        {/* Soft Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-6 pt-24 pb-16"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-10 items-start lg:items-center">

            {/* Channel Info */}
            <div className="flex gap-8 items-start">

              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl" />
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="creator"
                  className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">
                    CodeWithRaj
                  </h1>
                  <span className="text-sky-500 text-sm font-medium">
                    ✔ Verified
                  </span>
                </div>

                <p className="mt-2 text-slate-500 text-sm">
                  {visibleCount.toLocaleString()} subscribers • 120 videos
                </p>

                <p className="mt-4 max-w-xl text-slate-600 leading-relaxed">
                  AI-native tutorials on modern React architecture,
                  scalable backend systems, and placement-focused engineering.
                </p>

                {/* Tags */}
                <div className="flex gap-3 mt-5 flex-wrap">
                  {["AI", "React", "Backend", "System Design"].map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-1 text-xs rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Subscribe Section */}
            <div className="relative mt-6 lg:mt-0">

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubscribed(!subscribed)}
                className={`px-8 py-3 rounded-full font-medium transition shadow-md ${
                  subscribed
                    ? "bg-slate-200 text-slate-800"
                    : "bg-sky-500 hover:bg-sky-600 text-white"
                }`}
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </motion.button>

              {/* Bell Icon */}
              <AnimatePresence>
                {subscribed && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="absolute -right-14 top-0 h-12 w-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:bg-slate-50"
                  >
                    🔔
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 mt-4 w-44 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
                  >
                    {["All", "Personalized", "None"].map(option => (
                      <div
                        key={option}
                        className="px-4 py-3 text-sm hover:bg-slate-100 cursor-pointer"
                      >
                        {option}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </motion.div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-2xl font-semibold mb-10">
          Featured Content
        </h2>

        <div className="grid lg:grid-cols-2 gap-10">

          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="featured"
              className="w-full h-72 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold">
                AI Native Architecture Masterclass
              </h3>
              <p className="text-slate-500 mt-2 text-sm">
                Learn how to design scalable AI-powered systems.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {[
              "AI-Curated Playlists",
              "Career-Focused Learning",
              "Advanced Content Drops",
            ].map(title => (
              <motion.div
                key={title}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <h4 className="font-semibold">{title}</h4>
                <p className="text-slate-500 text-sm mt-2">
                  Premium structured learning for serious developers.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}