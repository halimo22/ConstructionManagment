import {
  User, InsertUser,
  Project, InsertProject,
  Task, InsertTask,
  Resource, InsertResource,
  Client, InsertClient,
  Activity, InsertActivity,
  Document, InsertDocument,
  Equipment, InsertEquipment,
  EmailVerification, InsertEmailVerification,
  SupplyOrder, InsertSupplyOrder
} from "../shared/schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  getUsersByRole(role: string): Promise<User[]>;
  getUsers(): Promise<User[]>;
  
  // Email verification operations
  createEmailVerification(verification: InsertEmailVerification): Promise<EmailVerification>;
  getEmailVerificationByToken(token: string): Promise<EmailVerification | undefined>;
  deleteEmailVerification(id: string): Promise<void>;
  
  // Supply order operations
  getSupplyOrder(id: string): Promise<SupplyOrder | undefined>;
  getSupplyOrdersByProject(projectId: string): Promise<SupplyOrder[]>;
  getSupplyOrdersBySupplier(supplierId: string): Promise<SupplyOrder[]>;
  createSupplyOrder(order: InsertSupplyOrder): Promise<SupplyOrder>;
  updateSupplyOrder(id: string, order: Partial<InsertSupplyOrder>): Promise<SupplyOrder | undefined>;

  // Project operations
  getProject(id: string): Promise<Project | undefined>;
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  
  // Task operations
  getTask(id: string): Promise<Task | undefined>;
  getTasks(): Promise<Task[]>;
  getTasksByProject(projectId: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined>;
  
  // Resource operations
  getResource(id: string): Promise<Resource | undefined>;
  getResourceByProject(projectId: string): Promise<Resource | undefined>;
  getResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: string, resource: Partial<InsertResource>): Promise<Resource | undefined>;
  
  // Client operations
  getClient(id: string): Promise<Client | undefined>;
  getClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  
  // Activity operations
  getActivity(id: string): Promise<Activity | undefined>;
  getActivities(): Promise<Activity[]>;
  getRecentActivities(limit: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Document operations
  getDocument(id: string): Promise<Document | undefined>;
  getDocumentsByProject(projectId: string): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  
  // Equipment operations
  getEquipment(id: string): Promise<Equipment | undefined>;
  getAllEquipment(): Promise<Equipment[]>;
  createEquipment(equipment: InsertEquipment): Promise<Equipment>;
  updateEquipment(id: string, equipment: Partial<InsertEquipment>): Promise<Equipment | undefined>;
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
  private emailVerifications: Map<number, EmailVerification>;
  private supplyOrders: Map<number, SupplyOrder>;
  
  private userId: number;
  private projectId: number;
  private taskId: number;
  private resourceId: number;
  private clientId: number;
  private activityId: number;
  private documentId: number;
  private equipmentId: number;
  private emailVerificationId: number;
  private supplyOrderId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.tasks = new Map();
    this.resources = new Map();
    this.clients = new Map();
    this.activities = new Map();
    this.documents = new Map();
    this.equipmentItems = new Map();
    this.emailVerifications = new Map();
    this.supplyOrders = new Map();
    
    this.userId = 1;
    this.projectId = 1;
    this.taskId = 1;
    this.resourceId = 1;
    this.clientId = 1;
    this.activityId = 1;
    this.documentId = 1;
    this.equipmentId = 1;
    this.emailVerificationId = 1;
    this.supplyOrderId = 1;
    
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
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now,
      emailVerified: insertUser.emailVerified !== undefined ? insertUser.emailVerified : false,
      verificationToken: insertUser.verificationToken || null,
      resetPasswordToken: null
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userUpdate: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      ...userUpdate
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async getUsersByRole(role: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.role.toLowerCase() === role.toLowerCase()
    );
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
  
  // Email verification operations
  async createEmailVerification(verification: InsertEmailVerification): Promise<EmailVerification> {
    const id = this.emailVerificationId++;
    
    const newVerification: EmailVerification = {
      id,
      ...verification,
      createdAt: new Date()
    };
    
    this.emailVerifications.set(id, newVerification);
    return newVerification;
  }
  
  async getEmailVerificationByToken(token: string): Promise<EmailVerification | undefined> {
    return Array.from(this.emailVerifications.values()).find(
      (verification) => verification.token === token
    );
  }
  
  async deleteEmailVerification(id: number): Promise<void> {
    this.emailVerifications.delete(id);
  }
  
  // Supply order operations
  async getSupplyOrder(id: number): Promise<SupplyOrder | undefined> {
    return this.supplyOrders.get(id);
  }
  
  async getSupplyOrdersByProject(projectId: number): Promise<SupplyOrder[]> {
    return Array.from(this.supplyOrders.values()).filter(
      (order) => order.projectId === projectId
    );
  }
  
  async getSupplyOrdersBySupplier(supplierId: number): Promise<SupplyOrder[]> {
    return Array.from(this.supplyOrders.values()).filter(
      (order) => order.supplierId === supplierId
    );
  }
  
  async createSupplyOrder(order: InsertSupplyOrder): Promise<SupplyOrder> {
    const id = this.supplyOrderId++;
    const now = new Date();
    
    const newOrder: SupplyOrder = {
      id,
      ...order,
      requestedDate: now,
      deliveryDate: null
    };
    
    this.supplyOrders.set(id, newOrder);
    return newOrder;
  }
  
  async updateSupplyOrder(id: number, orderUpdate: Partial<InsertSupplyOrder>): Promise<SupplyOrder | undefined> {
    const order = this.supplyOrders.get(id);
    if (!order) return undefined;
    
    const updatedOrder: SupplyOrder = {
      ...order,
      ...orderUpdate
    };
    
    this.supplyOrders.set(id, updatedOrder);
    return updatedOrder;
  }
}

