import Link from 'next/link';

export default function VideoNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="w-24 h-24 mb-6">
        <svg viewBox="0 0 24 24" className="w-full h-full text-gray-400">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-2">Video Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the video you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
} 