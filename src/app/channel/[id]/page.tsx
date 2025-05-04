import { videos } from "@/data/videos";
import VideoCard from "@/components/video/VideoCard";
import Image from "next/image";

export default async function ChannelPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  // Get channel info - in a real app this would come from an API or data file
  const channels = [
    { id: "1", name: "Code With Mosh", image: "/avatars/channel1.jpg", subscribers: "1.2M" },
    { id: "2", name: "The Net Ninja", image: "/avatars/channel2.jpg", subscribers: "850K" },
    { id: "3", name: "Traversy Media", image: "/avatars/channel3.jpg", subscribers: "1.8M" },
    { id: "4", name: "freeCodeCamp", image: "/avatars/channel4.jpg", subscribers: "7.2M" },
    { id: "5", name: "Academind", image: "/avatars/channel5.jpg", subscribers: "970K" },
  ];

  const channel = channels.find((c) => c.id === id);

  if (!channel) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Channel not found</p>
      </div>
    );
  }

  // Filter videos for this channel
  const channelVideos = videos.filter(
    (video) => video.channelName === channel.name
  );

  return (
    <div className="max-w-[1600px] mx-auto p-6">
      {/* Channel header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden relative flex-shrink-0">
          <Image
            src={channel.image}
            alt={channel.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">{channel.name}</h1>
          <p className="text-gray-500 mt-1">{channel.subscribers} subscribers</p>
          <p className="text-gray-500 mt-1">{channelVideos.length} videos</p>
          <button className="mt-4 bg-black cursor-pointer text-white px-6 py-2 rounded-full text-sm font-medium">
            Subscribe
          </button>
        </div>
      </div>

      {/* Channel navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-6">
          <button className="px-3 py-4 border-b-2 border-black font-medium">
            Videos
          </button>
          <button className="px-3 py-4 text-gray-600 hover:text-black">
            Playlists
          </button>
          <button className="px-3 py-4 text-gray-600 hover:text-black">
            Community
          </button>
          <button className="px-3 py-4 text-gray-600 hover:text-black">
            About
          </button>
        </nav>
      </div>

      {/* Videos grid */}
      {channelVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {channelVideos.map((video) => (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">This channel has no videos.</p>
        </div>
      )}
    </div>
  );
}
