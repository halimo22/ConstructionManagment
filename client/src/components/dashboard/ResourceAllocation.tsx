import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Use React Router instead of Wouter
import ProgressBar from '@/components/ui/progress-bar';
import CustomAvatar from '@/components/ui/custom-avatar';

interface TeamMember {
  id: number;
  avatar: string;
}

interface ProjectResource {
  id: number;
  projectName: string;
  teamMembers: TeamMember[];
  teamMemberCount: number;
  equipmentUtilization: number;
}

interface ResourceAllocationProps {
  resources: ProjectResource[];
}

const ResourceAllocation: React.FC<ResourceAllocationProps> = ({ resources = [] }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Resource Allocation</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {resources.map((resource) => (
            <div key={resource.id}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-700">{resource.projectName}</h4>
                <span className="text-xs text-gray-500">{resource.teamMemberCount} team members</span>
              </div>
              <div className="flex -space-x-2 overflow-hidden">
                {resource.teamMembers.slice(0, 4).map((member) => (
                  <img
                    key={member.id}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src={member.avatar}
                    alt={`Team member ${member.id}`}
                  />
                ))}
                {resource.teamMemberCount > 4 && (
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 ring-2 ring-white">
                    <span className="text-xs font-medium text-gray-700">
                      +{resource.teamMemberCount - 4}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                  <span>Equipment Utilization</span>
                  <span>{resource.equipmentUtilization}%</span>
                </div>
                <ProgressBar 
                  value={resource.equipmentUtilization} 
                  showPercentage={false}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3">
        <div className="text-sm">
          <Link to="/resources/team" className="font-medium text-primary-600 hover:text-primary-500">
            Manage resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;
