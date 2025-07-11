import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const ACTIVITIES = [
  'Completed Mood Check-in',
  'Logged Sleep Hours',
  'Added Journal Entry',
  'Finished a Task',
  'Chatted with BayMax',
];

const RecentActivityFeed = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {ACTIVITIES.map((activity, idx) => (
            <li key={idx} className="text-sm">
              • {activity}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivityFeed; 