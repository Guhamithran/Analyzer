import React from 'react';
import { GroundingChunk } from '../types';

interface ResultDisplayProps {
  result: string;
  sources: GroundingChunk[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, sources }) => {
  // Simple function to format the URL for display
  const formatUrl = (uri: string) => {
    try {
      const url = new URL(uri);
      return url.hostname + (url.pathname.length > 1 ? url.pathname : '');
    } catch {
      return uri;
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 animate-fade-in">
        <div className="p-4 sm:p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-slate-100">Analysis Result</h2>
        </div>
        <div className="p-4 sm:p-6">
            <div className="prose prose-invert prose-slate max-w-none text-slate-300 
                            prose-p:mb-4 prose-p:leading-relaxed
                            prose-headings:text-slate-100 prose-strong:text-slate-100 prose-a:text-indigo-400">
                {result.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
        {sources && sources.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-700">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">Sources</h3>
                <ul className="space-y-2">
                    {sources.filter(source => source.web && source.web.uri).map((source, index) => (
                        <li key={index} className="flex items-center">
                           <a 
                             href={source.web.uri} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             title={source.web.title}
                             className="text-indigo-400 hover:text-indigo-300 truncate transition-colors duration-200 text-sm"
                           >
                            {formatUrl(source.web.uri)}
                           </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
};

export default ResultDisplay;
