import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="sticky bottom-0 z-50 w-full flex items-center justify-between px-6 py-3 sm:px-6 md:px-8 bg-white/30 dark:bg-[#171717]/97 backdrop-blur-md shadow-md transition-all duration-300">
      {/* Left */}
      <div className="flex items-center space-x-2">
        <span className="text-xs leading-tight max-w-screen-sm mx-auto text-center text-gray-500 dark:text-gray-400">
          © 2025 bn_e. All rights reserved.
        </span>
      </div>

      {/* Right */}
      <a
        href="mailto:bonheurndeze@gmail.com"
        className="text-sm text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500 text-center tracking-tight leading-tight"
      >
        CONTACT THE DEVELOPER
      </a>
    </footer>
  );
};

export default Footer;
