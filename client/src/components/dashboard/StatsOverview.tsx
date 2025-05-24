import React from 'react';
import { Link } from 'wouter';
import { Briefcase, Clock, Users, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
  linkText: string;
  linkUrl: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  bgColor,
  linkText,
  linkUrl
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${bgColor} rounded-md p-3`}>
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-semibold text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <div className="text-sm">
        <Link href={linkUrl}>
          <div className="font-medium text-primary-600 hover:text-primary-500 cursor-pointer">{linkText}</div>
        </Link>
      </div>
    </div>
  </div>
);

interface StatsOverviewProps {
  stats: {
    activeProjects: number;
    tasksDueToday: number;
    teamMembers: number;
    budgetUtilized: number;
  };
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ 
  stats = {
    activeProjects: 12,
    tasksDueToday: 8,
    teamMembers: 24,
    budgetUtilized: 1200000
  }
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Projects"
        value={stats.activeProjects}
        icon={<Briefcase className="h-6 w-6 text-primary-600" />}
        bgColor="bg-primary-100"
        linkText="View all"
        linkUrl="/projects/active-projects"
      />
      
      <StatsCard
        title="Tasks Due Today"
        value={stats.tasksDueToday}
        icon={<Clock className="h-6 w-6 text-amber-600" />}
        bgColor="bg-amber-100"
        linkText="View all"
        linkUrl="/projects/tasks"
      />
      
      <StatsCard
        title="Team Members"
        value={stats.teamMembers}
        icon={<Users className="h-6 w-6 text-green-600" />}
        bgColor="bg-green-100"
        linkText="View all"
        linkUrl="/resources/team"
      />
      
      <StatsCard
        title="Total Budget Utilized"
        value={formatCurrency(stats.budgetUtilized)}
        icon={<DollarSign className="h-6 w-6 text-secondary-600" />}
        bgColor="bg-secondary-100"
        linkText="View details"
        linkUrl="/resources/budget"
      />
    </div>
  );
};

export default StatsOverview;
