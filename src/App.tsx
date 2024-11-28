import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Timer } from './components/Timer';
import { TimerCustomization } from './components/TimerCustomization';
import { BreakNotification } from './components/BreakNotification';
import { HealthDashboard } from './components/HealthDashboard';
import { Tips } from './components/Tips';
import { getRandomQuote } from './utils/quotes';
import { TimerProvider } from './contexts/TimerContext';
import { useTimerHook } from './contexts/TimerContext';
import SVG from './public/github.svg'
function AppContent() {

  const isDarkModeLocal = JSON.parse(localStorage.getItem('darkMode') || "false")
  const [darkMode, setDarkMode] = useState(isDarkModeLocal);
  const [quote, setQuote] = useState(getRandomQuote());
  const { mode, statistics, startBreak, refuseBreak, showBreakPrompt } = useTimerHook();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      localStorage.setItem('darkMode', 'false');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAcceptBreak = () => {
    startBreak();
    setQuote(getRandomQuote());
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Focus Pause</h1>
            <p>

              Caring for your eyes, one break at a time.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <a target='_blank' href="https://github.com/parshvJS/FocusPause">
              <div className='flex gap-2 items-center dark:bg-gray-700 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full px-2 py-1 font-semibold '>
                <img src={SVG} alt="" width={32} />
                <p>Star On Github</p>
              </div>
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Timer />

            <div className="bg-blue-200 dark:bg-blue-900 animate-pulse p-4 rounded-lg">
              <p className="text-center italic">{quote}</p>
            </div>

            <HealthDashboard statistics={statistics} />
          </div>

          <div className="space-y-6">
            <TimerCustomization />
            <Tips />
          </div>
        </div>
      </div>

      {showBreakPrompt && (
        <BreakNotification
          onAccept={handleAcceptBreak}
          onRefuse={refuseBreak}
          message="It's time to take a break! Looking at something 20 feet away helps reduce eye strain."
        />
      )}
    </div>
  );
}

function App() {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
}

export default App;