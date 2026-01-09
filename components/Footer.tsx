
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs text-blue-600 font-medium">
          <a href="#" className="hover:underline hover:text-orange-700">Conditions of Use</a>
          <a href="#" className="hover:underline hover:text-orange-700">Privacy Notice</a>
          <a href="#" className="hover:underline hover:text-orange-700">Interest-Based Ads</a>
        </div>
        <p className="text-xs text-gray-500">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
};

export default Footer;
