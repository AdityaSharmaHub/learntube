import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface VideoCardProps {
  id: string;
  title: string;
  channelName: string;
  views: string;
  uploadTime: string;
  thumbnailUrl: string;
  channelImageUrl: string;
  duration: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  channelName,
  views,
  uploadTime,
  thumbnailUrl,
  channelImageUrl,
  duration,
}) => {
  return (
    <div className="flex flex-col">
      <div className="group">
        <Link href={`/video/${id}`} className="block">
          <div className="relative">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 shadow">
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 rounded-xl transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority
              />
              {/* Play button overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
              {duration}
            </div>
          </div>
        </Link>
        <div className="flex mt-3">
          <div className="w-9 h-9 flex-shrink-0">
            <Link href={`/channel/${id.charAt(0)}`} className="block">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={channelImageUrl}
                  alt={channelName}
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
          <div className="ml-3 flex-1">
            <Link href={`/video/${id}`} className="block">
              <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600">
                {title}
              </h3>
            </Link>
            <Link href={`/channel/${id.charAt(0)}`} className="block hover:text-blue-600">
              <p className="text-xs text-gray-500 mt-1">
                {channelName}
              </p>
            </Link>
            <p className="text-xs text-gray-500">
              {views} • {uploadTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard; 