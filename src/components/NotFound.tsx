import React from 'react';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[150px] font-serif font-bold text-[#D4AF37] leading-none mb-4">404</h1>
      <h2 className="text-3xl sm:text-4xl font-serif text-white font-semibold mb-6">
        Page Not Found
      </h2>
      <p className="text-neutral-400 text-lg max-w-[500px] mb-10">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <a 
        href="/"
        className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B3932F] text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
      >
        <Home className="size-5" />
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;
