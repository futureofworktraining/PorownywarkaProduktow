import React from 'react';
import { ProductPreferences } from '../types';

interface PreferenceSelectorProps {
  preferences: ProductPreferences;
  onChange: (newPrefs: ProductPreferences) => void;
}

const PRIORITY_OPTIONS = [
  { id: 'price', label: 'Cena' },
  { id: 'quality', label: 'Jakość wykonania' },
  { id: 'performance', label: 'Wydajność' },
  { id: 'features', label: 'Funkcje' },
  { id: 'design', label: 'Design' },
  { id: 'brand', label: 'Marka' },
  { id: 'durability', label: 'Trwałość' },
  { id: 'eco', label: 'Ekologia' },
];

const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({ preferences, onChange }) => {
  const togglePriority = (id: string) => {
    const current = preferences.priorities;
    const isSelected = current.includes(id);
    const newPriorities = isSelected
      ? current.filter((p) => p !== id)
      : [...current, id];
    
    onChange({ ...preferences, priorities: newPriorities });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...preferences, customDescription: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Twoje Preferencje</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-3">
          Co jest dla Ciebie najważniejsze? (Wybierz kilka)
        </label>
        <div className="flex flex-wrap gap-2">
          {PRIORITY_OPTIONS.map((option) => {
            const isSelected = preferences.priorities.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => togglePriority(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-400'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="customDesc" className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">
          Opisz swoje potrzeby (opcjonalnie)
        </label>
        <textarea
          id="customDesc"
          rows={3}
          value={preferences.customDescription}
          onChange={handleTextChange}
          placeholder="np. Szukam laptopa głównie do gier, ale zależy mi też na baterii..."
          className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg p-3 text-gray-900 dark:text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-slate-600 resize-none"
        />
      </div>
    </div>
  );
};

export default PreferenceSelector;
