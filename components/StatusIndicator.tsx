import React from 'react';
import { AnalysisState, StatusStep } from '../types';
import CheckIcon from './icons/CheckIcon';
import SpinnerIcon from './icons/SpinnerIcon';
import CircleIcon from './icons/CircleIcon';

interface StatusIndicatorProps {
  currentState: AnalysisState;
}

const statusStep: StatusStep = { key: 'analyzing', label: 'Analyzing with AI' };

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ currentState }) => {

  const getStatusIcon = () => {
    if (currentState === 'error') {
      return <div className="text-red-500 w-6 h-6 flex items-center justify-center font-bold text-xl">!</div>;
    }
    if (currentState === 'success') {
      return <CheckIcon className="w-6 h-6 text-green-400" />;
    }
    if (currentState === 'analyzing') {
      return <SpinnerIcon className="w-6 h-6 text-indigo-400" />;
    }
    return <CircleIcon className="w-6 h-6 text-slate-500" />;
  };

  const getTextColor = () => {
    if (currentState === 'error') {
        return "text-red-400";
    }
    if (currentState === 'success') {
      return "text-green-400";
    }
    if (currentState === 'analyzing') {
      return "text-indigo-300";
    }
    return "text-slate-400";
  };


  return (
    <div>
        <div key={statusStep.key} className="flex items-center space-x-4 transition-all duration-300">
          <div className="transition-transform duration-300">
             {getStatusIcon()}
          </div>
          <span className={`font-medium transition-colors duration-300 ${getTextColor()}`}>
            {statusStep.label}
          </span>
        </div>
    </div>
  );
};

export default StatusIndicator;
