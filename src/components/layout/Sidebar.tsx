import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Update the props to accept a visibility state and toggle function
interface SidebarProps {
  isVisible: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  const pathname = usePathname();
  const isVideoPage = pathname?.includes('/video/');
  
  // Sample channel data
  const channels = [
    { id: 1, name: 'Code With Mosh', image: '/avatars/channel1.jpg', fallbackColor: 'bg-blue-500' },
    { id: 2, name: 'The Net Ninja', image: '/avatars/channel2.jpg', fallbackColor: 'bg-green-500' },
    { id: 3, name: 'Traversy Media', image: '/avatars/channel3.jpg', fallbackColor: 'bg-yellow-500' },
    { id: 4, name: 'freeCodeCamp', image: '/avatars/channel4.jpg', fallbackColor: 'bg-purple-500' },
    { id: 5, name: 'Academind', image: '/avatars/channel5.jpg', fallbackColor: 'bg-red-500' },
  ];

  // Different classes for video vs non-video pages
  const sidebarClasses = isVideoPage
    ? isVisible
      ? "fixed left-0 top-14 h-[calc(100vh-56px)] w-[240px] bg-white overflow-y-auto z-40 border-r border-gray-200 transition-transform duration-300 transform translate-x-0"
      : "fixed left-0 top-14 h-[calc(100vh-56px)] w-[240px] bg-white overflow-y-auto z-40 border-r border-gray-200 transition-transform duration-300 transform -translate-x-full"
    : "fixed left-0 top-14 h-[calc(100vh-56px)] w-[240px] bg-white overflow-y-auto z-40 border-r border-gray-200 hidden sm:block"; // Fixed sidebar on non-video pages

  // Add an overlay for mobile that closes when clicked
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isVisible && isVideoPage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden" 
          onClick={onClose}
        />
      )}
      <aside className={sidebarClasses}>
        <div className="px-3 py-3">
          <nav>
            {/* Home section */}
            <div className="mb-2">
              <Link href="/" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M4 10v11h6v-6h4v6h6V10l-8-7z"></path>
                </svg>
                <span className="text-sm">Home</span>
              </Link>
              <Link href="/shorts" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86l-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path>
                </svg>
                <span className="text-sm">Shorts</span>
              </Link>
              <Link href="/subscriptions" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path>
                </svg>
                <span className="text-sm">Subscriptions</span>
              </Link>
            </div>

            <div className="border-t border-gray-200 pt-2 mb-2">
              <Link href="/library" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5z"></path>
                </svg>
                <span className="text-sm">Library</span>
              </Link>
              <Link href="/history" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M11.9 3.75c-4.55 0-8.23 3.7-8.23 8.25H.92l3.57 3.57.04.13 3.7-3.7H5.5c0-3.54 2.87-6.42 6.42-6.42 3.54 0 6.4 2.88 6.4 6.42s-2.86 6.42-6.4 6.42c-1.78 0-3.38-.73-4.54-1.9l-1.3 1.3c1.5 1.5 3.55 2.43 5.83 2.43 4.58 0 8.28-3.7 8.28-8.25 0-4.56-3.7-8.25-8.26-8.25zM11 8.33v4.6l3.92 2.3.66-1.1-3.2-1.9v-3.9H11z"></path>
                </svg>
                <span className="text-sm">History</span>
              </Link>
              <Link href="/your-videos" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M10 8l6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z"></path>
                </svg>
                <span className="text-sm">Your videos</span>
              </Link>
              <Link href="/watch-later" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M14.97 16.95L10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path>
                </svg>
                <span className="text-sm">Watch later</span>
              </Link>
              <Link href="/liked-videos" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                </svg>
                <span className="text-sm">Liked videos</span>
              </Link>
            </div>

            <div className="border-t border-gray-200 pt-2 mb-2">
              <h3 className="px-3 pt-1 pb-2 text-sm font-medium">Subscriptions</h3>
              {channels.map((channel) => (
                <Link key={channel.id} href={`/channel/${channel.id}`} className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                  <div className="w-6 h-6 rounded-full mr-6 overflow-hidden relative flex-shrink-0">
                    <Image 
                      src={channel.image} 
                      alt={channel.name}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm truncate">{channel.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-2 mb-2">
              <h3 className="px-3 pt-1 pb-2 text-sm font-medium">Explore</h3>
              <Link href="/trending" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path clipRule="evenodd" d="m14 2-1.5.886-5.195 3.07C4.637 7.533 3 10.401 3 13.5c0 4.694 3.806 8.5 8.5 8.5s8.5-3.806 8.5-8.5V1l-1.5 1-3 2L14 5V2ZM8.068 7.248l4.432-2.62v3.175l2.332-1.555L18.5 3.803V13.5c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-2.568 1.357-4.946 3.568-6.252ZM9 15c0-1.226.693-2.346 1.789-2.894L15 10v5c0 1.657-1.343 3-3 3s-3-1.343-3-3Z" fillRule="evenodd"></path>
                </svg>
                <span className="text-sm">Trending</span>
              </Link>
              <Link href="/music" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M12 4v9.38c-.73-.84-1.8-1.38-3-1.38-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h6V4h-7zM9 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9-12h-5V5h5v2z"></path>
                </svg>
                <span className="text-sm">Music</span>
              </Link>
              <Link href="/gaming" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-6">
                  <path d="M10 12H8v2H6v-2H4v-2h2V8h2v2h2v2zm7 .5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm3-3c0-.83-.67-1.5-1.5-1.5S17 8.67 17 9.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3.03-4.35l-4.5 2.53-.49.27-.49-.27-4.5-2.53L3 7.39v6.43l8.98 5.04 8.98-5.04V7.39l-3.99-2.24m0-1.15l4.99 2.8v7.6L11.98 20 2 14.4V6.8L6.99 4l4.99 2.8L16.97 4z"></path>
                </svg>
                <span className="text-sm">Gaming</span>
              </Link>
            </div>

            <div className='my-6 mx-3'>
              <p className='text-xs'>Copyright &copy; 2025 LearnTube</p>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 