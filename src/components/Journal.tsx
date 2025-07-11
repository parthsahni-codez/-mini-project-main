import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getDeepSeekFeedback = async (entry: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528-qwen3-8b',
          messages: [
            { role: 'system', content: 'You are BayMax, a friendly and supportive AI companion. Give feedback or encouragement to the user based on their journal entry.' },
            { role: 'user', content: entry },
          ],
        }),
      });
      if (!response.ok) {
        throw new Error('API error');
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'Sorry, I could not understand that.';
    } catch (error) {
      return 'Sorry, there was a problem connecting to the AI service.';
    }
  };

  const handleSubmit = async () => {
    if (!entry.trim()) return;
    setIsLoading(true);
    setAiResponse('');
    const response = await getDeepSeekFeedback(entry);
    setAiResponse(response);
    setIsLoading(false);
  };

  const clearJournal = () => {
    setEntry('');
    setAiResponse('');
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
            {isLoading ? 'BayMax is thinking...' : 'Share with BayMax 💭'}
          </Button>
          <Button onClick={clearJournal} variant="outline">
            Clear
          </Button>
        </div>
        
        {aiResponse && (
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-400">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">BayMax says:</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{aiResponse}</p>
              </div>
            </div>
          </div>
        )}
        
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          Your thoughts are safe with me. I'm here to listen and support you! 💝
        </p>
      </CardContent>
    </Card>
  );
};

export default Journal;
