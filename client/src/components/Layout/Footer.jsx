import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner dark:bg-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-lg font-bold text-primary-600">
              PromptForge
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Transform your simple ideas into powerful AI prompts
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              Home
            </Link>
            <Link to="/gallery" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              Gallery
            </Link>
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              Login
            </Link>
            <Link to="/register" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              Register
            </Link>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} PromptForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
