import React from 'react';

interface ProductInputsProps {
  url1: string;
  url2: string;
  onUrl1Change: (val: string) => void;
  onUrl2Change: (val: string) => void;
}

const ProductInputs: React.FC<ProductInputsProps> = ({ url1, url2, onUrl1Change, onUrl2Change }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="group">
        <label htmlFor="prod1" className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
          Produkt A (Link lub Nazwa)
        </label>
        <div className="relative">
          <input
            id="prod1"
            type="text"
            value={url1}
            onChange={(e) => onUrl1Change(e.target.value)}
            placeholder="https://sklep.pl/produkt-a..."
            className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg py-3 px-4 pl-10 text-gray-900 dark:text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-slate-600 shadow-sm"
          />
          <div className="absolute left-3 top-3.5 text-gray-400 dark:text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
      </div>

      <div className="group">
        <label htmlFor="prod2" className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
          Produkt B (Link lub Nazwa)
        </label>
        <div className="relative">
          <input
            id="prod2"
            type="text"
            value={url2}
            onChange={(e) => onUrl2Change(e.target.value)}
            placeholder="https://sklep.pl/produkt-b..."
            className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg py-3 px-4 pl-10 text-gray-900 dark:text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-slate-600 shadow-sm"
          />
           <div className="absolute left-3 top-3.5 text-gray-400 dark:text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInputs;
