import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const handleSOS = () => {
    alert('Emergency Helpline: 1-800-KIDS-HELP\nYou are not alone. Help is available 24/7.');
  };

  return (
    <header className="bg-transparent p-0 flex flex-col items-center justify-center w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full py-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">BayMax</h1>
            <p className="text-base text-gray-600 dark:text-gray-300 font-medium">Your Personal AI Companion</p>
          </div>
        </div>
        <Button
          onClick={handleSOS}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold animate-pulse text-lg shadow-lg"
        >
          <Phone className="w-5 h-5 mr-2" />
          SOS
        </Button>
      </div>
    </header>
  );
};

export default Header;
