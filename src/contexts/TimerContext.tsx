import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import useSound from 'use-sound';
import { TimerContextType, TimerMode, TimerSettings } from '../types';
import { getInitialStatistics, updateStatistics } from '../utils/statistics';
import noti from '../../notification.mp3'
import noti1 from '../../notification2.mp3'
const DEFAULT_SETTINGS: TimerSettings = {
  workMinutes: 30,
  breakMinutes: 5,
};

const getStoredSettings = (): TimerSettings => {
  const stored = localStorage.getItem('timerSettings');
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [settings, setSettings] = useState<TimerSettings>(getStoredSettings());
  const [statistics, setStatistics] = useState(getInitialStatistics());
  const [showBreakPrompt, setShowBreakPrompt] = useState(false);
  const [playWorkSound] = useSound(noti);
  const [playBreakSound] = useSound(noti1);

  const getExpiryTimestamp = (minutes: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + minutes * 60);
    return time;
  };

  const {
    seconds,
    minutes,
    isRunning,
    start: startTimer,
    pause: pauseTimer,
    restart,
    
  } = useTimer({
    expiryTimestamp: getExpiryTimestamp(settings.workMinutes),
    onExpire: () => {
      if (mode === 'work') {
        playWorkSound();
        handleWorkComplete();
      } else {
        playBreakSound();
        handleBreakComplete();
      }
    },
    autoStart: false,
  });

  useEffect(() => {
    localStorage.setItem('timerSettings', JSON.stringify(settings));
  }, [settings]);

  const resetTimer = (isRestart=true) => {
    const duration = mode === 'work' ? settings.workMinutes : settings.breakMinutes;
    if(isRestart){
      restart(getExpiryTimestamp(duration));
    }
    console.log('Timer reset', mode, duration);
  };

  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    localStorage.setItem('timerSettings', JSON.stringify(newSettings));
    resetTimer(false);
    console.log('Settings updated', newSettings);
  };

  const handleWorkComplete = () => {
    setShowBreakPrompt(true);
    pauseTimer();
  };

  const handleBreakComplete = () => {
    setMode('work');
    const newStats = updateStatistics(statistics, true);
    setStatistics(newStats);
    localStorage.setItem('eyeHealthStats', JSON.stringify(newStats));
    resetTimer();
  };

  const startBreak = () => {
    setShowBreakPrompt(false);
    setMode('break');
    const time = new Date();
    time.setSeconds(time.getSeconds() + settings.breakMinutes * 60);
    restart(time);
    startTimer();
  };

  const refuseBreak = () => {
    setShowBreakPrompt(false);
    setMode('work');
    const newStats = updateStatistics(statistics, false);
    setStatistics(newStats);
    localStorage.setItem('eyeHealthStats', JSON.stringify(newStats));
    resetTimer();
    startTimer();
  };

  const value: TimerContextType = {
    mode,
    settings,
    statistics,
    isRunning,
    minutes,
    seconds,
    showBreakPrompt,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings,
    handleWorkComplete,
    handleBreakComplete,
    startBreak,
    refuseBreak,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimerHook = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};