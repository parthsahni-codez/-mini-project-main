import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ApiKeyTest = () => {
  const testApiKey = () => {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    
    console.log('=== API Key Debug Info ===');
    console.log('API Key exists:', !!apiKey);
    console.log('API Key value:', apiKey);
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    console.log('All env vars:', import.meta.env);
    console.log('========================');
    
    if (!apiKey) {
      alert('❌ API Key is missing! Please create a .env file with VITE_DEEPSEEK_API_KEY=your_key');
    } else if (apiKey === 'your_api_key_here') {
      alert('❌ API Key is still the placeholder! Please replace with your actual API key');
    } else {
      alert('✅ API Key found! Check console for details.');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
          🔧 API Key Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
          Click the button below to test your API key configuration
        </p>
        
        <Button 
          onClick={testApiKey}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Test API Key Configuration
        </Button>
        
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
          <p><strong>To fix API key issues:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Create a <code>.env</code> file in your project root</li>
            <li>Add: <code>VITE_DEEPSEEK_API_KEY=your_actual_api_key</code></li>
            <li>Get your API key from <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">OpenRouter</a></li>
            <li>Restart your development server</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyTest; 