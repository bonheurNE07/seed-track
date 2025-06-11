import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './NavBar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-6 sm:px-6 md:px-8 bg-white text-gray-900 dark:bg-[#212121] dark:text-gray-100 transition-colors duration-300">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
