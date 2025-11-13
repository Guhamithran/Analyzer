import React from 'react';

interface InputFormProps {
  url: string;
  setUrl: (url: string) => void;
  question: string;
  setQuestion: (question: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ url, setUrl, question, setQuestion, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 space-y-6">
      <div className="space-y-2">
        <label htmlFor="url" className="block text-sm font-medium text-slate-300">
          Target URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="question" className="block text-sm font-medium text-slate-300">
          Your Question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., What are the key features of the product described?"
          required
          rows={3}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-slate-400 disabled:cursor-not-allowed transition duration-300"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
