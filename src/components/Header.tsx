import React, { useState } from 'react';
import { Button } from './ui/button';
import { Phone, LogOut, User, Settings, ChevronDown } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
  username: string;
}

const Header = ({ darkMode, toggleDarkMode, onLogout, username }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSOS = () => {
    alert('Emergency Helpline: 1-800-KIDS-HELP\nYou are not alone. Help is available 24/7.');
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  return (
    <header className="bg-transparent p-0 flex flex-col items-center justify-center w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full py-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">BayMax</h1>
            <p className="text-base text-gray-600 dark:text-gray-300 font-medium">Your Personal AI Companion</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* User Profile Dropdown */}
          <div className="relative">
            <Button
              onClick={() => setShowUserMenu(!showUserMenu)}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{username}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Welcome back!</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{username}</p>
                </div>
                <div className="p-1">
                  <Button
                    onClick={() => setShowUserMenu(false)}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <Button
            onClick={handleSOS}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold animate-pulse text-lg shadow-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            SOS
          </Button>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
