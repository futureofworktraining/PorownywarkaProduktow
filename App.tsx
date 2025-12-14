import React, { useState, useEffect } from 'react';
import ProductInputs from './components/ProductInputs';
import PreferenceSelector from './components/PreferenceSelector';
import ComparisonResultDisplay from './components/ComparisonResultDisplay';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import IntroSection from './components/home/IntroSection';
import ModelSelector from './components/home/ModelSelector';
import LoadingState from './components/home/LoadingState';
import HistoryList from './components/history/HistoryList';
import { ProductPreferences, ComparisonStatus, ComparisonResult, ModelType, HistoryItem } from './types';
import { compareProducts } from './services/geminiService';

const App: React.FC = () => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [preferences, setPreferences] = useState<ProductPreferences>({
    priorities: [],
    customDescription: '',
  });
  const [status, setStatus] = useState<ComparisonStatus>(ComparisonStatus.IDLE);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Model State
  const [selectedModel, setSelectedModel] = useState<ModelType>('gemini-2.5-flash');

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme class to HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load History from LocalStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('product_compare_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (newResult: ComparisonResult) => {
    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      productAName: newResult.data.productAName,
      productBName: newResult.data.productBName,
      result: newResult
    };

    const updatedHistory = [newItem, ...history].slice(0, 10); // Keep last 10
    setHistory(updatedHistory);
    localStorage.setItem('product_compare_history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('product_compare_history');
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setResult(item.result);
    setStatus(ComparisonStatus.SUCCESS);
    // Optionally pre-fill inputs visually, though we are showing result
    setUrl1(item.productAName); // Just showing names in input for context
    setUrl2(item.productBName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompare = async () => {
    if (!url1.trim() || !url2.trim()) {
      setErrorMsg('Proszę wprowadzić oba linki lub nazwy produktów.');
      return;
    }

    setStatus(ComparisonStatus.LOADING);
    setErrorMsg(null);
    setResult(null);

    try {
      const data = await compareProducts(url1, url2, preferences, selectedModel);
      setResult(data);
      setStatus(ComparisonStatus.SUCCESS);
      saveToHistory(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Wystąpił nieoczekiwany błąd.');
      setStatus(ComparisonStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(ComparisonStatus.IDLE);
    setResult(null);
    setErrorMsg(null);
    setUrl1('');
    setUrl2('');
    setPreferences({ priorities: [], customDescription: '' });
  };

  return (
    <div className="min-h-screen pb-12 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-200 transition-colors duration-300">
      
      <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-10">
        
        {status === ComparisonStatus.IDLE && (
          <>
            <IntroSection />
          </>
        )}

        {/* Input Form Section */}
        {status !== ComparisonStatus.SUCCESS && (
          <div className={`space-y-8 transition-opacity duration-500 ${status === ComparisonStatus.LOADING ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div className="bg-white/80 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700 shadow-xl backdrop-blur-sm transition-colors duration-300">
              
              <ModelSelector selectedModel={selectedModel} onSelect={setSelectedModel} />

              <ProductInputs 
                url1={url1}
                url2={url2}
                onUrl1Change={setUrl1}
                onUrl2Change={setUrl2}
              />
              
              <PreferenceSelector 
                preferences={preferences}
                onChange={setPreferences}
              />

              {errorMsg && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleCompare}
                  disabled={status === ComparisonStatus.LOADING}
                  className="group relative w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <span className="flex items-center justify-center gap-2">
                    {status === ComparisonStatus.LOADING ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analizuję...
                      </>
                    ) : (
                      <>
                        Porównaj Produkty
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
            
            {/* Show History only when IDLE and not loading */}
            {status === ComparisonStatus.IDLE && (
              <HistoryList 
                history={history} 
                onSelect={handleSelectHistoryItem}
                onClear={clearHistory}
              />
            )}
          </div>
        )}

        {status === ComparisonStatus.LOADING && <LoadingState selectedModel={selectedModel} />}

        {status === ComparisonStatus.SUCCESS && result && (
          <ComparisonResultDisplay result={result} onReset={handleReset} />
        )}

      </main>

      <Footer />
    </div>
  );
};

export default App;
