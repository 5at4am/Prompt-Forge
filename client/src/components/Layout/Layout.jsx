import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            PromptForge
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/gallery" className="hover:text-primary-600 transition-colors">
              Gallery
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-primary-600 transition-colors">
                  My Prompts
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {user.username}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-outline text-sm py-1"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn btn-outline text-sm py-1">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary text-sm py-1">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} PromptForge. All rights reserved.</p>
            <p className="mt-1">Enhance your AI prompts with the power of collaboration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
