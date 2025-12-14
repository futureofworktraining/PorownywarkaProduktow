import React from 'react';
import { ModelType } from '../../types';

interface LoadingStateProps {
  selectedModel: ModelType;
}

const LoadingState: React.FC<LoadingStateProps> = ({ selectedModel }) => {
  return (
    <div className="mt-12 text-center space-y-4 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6 mx-auto"></div>
      <p className="text-indigo-600 dark:text-indigo-300 mt-4 text-sm animate-bounce">
        Przeszukuję internet w poszukiwaniu najlepszych ofert używając {selectedModel === 'gemini-3-pro-preview' ? 'Gemini 3 Pro' : 'Gemini 2.5 Flash'}...
      </p>
    </div>
  );
};

export default LoadingState;
