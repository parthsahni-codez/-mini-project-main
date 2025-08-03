import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import MoodSlider from '../components/MoodSlider';
import SleepTracker from '../components/SleepTracker';
import BreathingExercise from '../components/BreathingExercise';
import TodoList from '../components/TodoList';
import ChatBot from '../components/ChatBot';
import WeatherWidget from '../components/WeatherWidget';
import HabitTracker from '../components/HabitTracker';
import CalendarEvents from '../components/CalendarEvents';
import UserProfile from '../components/UserProfile';
import ProgressOverview from '../components/ProgressOverview';
import RecentActivityFeed from '../components/RecentActivityFeed';

interface IndexProps {
  onLogout: () => void;
  username: string;
}

const Index = ({ onLogout, username }: IndexProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('mood');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'mood':
        return <MoodSlider />;
      case 'sleep':
        return <SleepTracker />;
      case 'breathing':
        return <BreathingExercise />;
      case 'todo':
        return <TodoList />;
      case 'chat':
        return <ChatBot />;
      case 'recent-activity':
        return (
          <div className="flex flex-col gap-6">
            <ProgressOverview />
            <HabitTracker />
            <CalendarEvents />
            <RecentActivityFeed />
          </div>
        );
      default:
        return <MoodSlider />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={onLogout} username={username} />
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex pt-20 min-h-screen">
        {/* Sidebar Navigation */}
        <nav className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white/90 dark:bg-gray-900/90 shadow-lg border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="pt-8 md:pt-4 flex-1 flex flex-col gap-2">
            <TabNavigation activeTab={activeTab} onTabChange={tab => { setActiveTab(tab); setSidebarOpen(false); }} />
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-start justify-start px-2 md:px-8 lg:px-16 py-8 md:py-12 min-h-[calc(100vh-5rem)] md:ml-64">
          <div className="w-full max-w-2xl mx-auto">
            {renderActiveComponent()}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Remember: You're amazing, you're capable, and you're never alone with BayMax! 💙
            </p>
          </div>
        </main>
        
        {/* Right Sidebar Widgets */}
        <aside className="hidden lg:flex flex-col gap-4 w-72 px-2 py-8 mr-4">
          <UserProfile />
          <WeatherWidget />
        </aside>
      </div>
      
      {/* Mobile Widgets Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 shadow-inner flex flex-row gap-2 px-2 py-2 justify-center items-center lg:hidden overflow-x-auto">
        <UserProfile />
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Index;
