import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const CalendarEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Therapy Session',
      time: '2:00 PM',
      date: 'Today',
      type: 'therapy'
    },
    {
      id: 2,
      title: 'Gym Workout',
      time: '6:00 PM',
      date: 'Today',
      type: 'exercise'
    },
    {
      id: 3,
      title: 'Book Club Meeting',
      time: '7:30 PM',
      date: 'Tomorrow',
      type: 'social'
    },
    {
      id: 4,
      title: 'Meditation Session',
      time: '8:00 AM',
      date: 'Tomorrow',
      type: 'wellness'
    }
  ];

  const getEventEmoji = (type: string) => {
    switch (type) {
      case 'therapy': return '🧠';
      case 'exercise': return '🏃‍♂️';
      case 'social': return '👥';
      case 'wellness': return '🧘‍♀️';
      default: return '📅';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'therapy': return 'border-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'exercise': return 'border-green-400 bg-green-50 dark:bg-green-900/20';
      case 'social': return 'border-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case 'wellness': return 'border-orange-400 bg-orange-50 dark:bg-orange-900/20';
      default: return 'border-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          📅 Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map(event => (
          <div
            key={event.id}
            className={`flex items-center gap-3 p-3 rounded-lg border-l-4 ${getEventColor(event.type)}`}
          >
            <div className="text-2xl">{getEventEmoji(event.type)}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {event.title}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {event.time} • {event.date}
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center pt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Stay organized and don't miss important appointments! 📋
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarEvents; 