
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);

  const phases = {
    inhale: { duration: 4, text: 'Breathe In', emoji: '🫁' },
    hold: { duration: 4, text: 'Hold', emoji: '⏸️' },
    exhale: { duration: 4, text: 'Breathe Out', emoji: '💨' },
    hold2: { duration: 4, text: 'Hold', emoji: '⏸️' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      const phaseOrder: Array<'inhale' | 'hold' | 'exhale' | 'hold2'> = ['inhale', 'hold', 'exhale', 'hold2'];
      const currentIndex = phaseOrder.indexOf(phase);
      const nextPhase = phaseOrder[(currentIndex + 1) % 4];
      
      if (nextPhase === 'inhale') {
        setCycle(prev => prev + 1);
      }
      
      setPhase(nextPhase);
      setTimeLeft(phases[nextPhase].duration);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimeLeft(4);
    setCycle(0);
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
    setCycle(0);
  };

  const getCircleSize = () => {
    if (phase === 'inhale') return 200 + (4 - timeLeft) * 25;
    if (phase === 'exhale') return 300 - (4 - timeLeft) * 25;
    return 300;
  };

  return (
    <Card className="bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900 dark:to-green-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          🫁 Breathing Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div
              className="border-4 border-blue-400 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out"
              style={{
                width: `${getCircleSize()}px`,
                height: `${getCircleSize()}px`,
                maxWidth: '300px',
                maxHeight: '300px'
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{phases[phase].emoji}</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {timeLeft}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {phases[phase].text}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Cycle {cycle + 1}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              4-4-4-4 Breathing Pattern
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            {!isActive ? (
              <Button 
                onClick={startExercise}
                className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-bold py-3 px-6"
              >
                Start Breathing 🫁
              </Button>
            ) : (
              <Button 
                onClick={stopExercise}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Stop
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Instructions:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Breathe in for 4 seconds</li>
            <li>• Hold for 4 seconds</li>
            <li>• Breathe out for 4 seconds</li>
            <li>• Hold for 4 seconds</li>
            <li>• Repeat for 5-10 cycles</li>
          </ul>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This exercise helps reduce stress and anxiety. Focus on your breath and let your mind relax. 💙
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;
