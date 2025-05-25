import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const Timeline: React.FC = () => {
  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Fetch tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['/api/tasks'],
  });

  const isLoading = projectsLoading || tasksLoading;

  // Sort projects by start date
  const sortedProjects = projects?.sort((a: any, b: any) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  ) || [];

  if (isLoading) {
    return (
      <>
        <div className="animate-pulse">
          <div className="mb-6 flex justify-end">
            <div className="h-10 w-40 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Timeline
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {sortedProjects.map((project: any) => {
              // Get tasks for this project
              const projectTasks = tasks?.filter((task: any) => task.projectId === project.id) || [];
              
              // Sort tasks by due date
              const sortedTasks = projectTasks.sort((a: any, b: any) => 
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              );

              // Calculate days from start to end
              const startDate = new Date(project.startDate);
              const endDate = new Date(project.endDate);
              const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
              
              // Calculate days passed
              const today = new Date();
              const daysPassed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
              
              // Calculate progress percentage (capped at 100%)
              const progressPercentage = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
              
              // Determine status color
              let statusColor = "bg-green-600";
              if (project.status === "At Risk") {
                statusColor = "bg-amber-500";
              } else if (project.status === "Delayed") {
                statusColor = "bg-red-600";
              }

              return (
                <div key={project.id} className="relative">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                    <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === "On Track" ? "bg-green-100 text-green-800" :
                      project.status === "At Risk" ? "bg-amber-100 text-amber-800" :
                      project.status === "Delayed" ? "bg-red-100 text-red-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                    <span className="mx-2">•</span>
                    <span>{totalDays} days total</span>
                  </div>
                  
                  <div className="relative mb-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${statusColor}`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>{formatDate(project.startDate)}</span>
                      <span>Progress: {project.progress}%</span>
                      <span>{formatDate(project.endDate)}</span>
                    </div>
                  </div>
                  
                  {sortedTasks.length > 0 && (
                    <div className="ml-4 border-l-2 border-gray-200 pl-4 space-y-4">
                      {sortedTasks.map((task: any) => (
                        <div key={task.id} className="relative">
                          <div className="absolute -left-6 mt-1">
                            <div className={`h-2.5 w-2.5 rounded-full border-2 border-white ${
                              task.status === "completed" ? "bg-green-500" :
                              task.status === "in progress" ? "bg-blue-500" :
                              task.status === "blocked" ? "bg-red-500" :
                              "bg-gray-400"
                            }`}></div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{task.name}</h4>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Due: {formatDate(task.dueDate)}</span>
                                <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                  task.priority === "high" ? "bg-red-100 text-red-800" :
                                  task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-green-100 text-green-800"
                                } capitalize`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                task.status === "completed" ? "bg-green-100 text-green-800" :
                                task.status === "in progress" ? "bg-blue-100 text-blue-800" :
                                task.status === "blocked" ? "bg-red-100 text-red-800" :
                                "bg-gray-100 text-gray-800"
                              } capitalize`}>
                                {task.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Timeline;
