import React, { useState, useEffect } from 'react';
import { Clock, Save } from 'lucide-react';
import { useTimerHook } from '../contexts/TimerContext';

export const TimerCustomization: React.FC = () => {
  const { settings, updateSettings } = useTimerHook();
  const [workMinutes, setWorkMinutes] = useState(settings.workMinutes);
  const [breakMinutes, setBreakMinutes] = useState(settings.breakMinutes);

  useEffect(() => {
    setWorkMinutes(settings.workMinutes);
    setBreakMinutes(settings.breakMinutes);
  }, [settings]);

  const handleSave = () => {
    updateSettings({
      workMinutes,
      breakMinutes,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Clock className="mr-2" /> Customize Timer
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Work Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={workMinutes}
            onChange={(e) => setWorkMinutes(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Break Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="15"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Save size={18} className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};
