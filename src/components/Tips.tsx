import React from 'react';
import { Lightbulb } from 'lucide-react';

const tips = [
  "Blink often to keep your eyes moist",
  "Adjust screen brightness to match surroundings",
  "Maintain proper posture while working",
  "Use the 20-20-20 rule regularly",
  "Keep your screen at arm's length",
];

export const Tips: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Lightbulb className="mr-2" /> Eye Health Tips
      </h2>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};