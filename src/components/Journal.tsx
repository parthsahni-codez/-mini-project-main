import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import aiService from '../services/aiService';

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState<{ text: string; date: string; response: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize AI service on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('baymax_ai_api_key');
    if (savedApiKey) {
      aiService.initialize(savedApiKey);
    }
  }, []);

  const handleSubmit = async () => {
    if (!entry.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Get AI analysis
      const aiResponse = await aiService.getJournalAnalysis(entry);
      
      const newEntry = {
        text: entry,
        date: new Date().toLocaleDateString(),
        response: aiResponse.message
      };
      
      setJournalEntries(prev => [newEntry, ...prev]);
      setEntry('');
    } catch (error) {
      console.error('Error getting AI analysis:', error);
      
      // Fallback response
      const fallbackEntry = {
        text: entry,
        date: new Date().toLocaleDateString(),
        response: "Thank you for sharing that with me! I'm here to listen and support you through whatever you're going through. 💙"
      };
      
      setJournalEntries(prev => [fallbackEntry, ...prev]);
      setEntry('');
    }
    
    setIsLoading(false);
  };

  const clearJournal = () => {
    setEntry('');
  };

  return (
    <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          📝 Daily Journal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            How was your day? Share anything on your mind:
          </label>
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Today I felt... I did... I'm thinking about..."
            className="min-h-[100px] resize-none"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit} 
            disabled={!entry.trim() || isLoading}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            {isLoading ? 'BayMax is analyzing...' : 'Share with BayMax 💭'}
          </Button>
          <Button onClick={clearJournal} variant="outline">
            Clear
          </Button>
        </div>
        
        {journalEntries.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Entries</h3>
            {journalEntries.slice(0, 3).map((journalEntry, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">BayMax says:</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">{journalEntry.response}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{journalEntry.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          Writing helps process emotions and track your growth journey. BayMax uses AI to provide personalized insights! 💙
        </p>
      </CardContent>
    </Card>
  );
};

export default Journal;
