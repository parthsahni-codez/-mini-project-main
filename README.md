# BayMax - Mental Health AI Companion 🤖💙

A compassionate AI-powered mental health companion built with React, TypeScript, and Tailwind CSS. BayMax provides emotional support, stress management, and wellness tracking in a beautiful, accessible interface.

## ✨ Features

- **🤖 AI Chat Companion** - Intelligent conversations with real AI or smart fallbacks
- **📝 Journal & Mood Tracking** - Track your daily thoughts and emotions
- **🎯 Habit Tracker** - Build positive habits and track progress
- **😴 Sleep Tracker** - Monitor your sleep patterns
- **🧘 Breathing Exercises** - Guided relaxation techniques
- **📊 Progress Overview** - Visual insights into your wellness journey
- **🌙 Dark/Light Theme** - Comfortable viewing in any lighting
- **📱 Responsive Design** - Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd miniPro

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see BayMax in action!

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite app
   - Click "Deploy"

3. **Environment Variables** (Optional)
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add any API keys you want to use

### Option 2: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder
   - Or connect your GitHub repository

### Option 3: GitHub Pages

1. **Add GitHub Pages dependency**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Configuration

### AI Integration
BayMax works with or without AI API keys:

- **With API Key**: Uses advanced AI models (OpenAI, Claude, Gemini)
- **Without API Key**: Uses intelligent keyword detection and smart responses

To add an API key:
1. Get a key from [OpenAI](https://platform.openai.com/api-keys), [Anthropic](https://console.anthropic.com/), or [Google Gemini](https://makersuite.google.com/app/apikey)
2. Go to AI Configuration in the app
3. Enter your API key and test the connection

### Environment Variables
Create a `.env` file for local development:
```env
VITE_AI_API_KEY=your_api_key_here
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **AI Integration**: OpenAI, Anthropic Claude, Google Gemini
- **State Management**: React Hooks
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React

## 📱 Features in Detail

### AI Chat Companion
- Real AI responses with API keys
- Intelligent fallback system
- Conversation memory
- Empathetic, supportive responses

### Wellness Tracking
- Daily mood tracking
- Sleep pattern monitoring
- Habit formation support
- Progress visualization

### User Experience
- Beautiful, accessible design
- Dark/light theme toggle
- Mobile-responsive layout
- Smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 💙 Support

BayMax is designed to provide mental health support, but it's not a replacement for professional help. If you're experiencing a mental health crisis, please contact a mental health professional or crisis hotline.

---

**Built with ❤️ for better mental health support**
