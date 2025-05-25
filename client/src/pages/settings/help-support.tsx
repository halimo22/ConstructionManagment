import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  HelpCircle,
  BookOpen,
  LifeBuoy,
  MessageSquare,
  Phone,
  Mail,
  Search,
  Send,
  FileText,
  Video,
  PenTool,
} from 'lucide-react';

const HelpSupport: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  // Handle support request submission
  const handleSupportRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (supportMessage.trim()) {
      toast({
        title: "Support request submitted",
        description: "Our team will get back to you as soon as possible.",
      });
      setSupportMessage('');
    } else {
      toast({
        title: "Message required",
        description: "Please enter a message before submitting.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="relative w-full max-w-md mx-auto mb-8">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search help articles..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Documentation</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Tutorials</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <LifeBuoy className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about using WE-BUILD
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create a new project?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        To create a new project, navigate to the "Active Projects" page and click the "New Project" button in the top right corner. Fill in the required information in the form and click "Create Project" to save your new project.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I assign tasks to team members?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        You can assign tasks to team members by going to the "Tasks" page and clicking "New Task". When creating the task, you'll have the option to select a team member from the "Assignee" dropdown menu. You can also edit existing tasks to change the assignee.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I track project progress?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        Project progress can be tracked in several ways:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>The Dashboard provides an overview of all your projects and their progress.</li>
                          <li>The "Active Projects" page shows detailed progress bars for each project.</li>
                          <li>The "Timeline" page displays a chronological view of project milestones and tasks.</li>
                          <li>Individual project pages have dedicated progress tracking features.</li>
                        </ul>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I manage project budgets?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        Project budgets can be managed in the "Budget" section under Resources. Here you can:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Set and adjust overall budgets for each project</li>
                          <li>Track expenses against budgets</li>
                          <li>Monitor budget utilization percentages</li>
                          <li>Generate budget reports</li>
                          <li>Set up budget alerts for overspending</li>
                        </ul>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I add team members to the system?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        To add new team members, go to the "Team" page under Resources and click the "Add Team Member" button. Fill in their details including name, email, role, and contact information. New team members will receive an email invitation to join the system.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Can I export data from WE-BUILD?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        Yes, WE-BUILD allows you to export data in various formats:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Project reports can be exported as PDF or CSV</li>
                          <li>Budget reports can be downloaded as Excel files</li>
                          <li>Timelines can be exported to calendar formats</li>
                          <li>Client information can be exported to CSV</li>
                        </ul>
                        Look for the "Export" or "Download" buttons in the respective sections.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Browse our comprehensive documentation to learn about WE-BUILD features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <FileText className="h-8 w-8 text-primary-600" />
                        <div>
                          <h3 className="text-base font-medium">Getting Started Guide</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Learn the basics of setting up and using WE-BUILD
                          </p>
                          <Button variant="link" className="p-0 h-auto mt-2 text-primary-600">
                            Read Guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <FileText className="h-8 w-8 text-primary-600" />
                        <div>
                          <h3 className="text-base font-medium">Project Management</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Detailed guide on managing construction projects
                          </p>
                          <Button variant="link" className="p-0 h-auto mt-2 text-primary-600">
                            Read Guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <FileText className="h-8 w-8 text-primary-600" />
                        <div>
                          <h3 className="text-base font-medium">Resource Management</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Learn how to manage team members and equipment
                          </p>
                          <Button variant="link" className="p-0 h-auto mt-2 text-primary-600">
                            Read Guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <FileText className="h-8 w-8 text-primary-600" />
                        <div>
                          <h3 className="text-base font-medium">Budget & Financial Tools</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Guide to budget tracking and financial management
                          </p>
                          <Button variant="link" className="p-0 h-auto mt-2 text-primary-600">
                            Read Guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <FileText className="h-8 w-8 text-primary-600" />
                        <div>
                          <h3 className="text-base font-medium">Client Management</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Learn about client relationship management features
                          </p>
                          <Button variant="link" className="p-0 h-auto mt-2 text-primary-600">
                            Read Guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <FileText className="h-8 w-8 text-primary-600" />
                        <div>
                          <h3 className="text-base font-medium">Administrator Guide</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            System administration and configuration documentation
                          </p>
                          <Button variant="link" className="p-0 h-auto mt-2 text-primary-600">
                            Read Guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse All Documentation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="tutorials">
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Watch step-by-step video tutorials to learn how to use WE-BUILD
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-base font-medium">Getting Started with WE-BUILD</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Learn the basics of using the WE-BUILD platform
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">12:34 • Beginner</span>
                        <Button variant="outline" size="sm">Watch</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-base font-medium">Creating and Managing Projects</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Detailed guide to project creation and management
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">15:47 • Intermediate</span>
                        <Button variant="outline" size="sm">Watch</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-base font-medium">Budget and Resource Planning</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Learn how to effectively manage budgets and resources
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">18:22 • Advanced</span>
                        <Button variant="outline" size="sm">Watch</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-base font-medium">Client Management Techniques</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Best practices for managing client relationships
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">14:15 • Intermediate</span>
                        <Button variant="outline" size="sm">Watch</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse All Tutorials
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>
                      Get in touch with our support team for assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSupportRequest} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Your Name
                          </label>
                          <Input id="name" placeholder="Enter your name" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                          Subject
                        </label>
                        <Input id="subject" placeholder="What's your inquiry about?" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <Textarea 
                          id="message" 
                          placeholder="Describe your issue or question in detail..." 
                          className="min-h-[150px]" 
                          value={supportMessage}
                          onChange={(e) => setSupportMessage(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="priority" className="text-sm font-medium text-gray-700">
                          Priority
                        </label>
                        <select 
                          id="priority" 
                          className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2"
                        >
                          <option value="low">Low - General Question</option>
                          <option value="medium">Medium - Need Help Soon</option>
                          <option value="high">High - Urgent Issue</option>
                        </select>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Submit Support Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Alternative ways to reach our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-primary-600 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Email Support</h3>
                        <p className="text-sm text-gray-500">
                          <a href="mailto:support@webuild.com" className="text-primary-600 hover:underline">
                            support@webuild.com
                          </a>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Response time: Within 24 hours
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-primary-600 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Phone Support</h3>
                        <p className="text-sm text-gray-500">
                          <a href="tel:+18001234567" className="text-primary-600 hover:underline">
                            +1 (800) 123-4567
                          </a>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Mon-Fri: 9AM - 6PM EST
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="h-5 w-5 text-primary-600 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Live Chat</h3>
                        <p className="text-sm text-gray-500">
                          Available on the bottom right of your screen
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Available 24/7 for urgent issues
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Support Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Monday - Friday</span>
                        <span className="text-sm font-medium">9:00 AM - 6:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Saturday</span>
                        <span className="text-sm font-medium">10:00 AM - 2:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Sunday</span>
                        <span className="text-sm font-medium">Closed</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Emergency support is available 24/7 for critical issues.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-primary-50 rounded-lg p-6 mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-primary-900 mb-2">Need More Help?</h2>
          <p className="text-primary-700 mb-6">
            Our team of construction management experts is available to provide personalized assistance for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="bg-white">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Knowledge Base
            </Button>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpSupport;
