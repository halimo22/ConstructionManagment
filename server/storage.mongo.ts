import { IStorage } from './storage';
import {
  User, Project, Task, Resource, Client,
  Activity, Document, Equipment, SupplyOrder, EmailVerification
} from './models/index';
import {
  User as UserType,
  Project as ProjectType,
  Task as TaskType,
  Resource as ResourceType,
  Client as ClientType,
  Activity as ActivityType,
  Document as DocumentType,
  Equipment as EquipmentType,
  SupplyOrder as SupplyOrderType,
  EmailVerification as EmailVerificationType,
  InsertUser, InsertProject, InsertTask, InsertResource,
  InsertClient, InsertActivity, InsertDocument, InsertEquipment,
  InsertSupplyOrder, InsertEmailVerification
} from '../shared/schema';

export class MongoStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<UserType | undefined> {
    const user = await User.findById(id).lean();
    if (!user) return undefined;
    return this.transformUserToType(user);
  }

  async getUserByUsername(username: string): Promise<UserType | undefined> {
    const user = await User.findOne({ username }).lean();
    if (!user) return undefined;
    return this.transformUserToType(user);
  }

  async getUserByEmail(email: string): Promise<UserType | undefined> {
    const user = await User.findOne({ email }).lean();
    if (!user) return undefined;
    return this.transformUserToType(user);
  }

  async createUser(insertUser: InsertUser): Promise<UserType> {
    const newUser = new User(insertUser);
    const savedUser = await newUser.save();
    return this.transformUserToType(savedUser.toObject());
  }

  async updateUser(id: number, userUpdate: Partial<InsertUser>): Promise<UserType | undefined> {
    const updatedUser = await User.findByIdAndUpdate(id, userUpdate, { new: true }).lean();
    if (!updatedUser) return undefined;
    return this.transformUserToType(updatedUser);
  }

  async getUsersByRole(role: string): Promise<UserType[]> {
    const users = await User.find({ role }).lean();
    return users.map(user => this.transformUserToType(user));
  }

  async getUsers(): Promise<UserType[]> {
    const users = await User.find().lean();
    return users.map(user => this.transformUserToType(user));
  }

  // Email verification operations
  async createEmailVerification(verification: InsertEmailVerification): Promise<EmailVerificationType> {
    const newVerification = new EmailVerification(verification);
    const savedVerification = await newVerification.save();
    return this.transformEmailVerificationToType(savedVerification.toObject());
  }

  async getEmailVerificationByToken(token: string): Promise<EmailVerificationType | undefined> {
    const verification = await EmailVerification.findOne({ token }).lean();
    if (!verification) return undefined;
    return this.transformEmailVerificationToType(verification);
  }

  async deleteEmailVerification(id: number): Promise<void> {
    await EmailVerification.findByIdAndDelete(id);
  }

  // Supply order operations
  async getSupplyOrder(id: number): Promise<SupplyOrderType | undefined> {
    const order = await SupplyOrder.findById(id).lean();
    if (!order) return undefined;
    return this.transformSupplyOrderToType(order);
  }

  async getSupplyOrdersByProject(projectId: number): Promise<SupplyOrderType[]> {
    const orders = await SupplyOrder.find({ projectId }).lean();
    return orders.map(order => this.transformSupplyOrderToType(order));
  }

  async getSupplyOrdersBySupplier(supplierId: number): Promise<SupplyOrderType[]> {
    const orders = await SupplyOrder.find({ supplierId }).lean();
    return orders.map(order => this.transformSupplyOrderToType(order));
  }

  async createSupplyOrder(order: InsertSupplyOrder): Promise<SupplyOrderType> {
    const newOrder = new SupplyOrder(order);
    const savedOrder = await newOrder.save();
    return this.transformSupplyOrderToType(savedOrder.toObject());
  }

  async updateSupplyOrder(id: number, orderUpdate: Partial<InsertSupplyOrder>): Promise<SupplyOrderType | undefined> {
    const updatedOrder = await SupplyOrder.findByIdAndUpdate(id, orderUpdate, { new: true }).lean();
    if (!updatedOrder) return undefined;
    return this.transformSupplyOrderToType(updatedOrder);
  }

  // Project operations
  async getProject(id: number): Promise<ProjectType | undefined> {
    const project = await Project.findById(id).lean();
    if (!project) return undefined;
    return this.transformProjectToType(project);
  }

  async getProjects(): Promise<ProjectType[]> {
    const projects = await Project.find().lean();
    return projects.map(project => this.transformProjectToType(project));
  }

  async createProject(project: InsertProject): Promise<ProjectType> {
    const newProject = new Project(project);
    const savedProject = await newProject.save();
    return this.transformProjectToType(savedProject.toObject());
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<ProjectType | undefined> {
    const updatedProject = await Project.findByIdAndUpdate(id, projectUpdate, { new: true }).lean();
    if (!updatedProject) return undefined;
    return this.transformProjectToType(updatedProject);
  }

  // Task operations
  async getTask(id: number): Promise<TaskType | undefined> {
    const task = await Task.findById(id).lean();
    if (!task) return undefined;
    return this.transformTaskToType(task);
  }

  async getTasks(): Promise<TaskType[]> {
    const tasks = await Task.find().lean();
    return tasks.map(task => this.transformTaskToType(task));
  }

  async getTasksByProject(projectId: number): Promise<TaskType[]> {
    const tasks = await Task.find({ projectId }).lean();
    return tasks.map(task => this.transformTaskToType(task));
  }

  async createTask(task: InsertTask): Promise<TaskType> {
    const newTask = new Task(task);
    const savedTask = await newTask.save();
    return this.transformTaskToType(savedTask.toObject());
  }

  async updateTask(id: number, taskUpdate: Partial<InsertTask>): Promise<TaskType | undefined> {
    const updatedTask = await Task.findByIdAndUpdate(id, taskUpdate, { new: true }).lean();
    if (!updatedTask) return undefined;
    return this.transformTaskToType(updatedTask);
  }

  // Resource operations
  async getResource(id: number): Promise<ResourceType | undefined> {
    const resource = await Resource.findById(id).lean();
    if (!resource) return undefined;
    return this.transformResourceToType(resource);
  }

  async getResourceByProject(projectId: number): Promise<ResourceType | undefined> {
    const resource = await Resource.findOne({ projectId }).lean();
    if (!resource) return undefined;
    return this.transformResourceToType(resource);
  }

  async getResources(): Promise<ResourceType[]> {
    const resources = await Resource.find().lean();
    return resources.map(resource => this.transformResourceToType(resource));
  }

  async createResource(resource: InsertResource): Promise<ResourceType> {
    const newResource = new Resource(resource);
    const savedResource = await newResource.save();
    return this.transformResourceToType(savedResource.toObject());
  }

  async updateResource(id: number, resourceUpdate: Partial<InsertResource>): Promise<ResourceType | undefined> {
    const updatedResource = await Resource.findByIdAndUpdate(id, resourceUpdate, { new: true }).lean();
    if (!updatedResource) return undefined;
    return this.transformResourceToType(updatedResource);
  }

  // Client operations
  async getClient(id: number): Promise<ClientType | undefined> {
    const client = await Client.findById(id).lean();
    if (!client) return undefined;
    return this.transformClientToType(client);
  }

  async getClients(): Promise<ClientType[]> {
    const clients = await Client.find().lean();
    return clients.map(client => this.transformClientToType(client));
  }

  async createClient(client: InsertClient): Promise<ClientType> {
    const newClient = new Client(client);
    const savedClient = await newClient.save();
    return this.transformClientToType(savedClient.toObject());
  }

  // Activity operations
  async getActivity(id: number): Promise<ActivityType | undefined> {
    const activity = await Activity.findById(id).lean();
    if (!activity) return undefined;
    return this.transformActivityToType(activity);
  }

  async getActivities(): Promise<ActivityType[]> {
    const activities = await Activity.find().lean();
    return activities.map(activity => this.transformActivityToType(activity));
  }

  async getRecentActivities(limit: number): Promise<ActivityType[]> {
    const activities = await Activity.find().sort({ timestamp: -1 }).limit(limit).lean();
    return activities.map(activity => this.transformActivityToType(activity));
  }

  async createActivity(activity: InsertActivity): Promise<ActivityType> {
    const newActivity = new Activity(activity);
    const savedActivity = await newActivity.save();
    return this.transformActivityToType(savedActivity.toObject());
  }

  // Document operations
  async getDocument(id: number): Promise<DocumentType | undefined> {
    const document = await Document.findById(id).lean();
    if (!document) return undefined;
    return this.transformDocumentToType(document);
  }

  async getDocumentsByProject(projectId: number): Promise<DocumentType[]> {
    const documents = await Document.find({ projectId }).lean();
    return documents.map(document => this.transformDocumentToType(document));
  }

  async createDocument(document: InsertDocument): Promise<DocumentType> {
    const newDocument = new Document(document);
    const savedDocument = await newDocument.save();
    return this.transformDocumentToType(savedDocument.toObject());
  }

  // Equipment operations
  async getEquipment(id: number): Promise<EquipmentType | undefined> {
    const equipment = await Equipment.findById(id).lean();
    if (!equipment) return undefined;
    return this.transformEquipmentToType(equipment);
  }

  async getAllEquipment(): Promise<EquipmentType[]> {
    const equipmentItems = await Equipment.find().lean();
    return equipmentItems.map(item => this.transformEquipmentToType(item));
  }

  async createEquipment(equipment: InsertEquipment): Promise<EquipmentType> {
    const newEquipment = new Equipment(equipment);
    const savedEquipment = await newEquipment.save();
    return this.transformEquipmentToType(savedEquipment.toObject());
  }

  async updateEquipment(id: number, equipmentUpdate: Partial<InsertEquipment>): Promise<EquipmentType | undefined> {
    const updatedEquipment = await Equipment.findByIdAndUpdate(id, equipmentUpdate, { new: true }).lean();
    if (!updatedEquipment) return undefined;
    return this.transformEquipmentToType(updatedEquipment);
  }

  // Helper methods to transform MongoDB documents to our schema types
  private transformUserToType(doc: any): UserType {
    return {
      id: doc._id,
      username: doc.username,
      password: doc.password,
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      role: doc.role,
      avatar: doc.avatar,
      emailVerified: doc.emailVerified,
      verificationToken: doc.verificationToken,
      resetPasswordToken: doc.resetPasswordToken,
      createdAt: doc.createdAt
    };
  }

  private transformProjectToType(doc: any): ProjectType {
    return {
      id: doc._id,
      name: doc.name,
      description: doc.description,
      status: doc.status,
      progress: doc.progress,
      clientId: doc.clientId,
      startDate: doc.startDate,
      endDate: doc.endDate,
      budget: doc.budget,
      spent: doc.spent,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  private transformTaskToType(doc: any): TaskType {
    return {
      id: doc._id,
      name: doc.name,
      description: doc.description,
      status: doc.status,
      priority: doc.priority,
      projectId: doc.projectId,
      assigneeId: doc.assigneeId,
      startDate: doc.startDate,
      dueDate: doc.dueDate,
      completedDate: doc.completedDate,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  private transformResourceToType(doc: any): ResourceType {
    return {
      id: doc._id,
      teamMemberCount: doc.teamMemberCount,
      equipmentUtilization: doc.equipmentUtilization,
      materialInventory: doc.materialInventory,
      budgetAllocation: doc.budgetAllocation,
      projectId: doc.projectId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  private transformClientToType(doc: any): ClientType {
    return {
      id: doc._id,
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      address: doc.address,
      contactPerson: doc.contactPerson,
      createdAt: doc.createdAt
    };
  }

  private transformActivityToType(doc: any): ActivityType {
    return {
      id: doc._id,
      action: doc.action,
      details: doc.details,
      userId: doc.userId,
      projectId: doc.projectId,
      timestamp: doc.timestamp
    };
  }

  private transformDocumentToType(doc: any): DocumentType {
    return {
      id: doc._id,
      name: doc.name,
      type: doc.type,
      url: doc.url,
      projectId: doc.projectId,
      uploadedBy: doc.uploadedBy,
      uploadedAt: doc.uploadedAt
    };
  }

  private transformEquipmentToType(doc: any): EquipmentType {
    return {
      id: doc._id,
      type: doc.type,
      name: doc.name,
      status: doc.status,
      assignedProjectId: doc.assignedProjectId,
      createdAt: doc.createdAt
    };
  }

  private transformSupplyOrderToType(doc: any): SupplyOrderType {
    return {
      id: doc._id,
      name: doc.name,
      description: doc.description,
      status: doc.status,
      projectId: doc.projectId,
      supplierId: doc.supplierId,
      managerId: doc.managerId,
      quantity: doc.quantity,
      requestedDate: doc.requestedDate,
      requiredByDate: doc.requiredByDate,
      deliveryDate: doc.deliveryDate,
      notes: doc.notes
    };
  }

  private transformEmailVerificationToType(doc: any): EmailVerificationType {
    return {
      id: doc._id,
      userId: doc.userId,
      token: doc.token,
      createdAt: doc.createdAt
    };
  }
}