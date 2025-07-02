import { Link, useNavigate } from 'react-router-dom';
import ArrowLeft from '../assets/ArrowLeft.svg';
import Icon from '../assets/Icon.svg';
import { useAuth } from "@/context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth()

  // Example authentication state (replace with real auth logic)
  // const isAuthenticated = true;

  return (
    <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 py-3 
  bg-white/30 dark:bg-[#202124]/30 backdrop-blur-md 
  shadow-md  transition-all duration-300">
      
      {/* Logo (Home link) */}
      <Link to="/" className="flex items-center gap-2 group">
        <img src={Icon} alt="Logo" className="h-7 w-7 sm:h-9 sm:w-9 transition-transform duration-300 group-hover:scale-105" />
        <span className="text-lg sm:text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 transition-colors">
          SEED<span className="text-teal-600 dark:text-teal-400">→</span>TRACK
        </span>
      </Link>

      {/* Navigation Items */}
      <div className="flex items-center gap-4">
        {/* Auth Links */}
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:text-red-500 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
            >
              Register
            </Link>
          </>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <img src={ArrowLeft} alt="Back Arrow" className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
