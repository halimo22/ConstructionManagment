import React from 'react';
import { Link } from 'react-router-dom'; // updated here
import { getPriorityColor } from '@/lib/utils';

interface Task {
  id: number;
  name: string;
  dueDate: string | Date;
  priority: string;
}

interface UpcomingTasksProps {
  tasks: Task[];
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks = [] }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Tasks</h3>
      </div>
      <div className="p-6">
        <ul className="divide-y divide-gray-200">
          {tasks.map((task, index) => {
            const priorityColors = getPriorityColor(task.priority);
            
            return (
              <li key={task.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-600">{index + 1}</span>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{task.name}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors.bg} ${priorityColors.text}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-gray-50 px-6 py-3">
        <div className="text-sm">
          <Link to="/projects/tasks" className="font-medium text-primary-600 hover:text-primary-500">
            View all tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTasks;
