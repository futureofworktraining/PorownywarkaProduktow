import React from 'react';
import { HistoryItem } from '../../types';

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12 max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ostatnie porównania
        </h3>
        <button 
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-600 hover:underline transition-colors"
        >
          Wyczyść historię
        </button>
      </div>

      <div className="grid gap-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left group"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-slate-200 mb-1">
                  <span className="truncate max-w-[120px] sm:max-w-[200px]">{item.productAName}</span>
                  <span className="text-gray-400 text-xs">vs</span>
                  <span className="truncate max-w-[120px] sm:max-w-[200px]">{item.productBName}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-slate-500">
                  {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <div className="text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
