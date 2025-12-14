import React from 'react';

interface VerdictProps {
  winner: 'A' | 'B' | 'Remis';
  productAName: string;
  productBName: string;
  explanation: string;
}

const Verdict: React.FC<VerdictProps> = ({ winner, productAName, productBName, explanation }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl p-1 shadow-lg">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 md:p-6 text-center">
        <h3 className="text-sm uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 font-black mb-3">
          Ostateczny Werdykt
        </h3>
        
        <div className="mb-4">
          {winner === 'Remis' ? (
             <span className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Remis / To zależy</span>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 dark:text-slate-400 mb-1">Zwycięzca</span>
              <span className={`text-3xl md:text-4xl font-bold leading-tight ${winner === 'A' ? 'text-indigo-600' : 'text-cyan-600'}`}>
                {winner === 'A' ? productAName : productBName}
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
          {explanation}
        </p>
      </div>
    </div>
  );
};

export default Verdict;
