import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const QUOTES = [
  "Believe in yourself and all that you are.",
  "Every day is a second chance.",
  "You are stronger than you think.",
  "Progress, not perfection.",
  "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.",
  "You are capable of amazing things."
];

const DailyQuote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Daily Affirmation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="italic text-center">"{quote}"</p>
      </CardContent>
    </Card>
  );
};

export default DailyQuote; 