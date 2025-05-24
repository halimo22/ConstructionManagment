import React from 'react';
import { Link } from 'wouter';
import { formatDate, getStatusColor } from '@/lib/utils';
import ProgressBar from '@/components/ui/progress-bar';

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  deadline: string | Date;
  progress: number;
}

interface ProjectProgressProps {
  projects: Project[];
  showingCount?: number;
  totalCount?: number;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({
  projects = [],
  showingCount = 4,
  totalCount = 12
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Project Progress</h2>
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => {
                  const statusColors = getStatusColor(project.status);
                  
                  let progressColor: 'green' | 'amber' | 'red' = 'green';
                  if (project.status === 'At Risk') {
                    progressColor = 'amber';
                  } else if (project.status === 'Delayed') {
                    progressColor = 'red';
                  }

                  return (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{project.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors.bg} ${statusColors.text}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(project.deadline)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ProgressBar 
                          value={project.progress} 
                          size="md"
                          color={progressColor}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/projects/${project.id}`}>
                          <a className="text-primary-600 hover:text-primary-900">View</a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
          <div className="text-sm text-gray-500">Showing {showingCount} of {totalCount} projects</div>
          <div>
            <Link href="/projects/active-projects">
              <a className="font-medium text-primary-600 hover:text-primary-500">View all projects</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
