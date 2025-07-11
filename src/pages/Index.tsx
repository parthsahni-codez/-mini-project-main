import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import MoodSlider from '@/components/MoodSlider';
import SleepTracker from '@/components/SleepTracker';
import BreathingExercise from '@/components/BreathingExercise';
import Journal from '@/components/Journal';
import TodoList from '@/components/TodoList';
import ChatBot from '@/components/ChatBot';
import DailyQuote from '@/components/DailyQuote';
import WeatherWidget from '@/components/WeatherWidget';
import HabitTracker from '@/components/HabitTracker';
import CalendarEvents from '@/components/CalendarEvents';
import UserProfile from '@/components/UserProfile';
import ProgressOverview from '@/components/ProgressOverview';
import RecentActivityFeed from '@/components/RecentActivityFeed';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Index = () => {
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
      case 'journal':
        return <Journal />;
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
    <div className="relative min-h-screen font-sans">
      {/* Heroic SVG Background Behind Header */}
      <div className="absolute top-0 left-0 w-full h-48 z-10 pointer-events-none select-none">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id="hero-gradient2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <path fill="url(#hero-gradient)" fillOpacity="0.7">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0,160L60,170C120,180,240,200,360,197.3C480,195,600,169,720,154.7C840,140,960,138,1080,154.7C1200,171,1320,213,1380,234.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z;
              M0,160L60,180C120,200,240,220,360,210C480,200,600,180,720,170C840,160,960,160,1080,170C1200,180,1320,220,1380,240L1440,260L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z;
              M0,160L60,170C120,180,240,200,360,197.3C480,195,600,169,720,154.7C840,140,960,138,1080,154.7C1200,171,1320,213,1380,234.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
          </path>
          <path fill="url(#hero-gradient2)" fillOpacity="0.3">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M0,200L80,186.7C160,173,320,147,480,154.7C640,163,800,205,960,197.3C1120,189,1280,131,1360,101.3L1440,72L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z;
              M0,180L80,170C160,160,320,120,480,130C640,140,800,200,960,190C1120,180,1280,120,1360,90L1440,60L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z;
              M0,200L80,186.7C160,173,320,147,480,154.7C640,163,800,205,960,197.3C1120,189,1280,131,1360,101.3L1440,72L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
          </path>
        </svg>
      </div>
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-80" />
      {/* Modern Animated Blobs Background */}
      <div className="fixed inset-0 -z-20 pointer-events-none select-none">
        <svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <radialGradient id="blob1" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#f0abfc" />
            </radialGradient>
            <radialGradient id="blob2" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#818cf8" />
            </radialGradient>
          </defs>
          <ellipse cx="400" cy="200" rx="220" ry="120" fill="url(#blob1)" opacity="0.5">
            <animate attributeName="cx" values="400;1100;400" dur="18s" repeatCount="indefinite" />
            <animate attributeName="cy" values="200;700;200" dur="22s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1100" cy="700" rx="180" ry="100" fill="url(#blob2)" opacity="0.4">
            <animate attributeName="cx" values="1100;400;1100" dur="20s" repeatCount="indefinite" />
            <animate attributeName="cy" values="700;200;700" dur="24s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span className="sr-only">Toggle navigation</span>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      {/* Layout */}
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
        <aside className="hidden lg:flex flex-col gap-4 w-72 px-2 py-8 mr-4 glass">
          <UserProfile />
          <WeatherWidget />
        </aside>
      </div>
      {/* Mobile Widgets Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 glass shadow-inner flex flex-row gap-2 px-2 py-2 justify-center items-center lg:hidden overflow-x-auto">
        <UserProfile />
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Index;
