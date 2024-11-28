import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Statistics } from '../types';
import { getESRIMessage, getESRIInsight } from '../utils/statistics';

interface HealthDashboardProps {
  statistics: Statistics;
}
const getRiskLevel = (score: number) => {
  if (score <= 20) return { level: 'Low Risk', color: 'bg-green-500/70', message: 'Your eye strain risk is low. Keep up the good work!' };
  if (score <= 40) return { level: 'Moderate Risk', color: 'bg-yellow-500/60', message: 'Your eye strain risk is moderate. Consider taking more breaks.' };
  if (score <= 60) return { level: 'High Risk', color: 'bg-blue-500/60', message: 'Your eye strain risk is high. It is recommended to take frequent breaks.' };
  return { level: 'Very High Risk', color: 'bg-red-500/70', message: 'Your eye strain risk is very high. Immediate action is required to reduce strain.' };
};
const COLORS = ['#4CAF50', '#F44336'];

export const HealthDashboard: React.FC<HealthDashboardProps> = ({ statistics }) => {
  const showMetrics = statistics.workCycles >= 3;
  const esriMessage = getESRIMessage(statistics);
  const insight = getESRIInsight(statistics);
  const riskLevel = getRiskLevel(statistics.esriScore);

  const refusalData = statistics.refusalHistory.slice(-7).map((refusal) => ({
    date: new Date(refusal.timestamp).toLocaleDateString(),
    impact: refusal.esriImpact,
  }));

  const complianceData = [
    { name: 'Breaks Taken', value: statistics.breaksCompleted },
    { name: 'Breaks Skipped', value: statistics.refusalCount },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Eye Health Dashboard</h2>
        <div className="p-4 rounded-md bg-blue-100 dark:bg-blue-900">
          <p className="font-medium mb-2">{esriMessage}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{insight}</p>
        </div>
      </div>

      {showMetrics && (
        <>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Eye Strain Risk Index Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={refusalData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="impact" stroke="#3B82F6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className={`mt-6 p-4 rounded-md ${riskLevel.color}`}>
                <h3 className="text-xl text-white font-semibold mb-2  font-">Current Risk Level</h3>
                <p className={`text-lg font-bold  text-white`}>{riskLevel.level}</p>
                <p className='text-white'>{riskLevel.message}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Break Compliance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Eye Strain Risk Index Score</p>
                <p className="text-xl font-bold">{Math.round(statistics.esriScore)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Work Cycles</p>
                <p className="text-xl font-bold">{statistics.workCycles}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};