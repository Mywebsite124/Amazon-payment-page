
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
            alt="Amazon Logo" 
            className="h-8 md:h-9 object-contain mr-6"
          />
          <span className="hidden md:block text-2xl text-gray-700 font-light">Checkout</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-gray-400 font-medium">100% SECURE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
