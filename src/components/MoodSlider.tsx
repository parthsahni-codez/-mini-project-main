import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

const MoodSlider = () => {
  const [mood, setMood] = useState(5);
  const [moodHistory, setMoodHistory] = useState<number[]>([]);

  const moodEmojis = ['😢', '😕', '😐', '🙂', '😊', '😄', '🤩', '🥰', '😍', '🤗'];
  const moodLabels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great', 'Amazing', 'Fantastic', 'Wonderful', 'Perfect', 'Incredible'];

  const handleMoodChange = (newMood: number) => {
    setMood(newMood);
  };

  const saveMood = () => {
    setMoodHistory(prev => [...prev, mood]);
    alert(`Mood saved: ${moodLabels[mood - 1]} (${mood}/10)`);
  };

  return (
    <Card className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          😊 How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-4">{moodEmojis[mood - 1]}</div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {moodLabels[mood - 1]}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {mood}/10
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>😢 Terrible</span>
            <span>🤗 Incredible</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => handleMoodChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #f59e0b 25%, #eab308 50%, #22c55e 75%, #3b82f6 100%)`
            }}
          />
        </div>

        <Button 
          onClick={saveMood}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3"
        >
          Save My Mood 💝
        </Button>

        {moodHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Recent Moods</h3>
            <div className="flex gap-2 overflow-x-auto">
              {moodHistory.slice(-7).map((m, index) => (
                <div key={index} className="flex-shrink-0 text-center">
                  <div className="text-2xl">{moodEmojis[m - 1]}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{m}/10</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodSlider;
