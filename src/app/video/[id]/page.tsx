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
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  
  // Force a component refresh when the ID changes
  const [forceRefresh, setForceRefresh] = useState(0);
  
  // Extract video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const youtubeId = video ? getYouTubeId(video.videoUrl) : null;

  // Check if video exists
  if (!video) {
    notFound();
  }
  
  // Client-side only code
  useEffect(() => {
    setIsClient(true);
    // Load YouTube API
    if (typeof window !== 'undefined' && !window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API ready');
        setApiLoaded(true);
      };
    } else if (typeof window !== 'undefined' && window.YT) {
      setApiLoaded(true);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.onYouTubeIframeAPIReady = undefined;
      }
    };
  }, []);
  
  // Force refresh when video ID changes
  useEffect(() => {
    if (!isClient) return;
    
    // This will force the iframe to reload
    setForceRefresh(prev => prev + 1);
    
    // Reset states
    setCurrentTime(0);
    setIsPlaying(false);
    
    // Cleanup previous player if it exists
    if (playerRef.current) {
      try {
        if (typeof playerRef.current.destroy === 'function') {
          playerRef.current.destroy();
        }
      } catch (error) {
        console.error("Error destroying player:", error);
      }
      playerRef.current = null;
    }
  }, [id, isClient]);
  
  // Initialize player when API is loaded and video ID changes
  useEffect(() => {
    if (!isClient || !apiLoaded || !youtubeId) return;
    
    console.log("API is loaded, initializing player");
    
    const initTimer = setTimeout(() => {
      initializeYouTubePlayer();
    }, 500);
    
    return () => {
      clearTimeout(initTimer);
    };
  }, [apiLoaded, youtubeId, forceRefresh, isClient]);
  
  // Function to initialize YouTube player
  const initializeYouTubePlayer = () => {
    if (!isClient || !youtubeId || !window.YT || !window.YT.Player) {
      console.error("YouTube API not ready or video ID missing");
      return;
    }
    
    try {
      console.log("Initializing player for video:", youtubeId);
      
      // If player already exists, destroy it first
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
      }
      
      const videoElement = document.getElementById('youtube-player');
      if (!videoElement) {
        console.error("YouTube player element not found");
        return;
      }
      
      // Define PlayerState constants to make the code more readable
      const PlayerState = {
        PLAYING: 1,
        PAUSED: 2,
        ENDED: 0
      };
      
      // Create new player instance
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: youtubeId,
        events: {
          onReady: (event: any) => {
            console.log('Player ready for video:', youtubeId);
            playerRef.current = event.target;
            console.log("Player methods:", playerRef.current);
            if (typeof playerRef.current.getCurrentTime === 'function') {
              setCurrentTime(playerRef.current.getCurrentTime());
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: PLAYING (1), PAUSED (2), etc.
            if (event.data === PlayerState.PLAYING) { // Playing
              setIsPlaying(true);
              if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                setCurrentTime(playerRef.current.getCurrentTime());
              }
            } else if (event.data === PlayerState.PAUSED || event.data === PlayerState.ENDED) { // Paused or Ended
              setIsPlaying(false);
            }
          },
          onError: (event: any) => {
            console.error('YouTube player error:', event.data);
          }
        },
        playerVars: {
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin
        }
      });
    } catch (error) {
      console.error('Error initializing YouTube player:', error);
    }
  };
  
  // Set up time tracking interval when video is playing
  useEffect(() => {
    if (!isClient || !playerRef.current) return;
    
    let timeTracker: NodeJS.Timeout | null = null;
    
    if (isPlaying && playerRef.current) {
      timeTracker = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          try {
            const time = playerRef.current.getCurrentTime();
            setCurrentTime(time);
          } catch (error) {
            console.error("Error getting current time:", error);
          }
        }
      }, 500);
    }
    
    return () => {
      if (timeTracker) clearInterval(timeTracker);
    };
  }, [isPlaying, isClient, playerRef.current]);

  // Add event listener for seeking from Notes panel
  useEffect(() => {
    if (!isClient) return;
    
    const handleSeekEvent = (event: CustomEvent) => {
      const { time } = event.detail;
      if (typeof time === 'number') {
        console.log(`NotesPanel requesting seek to ${time} seconds`);
        seekToTime(time);
      }
    };
    
    window.addEventListener('learntube:seek', handleSeekEvent as EventListener);
    
    return () => {
      window.removeEventListener('learntube:seek', handleSeekEvent as EventListener);
    };
  }, [isClient]);

  // Function to seek to a specific time in the video
  const seekToTime = (seconds: number) => {
    console.log(`Attempting to seek to ${seconds} seconds`, playerRef.current);
    
    if (!playerRef.current) {
      console.error("Player not initialized yet, cannot seek");
      return;
    }
    
    try {
      // Use a timeout to ensure the command gets processed after any pending operations
      setTimeout(() => {
        if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
          console.log(`Actually seeking to ${seconds} seconds`);
          playerRef.current.seekTo(seconds, true);
          setCurrentTime(seconds);
        } else {
          console.error("seekTo method not available on player", playerRef.current);
          
          // Attempt to reinitialize player if seekTo is not available
          if (window.YT && window.YT.Player) {
            console.log("Attempting to reinitialize player");
            initializeYouTubePlayer();
          }
        }
      }, 100);
    } catch (error) {
      console.error("Error seeking to time:", error);
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

  // Tab state for learning panels
  const [activeTab, setActiveTab] = useState<'chapters' | 'quiz' | 'notes'>('notes');

  // Always render as flex with row layout, but change content positioning based on mode
  return (
    <div className="max-w-[1600px] mx-auto p-6">
      {isLearningMode ? (
        // Learning mode layout with side-by-side video and tabs
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side - Video Player and minimal info */}
          <div className="lg:w-[65%]">
            {/* Video Player */}
            <div className="relative">
              <div className="relative w-full bg-black aspect-video rounded-xl overflow-hidden">
                {isClient ? (
                  <div id="youtube-player" className="absolute inset-0 w-full h-full"></div>
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="animate-pulse">Loading video...</div>
                  </div>
                )}
              </div>
              
              {/* Learning Mode Toggle Button */}
              <div className="absolute top-4 right-4 z-10">
                <LearningModeToggle />
              </div>
            </div>

            {/* Minimal Video Info */}
            <div className="mt-4">
              <h1 className="text-xl font-bold">{video.title}</h1>
              <div className="flex flex-wrap items-center mt-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image
                      src={video.channelImageUrl}
                      alt={video.channelName}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-2">
                    <h3 className="font-medium text-sm">{video.channelName}</h3>
                  </div>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  {video.views} views • {video.uploadTime}
                </div>
              </div>
            </div>

            {/* Debug Button - Only visible in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4">
                <button 
                  onClick={() => {
                    console.log("Player object:", playerRef.current);
                    console.log("Player methods:", playerRef.current ? Object.keys(playerRef.current) : "No player");
                    if (playerRef.current && !playerRef.current.seekTo) {
                      initializeYouTubePlayer();
                    }
                  }} 
                  className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  Debug Player
                </button>
              </div>
            )}
          </div>

          {/* Right side - Learning panels with tabs */}
          <div className="lg:w-[35%] flex flex-col h-[calc(100vh-100px)] sticky top-4">
            {/* Tabs */}
            <div className="flex border-b">
              <button 
                onClick={() => setActiveTab('notes')} 
                className={`flex-1 py-3 text-center font-medium text-sm transition ${
                  activeTab === 'notes' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Notes
              </button>
              <button 
                onClick={() => setActiveTab('quiz')} 
                className={`flex-1 py-3 text-center font-medium text-sm transition ${
                  activeTab === 'quiz' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Quizzes
              </button>
              <button 
                onClick={() => setActiveTab('chapters')} 
                className={`flex-1 py-3 text-center font-medium text-sm transition ${
                  activeTab === 'chapters' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Chapters
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-auto">
              {activeTab === 'notes' && (
                <NotesPanel 
                  videoId={id} 
                  currentTime={currentTime} 
                />
              )}
              {activeTab === 'quiz' && (
                <QuizPanel 
                  videoId={id} 
                  currentTime={currentTime} 
                />
              )}
              {activeTab === 'chapters' && (
                <ChapterMarkers 
                  videoId={id} 
                  currentTime={currentTime} 
                  onChapterClick={(time) => {
                    console.log(`Chapter clicked, seeking to ${time}`);
                    seekToTime(time);
                  }} 
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        // Normal mode layout (unchanged)
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className={`lg:w-[calc(100%-350px)]`}>
            {/* Video Player */}
            <div className="relative">
              <div className="relative w-full bg-black aspect-video rounded-xl overflow-hidden">
                {isClient ? (
                  <div id="youtube-player" className="absolute inset-0 w-full h-full"></div>
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="animate-pulse">Loading video...</div>
                  </div>
                )}
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

            {/* Comments Section */}
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
          </div>

          {/* Related videos sidebar */}
          <div className="lg:w-[350px] space-y-4">
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
          </div>
        </div>
      )}
    </div>
  );
} 