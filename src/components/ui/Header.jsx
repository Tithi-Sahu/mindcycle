import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './Button';
import { logoutUser } from '../../slices/authSlice';
import { Brain, LogOut, User, Settings } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/sign-up-and-login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white/20 backdrop-blur-md border-b border-white/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 transform hover:scale-105">
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">MindCycle</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20"
            >
              Dashboard
            </Link>
            <Link
              to="/habit-tracking"
              className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20"
            >
              Habit Tracking
            </Link>
            <Link
              to="/journal"
              className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20"
            >
              Journal
            </Link>
            <Link
              to="/progress-reports-analytics"
              className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20"
            >
              Progress
            </Link>
            <Link
              to="/habit-motivation-library"
              className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20"
            >
              Library
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/80">
                  Welcome, {user.displayName} {user.isGuest && '(Guest)'}
                </span>
                <Link to="/user-profile-and-settings">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-300 hover:text-red-200 hover:bg-red-500/30 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;