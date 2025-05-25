import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Equipment: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Fetch equipment
  const { data: equipment, isLoading: equipmentLoading } = useQuery({
    queryKey: ['/api/equipment'],
  });

  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  const isLoading = equipmentLoading || projectsLoading;

  // Filter equipment based on search and status
  const filteredEquipment = equipment?.filter((item: any) => {
    // Apply search filter
    const searchMatch = 
      !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const statusMatch = statusFilter === 'all' || item.status === statusFilter;
    
    return searchMatch && statusMatch;
  }) || [];

  const getProjectName = (projectId: number | null) => {
    if (!projectId) return 'Not Assigned';
    return projects?.find((project: any) => project.id === projectId)?.name || 'Unknown Project';
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800';
      case 'retired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="animate-pulse">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="h-10 w-64 bg-gray-200 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="bg-white h-96 rounded-lg shadow"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search equipment..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select 
            value={statusFilter} 
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="in use">In Use</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <Table>
            <TableCaption>
              {filteredEquipment.length === 0 ? 'No equipment found.' : `Total equipment: ${filteredEquipment.length}`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Project</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(item.status)} variant="outline">
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{getProjectName(item.assignedProjectId)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem>Assign to Project</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Equipment;
