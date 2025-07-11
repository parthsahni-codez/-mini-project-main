import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Calendar } from './ui/calendar';

const EVENTS = [
  { date: '2024-06-10', title: 'Doctor Appointment' },
  { date: '2024-06-12', title: 'Yoga Class' },
  { date: '2024-06-15', title: 'Project Deadline' },
];

const CalendarEvents = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 w-full flex justify-center overflow-x-auto">
          <div className="max-w-xs w-full">
            <Calendar />
          </div>
        </div>
        <ul className="space-y-1">
          {EVENTS.map(event => (
            <li key={event.date} className="text-sm break-words">
              <span className="font-semibold">{event.date}:</span> {event.title}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CalendarEvents; 