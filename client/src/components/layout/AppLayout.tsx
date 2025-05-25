import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSidebar } from '@/hooks/use-sidebar';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 ease-in-out">
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
