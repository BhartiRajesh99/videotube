import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../api/axios";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import FileInput from "../components/FileInput";
import Button from "../components/Button";
import { AiFillCamera } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recentVideos, setRecentVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [openVideoId, setOpenVideoId] = useState(null);

  const fetchUploadedVideos = async () => {
    try {
      const response = await api.get(
        `/video/get-all-videos?page=${1}&limit=${10}&sortBy=title&sortType=dsc&userId=${user._id}`,
      );
      console.log(response.data.data);
      setRecentVideos(response.data.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("video", video);
      formData.append("thumbnail", thumbnail);

      const response = await api.post("/video/publish-video", formData);

      console.log("Video Response: ", response.data.data);
      toast.success(response.data.message);
      setShowUploadForm(false);
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayRecentVideos = (videoUrl) => {
    navigate("/watch-video", { state: { videoUrl: videoUrl } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/video/delete-video/${id}`);
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    fetchUploadedVideos();
    setOpenVideoId(false);
  }, []);

  useEffect(() => {
    if (showUploadForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showUploadForm]);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 pt-16">
      {/* Upload Form */}
      {showUploadForm && (
        <div
          onClick={() => setShowUploadForm(false)}
          className="fixed inset-0 z-998 flex items-center justify-center bg-black/40 backdrop-blur"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-105 rounded-xl border border-sky-300 bg-white p-8 shadow-lg shadow-sky-300/20"
          >
            <h1 className="mb-5 text-4xl font-bold">Upload Video</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                name="title"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
              />

              <label>
                <span className="text-sm font-medium text-neutral-800">
                  Description
                </span>

                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your video description"
                  className="w-full border-b border-slate-200 px-1 py-2 text-sm tracking-tight placeholder:text-xs placeholder:text-gray-500 focus:outline-none"
                />
              </label>

              <FileInput
                name="video"
                onChange={setVideo}
                placeholder="Upload Video"
              />
              <FileInput
                name="thumbnail"
                onChange={setThumbnail}
                placeholder="Upload Thumbnail"
              />

              <Button type={"submit"}>
                {loading ? <Loading /> : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="hidden w-50 flex-col border-r border-r-sky-300/50 bg-white/70 px-6 py-6 backdrop-blur-xl lg:flex">
        <nav className="space-y-4">
          {[
            "Dashboard",
            "Content",
            "Playlists",
            "Analytics",
            "Revenue",
            "Settings",
          ].map((item) => (
            <div
              key={item}
              className="cursor-pointer rounded-xl px-4 py-2 text-slate-600 transition hover:bg-sky-100 hover:text-sky-600"
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1">
        {/* cover image */}
        <div className="h-50">
          {user ? (
            <img
              src={user.coverImage}
              alt="cover-image"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200">
              <AiFillCamera className="h-20 w-20 rounded-full bg-slate-300 p-4 text-white" />
            </div>
          )}
        </div>

        <div className="px-8 py-6">
          {/* TOP NAV */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-start gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl" />
                <img
                  src={user.avatar}
                  alt="creator"
                  className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{user.fullname}</h1>
                  <span className="text-sm font-medium text-sky-500">
                    ✔ Verified
                  </span>
                </div>

                {/* <p className="mt-2 text-slate-500 text-sm">
                  {visibleCount.toLocaleString()} subscribers • 120 videos
                </p> */}

                <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                  AI-native tutorials on modern React architecture, scalable
                  backend systems, and placement-focused engineering.
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {["AI", "React", "Backend", "System Design"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-100 px-4 py-1 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowUploadForm(true)}
              className="cursor-pointer rounded-lg bg-gray-900 px-6 py-2 text-white shadow-md transition hover:bg-gray-800"
            >
              + Upload Video
            </button>
          </div>

          {/* ANALYTICS CARDS */}
          <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl"
              >
                <p className="text-sm text-slate-500">{card.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                  {card.value}
                </h3>
                <span className="text-sm text-green-500">
                  {card.change} this month
                </span>
              </motion.div>
            ))}
          </div>

          {/* CHART SECTION */}
          <div className="mb-10 grid gap-8 lg:grid-cols-3">
            {/* Watch Time Graph Placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl lg:col-span-2"
            >
              <h3 className="mb-4 font-semibold text-slate-800">
                Watch Time Analytics
              </h3>

              <div className="h-64 animate-pulse rounded-xl bg-linear-to-r from-sky-200 via-sky-300 to-sky-200" />
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl bg-linear-to-br from-sky-500 to-indigo-500 p-6 text-white shadow-xl"
            >
              <h3 className="mb-4 text-lg font-semibold">🤖 AI Insights</h3>
              <ul className="space-y-3 text-sm opacity-90">
                <li>• Your React videos are trending ↑</li>
                <li>• Upload between 6–8 PM for max reach</li>
                <li>• Shorts increase engagement by 24%</li>
              </ul>
            </motion.div>
          </div>

          {/* PLAYLIST PERFORMANCE */}
          <div className="mb-10 rounded-2xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl">
            <h3 className="mb-6 font-semibold text-slate-800">
              Top Performing Playlists
            </h3>

            <div className="space-y-4">
              {["React Mastery", "System Design", "AI Tutorials"].map((pl) => (
                <div
                  key={pl}
                  className="flex items-center justify-between rounded-xl p-4 transition hover:bg-slate-100"
                >
                  <div>
                    <p className="font-medium text-slate-700">{pl}</p>
                    <p className="text-sm text-slate-500">124K views</p>
                  </div>
                  <div className="h-1 w-32 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-1 w-3/4 rounded-full bg-sky-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT VIDEOS TABLE */}
          <div className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl">
            <h3 className="mb-6 font-semibold text-slate-800">
              Recent Uploads
            </h3>

            <div className="space-y-4">
              {!recentVideos.length ? (
                <div className="w-full text-center text-slate-500">
                  No Videos
                </div>
              ) : (
                recentVideos.map((vid, i) => (
                  <div
                    key={i}
                    onClick={() => handlePlayRecentVideos(vid.videoFile[0])}
                    className="relative flex cursor-pointer items-center justify-center gap-4 rounded-xl transition-all duration-200"
                  >
                    {/* Left Section */}
                    <div className="group flex w-full items-center justify-between gap-4 p-4 hover:bg-slate-100 rounded-lg">
                      <div className="flex items-center justify-center gap-4">
                        {/* Thumbnail */}
                        <div className="h-16 w-28 overflow-hidden rounded-lg">
                          <img
                            src={vid.thumbnail[0]}
                            alt="thumbnail"
                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>

                        {/* Video Info */}
                        <div className="flex flex-col">
                          <p className="line-clamp-1 font-medium text-slate-800">
                            {vid?.description}
                          </p>

                          <p className="text-sm text-slate-500">
                            12K views • 2 days ago
                          </p>
                        </div>
                      </div>
                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenVideoId((prev) =>
                            prev === vid._id ? null : vid._id,
                          );
                        }}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-200"
                      >
                        <div className="flex flex-col gap-0.75">
                          <span className="h-1 w-1 rounded-full bg-gray-400 group-hover:bg-slate-700"></span>
                          <span className="h-1 w-1 rounded-full bg-gray-400 group-hover:bg-slate-700"></span>
                          <span className="h-1 w-1 rounded-full bg-gray-400 group-hover:bg-slate-700"></span>
                        </div>
                      </button>
                    </div>

                    {/* Dropdown */}
                    {openVideoId === vid._id && (
                      <div className="absolute -top-6 right-4 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow backdrop-blur-md">
                        {["delete"].map((item, i) => (
                          <div
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(vid._id);
                            }}
                            className="px-8 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
