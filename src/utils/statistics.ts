import { Statistics } from '../types';
export const calculateESRI = (
  screenTimeHours: number,
  breakTimeMinutes: number,
  refusalCount: number
): number => {
  const screenTimeImpact = Math.pow(screenTimeHours, 1.5) * 10; // Compounding effect
  const breakTimeImpact = Math.max(0, (60 - breakTimeMinutes) / 60) * 20; // Reduced strain with effective breaks
  const refusalImpact = refusalCount * 20; // Increased penalty for refusals
  return screenTimeImpact + refusalImpact - breakTimeImpact;
};

export const getESRIMessage = (statistics: Statistics): string => {
  if (statistics.workCycles < 3) {
    return "Complete at least 3 work cycles for personalized insights.";
  }

  const refusalRate = (statistics.refusalCount / statistics.totalReminders) * 100;

  if (refusalRate > 50 && statistics.refusalCount > 2) {
    return "You're skipping too many breaks. Frequent refusals can significantly increase eye strain and worsen vision.";
  }

  if (statistics.esriScore > 60) {
    return "High strain detected! Ignoring breaks puts you at risk for chronic eye fatigue and myopia progression.";
  }

  if (statistics.esriScore >= 30) {
    return "Your screen time is starting to strain your eyes. Increase your break frequency to reduce risk.";
  }

  return "Great job taking breaks! Keep it up to protect your vision.";
};

export const getESRIInsight = (statistics: Statistics): string => {
  if (statistics.workCycles < 3) {
    return "Keep using the app to receive personalized health insights based on your usage patterns.";
  }

  const refusalRate = (statistics.refusalCount / statistics.totalReminders) * 100;

  if (refusalRate > 50 && statistics.refusalCount > 2) {
    return "Consistently refusing breaks puts significant strain on your eyes, potentially worsening your visual clarity by up to 15% temporarily.";
  }

  if (statistics.esriScore > 60) {
    return "High screen time and refusal to take breaks increase the risk of Computer Vision Syndrome. Skipping breaks frequently can lead to a 20% annual increase in myopia progression.";
  }

  if (statistics.esriScore >= 30) {
    return "Prolonged screen time without adequate breaks can cause digital eye strain. Reduce screen exposure and take breaks every 20 minutes.";
  }

  return "Your eye health is in a good range. Continue following the 20-20-20 rule to maintain it.";
};

export const updateStatistics = (
  currentStats: Statistics,
  breakTaken: boolean = true,
  screenTimeIncrement: number = 0.33 // 20 minutes in hours
): Statistics => {
  const newScreenTime = currentStats.screenTimeHours + screenTimeIncrement;
  const newBreakTime = breakTaken ? currentStats.breakTimeMinutes + 5 : currentStats.breakTimeMinutes;
  const newRefusalCount = breakTaken ? currentStats.refusalCount : currentStats.refusalCount + 1;
  const newTotalReminders = currentStats.totalReminders + 1;
  const newWorkCycles = currentStats.workCycles + 1;

  const newESRI = calculateESRI(newScreenTime, newBreakTime, newRefusalCount);

  const refusalHistory = [...currentStats.refusalHistory];
  if (!breakTaken) {
    refusalHistory.push({
      timestamp: new Date().toISOString(),
      esriImpact: newESRI - currentStats.esriScore,
    });
  }

  return {
    ...currentStats,
    breaksCompleted: breakTaken ? currentStats.breaksCompleted + 1 : currentStats.breaksCompleted,
    screenTimeAvoided: breakTaken ? currentStats.screenTimeAvoided + 5 : currentStats.screenTimeAvoided,
    lastBreakTime: new Date().toISOString(),
    refusalCount: newRefusalCount,
    totalReminders: newTotalReminders,
    screenTimeHours: newScreenTime,
    breakTimeMinutes: newBreakTime,
    esriScore: newESRI,
    workCycles: newWorkCycles,
    refusalHistory,
  };
};

export const getInitialStatistics = (): Statistics => {
  const savedStats = localStorage.getItem('eyeHealthStats');
  if (savedStats) {
    return JSON.parse(savedStats);
  }
  return {
    breaksCompleted: 0,
    screenTimeAvoided: 0,
    lastBreakTime: new Date().toISOString(),
    refusalCount: 0,
    totalReminders: 0,
    screenTimeHours: 0,
    breakTimeMinutes: 0,
    esriScore: 0,
    workCycles: 0,
    refusalHistory: [],
  };
};