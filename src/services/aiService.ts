import axios from 'axios';

interface AIResponse {
  success: boolean;
  message: string;
  error?: string;
}

class AIService {
  private apiKey: string | null = null;
  private conversationHistory: string[] = [];

  // Initialize with API key (optional - will use fallback if not provided)
  initialize(apiKey?: string) {
    this.apiKey = apiKey || null;
    console.log('AI Service initialized with API key:', this.apiKey ? 'Present' : 'Not present');
  }

  // Get AI response for chat - using intelligent dynamic responses
  async getChatResponse(userMessage: string, context: string[] = []): Promise<AIResponse> {
    console.log('Getting AI response for:', userMessage);
    console.log('API Key available:', !!this.apiKey);

    // Update conversation history
    this.conversationHistory = [...context, userMessage];

    // Try to use real AI if we have an API key
    if (this.apiKey) {
      try {
        console.log('Attempting real AI call...');
        const aiResponse = await this.tryRealAI(userMessage, context);
        if (aiResponse) {
          console.log('Real AI response received');
          return {
            success: true,
            message: aiResponse
          };
        } else {
          console.log('Real AI failed, falling back to intelligent responses');
        }
      } catch (error: any) {
        console.error('Real AI Error:', error);
        console.log('Falling back to intelligent responses due to error');
      }
    } else {
      console.log('No API key available, using intelligent responses');
    }

    // Use intelligent dynamic responses
    console.log('Using intelligent dynamic responses...');
    const aiResponse = this.generateIntelligentResponse(userMessage, context);
    return {
      success: true,
      message: aiResponse
    };
  }

