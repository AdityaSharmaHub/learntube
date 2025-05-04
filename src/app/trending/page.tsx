import { videos } from "@/data/videos";
import VideoCard from "@/components/video/VideoCard";
import Link from "next/link";
import Image from "next/image";

export default function TrendingPage() {
  // Sort videos by views (in a real app this would be a proper numeric sort)
  const trendingVideos = [...videos].sort((a, b) => {
    const aNum = parseInt(a.views.replace(/[^\d]/g, ""));
    const bNum = parseInt(b.views.replace(/[^\d]/g, ""));
    return bNum - aNum;
  });

  // Get top trending video
  const topTrending = trendingVideos[0];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Trending Videos</h1>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium whitespace-nowrap">
              Now
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm whitespace-nowrap">
              Music
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm whitespace-nowrap">
              Gaming
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm whitespace-nowrap">
              Movies
            </button>
          </div>
        </div>

        {/* Top trending video */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-lg font-medium flex items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M17.55 11.2c-.23-.3-.5-.56-.76-.82-.65-.6-1.4-1.03-2.03-1.66C13.3 7.26 13 4.85 13.91 3c-.91.23-1.75.75-2.45 1.32-2.54 2.08-3.54 5.75-2.34 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.22.1-.46.04-.64-.12-.06-.05-.1-.1-.15-.17-1.1-1.43-1.28-3.48-.53-5.1C5.89 10 5 12.3 5.14 14.47c.04.5.1 1 .27 1.5.14.49.29.98.5 1.44.45 1 1.18 1.63 1.99 2.21.15.1.32.19.49.27.08.04.17.01.24-.06.1-.1.06-.27-.02-.33-.42-.5-.65-1.18-.83-1.83-.17-.64-.28-1.3-.25-2.04V21h3.65v-2.5c0-.06.04-.13.1-.15.27-.15.54-.3.76-.52.59-.5.91-1.29.82-2.07 1.19 1.11 2.85 1.86 4.43 1.86.19 0 .39-.01.58-.03 1.54-.14 3-.84 3.98-2 1.52-1.8 1.97-4.35 1.17-6.6-.8-2.25-2.95-3.86-5.33-4.03-.34-.01-.68.01-1 .06-.42.06-.83.16-1.24.3-.45.14-.85.33-1.22.58" />
              </svg>
              <span>Trending #1</span>
            </div>
            <Link href={`/video/${topTrending.id}`} className="block">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 shadow-md relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <Image
                  src={topTrending.thumbnailUrl}
                  alt={topTrending.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <h2 className="text-xl font-bold mb-2">{topTrending.title}</h2>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
                      <Image
                        src={topTrending.channelImageUrl}
                        alt={topTrending.channelName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-2">
                      <p className="text-sm">{topTrending.channelName}</p>
                      <p className="text-xs opacity-80">
                        {topTrending.views} views • {topTrending.uploadTime}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded z-10">
                  {topTrending.duration}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Trending videos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {trendingVideos.slice(1).map((video, index) => (
            <div key={video.id} className="relative">
              {index < 3 && (
                <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                  #{index + 2}
                </div>
              )}
              <VideoCard
                id={video.id}
                title={video.title}
                channelName={video.channelName}
                channelImageUrl={video.channelImageUrl}
                thumbnailUrl={video.thumbnailUrl}
                views={video.views}
                uploadTime={video.uploadTime}
                duration={video.duration}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

