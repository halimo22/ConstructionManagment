import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Mail, Phone, Building } from 'lucide-react';
import CustomAvatar from '@/components/ui/custom-avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const Team: React.FC = () => {
  // Fetch users
  const { data: users, isLoading } = useQuery({
    queryKey: ['/api/users'],
  });

  // Group users by role
  const teamMembers = users?.filter((user: any) => user.role !== 'client') || [];

  // Group by role
  const groupedByRole: Record<string, any[]> = {};
  teamMembers.forEach((member: any) => {
    if (!groupedByRole[member.role]) {
      groupedByRole[member.role] = [];
    }
    groupedByRole[member.role].push(member);
  });

  // Define role order and colors
  const roleOrder = ['admin', 'manager', 'worker'];
  const roleColors: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800',
    manager: 'bg-blue-100 text-blue-800',
    worker: 'bg-green-100 text-green-800'
  };

  if (isLoading) {
    return (
      <AppLayout title="Team" subtitle="Manage your team members and resources">
        <div className="animate-pulse">
          <div className="mb-6 flex justify-between items-center">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-10 w-40 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-white rounded-lg shadow"></div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Team" subtitle="Manage your team members and resources">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Team Members ({teamMembers.length})</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {roleOrder.map(role => {
        if (!groupedByRole[role] || groupedByRole[role].length === 0) return null;
        
        return (
          <div key={role} className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">{role}s</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedByRole[role].map((member: any) => (
                <Card key={member.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <CustomAvatar 
                            src={member.avatar} 
                            alt={`${member.firstName} ${member.lastName}`}
                            size="lg"
                            className="mr-4"
                          />
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{member.firstName} {member.lastName}</h4>
                            <p className="text-sm text-gray-500">{member.email}</p>
                            <Badge className={`mt-1 ${roleColors[member.role]}`} variant="outline">
                              {member.role}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Assign to Project</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Building className="h-4 w-4 mr-2" />
                          <span>HQ Office</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Current projects: </span>
                        <span className="text-gray-900 font-medium">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </AppLayout>
  );
};

export default Team;
