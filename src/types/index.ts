export type TimerMode = 'work' | 'break';

export interface TimerSettings {
  workMinutes: number;
  breakMinutes: number;
}

export interface Statistics {
  breaksCompleted: number;
  screenTimeAvoided: number;
  lastBreakTime: string;
  refusalCount: number;
  totalReminders: number;
  screenTimeHours: number;
  breakTimeMinutes: number;
  esriScore: number;
  workCycles: number;
  refusalHistory: Array<{
    timestamp: string;
    esriImpact: number;
  }>;
}

export interface TimerContextType {
  mode: TimerMode;
  settings: TimerSettings;
  statistics: Statistics;
  isRunning: boolean;
  minutes: number;
  seconds: number;
  showBreakPrompt: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateSettings: (settings: TimerSettings) => void;
  handleWorkComplete: () => void;
  handleBreakComplete: () => void;
  startBreak: () => void;
  refuseBreak: () => void;
}