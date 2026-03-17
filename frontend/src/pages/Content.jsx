import VideoCard from "../components/VideoCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useAuth } from "../context/AuthContext";
import { useFetchVideos } from "../hooks/useFetchVideo";

function Content() {
  const { user } = useAuth();
  const { revealed, reg } = useScrollReveal();
  const { videos } = useFetchVideos({
    page: 1,
    limit: 10,
    sortBy: "title",
    sortType: "dsc",
    userId: user._id,
  });

  console.log(videos)

  return (
    <div className="flex min-h-screen items-center justify-center">
      {videos.length ? (
        videos.map((video, index) => {
          <VideoCard v={video} idx={index} revealed={revealed} reg={reg} />;
        })
      ) : (
        <div>No Videos</div>
      )}
    </div>
  );
}

export default Content;
