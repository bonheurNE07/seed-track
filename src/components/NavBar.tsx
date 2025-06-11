import { Link, useNavigate } from 'react-router-dom';
import ArrowLeft from '../assets/ArrowLeft.svg';
import Icon from '../assets/Icon.svg';

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <nav className="sticky top-0 w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[#292929] shadow-xl transition-colors duration-300">
      {/* Logo (links to home) */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={Icon} alt="Logo" className="h-6 w-6 sm:h-10" />
        <span className="text-base font-semibold text-gray-800 dark:text-gray-100 sm:inline">
          SEED<span className="mx-1 text-teal-700">→</span>TRACK
        </span>
      </Link>

      {/* Arrow Button Link */}
      <Link to="/back">
        <button
          type="button"
          className="flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Go back"
          onClick={() => navigate(-1)}
        >
          <img src={ArrowLeft} alt="Back Arrow" className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
