import React from 'react';

interface SourcesProps {
  sources: Array<{ uri: string; title: string }>;
}

const Sources: React.FC<SourcesProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-slate-700">
      <h4 className="text-sm font-semibold text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-3">
        Źródła informacji (Google Search)
      </h4>
      <div className="flex flex-wrap gap-2">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={source.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-gray-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-gray-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 px-3 py-1 rounded-full transition-colors truncate max-w-xs"
          >
            {source.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sources;
