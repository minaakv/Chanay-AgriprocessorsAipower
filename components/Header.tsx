import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="bg-brand-500 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-wide">Chanay Agriprocessors</h1>
            <p className="text-brand-300 text-xs uppercase tracking-widest">Premium Sauces & Chutneys</p>
          </div>
        </div>
        <nav className="flex space-x-6 text-brand-200 text-sm font-medium">
          <a href="#" className="hover:text-white transition-colors">Product Line</a>
          <a href="#" className="hover:text-white transition-colors">Our Story</a>
          <span className="text-white border-b border-brand-500 pb-0.5">AI Studio</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
