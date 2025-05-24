import React from 'react';
import { Link } from 'wouter';
import CustomAvatar from '@/components/ui/custom-avatar';
import { formatDateTime } from '@/lib/utils';

interface Activity {
  id: number;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  action: string;
  details: string;
  projectLink?: {
    id: number;
    name: string;
  };
  timestamp: string | Date;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities = [] }) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">System Updates</h3>
            <div className="flex space-x-4">
              <Link href="/activities">
                <a className="text-sm font-medium text-primary-600 hover:text-primary-500">View all</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="px-6 py-5">
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <CustomAvatar
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      size="md"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      <Link href={`/users/${activity.user.id}`}>
                        <a className="hover:underline">{activity.user.name}</a>
                      </Link>
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.action} {activity.projectLink && (
                        <>
                          <Link href={`/projects/${activity.projectLink.id}`}>
                            <a className="font-medium text-gray-900 hover:underline">{activity.projectLink.name}</a>
                          </Link>
                        </>
                      )}
                      {!activity.projectLink && activity.details}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>{formatDateTime(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
