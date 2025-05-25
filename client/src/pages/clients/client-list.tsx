import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Mail, Phone, MapPin, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const ClientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch clients
  const { data: clients, isLoading } = useQuery({
    queryKey: ['/api/clients'],
  });

  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  const isLoadingData = isLoading || projectsLoading;

  // Filter clients based on search
  const filteredClients = clients?.filter((client: any) => 
    !searchQuery || 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Get projects count for each client
  const getClientProjectsCount = (clientId: number) => {
    return projects?.filter((project: any) => project.clientId === clientId).length || 0;
  };

  if (isLoadingData) {
    return (
      <>
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-64 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-white rounded-lg shadow"></div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Client
        </Button>
        
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search clients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client: any) => (
          <Card key={client.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{client.contactPerson}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Client</DropdownMenuItem>
                    <DropdownMenuItem>View Projects</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={`mailto:${client.email}`} className="hover:text-primary-600">{client.email}</a>
                </div>
                {client.phone && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${client.phone}`} className="hover:text-primary-600">{client.phone}</a>
                  </div>
                )}
                {client.address && (
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{client.address}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Active Projects</span>
                  <span className="text-sm font-medium text-gray-900">{getClientProjectsCount(client.id)}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full" size="sm">
                  View Client
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ClientList;
