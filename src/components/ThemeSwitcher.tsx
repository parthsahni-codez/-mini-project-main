import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

interface ThemeSwitcherProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <Button variant="outline" size="icon" onClick={toggleDarkMode} aria-label="Toggle theme">
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
};

export default ThemeSwitcher; 