import {
  User as UserModel,
  Project as ProjectModel,
  Task as TaskModel,
  Resource as ResourceModel,
  Client as ClientModel,
  Activity as ActivityModel,
  Document as DocumentModel,
  Equipment as EquipmentModel,
  SupplyOrder as SupplyOrderModel,
  EmailVerification as EmailVerificationModel
} from './models';

export class MongoDBStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const user = await UserModel.findById(id);
      return user ? this.mapUserToSchema(user) : undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username });
      return user ? this.mapUserToSchema(user) : undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ email });
      return user ? this.mapUserToSchema(user) : undefined;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const newUser = new UserModel(insertUser);
      const savedUser = await newUser.save();
      return this.mapUserToSchema(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async updateUser(id: number, userUpdate: Partial<InsertUser>): Promise<User | undefined> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id, 
        userUpdate, 
        { new: true }
      );
      return updatedUser ? this.mapUserToSchema(updatedUser) : undefined;
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }

  async getUsersByRole(role: string): Promise<User[]> {
    try {
      const users = await UserModel.find({ role });
      return users.map(user => this.mapUserToSchema(user));
    } catch (error) {
      console.error('Error getting users by role:', error);
      return [];
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await UserModel.find();
      return users.map(user => this.mapUserToSchema(user));
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    try {
      const project = await ProjectModel.findById(id);
      return project ? this.mapProjectToSchema(project) : undefined;
    } catch (error) {
      console.error('Error getting project:', error);
      return undefined;
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      const projects = await ProjectModel.find();
      return projects.map(project => this.mapProjectToSchema(project));
    } catch (error) {
      console.error('Error getting all projects:', error);
      return [];
    }
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    try {
      const newProject = new ProjectModel(insertProject);
      const savedProject = await newProject.save();
      return this.mapProjectToSchema(savedProject);
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
    }
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
    try {
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        id, 
        projectUpdate, 
        { new: true }
      );
      return updatedProject ? this.mapProjectToSchema(updatedProject) : undefined;
    } catch (error) {
      console.error('Error updating project:', error);
      return undefined;
    }
  }

  // Task operations
  async getTask(id: number): Promise<Task | undefined> {
    try {
      const task = await TaskModel.findById(id);
      return task ? this.mapTaskToSchema(task) : undefined;
    } catch (error) {
      console.error('Error getting task:', error);
      return undefined;
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const tasks = await TaskModel.find();
      return tasks.map(task => this.mapTaskToSchema(task));
    } catch (error) {
      console.error('Error getting all tasks:', error);
      return [];
    }
  }

  async getTasksByProject(projectId: number): Promise<Task[]> {
    try {
      const tasks = await TaskModel.find({ projectId });
      return tasks.map(task => this.mapTaskToSchema(task));
    } catch (error) {
      console.error('Error getting tasks by project:', error);
      return [];
    }
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    try {
      const newTask = new TaskModel(insertTask);
      const savedTask = await newTask.save();
      return this.mapTaskToSchema(savedTask);
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  }

  async updateTask(id: number, taskUpdate: Partial<InsertTask>): Promise<Task | undefined> {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id, 
        taskUpdate, 
        { new: true }
      );
      return updatedTask ? this.mapTaskToSchema(updatedTask) : undefined;
    } catch (error) {
      console.error('Error updating task:', error);
      return undefined;
    }
  }

  // Resource operations
  async getResource(id: number): Promise<Resource | undefined> {
    try {
      const resource = await ResourceModel.findById(id);
      return resource ? this.mapResourceToSchema(resource) : undefined;
    } catch (error) {
      console.error('Error getting resource:', error);
      return undefined;
    }
  }

  async getResourceByProject(projectId: number): Promise<Resource | undefined> {
    try {
      const resource = await ResourceModel.findOne({ projectId });
      return resource ? this.mapResourceToSchema(resource) : undefined;
    } catch (error) {
      console.error('Error getting resource by project:', error);
      return undefined;
    }
  }

  async getResources(): Promise<Resource[]> {
    try {
      const resources = await ResourceModel.find();
      return resources.map(resource => this.mapResourceToSchema(resource));
    } catch (error) {
      console.error('Error getting all resources:', error);
      return [];
    }
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    try {
      const newResource = new ResourceModel(insertResource);
      const savedResource = await newResource.save();
      return this.mapResourceToSchema(savedResource);
    } catch (error) {
      console.error('Error creating resource:', error);
      throw new Error('Failed to create resource');
    }
  }

  async updateResource(id: number, resourceUpdate: Partial<InsertResource>): Promise<Resource | undefined> {
    try {
      const updatedResource = await ResourceModel.findByIdAndUpdate(
        id, 
        resourceUpdate, 
        { new: true }
      );
      return updatedResource ? this.mapResourceToSchema(updatedResource) : undefined;
    } catch (error) {
      console.error('Error updating resource:', error);
      return undefined;
    }
  }

  // Client operations
  async getClient(id: number): Promise<Client | undefined> {
    try {
      const client = await ClientModel.findById(id);
      return client ? this.mapClientToSchema(client) : undefined;
    } catch (error) {
      console.error('Error getting client:', error);
      return undefined;
    }
  }

  async getClients(): Promise<Client[]> {
    try {
      const clients = await ClientModel.find();
      return clients.map(client => this.mapClientToSchema(client));
    } catch (error) {
      console.error('Error getting all clients:', error);
      return [];
    }
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    try {
      const newClient = new ClientModel(insertClient);
      const savedClient = await newClient.save();
      return this.mapClientToSchema(savedClient);
    } catch (error) {
      console.error('Error creating client:', error);
      throw new Error('Failed to create client');
    }
  }

  // Activity operations
  async getActivity(id: number): Promise<Activity | undefined> {
    try {
      const activity = await ActivityModel.findById(id);
      return activity ? this.mapActivityToSchema(activity) : undefined;
    } catch (error) {
      console.error('Error getting activity:', error);
      return undefined;
    }
  }

  async getActivities(): Promise<Activity[]> {
    try {
      const activities = await ActivityModel.find();
      return activities.map(activity => this.mapActivityToSchema(activity));
    } catch (error) {
      console.error('Error getting all activities:', error);
      return [];
    }
  }

  async getRecentActivities(limit: number): Promise<Activity[]> {
    try {
      const activities = await ActivityModel.find()
        .sort({ timestamp: -1 })
        .limit(limit);
      return activities.map(activity => this.mapActivityToSchema(activity));
    } catch (error) {
      console.error('Error getting recent activities:', error);
      return [];
    }
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    try {
      const newActivity = new ActivityModel(insertActivity);
      const savedActivity = await newActivity.save();
      return this.mapActivityToSchema(savedActivity);
    } catch (error) {
      console.error('Error creating activity:', error);
      throw new Error('Failed to create activity');
    }
  }

  // Document operations
  async getDocument(id: number): Promise<Document | undefined> {
    try {
      const document = await DocumentModel.findById(id);
      return document ? this.mapDocumentToSchema(document) : undefined;
    } catch (error) {
      console.error('Error getting document:', error);
      return undefined;
    }
  }

  async getDocumentsByProject(projectId: number): Promise<Document[]> {
    try {
      const documents = await DocumentModel.find({ projectId });
      return documents.map(document => this.mapDocumentToSchema(document));
    } catch (error) {
      console.error('Error getting documents by project:', error);
      return [];
    }
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    try {
      const newDocument = new DocumentModel(insertDocument);
      const savedDocument = await newDocument.save();
      return this.mapDocumentToSchema(savedDocument);
    } catch (error) {
      console.error('Error creating document:', error);
      throw new Error('Failed to create document');
    }
  }

  // Equipment operations
  async getEquipment(id: number): Promise<Equipment | undefined> {
    try {
      const equipment = await EquipmentModel.findById(id);
      return equipment ? this.mapEquipmentToSchema(equipment) : undefined;
    } catch (error) {
      console.error('Error getting equipment:', error);
      return undefined;
    }
  }

  async getAllEquipment(): Promise<Equipment[]> {
    try {
      const equipmentItems = await EquipmentModel.find();
      return equipmentItems.map(equipment => this.mapEquipmentToSchema(equipment));
    } catch (error) {
      console.error('Error getting all equipment:', error);
      return [];
    }
  }

  async createEquipment(insertEquipment: InsertEquipment): Promise<Equipment> {
    try {
      const newEquipment = new EquipmentModel(insertEquipment);
      const savedEquipment = await newEquipment.save();
      return this.mapEquipmentToSchema(savedEquipment);
    } catch (error) {
      console.error('Error creating equipment:', error);
      throw new Error('Failed to create equipment');
    }
  }

  async updateEquipment(id: number, equipmentUpdate: Partial<InsertEquipment>): Promise<Equipment | undefined> {
    try {
      const updatedEquipment = await EquipmentModel.findByIdAndUpdate(
        id, 
        equipmentUpdate, 
        { new: true }
      );
      return updatedEquipment ? this.mapEquipmentToSchema(updatedEquipment) : undefined;
    } catch (error) {
      console.error('Error updating equipment:', error);
      return undefined;
    }
  }

  // Email verification operations
  async createEmailVerification(verification: InsertEmailVerification): Promise<EmailVerification> {
    try {
      const newVerification = new EmailVerificationModel(verification);
      const savedVerification = await newVerification.save();
      return this.mapEmailVerificationToSchema(savedVerification);
    } catch (error) {
      console.error('Error creating email verification:', error);
      throw new Error('Failed to create email verification');
    }
  }

  async getEmailVerificationByToken(token: string): Promise<EmailVerification | undefined> {
    try {
      const verification = await EmailVerificationModel.findOne({ token });
      return verification ? this.mapEmailVerificationToSchema(verification) : undefined;
    } catch (error) {
      console.error('Error getting email verification by token:', error);
      return undefined;
    }
  }

  async deleteEmailVerification(id: number): Promise<void> {
    try {
      await EmailVerificationModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting email verification:', error);
    }
  }

  // Supply order operations
  async getSupplyOrder(id: number): Promise<SupplyOrder | undefined> {
    try {
      const order = await SupplyOrderModel.findById(id);
      return order ? this.mapSupplyOrderToSchema(order) : undefined;
    } catch (error) {
      console.error('Error getting supply order:', error);
      return undefined;
    }
  }

  async getSupplyOrdersByProject(projectId: number): Promise<SupplyOrder[]> {
    try {
      const orders = await SupplyOrderModel.find({ projectId });
      return orders.map(order => this.mapSupplyOrderToSchema(order));
    } catch (error) {
      console.error('Error getting supply orders by project:', error);
      return [];
    }
  }

  async getSupplyOrdersBySupplier(supplierId: number): Promise<SupplyOrder[]> {
    try {
      const orders = await SupplyOrderModel.find({ supplierId });
      return orders.map(order => this.mapSupplyOrderToSchema(order));
    } catch (error) {
      console.error('Error getting supply orders by supplier:', error);
      return [];
    }
  }

  async createSupplyOrder(insertOrder: InsertSupplyOrder): Promise<SupplyOrder> {
    try {
      const newOrder = new SupplyOrderModel(insertOrder);
      const savedOrder = await newOrder.save();
      return this.mapSupplyOrderToSchema(savedOrder);
    } catch (error) {
      console.error('Error creating supply order:', error);
      throw new Error('Failed to create supply order');
    }
  }

  async updateSupplyOrder(id: number, orderUpdate: Partial<InsertSupplyOrder>): Promise<SupplyOrder | undefined> {
    try {
      const updatedOrder = await SupplyOrderModel.findByIdAndUpdate(
        id, 
        orderUpdate, 
        { new: true }
      );
      return updatedOrder ? this.mapSupplyOrderToSchema(updatedOrder) : undefined;
    } catch (error) {
      console.error('Error updating supply order:', error);
      return undefined;
    }
  }

  // Helper methods to map MongoDB documents to our schema types
  private mapUserToSchema(user: any): User {
    return {
      id: user._id.toString(),
      username: user.username,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      verificationToken: user.verificationToken,
      resetPasswordToken: user.resetPasswordToken,
      createdAt: user.createdAt
    };
  }

  private mapProjectToSchema(project: any): Project {
    return {
      id: project._id.toString(),
      name: project.name,
      description: project.description,
      status: project.status,
      progress: project.progress,
      clientId: project.clientId.toString(),
      startDate: project.startDate,
      endDate: project.endDate,
      budget: project.budget,
      spent: project.spent,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    };
  }

  private mapTaskToSchema(task: any): Task {
    return {
      id: task._id.toString(),
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      projectId: task.projectId.toString(),
      assigneeId: task.assigneeId.toString(),
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    };
  }

  private mapResourceToSchema(resource: any): Resource {
    return {
      id: resource._id.toString(),
      teamMemberCount: resource.teamMemberCount,
      equipmentUtilization: resource.equipmentUtilization,
      teamMembers: resource.teamMembers,
      projectId: resource.projectId.toString(),
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt
    };
  }

  private mapClientToSchema(client: any): Client {
    return {
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      contactPerson: client.contactPerson,
      createdAt: client.createdAt
    };
  }

  private mapActivityToSchema(activity: any): Activity {
    return {
      id: activity._id.toString(),
      action: activity.action,
      details: activity.details,
      userId: activity.userId.toString(),
      projectId: activity.projectId ? activity.projectId.toString() : null,
      timestamp: activity.timestamp
    };
  }

  private mapDocumentToSchema(document: any): Document {
    return {
      id: document._id.toString(),
      name: document.name,
      type: document.type,
      url: document.url,
      projectId: document.projectId.toString(),
      uploadedBy: document.uploadedBy.toString(),
      uploadedAt: document.uploadedAt
    };
  }

  private mapEquipmentToSchema(equipment: any): Equipment {
    return {
      id: equipment._id.toString(),
      type: equipment.type,
      name: equipment.name,
      status: equipment.status,
      assignedProjectId: equipment.assignedProjectId ? equipment.assignedProjectId.toString() : null,
      createdAt: equipment.createdAt
    };
  }

  private mapEmailVerificationToSchema(verification: any): EmailVerification {
    return {
      id: verification._id.toString(),
      userId: verification.userId.toString(),
      token: verification.token,
      expiresAt: verification.expiresAt,
      createdAt: verification.createdAt
    };
  }

  private mapSupplyOrderToSchema(order: any): SupplyOrder {
    return {
      id: order._id.toString(),
      name: order.name,
      description: order.description,
      status: order.status,
      projectId: order.projectId.toString(),
      supplierId: order.supplierId.toString(),
      managerId: order.managerId.toString(),
      quantity: order.quantity,
      requestedDate: order.requestedDate,
      requiredByDate: order.requiredByDate,
      deliveryDate: order.deliveryDate,
      notes: order.notes
    };
  }

  // Initialize demo data
  async initializeDemoData() {
    try {
      const usersCount = await UserModel.countDocuments();
      
      if (usersCount === 0) {
        console.log('Initializing demo data...');
        
        // Create demo users
        const adminUser = await this.createUser({
          username: "admin",
          password: "admin123",
          email: "admin@webuild.com",
          firstName: "Admin",
          lastName: "User",
          role: "Manager",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          emailVerified: true
        });
        
        const sarahUser = await this.createUser({
          username: "sarah",
          password: "sarah123",
          email: "sarah@webuild.com",
          firstName: "Sarah",
          lastName: "Johnson",
          role: "Employee",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          emailVerified: true
        });
        
        const clientUser = await this.createUser({
          username: "client",
          password: "client123",
          email: "client@example.com",
          firstName: "Client",
          lastName: "User",
          role: "Client",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          emailVerified: true
        });
        
        const supplierUser = await this.createUser({
          username: "supplier",
          password: "supplier123",
          email: "supplier@example.com",
          firstName: "Supplier",
          lastName: "User",
          role: "Supplier",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          emailVerified: true
        });

        // Create sample client
        const client = await this.createClient({
          name: "ABC Corporation",
          email: "contact@abccorp.com",
          phone: "555-1234",
          address: "123 Business Ave, Suite 100",
          contactPerson: "John Executive"
        });

        // Create sample projects
        const project1 = await this.createProject({
          name: "City Heights Tower",
          description: "A 20-story residential tower with 100 luxury apartments and ground-floor retail space.",
          clientId: clientUser.id,
          status: "In Progress",
          startDate: new Date("2023-05-15"),
          endDate: new Date("2024-08-30"),
          progress: 45,
          budget: 12500000,
          spent: 5625000
        });

        const project2 = await this.createProject({
          name: "Green Valley Residences",
          description: "Eco-friendly residential complex with 50 units, solar panels, and sustainable design features.",
          clientId: clientUser.id,
          status: "Planning",
          startDate: new Date("2023-09-01"),
          endDate: new Date("2025-03-15"),
          progress: 15,
          budget: 8750000,
          spent: 1312500
        });

        // Create sample tasks
        await this.createTask({
          projectId: project1.id,
          name: "Foundation completion inspection",
          description: "Final inspection of foundation before proceeding to structural framing",
          assigneeId: sarahUser.id,
          status: "completed",
          priority: "high",
          dueDate: new Date("2023-08-15")
        });

        await this.createTask({
          projectId: project1.id,
          name: "Structural steel installation",
          description: "Installation of main structural steel framing for floors 1-10",
          assigneeId: sarahUser.id,
          status: "in progress",
          priority: "high",
          dueDate: new Date("2023-11-30")
        });

        await this.createTask({
          projectId: project2.id,
          name: "Foundation inspection for Green Valley Residences",
          description: "Inspection of foundation work for Building A",
          assigneeId: sarahUser.id,
          status: "pending",
          priority: "medium",
          dueDate: new Date("2023-10-15")
        });

        // Create sample activities
        await this.createActivity({
          userId: adminUser.id,
          projectId: project1.id,
          action: "Added new milestone",
          details: "Added 'Facade completion' milestone for City Heights Tower"
        });

        await this.createActivity({
          userId: sarahUser.id,
          projectId: project1.id,
          action: "Updated task status",
          details: "Marked 'Foundation completion inspection' as completed"
        });

        await this.createActivity({
          userId: adminUser.id,
          projectId: project2.id,
          action: "Scheduled meeting",
          details: "Scheduled design review meeting with client for Green Valley Residences"
        });

        // Create sample equipment
        await this.createEquipment({
          name: "Tower Crane #1",
          type: "Heavy Equipment",
          status: "in use",
          assignedProjectId: project1.id
        });

        await this.createEquipment({
          name: "Excavator 320",
          type: "Heavy Equipment",
          status: "available",
          assignedProjectId: null
        });

        // Create sample supply order
        await this.createSupplyOrder({
          projectId: project1.id,
          supplierId: supplierUser.id,
          managerId: adminUser.id,
          name: "Concrete Mix - Grade A",
          description: "High-strength concrete mix for foundation and structural elements",
          quantity: 200,
          status: "Delivered",
          requiredByDate: new Date("2023-06-15"),
          notes: "Delivery completed ahead of schedule"
        });

        await this.createSupplyOrder({
          projectId: project2.id,
          supplierId: supplierUser.id,
          managerId: adminUser.id,
          name: "Eco-friendly Insulation",
          description: "Sustainable insulation materials for Green Valley Residences",
          quantity: 100,
          status: "Pending",
          requiredByDate: new Date("2023-12-01"),
          notes: "Need to confirm exact specifications with architect"
        });
        
        console.log('Demo data initialization complete!');
      } else {
        console.log('Demo data already exists, skipping initialization');
      }
    } catch (error) {
      console.error('Error initializing demo data:', error);
    }
  }
}

import { MongoStorage } from './storage.mongo';

// Use MongoDB storage implementation instead of MemStorage
export const storage = new MongoStorage();
