import React from 'react';
import { useLayout } from '@/context/LayoutContext';

interface LearningModeToggleProps {
  className?: string;
}

const LearningModeToggle: React.FC<LearningModeToggleProps> = ({ className = '' }) => {
  const { isLearningMode, toggleLearningMode } = useLayout();
  
  return (
    <button
      onClick={toggleLearningMode}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isLearningMode 
          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
          : 'bg-white border border-gray-300 hover:bg-gray-100'
      } ${className}`}
      aria-pressed={isLearningMode}
    >
      <svg 
        className="w-5 h-5" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
      <span className="font-medium">{isLearningMode ? 'Exit Learning Mode' : 'Learning Mode'}</span>
      
      {/* Subtle animation for the toggle state */}
      <div className={`w-2 h-2 rounded-full ml-1 transition-all ${
        isLearningMode ? 'bg-white animate-pulse' : 'bg-gray-400'
      }`}></div>
    </button>
  );
};

export default LearningModeToggle; 