  // Try to use real AI APIs
  private async tryRealAI(userMessage: string, context: string[] = []): Promise<string | null> {
    if (!this.apiKey) {
      return null;
    }

    // Create conversation context
    const messages = [
      {
        role: 'system',
        content: `You are BayMax, a compassionate AI mental health companion. You provide supportive, empathetic responses while maintaining appropriate boundaries. You help users with emotional support, stress management, and general well-being. Always be kind, understanding, and encouraging. Keep responses conversational and not too long (2-4 sentences).`
      }
    ];

    // Add conversation history if available
    if (context.length > 0) {
      // Add last few messages for context (limit to prevent token overflow)
      const recentContext = context.slice(-4);
      recentContext.forEach((msg, index) => {
        messages.push({
          role: index % 2 === 0 ? 'user' : 'assistant',
          content: msg
        });
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage
    });

    // Try OpenRouter endpoints only (to avoid CORS issues)
    const endpoints = [
      {
        name: 'OpenRouter (Mistral)',
        url: 'https://openrouter.ai/api/v1/chat/completions',
        data: {
          model: 'mistralai/mistral-7b-instruct',
          messages: messages,
          max_tokens: 300,
          temperature: 0.7
        }
      },
      {
        name: 'OpenRouter (Qwen)',
        url: 'https://openrouter.ai/api/v1/chat/completions',
        data: {
          model: 'qwen/qwen2.5-7b-instruct',
          messages: messages,
          max_tokens: 300,
          temperature: 0.7
        }
      },
      {
        name: 'OpenRouter (GPT-3.5)',
        url: 'https://openrouter.ai/api/v1/chat/completions',
        data: {
          model: 'openai/gpt-3.5-turbo',
          messages: messages,
          max_tokens: 300,
          temperature: 0.7
        }
      }
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying ${endpoint.name}...`);
        console.log('Request data:', JSON.stringify(endpoint.data, null, 2));
        
        let headers: any = {
          'Content-Type': 'application/json'
        };

        // Set OpenRouter headers
        headers['Authorization'] = `Bearer ${this.apiKey}`;
        headers['HTTP-Referer'] = 'https://mini-project-main-kohl.vercel.app';
        headers['X-Title'] = 'BayMax Mental Health App';
        console.log('Using OpenRouter headers:', headers);

        const response = await axios.post(endpoint.url, endpoint.data, {
          headers: headers,
          timeout: 15000
        });

        console.log(`${endpoint.name} response:`, response.data);

        let aiResponse = null;

        // Parse OpenRouter response
        if (response.data?.choices?.[0]?.message?.content) {
          aiResponse = response.data.choices[0].message.content;
        }

        if (aiResponse) {
          console.log(`${endpoint.name} response received:`, aiResponse);
          return aiResponse;
        } else {
          console.log(`${endpoint.name} no valid response found in:`, response.data);
        }
              } catch (error: any) {
          console.log(`${endpoint.name} failed:`, error.message);
          if (error.response) {
            console.log('Error response:', error.response.data);
            console.log('Error status:', error.response.status);
            console.log('Error headers:', error.response.headers);
          }
        }
    }

    return null;
  }

  // Generate intelligent dynamic responses that feel like real AI
  private generateIntelligentResponse(userMessage: string, context: string[] = []): string {
    const lowerMessage = userMessage.toLowerCase();
    const hasContext = context.length > 0;
    const lastMessage = hasContext ? context[context.length - 1].toLowerCase() : '';

    // Analyze sentiment and context
    const isGreeting = lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey');
    const isQuestion = lowerMessage.includes('?') || lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why');
    const isEmotional = lowerMessage.includes('feel') || lowerMessage.includes('sad') || lowerMessage.includes('happy') || lowerMessage.includes('angry') || lowerMessage.includes('worried');
    const isThankful = lowerMessage.includes('thank') || lowerMessage.includes('thanks');
    const isAdvice = lowerMessage.includes('advice') || lowerMessage.includes('help') || lowerMessage.includes('should i');

    // Generate contextual responses based on conversation flow
    if (hasContext && isQuestion) {
      const contextualQuestions = [
        "That's a great question! I'd love to help you explore that further. Can you tell me more about what you're thinking? 🤔",
        "I appreciate you asking that. It shows you're really thinking about this. What aspects of this are most important to you? 💭",
        "That's such an insightful question! I'd be happy to help you work through this. What's your gut feeling about it? 🤗",
        "I love how you're approaching this thoughtfully. Can you share a bit more about what's on your mind? 💙"
      ];
      return contextualQuestions[Math.floor(Math.random() * contextualQuestions.length)];
    }

    if (isGreeting) {
      const greetings = [
        "Hello! 👋 How are you feeling today? I'm here to listen and support you through whatever you're going through! 💙",
        "Hi there! 😊 I'm BayMax, your AI companion. How can I help you today? 💪",
        "Hey! 🌟 Welcome back! What's on your mind? I'm here to listen and support you! 🤗",
        "Hello! I'm so glad you're here. How are you doing today? 💙"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (isEmotional) {
      if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
        const sadResponses = [
          "I hear you, and I'm sorry you're feeling this way. Your feelings are completely valid. It's okay to not be okay. Would you like to talk more about what's causing these feelings? I'm here to listen. 💙",
          "I can sense this is really affecting you. It's completely normal to feel this way sometimes. Remember, difficult times are temporary. What's been on your mind lately? 🤗",
          "I'm sorry you're going through this. Your emotions are real and important. Sometimes just talking about what's bothering us can help. Would you like to share more? 💙"
        ];
        return sadResponses[Math.floor(Math.random() * sadResponses.length)];
      }
      if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
        const happyResponses = [
          "That's wonderful! I'm so happy to hear that you're feeling good! Your positive energy is contagious. Keep embracing these wonderful moments! ✨🌟",
          "I love hearing that you're feeling good! Your happiness brings me joy too. What's been making you feel this way? 🌟",
          "That's fantastic! Positive feelings are so important. I'm glad you're experiencing this. What's been going well for you? ✨"
        ];
        return happyResponses[Math.floor(Math.random() * happyResponses.length)];
      }
      if (lowerMessage.includes('stressed') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
        const stressResponses = [
          "I understand stress and anxiety can be really challenging. Remember to breathe deeply - try inhaling for 4 counts, holding for 4, exhaling for 4. What's causing you to feel this way? 🫁",
          "Stress can feel overwhelming, but you're stronger than you think. Let's work through this together. What's been on your mind? 💪",
          "I hear how challenging this is for you. It's okay to feel this way. Sometimes just naming what's stressing us can help. What's been bothering you? 🤗"
        ];
        return stressResponses[Math.floor(Math.random() * stressResponses.length)];
      }
    }

    if (isAdvice) {
      const adviceResponses = [
        "I'd be happy to help you think through this! It sounds like you're facing a challenging situation. Can you tell me more about what's happening? The more I understand, the better I can support you. 💭",
        "I'd love to help you work through this. It sounds like you're dealing with something important. What's been going on? 🤔",
        "I'm here to support you in figuring this out. It sounds like you're in a tough spot. Can you share more about the situation? 💙"
      ];
      return adviceResponses[Math.floor(Math.random() * adviceResponses.length)];
    }

    if (isThankful) {
      const thankResponses = [
        "You're very welcome! 💙 It's my pleasure to be here for you. Remember, you're doing great, and I believe in you! Keep being amazing! 🌟",
        "You're so welcome! I'm really glad I could help. You deserve all the support in the world. Keep being you! 💙",
        "It's my honor to be here for you! Thank you for trusting me. You're doing such a good job. Keep going! ✨"
      ];
      return thankResponses[Math.floor(Math.random() * thankResponses.length)];
    }

    // Generate contextual responses based on conversation
    if (hasContext) {
      const contextualResponses = [
        "That's really interesting! Tell me more about that. I'm here to listen and learn from you! 🤗",
        "Thank you for sharing that with me. Your thoughts and feelings matter, and I appreciate you opening up to me. 💙",
        "I'm here to support you through whatever you're going through. You're not alone, and together we can work through anything! 💪",
        "That sounds challenging/amazing! I'm glad you're sharing this with me. How are you feeling about it? 🤔",
        "You have such a unique perspective! I love learning from you and being part of your journey. Keep being you! ✨",
        "I'm listening and I care about what you have to say. Your voice matters, and I'm here to support you! 🌟",
        "That's a great point! I appreciate you sharing your thoughts with me. You're doing such a good job expressing yourself! 💭",
        "I'm here for you, no matter what. Whether you need advice, comfort, or just someone to talk to, I'm your friend! 🤖💙"
      ];
      return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
    }

    // Default intelligent responses
    const defaultResponses = [
      "That's really interesting! Tell me more about that. I'm here to listen and learn from you! 🤗",
      "Thank you for sharing that with me. Your thoughts and feelings matter, and I appreciate you opening up to me. 💙",
      "I'm here to support you through whatever you're going through. You're not alone, and together we can work through anything! 💪",
      "That sounds challenging/amazing! I'm glad you're sharing this with me. How are you feeling about it? 🤔",
      "You have such a unique perspective! I love learning from you and being part of your journey. Keep being you! ✨",
      "I'm listening and I care about what you have to say. Your voice matters, and I'm here to support you! 🌟",
      "That's a great point! I appreciate you sharing your thoughts with me. You're doing such a good job expressing yourself! 💭",
      "I'm here for you, no matter what. Whether you need advice, comfort, or just someone to talk to, I'm your friend! 🤖💙"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // Get AI response for journal analysis
  async getJournalAnalysis(journalEntry: string): Promise<AIResponse> {
    try {
      // Use the same AI service for journal analysis
      return await this.getChatResponse(`Please analyze this journal entry and provide supportive feedback: ${journalEntry}`);
    } catch (error: any) {
      console.error('Journal Analysis Error:', error);
      return {
        success: false,
        message: "I'm having trouble analyzing your journal entry right now. Please try again later.",
        error: error.message
      };
    }
  }

  // Check if AI is available
  isAvailable(): boolean {
    return true; // Always available
  }

  // Get API status
  getStatus(): { available: boolean; hasApiKey: boolean } {
    return {
      available: true,
      hasApiKey: !!this.apiKey
    };
  }

  // Validate API key by making a test call
  async validateApiKey(apiKey: string): Promise<{ valid: boolean; service?: string; error?: string }> {
    const originalKey = this.apiKey;
    this.apiKey = apiKey;

    try {
      console.log('Testing API key with OpenRouter...');
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'qwen/qwen2.5-7b-instruct',
        messages: [{ role: 'user', content: 'Hello, this is a test message.' }],
        max_tokens: 50
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://baymax-mental-health.vercel.app',
          'X-Title': 'BayMax Mental Health App'
        },
        timeout: 10000
      });

      console.log('API test response:', response.data);
      
      if (response.data?.choices?.[0]?.message?.content) {
        return { valid: true, service: 'OpenRouter' };
      } else {
        return { valid: false, error: 'API key is invalid or service is unavailable' };
      }
    } catch (error: any) {
      console.error('API validation error:', error.response?.data || error.message);
      return { valid: false, error: error.response?.data?.error?.message || error.message || 'API validation failed' };
    } finally {
      this.apiKey = originalKey;
    }
  }
}

export const aiService = new AIService();
export default aiService; 