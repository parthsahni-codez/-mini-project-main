import React from 'react';
import { Button } from './ui/button';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: 'mood', label: 'Mood', icon: '😊' },
    { id: 'sleep', label: 'Sleep', icon: '😴' },
    { id: 'breathing', label: 'Breathing', icon: '🫁' },
    { id: 'todo', label: 'Tasks', icon: '✅' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'recent-activity', label: 'Progress', icon: '📊' },
  ];

  return (
    <div className="flex flex-col gap-2 p-4">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          variant={activeTab === tab.id ? 'default' : 'ghost'}
          className={`justify-start text-left h-auto py-3 px-4 rounded-lg transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-blue-500 text-white shadow-lg'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <span className="text-lg mr-3">{tab.icon}</span>
          <span className="font-medium">{tab.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default TabNavigation;
