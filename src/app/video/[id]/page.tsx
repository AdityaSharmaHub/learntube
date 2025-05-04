'use client'

import { useState, useRef, useEffect, use } from 'react';
import { videos } from "@/data/videos";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLayout } from "@/context/LayoutContext";
import LearningModeToggle from "@/components/learning/LearningModeToggle";
import ChapterMarkers from "@/components/learning/ChapterMarkers";
import QuizPanel from "@/components/learning/QuizPanel";
import NotesPanel from "@/components/learning/NotesPanel";

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const video = videos.find((v) => v.id === id);
  const { isLearningMode } = useLayout();
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Check if video exists
  if (!video) {
    notFound();
  }

  // Set up message listener for YouTube iframe API
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only process messages from the YouTube iframe
      if (event.source === videoRef.current?.contentWindow) {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onStateChange' && data.info === 1) {
            // Video is playing
            setCurrentTime(data.currentTime || 0);
          }
        } catch (e) {
          // Not a JSON message, ignore
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Function to seek to a specific time in the video
  const seekToTime = (seconds: number) => {
    if (videoRef.current) {
      // Using postMessage to control the YouTube iframe
      videoRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [seconds, true]
        }),
        '*'
      );
    }
  };

  // Sample comments data
  const comments = [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: "/avatars/channel3.svg",
      text: "This was incredibly helpful! I've been struggling with this concept for weeks, and you explained it so clearly.",
      likes: 243,
      time: "2 weeks ago",
    },
    {
      id: 2,
      user: "Sarah Parker",
      avatar: "/avatars/channel5.svg",
      text: "Great tutorial! Could you make a follow-up video on advanced techniques?",
      likes: 128,
      time: "1 week ago",
    },
    {
      id: 3,
      user: "Michael Chen",
      avatar: "/avatars/channel1.svg",
      text: "I implemented this in my project and it worked perfectly. Thanks for the clear explanations.",
      likes: 87,
      time: "5 days ago",
    },
  ];

  // Get related videos (excluding current video)
  const relatedVideos = videos
    .filter((v) => v.id !== video.id)
    .slice(0, 5);

  // Always render as flex with row layout, but change content positioning based on mode
  return (
    <div className="max-w-[1600px] mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className={`${isLearningMode ? 'lg:w-2/3' : 'lg:w-[calc(100%-350px)]'} transition-all duration-500`}>
          {/* Video Player */}
          <div className="relative">
            <div className="relative w-full bg-black aspect-video rounded-xl overflow-hidden">
              <iframe
                ref={videoRef}
                src={`https://www.youtube.com/embed/${video.videoUrl.split("v=")[1]}?enablejsapi=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            
            {/* Learning Mode Toggle Button */}
            <div className="absolute top-4 right-4 z-10">
              <LearningModeToggle />
            </div>
          </div>

          {/* Video Info */}
          <div className="mt-4">
            <h1 className="text-xl font-bold">{video.title}</h1>
            <div className="flex flex-wrap items-center justify-between mt-4 pt-2 border-t border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image
                    src={video.channelImageUrl}
                    alt={video.channelName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-sm">{video.channelName}</h3>
                  <p className="text-xs text-gray-500">320K subscribers</p>
                </div>
                <button className="ml-4 bg-black text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer">
                  Subscribe
                </button>
              </div>

              <div className="flex items-center mt-3 sm:mt-0 space-x-2 flex-wrap gap-2">
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                  <button className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                    </svg>
                    <span>{video.likes}</span>
                  </button>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <button className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
                    <svg
                      className="w-5 h-5 mr-2 transform rotate-180"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                    </svg>
                    <span>Dislike</span>
                  </button>
                </div>

                <button className="flex items-center bg-gray-100 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-200">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6c-3.89.39-5.4 1.83-6.89 3.56-2.39 2.75-5.78 6.44-5.11 11.46L4 21h1.31c1.63-3.18 4.81-3.95 8.69-3.95h1v6L23 12 14 3z" />
                  </svg>
                  <span>Share</span>
                </button>

                <button className="flex items-center bg-gray-100 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-200">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" />
                  </svg>
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="mt-4 bg-gray-100 rounded-xl p-3">
            <div className="flex items-baseline text-sm text-gray-600 mb-1">
              <span className="font-medium mr-2">{video.views} views</span>
              <span>{video.uploadTime}</span>
            </div>
            <p className="text-sm mt-2">{video.description}</p>
          </div>

          {!isLearningMode && (
            <>
              {/* Comments Section (only show in normal mode) */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-center mb-4">
                  <h3 className="font-bold text-lg mr-2">Comments</h3>
                  <span className="text-gray-500 text-sm">{comments.length}</span>
                </div>

                {/* Add Comment */}
                <div className="flex gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-700 flex-shrink-0 flex items-center justify-center text-white font-medium">
                    A
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={comment.avatar}
                          alt={comment.user}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-baseline">
                          <span className="font-medium text-sm mr-2">
                            {comment.user}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.text}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <svg
                              className="w-4 h-4 mr-1"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                            </svg>
                            <span className="text-xs">{comment.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <svg
                              className="w-4 h-4 mr-1 transform rotate-180"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                            </svg>
                          </button>
                          <button className="text-xs text-gray-500 hover:text-gray-700 ml-2">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Learning mode panels or Related videos sidebar */}
        <div className={`lg:w-[500px] space-y-4 ${isLearningMode && 'animate-fadeIn'}`}>
          {isLearningMode ? (
            <>
              <ChapterMarkers 
                videoId={id} 
                currentTime={currentTime} 
                onChapterClick={seekToTime} 
              />
              <QuizPanel 
                videoId={id} 
                currentTime={currentTime} 
              />
              <NotesPanel 
                videoId={id} 
                currentTime={currentTime} 
              />
            </>
          ) : (
            <>
              <h3 className="font-medium text-lg">Related videos</h3>
              {relatedVideos.map((relatedVideo) => (
                <Link
                  key={relatedVideo.id}
                  href={`/video/${relatedVideo.id}`}
                  className="flex gap-2 group"
                >
                  <div className="w-[168px] h-[94px] bg-gray-200 relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={relatedVideo.thumbnailUrl}
                      alt={relatedVideo.title}
                      fill
                      className="object-cover"
                      sizes="168px"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                      {relatedVideo.duration}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600">
                      {relatedVideo.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {relatedVideo.channelName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {relatedVideo.views} • {relatedVideo.uploadTime}
                    </p>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 