import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#2F3C7E]">KickResume</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`transition-colors duration-200 ${
                isActive('/dashboard') 
                  ? 'text-[#2F3C7E] font-semibold' 
                  : 'text-[#6C757D] hover:text-[#2F3C7E]'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/templates" 
              className={`transition-colors duration-200 ${
                isActive('/templates') 
                  ? 'text-[#2F3C7E] font-semibold' 
                  : 'text-[#6C757D] hover:text-[#2F3C7E]'
              }`}
            >
              Templates
            </Link>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[#6C757D]">
                <User size={20} />
                <span className="font-medium">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-[#6C757D] hover:text-[#FF6B6B] transition-colors duration-200"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#2F3C7E] hover:text-[#00C9A7] transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-[#E9ECEF]">
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 text-[#6C757D] hover:text-[#2F3C7E] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/templates" 
                className="block px-3 py-2 text-[#6C757D] hover:text-[#2F3C7E] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Templates
              </Link>
              <div className="px-3 py-2 text-[#6C757D] border-t border-[#E9ECEF] mt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <User size={16} />
                  <span className="text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-[#FF6B6B] hover:text-[#FF6B6B]/80 transition-colors duration-200"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;