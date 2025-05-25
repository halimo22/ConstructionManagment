import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { formatDate, getPriorityColor } from '@/lib/utils';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import CustomAvatar from '@/components/ui/custom-avatar';

const Tasks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Fetch tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['/api/tasks'],
  });

  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/users'],
  });

  const isLoading = tasksLoading || projectsLoading || usersLoading;

  // Filter and search tasks
  const filteredTasks = tasks?.filter((task: any) => {
    // Apply search filter
    const searchMatch = 
      !searchQuery || 
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const statusMatch = !statusFilter || task.status === statusFilter;
    
    // Apply priority filter
    const priorityMatch = !priorityFilter || task.priority === priorityFilter;
    
    return searchMatch && statusMatch && priorityMatch;
  }) || [];

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setPriorityFilter(null);
  };

  const getProjectName = (projectId: number) => {
    return projects?.find((project: any) => project.id === projectId)?.name || 'Unknown Project';
  };

  const getAssigneeName = (userId: number | null) => {
    if (!userId) return 'Unassigned';
    const user = users?.find((user: any) => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

  const getAssigneeAvatar = (userId: number | null) => {
    if (!userId) return null;
    return users?.find((user: any) => user.id === userId)?.avatar || null;
  };

  if (isLoading) {
    return (
      <>
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-64 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Task
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('in progress')}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('blocked')}>Blocked</DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setPriorityFilter('low')}>Low</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('medium')}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('high')}>High</DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={resetFilters}>Reset Filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <Table>
            <TableCaption>
              {filteredTasks.length === 0 ? 'No tasks found.' : `Showing ${filteredTasks.length} tasks`}
              {(statusFilter || priorityFilter) && ' (filtered)'}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task: any) => {
                const priorityColors = getPriorityColor(task.priority);
                
                return (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">
                      <div>{task.name}</div>
                      {task.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {task.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{getProjectName(task.projectId)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {task.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors.bg} ${priorityColors.text} capitalize`}>
                        {task.priority}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(task.dueDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CustomAvatar 
                          src={getAssigneeAvatar(task.assigneeId)} 
                          alt={getAssigneeName(task.assigneeId)}
                          size="sm"
                          className="mr-2"
                        />
                        <span className="text-sm">{getAssigneeName(task.assigneeId)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuItem>Reassign</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Tasks;
