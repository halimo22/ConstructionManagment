import {
  users, User, InsertUser,
  projects, Project, InsertProject,
  tasks, Task, InsertTask,
  resources, Resource, InsertResource,
  clients, Client, InsertClient,
  activities, Activity, InsertActivity,
  documents, Document, InsertDocument,
  equipment, Equipment, InsertEquipment,
  emailVerifications, EmailVerification, InsertEmailVerification,
  supplyOrders, SupplyOrder, InsertSupplyOrder
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  getUsersByRole(role: string): Promise<User[]>;
  getUsers(): Promise<User[]>;
  
  // Email verification operations
  createEmailVerification(verification: InsertEmailVerification): Promise<EmailVerification>;
  getEmailVerificationByToken(token: string): Promise<EmailVerification | undefined>;
  deleteEmailVerification(id: number): Promise<void>;
  
  // Supply order operations
  getSupplyOrder(id: number): Promise<SupplyOrder | undefined>;
  getSupplyOrdersByProject(projectId: number): Promise<SupplyOrder[]>;
  getSupplyOrdersBySupplier(supplierId: number): Promise<SupplyOrder[]>;
  createSupplyOrder(order: InsertSupplyOrder): Promise<SupplyOrder>;
  updateSupplyOrder(id: number, order: Partial<InsertSupplyOrder>): Promise<SupplyOrder | undefined>;

  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  
  // Task operations
  getTask(id: number): Promise<Task | undefined>;
  getTasks(): Promise<Task[]>;
  getTasksByProject(projectId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task | undefined>;
  
  // Resource operations
  getResource(id: number): Promise<Resource | undefined>;
  getResourceByProject(projectId: number): Promise<Resource | undefined>;
  getResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource | undefined>;
  
  // Client operations
  getClient(id: number): Promise<Client | undefined>;
  getClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  
  // Activity operations
  getActivity(id: number): Promise<Activity | undefined>;
  getActivities(): Promise<Activity[]>;
  getRecentActivities(limit: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Document operations
  getDocument(id: number): Promise<Document | undefined>;
  getDocumentsByProject(projectId: number): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  
  // Equipment operations
  getEquipment(id: number): Promise<Equipment | undefined>;
  getAllEquipment(): Promise<Equipment[]>;
  createEquipment(equipment: InsertEquipment): Promise<Equipment>;
  updateEquipment(id: number, equipment: Partial<InsertEquipment>): Promise<Equipment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private tasks: Map<number, Task>;
  private resources: Map<number, Resource>;
  private clients: Map<number, Client>;
  private activities: Map<number, Activity>;
  private documents: Map<number, Document>;
  private equipmentItems: Map<number, Equipment>;
  
  private userId: number;
  private projectId: number;
  private taskId: number;
  private resourceId: number;
  private clientId: number;
  private activityId: number;
  private documentId: number;
  private equipmentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.tasks = new Map();
    this.resources = new Map();
    this.clients = new Map();
    this.activities = new Map();
    this.documents = new Map();
    this.equipmentItems = new Map();
    
    this.userId = 1;
    this.projectId = 1;
    this.taskId = 1;
    this.resourceId = 1;
    this.clientId = 1;
    this.activityId = 1;
    this.documentId = 1;
    this.equipmentId = 1;
    
    // Add demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo clients
    const client1 = this.createClient({
      name: "Metropolis Development",
      email: "info@metropolis.com",
      phone: "555-123-4567",
      address: "123 Main St, Metropolis",
      contactPerson: "John Smith"
    });
    
    const client2 = this.createClient({
      name: "Riverside Properties",
      email: "contact@riverside.com",
      phone: "555-987-6543",
      address: "456 River Rd, Riverside",
      contactPerson: "Jane Doe"
    });
    
    const client3 = this.createClient({
      name: "EcoHomes Ltd.",
      email: "info@ecohomes.com",
      phone: "555-456-7890",
      address: "789 Green St, Eco Valley",
      contactPerson: "Robert Johnson"
    });
    
    const client4 = this.createClient({
      name: "Commerce Developments",
      email: "info@commercedev.com",
      phone: "555-789-0123",
      address: "101 Business Ave, Central City",
      contactPerson: "Emily Williams"
    });
    
    // Create demo users
    const admin = this.createUser({
      username: "admin",
      password: "admin123",
      email: "admin@webuild.com",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const sarah = this.createUser({
      username: "sarah",
      password: "sarah123",
      email: "sarah@webuild.com",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "manager",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const michael = this.createUser({
      username: "michael",
      password: "michael123",
      email: "michael@webuild.com",
      firstName: "Michael",
      lastName: "Roberts",
      role: "worker",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const david = this.createUser({
      username: "david",
      password: "david123",
      email: "david@webuild.com",
      firstName: "David",
      lastName: "Wilson",
      role: "worker",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const emma = this.createUser({
      username: "emma",
      password: "emma123",
      email: "emma@webuild.com",
      firstName: "Emma",
      lastName: "Davis",
      role: "manager",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    // Create demo projects
    const project1 = this.createProject({
      name: "City Heights Tower",
      description: "A 40-story residential tower with luxury apartments in the heart of downtown.",
      clientId: client1.id,
      status: "On Track",
      startDate: new Date("2023-03-15"),
      endDate: new Date("2023-12-15"),
      progress: 75,
      budget: 1800000,
      spent: 720000
    });
    
    const project2 = this.createProject({
      name: "Riverfront Plaza",
      description: "A mixed-use development along the riverfront with retail and office spaces.",
      clientId: client2.id,
      status: "At Risk",
      startDate: new Date("2023-05-01"),
      endDate: new Date("2023-11-30"),
      progress: 45,
      budget: 950000,
      spent: 332500
    });
    
    const project3 = this.createProject({
      name: "Green Valley Residences",
      description: "Eco-friendly residential community with 25 single-family homes.",
      clientId: client3.id,
      status: "On Track",
      startDate: new Date("2023-07-10"),
      endDate: new Date("2024-02-28"),
      progress: 30,
      budget: 1200000,
      spent: 138000
    });
    
    const project4 = this.createProject({
      name: "Central Business Hub",
      description: "A modern office complex with co-working spaces and conference facilities.",
      clientId: client4.id,
      status: "Delayed",
      startDate: new Date("2023-04-01"),
      endDate: new Date("2023-10-15"),
      progress: 65,
      budget: 550000,
      spent: 55100
    });
    
    // Create resources for projects
    this.createResource({
      projectId: project1.id,
      teamMemberCount: 18,
      equipmentUtilization: 75,
      teamMembers: [sarah.id, michael.id, david.id]
    });
    
    this.createResource({
      projectId: project2.id,
      teamMemberCount: 12,
      equipmentUtilization: 60,
      teamMembers: [emma.id, david.id]
    });
    
    this.createResource({
      projectId: project3.id,
      teamMemberCount: 10,
      equipmentUtilization: 45,
      teamMembers: [michael.id, sarah.id]
    });
    
    this.createResource({
      projectId: project4.id,
      teamMemberCount: 15,
      equipmentUtilization: 70,
      teamMembers: [emma.id, michael.id]
    });
    
    // Create tasks
    this.createTask({
      projectId: project3.id,
      name: "Foundation inspection for Green Valley Residences",
      description: "Conduct thorough inspection of foundation work for quality and compliance.",
      assigneeId: sarah.id,
      status: "pending",
      priority: "medium",
      dueDate: new Date("2023-10-24")
    });
    
    this.createTask({
      projectId: project1.id,
      name: "Electrical wiring review at City Heights Tower",
      description: "Review electrical installations for code compliance and safety.",
      assigneeId: michael.id,
      status: "in progress",
      priority: "high",
      dueDate: new Date("2023-10-25")
    });
    
    this.createTask({
      projectId: project2.id,
      name: "Materials delivery for Riverfront Plaza",
      description: "Coordinate delivery of construction materials to the site.",
      assigneeId: david.id,
      status: "pending",
      priority: "low",
      dueDate: new Date("2023-10-26")
    });
    
    this.createTask({
      projectId: project4.id,
      name: "Client meeting for Central Business Hub revisions",
      description: "Meeting with client to discuss design revisions and timeline updates.",
      assigneeId: emma.id,
      status: "pending",
      priority: "high",
      dueDate: new Date("2023-10-27")
    });
    
    // Create activity logs
    this.createActivity({
      userId: sarah.id,
      projectId: project1.id,
      action: "Added new milestone",
      details: "Added new milestone to City Heights Tower"
    });
    
    this.createActivity({
      userId: michael.id,
      projectId: project3.id,
      action: "Uploaded documentation",
      details: "Uploaded new documentation files for Green Valley Residences"
    });
    
    this.createActivity({
      userId: david.id,
      projectId: project2.id,
      action: "Updated budget",
      details: "Updated budget allocation for Riverfront Plaza"
    });
    
    this.createActivity({
      userId: emma.id,
      projectId: project4.id,
      action: "Scheduled meeting",
      details: "Scheduled client meeting for Central Business Hub revisions"
    });
    
    // Create equipment
    this.createEquipment({
      name: "Excavator XL-5000",
      type: "Heavy Equipment",
      status: "in use",
      assignedProjectId: project1.id
    });
    
    this.createEquipment({
      name: "Concrete Mixer CM-2000",
      type: "Heavy Equipment",
      status: "in use",
      assignedProjectId: project2.id
    });
    
    this.createEquipment({
      name: "Tower Crane TC-800",
      type: "Heavy Equipment",
      status: "in use",
      assignedProjectId: project1.id
    });
    
    this.createEquipment({
      name: "Bulldozer BD-300",
      type: "Heavy Equipment",
      status: "available",
      assignedProjectId: null
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const now = new Date();
    const project: Project = { ...insertProject, id, createdAt: now, updatedAt: now };
    this.projects.set(id, project);
    return project;
  }
  
  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject: Project = {
      ...project,
      ...projectUpdate,
      updatedAt: new Date()
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  
  // Task operations
  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }
  
  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }
  
  async getTasksByProject(projectId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.projectId === projectId);
  }
  
  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.taskId++;
    const now = new Date();
    const task: Task = { ...insertTask, id, createdAt: now, updatedAt: now };
    this.tasks.set(id, task);
    return task;
  }
  
  async updateTask(id: number, taskUpdate: Partial<InsertTask>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask: Task = {
      ...task,
      ...taskUpdate,
      updatedAt: new Date()
    };
    
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }
  
  // Resource operations
  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }
  
  async getResourceByProject(projectId: number): Promise<Resource | undefined> {
    return Array.from(this.resources.values()).find(
      (resource) => resource.projectId === projectId,
    );
  }
  
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }
  
  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.resourceId++;
    const now = new Date();
    const resource: Resource = { ...insertResource, id, createdAt: now, updatedAt: now };
    this.resources.set(id, resource);
    return resource;
  }
  
  async updateResource(id: number, resourceUpdate: Partial<InsertResource>): Promise<Resource | undefined> {
    const resource = this.resources.get(id);
    if (!resource) return undefined;
    
    const updatedResource: Resource = {
      ...resource,
      ...resourceUpdate,
      updatedAt: new Date()
    };
    
    this.resources.set(id, updatedResource);
    return updatedResource;
  }
  
  // Client operations
  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }
  
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }
  
  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.clientId++;
    const now = new Date();
    const client: Client = { ...insertClient, id, createdAt: now };
    this.clients.set(id, client);
    return client;
  }
  
  // Activity operations
  async getActivity(id: number): Promise<Activity | undefined> {
    return this.activities.get(id);
  }
  
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }
  
  async getRecentActivities(limit: number): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
  
  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.activityId++;
    const now = new Date();
    const activity: Activity = { ...insertActivity, id, timestamp: now };
    this.activities.set(id, activity);
    return activity;
  }
  
  // Document operations
  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }
  
  async getDocumentsByProject(projectId: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(doc => doc.projectId === projectId);
  }
  
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.documentId++;
    const now = new Date();
    const document: Document = { ...insertDocument, id, uploadedAt: now };
    this.documents.set(id, document);
    return document;
  }
  
  // Equipment operations
  async getEquipment(id: number): Promise<Equipment | undefined> {
    return this.equipmentItems.get(id);
  }
  
  async getAllEquipment(): Promise<Equipment[]> {
    return Array.from(this.equipmentItems.values());
  }
  
  async createEquipment(insertEquipment: InsertEquipment): Promise<Equipment> {
    const id = this.equipmentId++;
    const now = new Date();
    const equipment: Equipment = { ...insertEquipment, id, createdAt: now };
    this.equipmentItems.set(id, equipment);
    return equipment;
  }
  
  async updateEquipment(id: number, equipmentUpdate: Partial<InsertEquipment>): Promise<Equipment | undefined> {
    const equipment = this.equipmentItems.get(id);
    if (!equipment) return undefined;
    
    const updatedEquipment: Equipment = {
      ...equipment,
      ...equipmentUpdate
    };
    
    this.equipmentItems.set(id, updatedEquipment);
    return updatedEquipment;
  }
}

export const storage = new MemStorage();
