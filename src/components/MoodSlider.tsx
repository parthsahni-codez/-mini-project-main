import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MoodSlider = () => {
  const [mood, setMood] = useState([5]);
  const [emojiAnim, setEmojiAnim] = useState(false);
  const [textAnim, setTextAnim] = useState(false);

  useEffect(() => {
    setEmojiAnim(true);
    setTextAnim(true);
    const timeout = setTimeout(() => {
      setEmojiAnim(false);
      setTextAnim(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [mood[0]]);

  const getMoodEmoji = (value: number) => {
    if (value <= 2) return '😢';
    if (value <= 4) return '😔';
    if (value <= 6) return '😐';
    if (value <= 8) return '😊';
    return '😄';
  };
  
  const getMoodText = (value: number) => {
    if (value <= 2) return 'Very Sad';
    if (value <= 4) return 'Sad';
    if (value <= 6) return 'Okay';
    if (value <= 8) return 'Happy';
    return 'Very Happy';
  };

  // Animated gradient backgrounds for different moods
  const bgGradients = [
    'from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-800', // Very Sad
    'from-purple-200 to-purple-400 dark:from-purple-900 dark:to-purple-800', // Sad
    'from-gray-200 to-gray-400 dark:from-gray-900 dark:to-gray-800', // Okay
    'from-yellow-200 to-yellow-400 dark:from-yellow-900 dark:to-yellow-800', // Happy
    'from-pink-200 to-pink-400 dark:from-pink-900 dark:to-pink-800', // Very Happy
  ];
  let bgIndex = 2;
  if (mood[0] <= 2) bgIndex = 0;
  else if (mood[0] <= 4) bgIndex = 1;
  else if (mood[0] <= 6) bgIndex = 2;
  else if (mood[0] <= 8) bgIndex = 3;
  else bgIndex = 4;

  return (
    <Card className={`transition-all duration-700 bg-gradient-to-br ${bgGradients[bgIndex]} border-0 shadow-lg`}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div
            className={`text-6xl mb-2 inline-block transition-transform transition-opacity duration-400 ${emojiAnim ? 'scale-125 opacity-80' : 'scale-100 opacity-100'}`}
            style={{ willChange: 'transform, opacity' }}
          >
            {getMoodEmoji(mood[0])}
          </div>
          <p
            className={`text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-400 ${textAnim ? 'text-pink-500 dark:text-pink-300' : ''}`}
          >
            {getMoodText(mood[0])}
          </p>
        </div>
        
        <div className="px-4">
          <Slider
            value={mood}
            onValueChange={setMood}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>😢 Very Sad</span>
            <span>😄 Very Happy</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
            Thanks for sharing! I'm here to help make your day better! 💙
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSlider;
