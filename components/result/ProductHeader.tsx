import React from 'react';

interface ProductHeaderProps {
  productAName: string;
  productBName: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ productAName, productBName }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500"></div>
      
      <div className="flex-1 text-center md:text-left z-10">
        <h3 className="text-sm uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-1">Produkt A</h3>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white break-words">{productAName}</h2>
      </div>

      <div className="z-10 flex flex-col items-center justify-center w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full shrink-0 font-black text-xl text-gray-400 dark:text-slate-500 border-4 border-white dark:border-slate-800 shadow-sm">
        VS
      </div>

      <div className="flex-1 text-center md:text-right z-10">
        <h3 className="text-sm uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold mb-1">Produkt B</h3>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white break-words">{productBName}</h2>
      </div>
    </div>
  );
};

export default ProductHeader;
