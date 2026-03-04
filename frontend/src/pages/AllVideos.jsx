import { motion } from "framer-motion";
import { AiOutlinePlayCircle } from "react-icons/ai";

const videos = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: "Building Scalable AI Systems with React & Node",
  channel: "CodeWithRaj",
  views: "24K",
  time: "2 days ago",
  duration: "12:45",
  thumbnail: `https://picsum.photos/600/400?random=${i + 10}`,
  avatar: `https://i.pravatar.cc/100?img=${i + 5}`,
}));

export default function VideoGridPage() {
  return (
    <div className="mt-5 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      {/* ================= HEADER ================= */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Recommended For You
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          AI-curated videos tailored to your learning journey.
        </p>
      </div>

      {/* ================= VIDEO GRID ================= */}
      <div className="mx-auto grid max-w-7xl gap-1 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative cursor-pointer rounded-xl p-3 hover:bg-sky-400/10"
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden rounded-[10px] bg-white after:absolute after:inset-0 after:h-full after:w-full after:bg-black after:opacity-0 after:transition-all after:duration-300 after:content-[''] group-hover:after:opacity-60">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-48 w-full object-cover transition-all duration-500"
              />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white/50 bg-white/20 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30">
                  <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Duration Badge */}
              <span className="absolute right-3 bottom-3 rounded-md bg-black/80 px-2 py-1 text-xs text-white">
                {video.duration}
              </span>
            </div>

            {/* Video Info */}
            <div className="flex gap-4 px-1 py-2 ">
              <img
                src={video.avatar}
                alt={video.channel}
                className="h-10 w-10 rounded-full object-cover"
              />

              <div className="">
                <h3 className="text-sm leading-snug font-semibold text-slate-800 transition-colors ">
                  {video.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">{video.channel}</p>

                <p className="text-xs text-slate-400">
                  {video.views} views • {video.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
