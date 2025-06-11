const Footer = () => {
  return (
    <footer className="sticky bottom-0 w-full flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 bg-white dark:bg-[#171717] transition-colors duration-300 shadow-inner">
      {/* Left */}
      <div className="flex items-center space-x-2">
        <span className="text-sm sm:text-sm md:text-sm tracking-wide text-gray-900 dark:text-[#f0f0f0]">
          © 2025 bn_e. All rights reserved.
        </span>
      </div>

      {/* Right */}
      <a
        href="mailto:bonheurndeze@gmail.com"
        className="text-sm sm:text-sm md:text-sm text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500"
      >
        CONTACT THE DEVELOPER
      </a>
    </footer>
  );
};

export default Footer;
