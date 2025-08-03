import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const ProgressOverview = () => {
  // Mock data - in a real app, this would come from actual user data
  const mood = 80; // percent
  const sleep = 65; // percent
  const tasks = 50; // percent

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Progress Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span>Mood</span>
            <span>{mood}%</span>
          </div>
          <Progress value={mood} />
        </div>
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span>Sleep</span>
            <span>{sleep}%</span>
          </div>
          <Progress value={sleep} />
        </div>
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span>Tasks</span>
            <span>{tasks}%</span>
          </div>
          <Progress value={tasks} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview; 