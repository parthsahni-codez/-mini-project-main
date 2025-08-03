import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const RecentActivityFeed = () => {
  const activities = [
    {
      id: 1,
      action: 'Completed breathing exercise',
      time: '2 minutes ago',
      emoji: '🫁',
      type: 'wellness'
    },
    {
      id: 2,
      action: 'Logged mood: Happy',
      time: '15 minutes ago',
      emoji: '😊',
      type: 'mood'
    },
    {
      id: 3,
      action: 'Added new task: Study for exam',
      time: '1 hour ago',
      emoji: '📚',
      type: 'task'
    },
    {
      id: 4,
      action: 'Completed habit: Drink Water',
      time: '2 hours ago',
      emoji: '💧',
      type: 'habit'
    },
    {
      id: 5,
      action: 'Wrote journal entry',
      time: '3 hours ago',
      emoji: '📝',
      type: 'journal'
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'wellness': return 'text-blue-600 dark:text-blue-400';
      case 'mood': return 'text-pink-600 dark:text-pink-400';
      case 'task': return 'text-green-600 dark:text-green-400';
      case 'habit': return 'text-purple-600 dark:text-purple-400';
      case 'journal': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          📊 Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map(activity => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-2xl">{activity.emoji}</div>
            <div className="flex-1">
              <div className={`font-medium ${getActivityColor(activity.type)}`}>
                {activity.action}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center pt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Keep up the great work! Every activity counts toward your well-being! 🌟
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityFeed; 