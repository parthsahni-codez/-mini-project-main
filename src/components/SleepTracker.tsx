
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const SleepTracker = () => {
  const [sleepHours, setSleepHours] = useState(8);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [sleepHistory, setSleepHistory] = useState<{ hours: number; quality: number; date: string }[]>([]);

  const qualityLabels = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent'];
  const qualityEmojis = ['😴', '😪', '😐', '😊', '😴'];

  const saveSleep = () => {
    const today = new Date().toLocaleDateString();
    setSleepHistory(prev => [...prev, { hours: sleepHours, quality: sleepQuality, date: today }]);
    alert(`Sleep logged: ${sleepHours} hours, ${qualityLabels[sleepQuality - 1]} quality`);
  };

  const getSleepAdvice = () => {
    if (sleepHours < 7) return "Try to get more sleep tonight! Aim for 7-9 hours.";
    if (sleepHours > 9) return "You got plenty of sleep! That's great for your health.";
    return "Perfect amount of sleep! Keep up the good work!";
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          😴 Sleep Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How many hours did you sleep?
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="0"
                max="24"
                value={sleepHours}
                onChange={(e) => setSleepHours(parseInt(e.target.value) || 0)}
                className="w-20 text-center"
              />
              <span className="text-gray-600 dark:text-gray-400">hours</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How was your sleep quality?
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="5"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>😴 Terrible</span>
                <span>😴 Excellent</span>
              </div>
              <div className="text-center">
                <span className="text-lg">{qualityEmojis[sleepQuality - 1]}</span>
                <span className="ml-2 text-sm font-medium">{qualityLabels[sleepQuality - 1]}</span>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={saveSleep}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-3"
        >
          Log Sleep 💤
        </Button>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            {getSleepAdvice()}
          </p>
        </div>

        {sleepHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Recent Sleep</h3>
            <div className="space-y-2">
              {sleepHistory.slice(-5).map((sleep, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{sleep.date}</span>
                  <span className="text-sm font-medium">{sleep.hours}h</span>
                  <span className="text-sm">{qualityEmojis[sleep.quality - 1]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SleepTracker;
