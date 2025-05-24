import express, { type Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertProjectSchema, insertTaskSchema, insertResourceSchema, insertClientSchema, insertActivitySchema, insertDocumentSchema, insertEquipmentSchema, insertEmailVerificationSchema, insertSupplyOrderSchema } from "@shared/schema";
import { z } from "zod";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();
  
  // Middleware for role-based access control
  const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.body.user || (req as any).user;
      
      if (!user) {
        return res.status(401).json({ message: "Unauthorized - please login" });
      }
      
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden - insufficient permissions" });
      }
      
      next();
    };
  };

  // Generate verification token
  const generateToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
  };

  // AUTH ROUTES
  apiRouter.post("/auth/register", async (req: Request, res: Response) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid user data", errors: result.error.errors });
      }
      
      const { username, email, role } = result.data;
      
      // Validate role is one of the allowed roles
      const allowedRoles = ["manager", "employee", "client", "supplier"];
      if (!allowedRoles.includes(role.toLowerCase())) {
        return res.status(400).json({ message: "Invalid role. Role must be one of: manager, employee, client, supplier" });
      }
      
      // Check if username or email already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      // Create verification token
      const verificationToken = generateToken();
      
      // Create user with verification token and emailVerified=false
      const user = await storage.createUser({
        ...result.data,
        role: role.toLowerCase(),
        emailVerified: false,
        verificationToken
      });
      
      // Create email verification record
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // Token valid for 24 hours
      
      await storage.createEmailVerification({
        userId: user.id,
        token: verificationToken,
        expiresAt
      });
      
      // In a real app, you would send an email with the verification link
      // For development purposes, we'll return the token in the response
      
      // Don't send password in response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(201).json({
        message: "User registered successfully. Please verify your email.",
        user: userWithoutPassword,
        verificationToken // In production, remove this and send email instead
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/auth/verify-email", async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({ message: "Verification token is required" });
      }
      
      // Find verification record
      const verification = await storage.getEmailVerificationByToken(token);
      
      if (!verification) {
        return res.status(404).json({ message: "Invalid verification token" });
      }
      
      // Check if token is expired
      if (new Date() > verification.expiresAt) {
        return res.status(400).json({ message: "Verification token has expired" });
      }
      
      // Get user and update emailVerified status
      const user = await storage.getUser(verification.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      await storage.updateUser(user.id, { emailVerified: true, verificationToken: null });
      
      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Email verification error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Check if email is verified
      if (!user.emailVerified) {
        return res.status(403).json({ message: "Please verify your email before logging in" });
      }
      
      // Set user in session without the password
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json({ 
        message: "Login successful",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/auth/resend-verification", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        // For security reasons, don't reveal that the email doesn't exist
        return res.status(200).json({ message: "If your email exists in our system, a verification link has been sent" });
      }
      
      if (user.emailVerified) {
        return res.status(400).json({ message: "Email is already verified" });
      }
      
      // Generate new token
      const verificationToken = generateToken();
      
      // Update user with new token
      await storage.updateUser(user.id, { verificationToken });
      
      // Create or update email verification record
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // Token valid for 24 hours
      
      await storage.createEmailVerification({
        userId: user.id,
        token: verificationToken,
        expiresAt
      });
      
      // In a real app, you would send an email with the verification link
      // For development purposes, we'll return the token in the response
      
      return res.status(200).json({
        message: "Verification email has been sent",
        verificationToken // In production, remove this and send email instead
      });
    } catch (error) {
      console.error("Resend verification error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/auth/logout", (req: Request, res: Response) => {
    return res.status(200).json({ message: "Logout successful" });
  });
  
  // USER ROUTES
  apiRouter.get("/users", async (req: Request, res: Response) => {
    try {
      const users = await storage.getUsers();
      return res.status(200).json(users.map(user => {
        // Don't send passwords
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.get("/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password
      const { password, ...userWithoutPassword } = user;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/users", async (req: Request, res: Response) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid user data", errors: result.error.errors });
      }
      
      const existingUser = await storage.getUserByUsername(result.data.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(result.data);
      
      // Don't send password
      const { password, ...userWithoutPassword } = user;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // PROJECT ROUTES
  apiRouter.get("/projects", async (req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.get("/projects/:id", async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      return res.status(200).json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/projects", async (req: Request, res: Response) => {
    try {
      const result = insertProjectSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid project data", errors: result.error.errors });
      }
      
      const client = await storage.getClient(result.data.clientId);
      
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      
      const project = await storage.createProject(result.data);
      
      return res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.patch("/projects/:id", async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Validate only the fields that are being updated
      const partialProjectSchema = insertProjectSchema.partial();
      const result = partialProjectSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid project data", errors: result.error.errors });
      }
      
      const updatedProject = await storage.updateProject(projectId, result.data);
      
      return res.status(200).json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // TASK ROUTES
  apiRouter.get("/tasks", async (req: Request, res: Response) => {
    try {
      const { projectId } = req.query;
      
      if (projectId) {
        const projectIdNum = parseInt(projectId as string);
        
        if (isNaN(projectIdNum)) {
          return res.status(400).json({ message: "Invalid project ID" });
        }
        
        const tasks = await storage.getTasksByProject(projectIdNum);
        return res.status(200).json(tasks);
      }
      
      const tasks = await storage.getTasks();
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.get("/tasks/:id", async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      
      if (isNaN(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }
      
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      return res.status(200).json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/tasks", async (req: Request, res: Response) => {
    try {
      const result = insertTaskSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid task data", errors: result.error.errors });
      }
      
      const project = await storage.getProject(result.data.projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      if (result.data.assigneeId) {
        const assignee = await storage.getUser(result.data.assigneeId);
        
        if (!assignee) {
          return res.status(404).json({ message: "Assignee not found" });
        }
      }
      
      const task = await storage.createTask(result.data);
      
      return res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.patch("/tasks/:id", async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      
      if (isNaN(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }
      
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      // Validate only the fields that are being updated
      const partialTaskSchema = insertTaskSchema.partial();
      const result = partialTaskSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid task data", errors: result.error.errors });
      }
      
      const updatedTask = await storage.updateTask(taskId, result.data);
      
      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // RESOURCE ROUTES
  apiRouter.get("/resources", async (req: Request, res: Response) => {
    try {
      const { projectId } = req.query;
      
      if (projectId) {
        const projectIdNum = parseInt(projectId as string);
        
        if (isNaN(projectIdNum)) {
          return res.status(400).json({ message: "Invalid project ID" });
        }
        
        const resource = await storage.getResourceByProject(projectIdNum);
        
        if (!resource) {
          return res.status(404).json({ message: "Resource not found for project" });
        }
        
        return res.status(200).json(resource);
      }
      
      const resources = await storage.getResources();
      return res.status(200).json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/resources", async (req: Request, res: Response) => {
    try {
      const result = insertResourceSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid resource data", errors: result.error.errors });
      }
      
      const project = await storage.getProject(result.data.projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Check if resource already exists for project
      const existingResource = await storage.getResourceByProject(result.data.projectId);
      
      if (existingResource) {
        return res.status(409).json({ message: "Resource already exists for project" });
      }
      
      const resource = await storage.createResource(result.data);
      
      return res.status(201).json(resource);
    } catch (error) {
      console.error("Error creating resource:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.patch("/resources/:id", async (req: Request, res: Response) => {
    try {
      const resourceId = parseInt(req.params.id);
      
      if (isNaN(resourceId)) {
        return res.status(400).json({ message: "Invalid resource ID" });
      }
      
      const resource = await storage.getResource(resourceId);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      // Validate only the fields that are being updated
      const partialResourceSchema = insertResourceSchema.partial();
      const result = partialResourceSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid resource data", errors: result.error.errors });
      }
      
      const updatedResource = await storage.updateResource(resourceId, result.data);
      
      return res.status(200).json(updatedResource);
    } catch (error) {
      console.error("Error updating resource:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // CLIENT ROUTES
  apiRouter.get("/clients", async (req: Request, res: Response) => {
    try {
      const clients = await storage.getClients();
      return res.status(200).json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.get("/clients/:id", async (req: Request, res: Response) => {
    try {
      const clientId = parseInt(req.params.id);
      
      if (isNaN(clientId)) {
        return res.status(400).json({ message: "Invalid client ID" });
      }
      
      const client = await storage.getClient(clientId);
      
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      
      return res.status(200).json(client);
    } catch (error) {
      console.error("Error fetching client:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/clients", async (req: Request, res: Response) => {
    try {
      const result = insertClientSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid client data", errors: result.error.errors });
      }
      
      const client = await storage.createClient(result.data);
      
      return res.status(201).json(client);
    } catch (error) {
      console.error("Error creating client:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ACTIVITY ROUTES
  apiRouter.get("/activities", async (req: Request, res: Response) => {
    try {
      const { limit } = req.query;
      
      if (limit) {
        const limitNum = parseInt(limit as string);
        
        if (!isNaN(limitNum)) {
          const activities = await storage.getRecentActivities(limitNum);
          return res.status(200).json(activities);
        }
      }
      
      const activities = await storage.getActivities();
      return res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/activities", async (req: Request, res: Response) => {
    try {
      const result = insertActivitySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid activity data", errors: result.error.errors });
      }
      
      const user = await storage.getUser(result.data.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if (result.data.projectId) {
        const project = await storage.getProject(result.data.projectId);
        
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
      }
      
      const activity = await storage.createActivity(result.data);
      
      return res.status(201).json(activity);
    } catch (error) {
      console.error("Error creating activity:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // DOCUMENT ROUTES
  apiRouter.get("/documents", async (req: Request, res: Response) => {
    try {
      const { projectId } = req.query;
      
      if (projectId) {
        const projectIdNum = parseInt(projectId as string);
        
        if (isNaN(projectIdNum)) {
          return res.status(400).json({ message: "Invalid project ID" });
        }
        
        const documents = await storage.getDocumentsByProject(projectIdNum);
        return res.status(200).json(documents);
      }
      
      return res.status(400).json({ message: "Project ID is required" });
    } catch (error) {
      console.error("Error fetching documents:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/documents", async (req: Request, res: Response) => {
    try {
      const result = insertDocumentSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid document data", errors: result.error.errors });
      }
      
      const project = await storage.getProject(result.data.projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const user = await storage.getUser(result.data.uploadedBy);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const document = await storage.createDocument(result.data);
      
      return res.status(201).json(document);
    } catch (error) {
      console.error("Error creating document:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // EQUIPMENT ROUTES
  apiRouter.get("/equipment", async (req: Request, res: Response) => {
    try {
      const equipment = await storage.getAllEquipment();
      return res.status(200).json(equipment);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.post("/equipment", async (req: Request, res: Response) => {
    try {
      const result = insertEquipmentSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid equipment data", errors: result.error.errors });
      }
      
      if (result.data.assignedProjectId) {
        const project = await storage.getProject(result.data.assignedProjectId);
        
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
      }
      
      const equipment = await storage.createEquipment(result.data);
      
      return res.status(201).json(equipment);
    } catch (error) {
      console.error("Error creating equipment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.patch("/equipment/:id", async (req: Request, res: Response) => {
    try {
      const equipmentId = parseInt(req.params.id);
      
      if (isNaN(equipmentId)) {
        return res.status(400).json({ message: "Invalid equipment ID" });
      }
      
      const equipment = await storage.getEquipment(equipmentId);
      
      if (!equipment) {
        return res.status(404).json({ message: "Equipment not found" });
      }
      
      // Validate only the fields that are being updated
      const partialEquipmentSchema = insertEquipmentSchema.partial();
      const result = partialEquipmentSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid equipment data", errors: result.error.errors });
      }
      
      if (result.data.assignedProjectId) {
        const project = await storage.getProject(result.data.assignedProjectId);
        
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
      }
      
      const updatedEquipment = await storage.updateEquipment(equipmentId, result.data);
      
      return res.status(200).json(updatedEquipment);
    } catch (error) {
      console.error("Error updating equipment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Register the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);

  return httpServer;
}
