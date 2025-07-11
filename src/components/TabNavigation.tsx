import React from 'react';
import { Smile, Moon, Wind, BookOpen, CheckSquare, MessageCircle, Activity } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'mood', label: 'Mood', icon: <Smile className="w-5 h-5" /> },
  { id: 'sleep', label: 'Sleep', icon: <Moon className="w-5 h-5" /> },
  { id: 'breathing', label: 'Breathe', icon: <Wind className="w-5 h-5" /> },
  { id: 'journal', label: 'Journal', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'todo', label: 'To-Do', icon: <CheckSquare className="w-5 h-5" /> },
  { id: 'chat', label: 'Chat', icon: <MessageCircle className="w-5 h-5" /> },
  { id: 'recent-activity', label: 'Recent Activity', icon: <Activity className="w-5 h-5" /> },
];

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="glass floating px-4 py-6 w-56 max-w-full flex flex-col items-center">
      <h2 className="text-lg font-extrabold text-blue-500 mb-4 tracking-wide uppercase">Features</h2>
      <nav className="flex flex-col gap-4 w-full items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center justify-center gap-3 w-44 max-w-full px-4 py-3 rounded-2xl text-base font-bold transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg scale-105'
                : 'bg-transparent hover:bg-blue-100 dark:hover:bg-gray-800 text-blue-700 dark:text-blue-200'}
            `}
          >
            {tab.icon}
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
