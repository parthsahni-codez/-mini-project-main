
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
  const [timer, setTimer] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prev => {
          const newTimer = prev + 1;
          
          if (phase === 'inhale' && newTimer >= 4) {
            setPhase('hold');
            return 0;
          } else if (phase === 'hold' && newTimer >= 2) {
            setPhase('exhale');
            return 0;
          } else if (phase === 'exhale' && newTimer >= 4) {
            setPhase('inhale');
            setCycle(prev => prev + 1);
            return 0;
          }
          
          return newTimer;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimer(0);
    setCycle(0);
  };

  const stopExercise = () => {
    setIsActive(false);
    setTimer(0);
    setCycle(0);
    setPhase('inhale');
  };

  const getInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
      default: return 'Ready?';
    }
  };

  const getCircleClass = () => {
    if (!isActive) return 'w-32 h-32';
    switch (phase) {
      case 'inhale': return 'w-40 h-40 scale-125';
      case 'hold': return 'w-40 h-40 scale-125';
      case 'exhale': return 'w-24 h-24 scale-75';
      default: return 'w-32 h-32';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          🫁 Breathing Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`${getCircleClass()} bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full transition-all duration-1000 ease-in-out flex items-center justify-center`}
          >
            <span className="text-white font-semibold text-sm">
              {isActive ? `${4 - timer}` : '🌬️'}
            </span>
          </div>
          
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {getInstruction()}
            </p>
            {isActive && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cycle: {cycle}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {!isActive ? (
            <Button onClick={startExercise} className="flex-1 bg-green-500 hover:bg-green-600">
              Start Breathing 🌿
            </Button>
          ) : (
            <Button onClick={stopExercise} variant="outline" className="flex-1">
              Stop Exercise
            </Button>
          )}
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          Follow the circle: Inhale for 4 seconds, hold for 2, exhale for 4. This helps you relax! 💚
        </p>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;
