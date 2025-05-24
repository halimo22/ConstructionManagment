import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileIcon, 
  PlusCircle, 
  Search, 
  MoreVertical, 
  Download, 
  File, 
  FileText, 
  Image,
  X,
  FileQuestion
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import CustomAvatar from '@/components/ui/custom-avatar';

const Documents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Fetch documents
  const { data: documents, isLoading: documentsLoading } = useQuery({
    queryKey: ['/api/documents'],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`${queryKey[0]}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      return [];  // Since the API requires a project ID, we'll mock an empty array for all documents
    },
  });

  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/users'],
  });

  const isLoading = documentsLoading || projectsLoading || usersLoading;

  // Mock document data since we don't have an API that returns all documents
  const mockDocuments = [
    {
      id: 1,
      projectId: 1,
      name: 'City Heights Tower - Blueprints',
      type: 'pdf',
      url: '#',
      uploadedBy: 2,
      uploadedAt: new Date('2023-10-15')
    },
    {
      id: 2,
      projectId: 1,
      name: 'City Heights - Material Specifications',
      type: 'docx',
      url: '#',
      uploadedBy: 3,
      uploadedAt: new Date('2023-10-12')
    },
    {
      id: 3,
      projectId: 2,
      name: 'Riverfront Plaza - Site Analysis',
      type: 'pdf',
      url: '#',
      uploadedBy: 4,
      uploadedAt: new Date('2023-10-10')
    },
    {
      id: 4,
      projectId: 3,
      name: 'Green Valley - Environmental Report',
      type: 'pdf',
      url: '#',
      uploadedBy: 5,
      uploadedAt: new Date('2023-10-08')
    },
    {
      id: 5,
      projectId: 4,
      name: 'Central Business Hub - Render Images',
      type: 'jpg',
      url: '#',
      uploadedBy: 2,
      uploadedAt: new Date('2023-10-05')
    },
    {
      id: 6,
      projectId: 2,
      name: 'Riverfront Plaza - Contract',
      type: 'docx',
      url: '#',
      uploadedBy: 3,
      uploadedAt: new Date('2023-10-03')
    },
  ];

  // Filter documents based on search and filters
  const filteredDocuments = mockDocuments.filter((doc) => {
    // Apply search filter
    const searchMatch = 
      !searchQuery || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply project filter
    const projectMatch = projectFilter === 'all' || doc.projectId.toString() === projectFilter;
    
    // Apply type filter
    const typeMatch = typeFilter === 'all' || doc.type === typeFilter;
    
    return searchMatch && projectMatch && typeMatch;
  });

  const getProjectName = (projectId: number) => {
    return projects?.find((project: any) => project.id === projectId)?.name || 'Unknown Project';
  };

  const getUserName = (userId: number) => {
    const user = users?.find((user: any) => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

  const getUserAvatar = (userId: number) => {
    return users?.find((user: any) => user.id === userId)?.avatar || null;
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <FileText className="h-8 w-8 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="h-8 w-8 text-purple-500" />;
      default:
        return <FileQuestion className="h-8 w-8 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <AppLayout title="Documents" subtitle="Manage project documents and files">
        <div className="animate-pulse">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="h-10 w-64 bg-gray-200 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
            </div>
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
    <AppLayout title="Documents" subtitle="Manage project documents and files">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select 
            value={projectFilter} 
            onValueChange={(value) => setProjectFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects?.map((project: any) => (
                <SelectItem key={project.id} value={project.id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={typeFilter} 
            onValueChange={(value) => setTypeFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="File Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">Word</SelectItem>
              <SelectItem value="xlsx">Excel</SelectItem>
              <SelectItem value="jpg">Images</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <FileIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-sm text-gray-500 mb-4">
              {searchQuery || projectFilter !== 'all' || typeFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Upload your first document to get started'}
            </p>
            {(searchQuery || projectFilter !== 'all' || typeFilter !== 'all') && (
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setProjectFilter('all');
                setTypeFilter('all');
              }}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    {getFileIcon(document.type)}
                    <div>
                      <CardTitle className="text-base">{document.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {getProjectName(document.projectId)}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center text-sm text-gray-500">
                  <File className="h-4 w-4 mr-1" />
                  <span className="uppercase">{document.type}</span>
                  <span className="mx-2">•</span>
                  <span>Uploaded {formatDate(document.uploadedAt)}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-1">Uploaded by:</span>
                  <div className="flex items-center">
                    <CustomAvatar 
                      src={getUserAvatar(document.uploadedBy)} 
                      alt={getUserName(document.uploadedBy)}
                      size="sm"
                      className="mr-2"
                    />
                    <span>{getUserName(document.uploadedBy)}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default Documents;
