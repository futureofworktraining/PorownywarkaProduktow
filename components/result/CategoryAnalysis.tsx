import React from 'react';
import { ComparisonCategory } from '../../types';
import ScoreBar from '../common/ScoreBar';

interface CategoryAnalysisProps {
  categories: ComparisonCategory[];
}

const CategoryAnalysis: React.FC<CategoryAnalysisProps> = ({ categories }) => {
  
  const getWinnerColor = (winner: 'A' | 'B' | 'Remis') => {
    if (winner === 'A') return 'text-indigo-600 dark:text-indigo-400';
    if (winner === 'B') return 'text-cyan-600 dark:text-cyan-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white px-2">Analiza Kategorii</h3>
      <div className="grid gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-800 dark:text-gray-200">{cat.name}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 ${getWinnerColor(cat.winner)}`}>
                {cat.winner === 'Remis' ? 'Remis' : `Wygrywa: ${cat.winner === 'A' ? 'A' : 'B'}`}
              </span>
            </div>
            
            <div className="flex gap-4 items-center mb-3">
              <div className="flex-1">
                <ScoreBar 
                  score={cat.scoreA} 
                  colorClass={cat.winner === 'A' || cat.winner === 'Remis' ? 'bg-indigo-500' : 'bg-gray-400 dark:bg-slate-600'} 
                  isLeft={true} 
                />
              </div>
              <div className="flex-1">
                <ScoreBar 
                  score={cat.scoreB} 
                  colorClass={cat.winner === 'B' || cat.winner === 'Remis' ? 'bg-cyan-500' : 'bg-gray-400 dark:bg-slate-600'} 
                  isLeft={false} 
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-slate-400 border-t border-gray-100 dark:border-slate-700 pt-2 mt-2">
              {cat.reasoning}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAnalysis;
