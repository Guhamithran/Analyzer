import React, { useState, useCallback, useRef } from 'react';
import { analyzeContent } from './services/geminiService';
import { AnalysisState, GroundingChunk } from './types';
import InputForm from './components/InputForm';
import StatusIndicator from './components/StatusIndicator';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('https://gemini.google.com/faq');
  const [question, setQuestion] = useState<string>('What is Gemini? Explain its different model sizes.');
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [result, setResult] = useState<string>('');
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalysis = useCallback(async () => {
    if (!url || !question) {
      setError('Please provide both a URL and a question.');
      return;
    }
    setError(null);
    setResult('');
    setSources([]);
    setAnalysisState('analyzing');

    try {
      const { answer, sources } = await analyzeContent(url, question);
      setResult(answer);
      setSources(sources || []);
      setAnalysisState('success');
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during analysis.';
      setError(errorMessage);
      setAnalysisState('error');
    }
  }, [url, question]);

  const isLoading = analysisState === 'analyzing';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            Advanced Link Analysis
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Deep contextual question answering from web content.
          </p>
        </header>

        <main className="space-y-8">
          <InputForm 
            url={url}
            setUrl={setUrl}
            question={question}
            setQuestion={setQuestion}
            onSubmit={handleAnalysis}
            isLoading={isLoading}
          />

          {(isLoading || analysisState === 'success' || analysisState === 'error') && (
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 animate-fade-in">
              <StatusIndicator currentState={analysisState} />
            </div>
          )}

          {error && analysisState === 'error' && (
            <div className="bg-red-900/50 text-red-300 p-4 rounded-lg border border-red-700 animate-fade-in">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {result && analysisState === 'success' && (
             <div ref={resultRef}>
                <ResultDisplay result={result} sources={sources}/>
             </div>
          )}

        </main>
        
        <footer className="text-center mt-12 text-slate-500">
            <p>Powered by Gemini API with Google Search grounding.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;