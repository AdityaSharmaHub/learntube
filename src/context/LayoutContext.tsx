'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LayoutContextType {
  sidebarVisible: boolean;
  toggleSidebar: () => void;
  isLearningMode: boolean;
  toggleLearningMode: () => void;
}

const LayoutContext = createContext<LayoutContextType>({
  sidebarVisible: false,
  toggleSidebar: () => {},
  isLearningMode: false,
  toggleLearningMode: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isLearningMode, setIsLearningMode] = useState(false);
  const pathname = usePathname();
  
  // Hide sidebar automatically on video pages
  useEffect(() => {
    if (pathname?.includes('/video/')) {
      setSidebarVisible(false);
    } else {
      setSidebarVisible(true);
    }
  }, [pathname]);
  
  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };
  
  const toggleLearningMode = () => {
    setIsLearningMode(prev => !prev);
  };
  
  return (
    <LayoutContext.Provider
      value={{
        sidebarVisible,
        toggleSidebar,
        isLearningMode,
        toggleLearningMode,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext; 