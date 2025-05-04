import { videos } from "@/data/videos";
import VideoCard from "@/components/video/VideoCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            channelName={video.channelName}
            channelImageUrl={video.channelImageUrl}
            thumbnailUrl={video.thumbnailUrl}
            views={video.views}
            uploadTime={video.uploadTime}
            duration={video.duration}
          />
        ))}
      </div>
    </main>
  );
}
