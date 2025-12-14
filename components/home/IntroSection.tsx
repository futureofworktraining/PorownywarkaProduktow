import React from 'react';

const IntroSection: React.FC = () => {
  return (
    <div className="text-center mb-12 animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
        Porównaj cokolwiek <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
          w kilka sekund
        </span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
        Wklej linki do dwóch produktów, a nasza AI przeanalizuje je, sprawdzi ceny i doradzi, co wybrać.
      </p>
    </div>
  );
};

export default IntroSection;
