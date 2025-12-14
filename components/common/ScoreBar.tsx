import React from 'react';

interface ScoreBarProps {
  score: number;
  colorClass: string;
  isLeft?: boolean;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, colorClass, isLeft = true }) => {
  const percentage = score * 10;
  return (
    <div className={`flex items-center gap-2 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      <span className="font-bold text-sm text-gray-700 dark:text-gray-300 w-6 text-center">{score}</span>
      <div className="flex-1 h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%`, marginLeft: isLeft ? 0 : 'auto' }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;
