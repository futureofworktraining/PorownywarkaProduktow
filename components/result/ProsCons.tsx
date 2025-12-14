import React from 'react';

interface ProsConsProps {
  productName: string;
  pros: string[];
  cons: string[];
  variant: 'A' | 'B';
}

const ProsCons: React.FC<ProsConsProps> = ({ productName, pros, cons, variant }) => {
  const isA = variant === 'A';
  const borderColor = isA ? 'border-indigo-500' : 'border-cyan-500';
  const titleColor = isA ? 'text-indigo-600 dark:text-indigo-400' : 'text-cyan-600 dark:text-cyan-400';

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border-t-4 ${borderColor}`}>
      <h4 className={`font-bold ${titleColor} mb-4 border-b border-gray-100 dark:border-slate-700 pb-2`}>
        {productName}
      </h4>
      
      <div className="mb-4">
        <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">Zalety</span>
        <ul className="mt-2 space-y-1">
          {pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
              <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <span className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wide">Wady</span>
        <ul className="mt-2 space-y-1">
          {cons.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
              <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProsCons;
