import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {} from "react-icons/ai"

export default function CustomVideoPlayer({url}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [theater, setTheater] = useState(false);

  const barRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Play / Pause
  const togglePlay = () => {
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  // Progress update
  const updateProgress = () => {
    const current = videoRef.current.currentTime;
    setProgress((current / duration) * 100);

    if (videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(0);
      setBuffered((bufferedEnd / duration) * 100);
    }
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Picture-in-Picture
  const togglePiP = async () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      await videoRef.current.requestPictureInPicture();
    }
  };

  const seek = (clientX) => {
    const rect = barRef.current.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;

    // clamp between 0 and 1
    percent = Math.max(0, Math.min(1, percent));

    videoRef.current.currentTime = percent * duration;
    setProgress(percent * 100);
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    seek(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      seek(e.clientX);
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  // Auto hide
  useEffect(() => {
    let timeout;
    if (playing) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [playing, progress]);

  return (
    <div
      ref={containerRef}
      className={`relative ${
        theater ? "w-full" : "mx-auto max-w-6xl"
      } overflow-hidden rounded-[14px] bg-black shadow-2xl`}
      onMouseMove={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={url || "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
        className="aspect-video w-full"
        onTimeUpdate={updateProgress}
        
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
      />

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 to-transparent p-4"
          >
            {/* Progress */}
            <div
              ref={barRef}
              onMouseDown={handleMouseDown}
              className="group relative h-1 cursor-pointer rounded bg-white/20"
            >
              {/* Buffered */}
              <div
                style={{ width: `${buffered}%` }}
                className="absolute h-1 rounded bg-white/30"
              />

              {/* Progress */}
              <div
                style={{ width: `${progress}%` }}
                className="absolute h-1 rounded bg-sky-500"
              />

            </div>

            {/* Bottom Controls */}
            <div className="mt-4 flex items-center justify-between text-white">
              {/* Left */}
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className={`h-7 w-7 ${!playing && 'pl-0.75'} flex cursor-pointer items-center justify-center border border-transparent focus:outline-none focus:ring-1 focus:ring-off-white focus:rounded-full`}>{playing ? "⏸" : "▶"}</button>

                <span className="text-sm">
                  {formatTime(videoRef.current?.currentTime || 0)} /{" "}
                  {formatTime(duration)}
                </span>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    setVolume(e.target.value);
                    videoRef.current.volume = e.target.value;
                  }}
                  className="h-1 w-24 focus:outline-none cursor-pointer appearance-none rounded-full"
                  style={{
                    height: "2px",
                    background: `linear-gradient(to right, #0ea5e9 ${volume * 100}%, #908d8da4 ${
                      volume * 100
                    }%)`,
                  }}
                />
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                {/* Speed */}
                <div className="relative">
                  <button className="focus:outline-none cursor-pointer focus:ring-1 p-1 focus:ring-off-white rounded" onClick={() => setSpeedOpen(!speedOpen)}>
                    {playbackRate}x
                  </button>

                  <AnimatePresence>
                    {speedOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 bottom-8 rounded-lg bg-black/80 p-2 text-sm"
                      >
                        {[0.5, 1, 1.5, 2].map((rate) => (
                          <div
                            key={rate}
                            onClick={() => {
                              setPlaybackRate(rate);
                              videoRef.current.playbackRate = rate;
                              setSpeedOpen(false);
                            }}
                            className="cursor-pointer rounded px-3 py-1 hover:bg-white/20"
                          >
                            {rate}x
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button onClick={() => setTheater(!theater)} className="focus:outline-none cursor-pointer focus:ring-1 p-1 focus:ring-off-white rounded">🎬</button>

                <button onClick={togglePiP} className="focus:outline-none cursor-pointer focus:ring-1 p-1 focus:ring-off-white rounded">📺</button>

                <button onClick={toggleFullscreen} className="focus:outline-none cursor-pointer focus:ring-1 p-1 focus:ring-off-white rounded">⛶</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
