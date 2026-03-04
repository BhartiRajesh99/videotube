import React from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="pt-16 flex min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-r-slate-300 bg-white/70 backdrop-blur-xl px-6 py-6">
        
        <nav className="space-y-4">
          {["Dashboard", "Content", "Playlists", "Analytics", "Revenue", "Settings"].map((item) => (
            <div
              key={item}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-sky-100 hover:text-sky-600 cursor-pointer transition"
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 px-8 py-8">
        
        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">
            Creator Dashboard
          </h1>

          <button className="px-6 py-2 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-800 cursor-pointer transition">
            + Upload Video
          </button>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: "Total Views", value: "1.2M", change: "+12%" },
            { title: "Subscribers", value: "84.3K", change: "+4.3%" },
            { title: "Watch Time", value: "18.4K hrs", change: "+9%" },
            { title: "Revenue", value: "$12,430", change: "+7%" },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40"
            >
              <p className="text-slate-500 text-sm">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-2">
                {card.value}
              </h3>
              <span className="text-green-500 text-sm">
                {card.change} this month
              </span>
            </motion.div>
          ))}
        </div>

        {/* CHART SECTION */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          
          {/* Watch Time Graph Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40"
          >
            <h3 className="font-semibold text-slate-800 mb-4">
              Watch Time Analytics
            </h3>

            <div className="h-64 bg-linear-to-r from-sky-200 via-sky-300 to-sky-200 rounded-xl animate-pulse" />
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-linear-to-br from-sky-500 to-indigo-500 text-white rounded-2xl p-6 shadow-xl"
          >
            <h3 className="font-semibold text-lg mb-4">
              🤖 AI Insights
            </h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li>• Your React videos are trending ↑</li>
              <li>• Upload between 6–8 PM for max reach</li>
              <li>• Shorts increase engagement by 24%</li>
            </ul>
          </motion.div>
        </div>

        {/* PLAYLIST PERFORMANCE */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40 mb-10">
          <h3 className="font-semibold text-slate-800 mb-6">
            Top Performing Playlists
          </h3>

          <div className="space-y-4">
            {["React Mastery", "System Design", "AI Tutorials"].map((pl) => (
              <div
                key={pl}
                className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-100 transition"
              >
                <div>
                  <p className="font-medium text-slate-700">{pl}</p>
                  <p className="text-sm text-slate-500">124K views</p>
                </div>
                <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-sky-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT VIDEOS TABLE */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40">
          <h3 className="font-semibold text-slate-800 mb-6">
            Recent Uploads
          </h3>

          <div className="space-y-4">
            {["React Hooks Explained", "Thundering Herd Problem", "System Design Basics"].map((vid) => (
              <div
                key={vid}
                className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-100 transition"
              >
                <div>
                  <p className="font-medium text-slate-700">{vid}</p>
                  <p className="text-sm text-slate-500">12K views • 2 days ago</p>
                </div>
                <button className="text-sky-500 hover:underline">
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}