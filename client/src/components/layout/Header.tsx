import React from 'react';
import { Search, Bell } from 'lucide-react';
import CustomAvatar from '@/components/ui/custom-avatar';
import { useSidebar } from '@/hooks/use-sidebar';

interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ 
  user = { 
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  } 
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="bg-white shadow-sm z-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="md:hidden text-gray-500 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="ml-4 text-lg font-semibold text-gray-700 md:hidden">WE-BUILD</div>
            <div className="ml-4 md:ml-0">
              <div className="relative text-gray-500 focus-within:text-gray-700">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-2 rounded-md text-sm bg-slate-50 border-slate-200 border focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500" 
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center">
              <CustomAvatar 
                src={user.avatar} 
                alt={user.name} 
                size="sm"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline-block">
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
