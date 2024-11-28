import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { useTimerHook } from '../contexts/TimerContext';

export const Timer: React.FC = () => {
  const {
    mode,
    minutes,
    seconds,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimerHook();

  const bgColor = mode === 'work' ? 'bg-blue-500' : 'bg-green-500';
  const modeText = mode === 'work' 
    ? 'Work Time: Stay Focused and Productive' 
    : 'Break Time: Reset Your Eyes | Step away from the screen and look at a distant object';

  const handlePlayPause = () => {
    if (minutes === 0 && seconds === 0) {
      resetTimer();
    }
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className={`${mode === 'break' ? 'bg-green-100' : 'bg-blue-100'} dark:bg-opacity-10 rounded-lg p-2 mb-4`}>
        <p className="text-center font-medium">{modeText}</p>
      </div>
      
      <div className="text-6xl font-bold text-center mb-4 font-mono">
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={handlePlayPause}
          className={`p-2 rounded-full font-semibold flex items-center gap-2 ${bgColor} hover:opacity-90 text-white`}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        
        <button
          onClick={resetTimer}
          className="p-2 rounded-full flex gap-2 items-center bg-gray-500 hover:bg-gray-600 text-white"
        >
          <RefreshCw size={24} />
          <p className='font-semibold'>Reset</p>
        </button>
      </div>
    </div>
  );
};