import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSidebar } from '@/hooks/use-sidebar';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 ease-in-out">
        {/* Top Navigation */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          {(title || subtitle) && (
            <div className="mb-6">
              {title && <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
              {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
            </div>
          )}
          
          {/* Main Content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
