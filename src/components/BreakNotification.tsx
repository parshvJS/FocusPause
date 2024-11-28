import React from 'react';
import { AlertCircle, ThumbsDown, ThumbsUp } from 'lucide-react';

interface BreakNotificationProps {
  onAccept: () => void;
  onRefuse: () => void;
  message: string;
}

export const BreakNotification: React.FC<BreakNotificationProps> = ({
  onAccept,
  onRefuse,
  message,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertCircle className="text-yellow-500 mr-2" size={24} />
          <h2 className="text-xl font-bold">Time for a Break!</h2>
        </div>
        
        <p className="mb-6 text-gray-600 dark:text-gray-300">{message}</p>
        
        <div className="flex space-x-4">
          <button
            onClick={onAccept}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <ThumbsUp size={18} className="mr-2" />
            Take Break
          </button>
          
          <button
            onClick={onRefuse}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <ThumbsDown size={18} className="mr-2" />
            Skip Break
          </button>
        </div>
      </div>
    </div>
  );
};