import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import aiService from '../services/aiService';

const AIConfig = () => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(aiService.getStatus());

  // Initialize component and load existing API key
  useEffect(() => {
    const existingApiKey = localStorage.getItem('baymax_ai_api_key');
    if (existingApiKey) {
      setApiKey(existingApiKey);
      aiService.initialize(existingApiKey);
      setStatus(aiService.getStatus());
    }
  }, []);

  const handleSaveApiKey = () => {
    setIsLoading(true);
    
    // Save to localStorage
    localStorage.setItem('baymax_ai_api_key', apiKey);
    
    // Initialize AI service
    aiService.initialize(apiKey);
    
    // Update status
    setStatus(aiService.getStatus());
    
    setIsLoading(false);
    alert('API key saved successfully! 🎉');
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('baymax_ai_api_key');
    aiService.initialize();
    setApiKey('');
    setStatus(aiService.getStatus());
    alert('API key removed. Using fallback responses. 🔄');
  };

  const handleTestAI = async () => {
    setIsLoading(true);
    
    try {
      // First validate the API key
      const validation = await aiService.validateApiKey(apiKey);
      
      if (validation.valid) {
        const response = await aiService.getChatResponse('Hello, how are you?');
        
        if (response.success) {
          alert(`AI Test Successful! 🤖\n\nResponse: ${response.message}`);
        } else {
          alert(`AI Test Failed: ${response.error}`);
        }
      } else {
        alert(`API Key Validation Failed: ${validation.error}\n\nPlease check your API key and try again.`);
      }
    } catch (error) {
      alert('AI Test Failed. Check your API key and try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          🤖 AI Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <div className="text-center mb-4">
            <div className={`text-lg font-semibold ${status.hasApiKey ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
              {status.hasApiKey ? '✅ AI Enabled' : '🔄 Using Smart Fallbacks'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {status.hasApiKey 
                ? 'Your AI is ready to provide intelligent responses!' 
                : 'Working with enhanced keyword detection and smart responses'
              }
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              AI API Key (Optional)
            </label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="mb-2"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Enter your AI service API key for enhanced responses
            </p>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleSaveApiKey}
              disabled={!apiKey.trim() || isLoading}
              className="flex-1 bg-purple-500 hover:bg-purple-600"
            >
              {isLoading ? 'Saving...' : 'Save API Key'}
            </Button>
            <Button 
              onClick={handleTestAI}
              disabled={!status.hasApiKey || isLoading}
              variant="outline"
              className="flex-1"
            >
              Test AI
            </Button>
          </div>

          {status.hasApiKey && (
            <Button 
              onClick={handleRemoveApiKey}
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Remove API Key
            </Button>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">How it works:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• <strong>With API Key:</strong> Uses advanced AI models for intelligent responses</li>
            <li>• <strong>Without API Key:</strong> Uses enhanced keyword detection and smart fallbacks</li>
            <li>• <strong>Always Available:</strong> Works offline with intelligent responses</li>
            <li>• <strong>Enhanced Chat:</strong> Provides contextual, empathetic conversations</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 AI Integration Options:</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• <strong>OpenRouter (Current):</strong> <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer" className="underline">openrouter.ai</a> - Multiple AI models</li>
            <li>• <strong>OpenAI:</strong> <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com</a></li>
            <li>• <strong>Anthropic Claude:</strong> <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline">console.anthropic.com</a></li>
            <li>• <strong>Google Gemini:</strong> <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">makersuite.google.com</a></li>
          </ul>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
            Currently using OpenRouter with Qwen model. BayMax will automatically try each service.
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            BayMax works great with or without an API key! The smart fallback system ensures you always get helpful responses. 💙
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIConfig; 