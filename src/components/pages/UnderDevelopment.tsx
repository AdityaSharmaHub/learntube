import Link from 'next/link';

const UnderDevelopment = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* YouTube-like logo/graphic */}
        <div className="mb-8 flex justify-center">
          <svg 
            className="w-48 h-48 text-red-600" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" fill="currentColor" />
            <path 
              d="M135 100L80 130V70L135 100Z" 
              fill="white" 
            />
            <path 
              d="M90 155 L110 155 L110 170 L90 170 Z" 
              fill="white" 
              className="animate-bounce" 
            />
            <path 
              d="M75 45 L125 45 L125 60 L75 60 Z" 
              fill="white" 
            />
            <path 
              d="M65 65C65 65 75 85 100 85C125 85 135 65 135 65" 
              stroke="white" 
              strokeWidth="5" 
              fill="none" 
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          This Page is Under Development
        </h1>
        
        <p className="text-gray-600 mb-8">
          We're working hard to bring you an amazing new feature. 
          Please check back soon!
        </p>
        
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 flex items-center justify-center mx-auto"
        >
          Return to Home
        </Link>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} LearnTube, LLC
      </div>
    </div>
  );
};

export default UnderDevelopment;