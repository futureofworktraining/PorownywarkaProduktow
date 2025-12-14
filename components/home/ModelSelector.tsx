import React from 'react';
import { ModelType } from '../../types';

interface ModelSelectorProps {
  selectedModel: ModelType;
  onSelect: (model: ModelType) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelect }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-700">
      <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Wybierz model AI:</span>
      <div className="flex bg-gray-200 dark:bg-slate-800 p-1 rounded-lg">
        <button 
          onClick={() => onSelect('gemini-2.5-flash')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            selectedModel === 'gemini-2.5-flash' 
              ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-white' 
              : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'
          }`}
        >
          Gemini 2.5 Flash
        </button>
        <button 
          onClick={() => onSelect('gemini-3-pro-preview')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            selectedModel === 'gemini-3-pro-preview' 
              ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-white' 
              : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'
          }`}
        >
          Gemini 3 Pro
        </button>
      </div>
    </div>
  );
};

export default ModelSelector;
