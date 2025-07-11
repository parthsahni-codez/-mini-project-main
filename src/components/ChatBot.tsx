import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm BayMax, your personal AI companion! 🤖💙 I'm here to help you with anything you need - whether you want to talk about your day, need help with problems, or just want a friend to chat with. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getDeepSeekResponse = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

    console.log("API Key:", apiKey);

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
            { role: 'system', content: "You are BayMax, a friendly and supportive AI companion." },
            { role: 'user', content: userMessage },
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

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Call DeepSeek API for bot response
    const botText = await getDeepSeekResponse(inputText);
    const botResponse: Message = {
      id: Date.now() + 1,
      text: botText,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  return (
    <Card className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 border-0 shadow-lg h-full flex flex-col">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          💬 Chat with BayMax
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 space-y-3 overflow-y-auto max-h-96 p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border'
                }`}
              >
                {!message.isUser && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-500">🤖</span>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">BayMax</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">🤖</span>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">BayMax</span>
                </div>
                <div className="flex space-x-1 mt-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isTyping}
          />
          <Button 
            onClick={sendMessage} 
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          I'm here to listen, help, and be your friend! 💙 You can talk to me about anything.
        </p>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
