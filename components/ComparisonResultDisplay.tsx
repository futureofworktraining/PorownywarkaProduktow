import React from 'react';
import { ComparisonResult } from '../types';
import ProductHeader from './result/ProductHeader';
import CategoryAnalysis from './result/CategoryAnalysis';
import ProsCons from './result/ProsCons';
import Verdict from './result/Verdict';
import Sources from './result/Sources';

interface ComparisonResultDisplayProps {
  result: ComparisonResult;
  onReset: () => void;
}

const ComparisonResultDisplay: React.FC<ComparisonResultDisplayProps> = ({ result, onReset }) => {
  const { data, groundingSources } = result;

  return (
    <div className="animate-fade-in space-y-8">
      
      {/* Product Header VS */}
      <ProductHeader 
        productAName={data.productAName} 
        productBName={data.productBName} 
      />

      {/* Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-slate-700/50">
        <p className="text-lg text-gray-700 dark:text-slate-300 italic text-center leading-relaxed">
          "{data.summary}"
        </p>
      </div>

      {/* Dynamic Categories Visualizer */}
      <CategoryAnalysis categories={data.categories} />

      {/* Pros & Cons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProsCons 
          productName={data.productAName}
          pros={data.prosA}
          cons={data.consA}
          variant="A"
        />
        <ProsCons 
          productName={data.productBName}
          pros={data.prosB}
          cons={data.consB}
          variant="B"
        />
      </div>

      {/* Final Verdict */}
      <Verdict 
        winner={data.finalVerdict.winner}
        productAName={data.productAName}
        productBName={data.productBName}
        explanation={data.finalVerdict.explanation}
      />

      {/* Sources */}
      <Sources sources={groundingSources || []} />
        
      <div className="mt-8 text-center">
        <button
          onClick={onReset}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105"
        >
          Porównaj inne produkty
        </button>
      </div>
    </div>
  );
};

export default ComparisonResultDisplay;
