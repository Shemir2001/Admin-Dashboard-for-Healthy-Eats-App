import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-extrabold text-gray-700 tracking-widest">
          404
        </h1>
        
        {/* Divider with animation */}
        <div className="inline-block relative h-2 w-32 bg-indigo-500 rounded-full my-6 mx-auto">
          <div className="absolute top-0 left-0 h-2 w-5 bg-white rounded-full animate-bounce"></div>
        </div>
        
        {/* Message */}
        <div className="text-gray-500 text-xl font-medium mb-8">
          <h2 className="text-2xl text-gray-800 font-bold mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Return Home
          </Link>
          
         
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full"></div>
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-indigo-300 rounded-full"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-indigo-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default NotFound;