import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <div className="text-6xl mb-4 animate-bounce-soft">🤔</div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-hover"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-300 ease-in-out shadow-hover"
          >
            Learn More
          </Link>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team or check our documentation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
