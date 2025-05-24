import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLayout from '@/components/layout/AppLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import ResourceAllocation from '@/components/dashboard/ResourceAllocation';
import BudgetOverview from '@/components/dashboard/BudgetOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';

const Dashboard: React.FC = () => {
  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Fetch tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['/api/tasks'],
  });

  // Fetch resources
  const { data: resources, isLoading: resourcesLoading } = useQuery({
    queryKey: ['/api/resources'],
  });

  // Fetch activities
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['/api/activities'],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`${queryKey[0]}?limit=4`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      return response.json();
    },
  });

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/users'],
  });

  // Calculate stats
  const stats = {
    activeProjects: projects?.length || 0,
    tasksDueToday: tasks?.filter((task: any) => {
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      return (
        dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear()
      );
    }).length || 0,
    teamMembers: users?.filter((user: any) => user.role !== 'client')?.length || 0,
    budgetUtilized: projects?.reduce((total: number, project: any) => total + project.spent, 0) || 0,
  };

  // Format project data for the progress table
  const projectsData = projects?.map((project: any) => ({
    id: project.id,
    name: project.name,
    client: users?.find((user: any) => user.id === project.clientId)?.firstName || 'Unknown Client',
    status: project.status,
    deadline: project.endDate,
    progress: project.progress,
  })).slice(0, 4) || [];

  // Format tasks data for upcoming tasks
  const upcomingTasks = tasks?.map((task: any) => ({
    id: task.id,
    name: task.name,
    dueDate: task.dueDate,
    priority: task.priority,
  })).slice(0, 4) || [];

  // Format resource data
  const resourceData = resources?.map((resource: any) => {
    const project = projects?.find((p: any) => p.id === resource.projectId);
    const teamMembers = resource.teamMembers.map((userId: number) => {
      const user = users?.find((u: any) => u.id === userId);
      return {
        id: userId,
        avatar: user?.avatar || '',
      };
    });

    return {
      id: resource.id,
      projectName: project?.name || 'Unknown Project',
      teamMembers,
      teamMemberCount: resource.teamMemberCount,
      equipmentUtilization: resource.equipmentUtilization,
    };
  }).slice(0, 3) || [];

  // Format budget data
  const totalBudget = projects?.reduce((total: number, project: any) => total + project.budget, 0) || 0;
  const spentToDate = projects?.reduce((total: number, project: any) => total + project.spent, 0) || 0;

  const projectBudgets = projects?.map((project: any, index: number) => {
    const colors = ['primary', 'secondary', 'amber', 'green'] as const;
    return {
      id: project.id,
      name: project.name,
      budget: project.budget,
      spent: project.spent,
      color: colors[index % colors.length],
    };
  }).slice(0, 4) || [];

  // Format activities data
  const activitiesData = activities?.map((activity: any) => {
    const user = users?.find((u: any) => u.id === activity.userId);
    const project = activity.projectId ? projects?.find((p: any) => p.id === activity.projectId) : undefined;
    
    return {
      id: activity.id,
      user: {
        id: user?.id || 0,
        name: `${user?.firstName || ''} ${user?.lastName || ''}`,
        avatar: user?.avatar || '',
      },
      action: activity.action,
      details: activity.details,
      projectLink: project ? { id: project.id, name: project.name } : undefined,
      timestamp: activity.timestamp,
    };
  }) || [];

  const isLoading = projectsLoading || tasksLoading || resourcesLoading || activitiesLoading || usersLoading;

  if (isLoading) {
    return (
      <AppLayout title="Dashboard" subtitle="Loading...">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white h-32 rounded-lg shadow"></div>
            ))}
          </div>
          <div className="mt-8 bg-white h-96 rounded-lg shadow"></div>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white h-80 rounded-lg shadow"></div>
            <div className="bg-white h-80 rounded-lg shadow"></div>
          </div>
          <div className="mt-8 bg-white h-96 rounded-lg shadow"></div>
          <div className="mt-8 bg-white h-96 rounded-lg shadow"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Dashboard" subtitle="Overview of your projects and key metrics">
      {/* Quick Stats */}
      <StatsOverview stats={stats} />
      
      {/* Project Progress */}
      <ProjectProgress 
        projects={projectsData} 
        showingCount={projectsData.length}
        totalCount={projects?.length || 0}
      />
      
      {/* Upcoming Tasks and Resource Allocation */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <UpcomingTasks tasks={upcomingTasks} />
        <ResourceAllocation resources={resourceData} />
      </div>
      
      {/* Budget Overview */}
      <BudgetOverview 
        totalBudget={totalBudget}
        spentToDate={spentToDate}
        projectBudgets={projectBudgets}
      />
      
      {/* Recent Activity */}
      <RecentActivity activities={activitiesData} />
    </AppLayout>
  );
};

export default Dashboard;
