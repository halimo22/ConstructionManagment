import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Send,
  Search
} from 'lucide-react';
import { formatDate, formatDateTime } from '@/lib/utils';
import CustomAvatar from '@/components/ui/custom-avatar';

const Communications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');

  // Fetch clients
  const { data: clients, isLoading: clientsLoading } = useQuery({
    queryKey: ['/api/clients'],
  });

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/users'],
  });

  const isLoading = clientsLoading || usersLoading;

  // Mock communications data
  const mockMessages = [
    {
      id: 1,
      clientId: 1,
      userId: 2,
      type: 'message',
      content: 'Hello, I wanted to discuss the latest updates on the City Heights Tower project.',
      timestamp: new Date('2023-10-18T14:30:00')
    },
    {
      id: 2,
      clientId: 1,
      userId: 5,
      type: 'message',
      content: 'We need to schedule a meeting to review the electrical wiring plans.',
      timestamp: new Date('2023-10-17T10:15:00')
    },
    {
      id: 3,
      clientId: 2,
      userId: 3,
      type: 'email',
      content: 'Subject: Riverfront Plaza Material Delivery\n\nI am writing to confirm the delivery of materials for the Riverfront Plaza project scheduled for next Monday.',
      timestamp: new Date('2023-10-16T09:45:00')
    },
    {
      id: 4,
      clientId: 3,
      userId: 4,
      type: 'call',
      content: 'Discussed the timeline for Green Valley Residences foundation work.',
      timestamp: new Date('2023-10-15T16:20:00'),
      duration: '15 minutes'
    },
    {
      id: 5,
      clientId: 4,
      userId: 2,
      type: 'meeting',
      content: 'Project review meeting for Central Business Hub.',
      timestamp: new Date('2023-10-14T11:00:00'),
      duration: '1 hour',
      location: 'Client Office'
    },
    {
      id: 6,
      clientId: 2,
      userId: 3,
      type: 'message',
      content: 'Can we get an update on the progress of the Riverfront Plaza project?',
      timestamp: new Date('2023-10-13T15:10:00')
    },
  ];

  // Filter communications based on search and active tab
  const filteredCommunications = mockMessages.filter((msg) => 
    !searchQuery || 
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clients?.find((c: any) => c.id === msg.clientId)?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    users?.find((u: any) => u.id === msg.userId)?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    users?.find((u: any) => u.id === msg.userId)?.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getClientName = (clientId: number) => {
    return clients?.find((client: any) => client.id === clientId)?.name || 'Unknown Client';
  };

  const getUserName = (userId: number) => {
    const user = users?.find((user: any) => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

  const getUserAvatar = (userId: number) => {
    return users?.find((user: any) => user.id === userId)?.avatar || null;
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-primary-600" />;
      case 'email':
        return <Mail className="h-4 w-4 text-blue-600" />;
      case 'call':
        return <Phone className="h-4 w-4 text-green-600" />;
      case 'meeting':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, you would send this message to the API
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="animate-pulse">
          <div className="mb-6">
            <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white h-96 rounded-lg shadow"></div>
            </div>
            <div>
              <div className="bg-white h-96 rounded-lg shadow"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="relative w-full mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search communications..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="calls">Calls & Meetings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {filteredCommunications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No communications found</h3>
                      <p className="text-sm text-gray-500">
                        {searchQuery ? 'Try adjusting your search' : 'Start a new conversation with a client'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Communications</CardTitle>
                      <CardDescription>Recent interactions with clients</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {filteredCommunications.map((communication) => (
                          <div key={communication.id} className="flex gap-4">
                            <CustomAvatar 
                              src={getUserAvatar(communication.userId)} 
                              alt={getUserName(communication.userId)}
                              size="md"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <span className="font-medium text-gray-900">{getUserName(communication.userId)}</span>
                                  <span className="text-gray-500 mx-2">•</span>
                                  <span className="text-gray-500">{getClientName(communication.clientId)}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  {getCommunicationIcon(communication.type)}
                                  <span className="ml-1 capitalize">{communication.type}</span>
                                  <span className="mx-1">•</span>
                                  <span>{formatDateTime(communication.timestamp)}</span>
                                </div>
                              </div>
                              <div className="mt-1 text-gray-700 whitespace-pre-line">
                                {communication.content}
                              </div>
                              {(communication.type === 'call' || communication.type === 'meeting') && (
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{communication.duration}</span>
                                  {communication.location && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <span>{communication.location}</span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>New Message</CardTitle>
                    <CardDescription>Send a message to a client</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Select Client</label>
                        <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                          <option value="">Select a client...</option>
                          {clients?.map((client: any) => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Message</label>
                        <Textarea 
                          placeholder="Type your message here..." 
                          className="min-h-[120px]"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Schedule</CardTitle>
                    <CardDescription>Upcoming client meetings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Calendar className="h-8 w-8 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">Project Review</p>
                          <p className="text-sm text-gray-500">Client: {getClientName(1)}</p>
                          <p className="text-sm text-gray-500">{formatDate(new Date('2023-10-25'))} at 10:00 AM</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Calendar className="h-8 w-8 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">Contract Discussion</p>
                          <p className="text-sm text-gray-500">Client: {getClientName(2)}</p>
                          <p className="text-sm text-gray-500">{formatDate(new Date('2023-10-27'))} at 2:30 PM</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="messages">
            {/* Messages tab content */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Messages</h3>
                <div className="space-y-6">
                  {filteredCommunications
                    .filter(comm => comm.type === 'message')
                    .map((communication) => (
                      <div key={communication.id} className="flex gap-4">
                        <CustomAvatar 
                          src={getUserAvatar(communication.userId)} 
                          alt={getUserName(communication.userId)}
                          size="md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <span className="font-medium text-gray-900">{getUserName(communication.userId)}</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span className="text-gray-500">{getClientName(communication.clientId)}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDateTime(communication.timestamp)}
                            </div>
                          </div>
                          <div className="mt-1 text-gray-700">
                            {communication.content}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails">
            {/* Emails tab content */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Emails</h3>
                <div className="space-y-6">
                  {filteredCommunications
                    .filter(comm => comm.type === 'email')
                    .map((communication) => (
                      <div key={communication.id} className="flex gap-4">
                        <CustomAvatar 
                          src={getUserAvatar(communication.userId)} 
                          alt={getUserName(communication.userId)}
                          size="md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <span className="font-medium text-gray-900">{getUserName(communication.userId)}</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span className="text-gray-500">{getClientName(communication.clientId)}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDateTime(communication.timestamp)}
                            </div>
                          </div>
                          <div className="mt-1 text-gray-700 whitespace-pre-line">
                            {communication.content}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calls">
            {/* Calls & Meetings tab content */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Calls & Meetings</h3>
                <div className="space-y-6">
                  {filteredCommunications
                    .filter(comm => comm.type === 'call' || comm.type === 'meeting')
                    .map((communication) => (
                      <div key={communication.id} className="flex gap-4">
                        <CustomAvatar 
                          src={getUserAvatar(communication.userId)} 
                          alt={getUserName(communication.userId)}
                          size="md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <span className="font-medium text-gray-900">{getUserName(communication.userId)}</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span className="text-gray-500">{getClientName(communication.clientId)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              {getCommunicationIcon(communication.type)}
                              <span className="ml-1 capitalize">{communication.type}</span>
                              <span className="mx-1">•</span>
                              <span>{formatDateTime(communication.timestamp)}</span>
                            </div>
                          </div>
                          <div className="mt-1 text-gray-700">
                            {communication.content}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{communication.duration}</span>
                            {communication.location && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{communication.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Communications;
