# Smart Burmese Browser & AI Web App

မြန်မာစာစနစ်အပြည့်အသုံးပြုနိုင်သော AI Browser Application

## ✨ Features

- 🔍 **Multi-Search Engine** (Google, Bing, DuckDuckGo)
- 🤖 **Burmese AI Chat** (Gemini API)
- 🐍 **Python Code Editor** with real-time execution
- 🔐 **Secure Password Manager** with encryption
- 📱 **Device System Integration** (GPS, Microphone, Brightness, Sound)
- 🌙 **Dark/Light Theme**
- 🎨 **Floating Animations**
- 🌐 **Multi-language Support** (Google Translate)
- 💾 **Local Storage** with user permission

## 🚀 Setup Instructions

### 1. API Configuration

1. **Gemini API Setup:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create API Key
   - In `app.js`, replace `YOUR_GEMINI_API_KEY_HERE` with your actual key

### 2. Local Development

1. Clone or download this project
2. Open `index.html` in a web browser
3. No build process required!

### 3. GitHub Deployment

**Option 1: GitHub Pages**
1. Create new repository
2. Upload all files
3. Go to Settings → Pages
4. Select "main" branch and "/ (root)" folder
5. Save and access via `https://username.github.io/repo-name`

**Option 2: Render/Vercel**
1. Push to GitHub repository
2. Import to Render/Vercel
3. Select static site deployment
4. Deploy automatically

## 🔧 Configuration

### Changing APIs

In `app.js`, modify these sections:

```javascript
// Gemini API
const GEMINI_API_KEY = 'YOUR_NEW_API_KEY';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Search Engines (add more if needed)
const searchEngines = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    your_engine: 'YOUR_SEARCH_URL'
};
