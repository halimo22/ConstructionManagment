import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Icons
import {
  Home,
  Filter,
  FileText,
  CheckSquare,
  Calendar,
  Users,
  Package,
  DollarSign,
  FileIcon,
  UserIcon,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavItem = ({
    to,
    icon: Icon,
    children
  }: {
    to: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <Link to={to}>
      <div
        className={cn(
          'flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-slate-700 hover:text-white cursor-pointer',
          isActive(to) && 'bg-primary-600 text-white'
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{children}</span>
      </div>
    </Link>
  );

  return (
    <div
      className={cn(
        'bg-slate-800 text-white w-64 fixed h-full overflow-y-auto transition-transform duration-300 ease-in-out z-30',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8 text-amber-500" />
          <h1 className="text-xl font-semibold">WE-BUILD</h1>
        </div>
        <button className="md:hidden" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="p-4">
        <div className="space-y-1">
          <NavItem to="/" icon={Home}>Dashboard</NavItem>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Projects</h3>
          <div className="mt-2 space-y-1">
            <NavItem to="/projects/active-projects" icon={Filter}>Active Projects</NavItem>
            <NavItem to="/projects/project-planning" icon={FileText}>Project Planning</NavItem>
            <NavItem to="/projects/tasks" icon={CheckSquare}>Tasks</NavItem>
            <NavItem to="/projects/timeline" icon={Calendar}>Timeline</NavItem>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Resources</h3>
          <div className="mt-2 space-y-1">
            <NavItem to="/resources/team" icon={Users}>Team</NavItem>
            <NavItem to="/resources/equipment" icon={Package}>Equipment</NavItem>
            <NavItem to="/resources/budget" icon={DollarSign}>Budget</NavItem>
            <NavItem to="/resources/documents" icon={FileIcon}>Documents</NavItem>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Clients</h3>
          <div className="mt-2 space-y-1">
            <NavItem to="/clients/client-list" icon={UserIcon}>Client List</NavItem>
            <NavItem to="/clients/communications" icon={MessageSquare}>Communications</NavItem>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Settings</h3>
          <div className="mt-2 space-y-1">
            <NavItem to="/settings/settings" icon={Settings}>Settings</NavItem>
            <NavItem to="/settings/help-support" icon={HelpCircle}>Help & Support</NavItem>
          </div>
        </div>
      </nav>

      <div className="p-4 mt-8 border-t border-slate-700">
        <Link to="/login">
          <div className="flex items-center space-x-3 text-gray-300 hover:text-white cursor-pointer">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
