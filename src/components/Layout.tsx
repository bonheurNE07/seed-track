import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './NavBar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex flex-grow items-center justify-center px-6 py-6 w-full md:px-8 lg:px-16 bg-white text-gray-900 dark:bg-[#212121] dark:text-gray-100 transition-colors duration-300">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
