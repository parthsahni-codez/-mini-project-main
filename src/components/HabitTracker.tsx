import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Habit {
  id: number;
  name: string;
  emoji: string;
  completed: boolean;
  streak: number;
}

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Drink Water', emoji: '💧', completed: false, streak: 3 },
    { id: 2, name: 'Exercise', emoji: '🏃‍♂️', completed: false, streak: 5 },
    { id: 3, name: 'Read', emoji: '📚', completed: false, streak: 2 },
    { id: 4, name: 'Meditate', emoji: '🧘‍♀️', completed: false, streak: 7 },
    { id: 5, name: 'Sleep Early', emoji: '😴', completed: false, streak: 4 },
  ]);

  const toggleHabit = (id: number) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            completed: !habit.completed,
            streak: !habit.completed ? habit.streak + 1 : Math.max(0, habit.streak - 1)
          }
        : habit
    ));
  };

  const completedCount = habits.filter(habit => habit.completed).length;
  const totalCount = habits.length;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          🎯 Daily Habits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {completedCount}/{totalCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Habits completed today
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {habits.map(habit => (
            <div
              key={habit.id}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 ${
                habit.completed
                  ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    habit.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                  }`}
                >
                  {habit.completed && '✓'}
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{habit.emoji}</span>
                  <span className={`font-medium ${
                    habit.completed 
                      ? 'text-green-700 dark:text-green-300 line-through' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {habit.name}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                🔥 {habit.streak} days
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {completedCount === totalCount 
              ? "🎉 Amazing! You've completed all your habits today!" 
              : "Keep going! Every habit completed is a step toward a better you! 💪"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitTracker; 