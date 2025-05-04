'use client'

import React from 'react';
import { useLayout } from '@/context/LayoutContext';
import Header from './Header';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { sidebarVisible, toggleSidebar } = useLayout();
  const pathname = usePathname();
  
  // Check if we're on a video page
  const isVideoPage = pathname?.includes('/video/');

  return (
    <div className="flex flex-col h-screen">
      <Header sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar isVisible={sidebarVisible} onClose={toggleSidebar} />
        <main className={`flex-1 overflow-y-auto pt-14 ${!isVideoPage && 'sm:pl-[240px]'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout; 