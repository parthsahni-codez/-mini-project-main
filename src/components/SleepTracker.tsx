
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SleepTracker = () => {
  const [sleepHours, setSleepHours] = useState('');
  const [sleepPoints, setSleepPoints] = useState(250);
  
  const calculatePoints = (hours: number) => {
    if (hours >= 8 && hours <= 10) return 50;
    if (hours >= 7 && hours < 8) return 30;
    if (hours >= 6 && hours < 7) return 20;
    return 10;
  };
  
  const handleLogSleep = () => {
    const hours = parseFloat(sleepHours);
    if (hours && hours > 0 && hours <= 24) {
      const points = calculatePoints(hours);
      setSleepPoints(prev => prev + points);
      setSleepHours('');
      alert(`Great job! You earned ${points} sleep points! 🌟`);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          🌙 Sleep Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{sleepPoints}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Points</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sleep-hours" className="text-gray-700 dark:text-gray-300">
            How many hours did you sleep last night?
          </Label>
          <Input
            id="sleep-hours"
            type="number"
            placeholder="8"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            max="24"
            min="0"
            step="0.5"
          />
        </div>
        
        <Button onClick={handleLogSleep} className="w-full bg-blue-500 hover:bg-blue-600">
          Log Sleep & Earn Points! ⭐
        </Button>
        
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <p>🏆 8-10 hours = 50 points</p>
          <p>🥈 7-8 hours = 30 points</p>
          <p>🥉 6-7 hours = 20 points</p>
          <p>💤 Other = 10 points</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepTracker;
