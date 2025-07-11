import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';

const HABITS = [
  'Drink Water',
  'Exercise',
  'Read',
  'Meditate',
];

const HabitTracker = () => {
  const [checked, setChecked] = useState(Array(HABITS.length).fill(false));

  const toggleHabit = (idx: number) => {
    setChecked(prev => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Habit Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {HABITS.map((habit, idx) => (
            <li key={habit} className="flex items-center space-x-2">
              <Checkbox checked={checked[idx]} onCheckedChange={() => toggleHabit(idx)} />
              <span>{habit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HabitTracker; 