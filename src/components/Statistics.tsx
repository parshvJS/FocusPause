import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Statistics as StatsType } from '../types';

interface StatisticsProps {
  statistics: StatsType;
}

export const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  const data = [
    {
      name: 'Breaks',
      value: statistics.breaksCompleted,
    },
    {
      name: 'Minutes Saved',
      value: Math.floor(statistics.screenTimeAvoided / 60),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};