import React, { useState, useEffect } from 'react';
import { Sun, Moon, Share2, Clock, Calendar, Heart } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react"
const getProgressColor = (progress) => {
  if (progress <= 35) return 'bg-gradient-to-r from-green-400 to-green-500';
  if (progress <= 65) return 'bg-gradient-to-r from-yellow-300 to-yellow-400';
  if (progress <= 80) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
  if (progress <= 90) return 'bg-gradient-to-r from-red-300 to-red-400';
  return 'bg-gradient-to-r from-red-500 to-red-600';
};

const getMeme = (progress) => {
  if (progress <= 25) {
    return {
      text: "Fresh start! We've got this! 💪",
      emoji: "🌱"
    };
  } else if (progress <= 50) {
    return {
      text: "Time flies! But we're still good! 😎",
      emoji: "⏳"
    };
  } else if (progress <= 75) {
    return {
      text: "Getting spicy! Where did the time go? 😅",
      emoji: "🔥"
    };
  } else if (progress <= 90) {
    return {
      text: "Panic mode activated! 😱",
      emoji: "⚡"
    };
  } else {
    return {
      text: "This is fine... 🙃",
      emoji: "🚨"
    };
  }
};

function App() {
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateProgress = () => {
      const startOfYear = new Date('2025-01-01T00:00:00');
      const endOfYear = new Date('2025-12-31T23:59:59');
      const now = new Date();

      const totalYearMilliseconds = endOfYear - startOfYear;
      const elapsedMilliseconds = now - startOfYear;
      const currentPercentage = (elapsedMilliseconds / totalYearMilliseconds) * 100;

      const timeLeftMs = endOfYear - now;
      const days = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);

      setProgress(currentPercentage);
      setPercentage(currentPercentage.toFixed(2));
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: '2025 Year Progress',
        text: `🗓️ ${percentage}% of 2025 is already over! ${getMeme(progress).emoji}`,
        url: window.location.href
      });
    } catch (error) {
      console.log('Sharing failed:', error);
    }
  };

  const meme = getMeme(progress);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} min-h-screen flex flex-col font-light`}>
      {/* Navbar */}
      <nav className={`flex justify-between items-center py-4 px-6 shadow-md ${
        darkMode 
          ? 'bg-gradient-to-r from-purple-900 to-indigo-900' 
          : 'bg-gradient-to-r from-purple-500 to-indigo-500'
      } text-white`}>
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          <h1 className="text-xl font-light tracking-wide">2025 Year Progress</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <Analytics />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h1 className="text-4xl font-light tracking-wide mb-8">2025 Year Progress</h1>
        
        {/* Progress Bar */}
        <div className="w-full max-w-3xl h-8 bg-gray-300 rounded-full overflow-hidden shadow-md mb-4">
          <div
            className={`h-full transition-all duration-1000 ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Progress Stats */}
        <div className="text-center mb-8">
          <p className="text-2xl font-light mb-2">{percentage}% of 2025 is over</p>
          <div className="flex items-center justify-center gap-2 text-lg opacity-75">
            <Clock className="w-5 h-5" />
            <span className="font-light">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s remaining
            </span>
          </div>
        </div>

        {/* Meme Section */}
        <div className={`text-center p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-md`}>
          <p className="text-4xl mb-4">{meme.emoji}</p>
          <p className="text-xl font-light">{meme.text}</p>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${
        darkMode 
          ? 'bg-gradient-to-r from-indigo-900 to-purple-900' 
          : 'bg-gradient-to-r from-indigo-500 to-purple-500'
      } text-white py-4 px-6`}>
        <div className="flex items-center justify-center gap-2">
          <span className="font-light">With</span>
          <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" />
          <span className="font-light">by</span>
          <a 
            href="https://x.com/that_tallguy_1" 
            className="font-medium tracking-wide hover:underline"
          >
            @that_tallguy_1
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;