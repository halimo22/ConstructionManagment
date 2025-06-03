import { z } from "zod";

// User model schema
const userSchema = z.object({
  id: z.string().optional(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['manager', 'employee', 'client', 'supplier']),
  avatar: z.string().nullable().optional(),
  emailVerified: z.boolean().default(false),
  verificationToken: z.string().nullable().optional(),
  resetPasswordToken: z.string().nullable().optional(),
  createdAt: z.date().optional()
});

// Project model schema
const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  progress: z.number().default(0),
  clientId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  budget: z.number(),
  spent: z.number().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

// Task model schema
const taskSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  priority: z.string(),
  projectId: z.string(),
  assigneeId: z.string(),
  startDate: z.date(),
  dueDate: z.date(),
  completedDate: z.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

// Resource model schema
const resourceSchema = z.object({
  id: z.string().optional(),
  teamMemberCount: z.number(),
  equipmentUtilization: z.number(),
  materialInventory: z.number(),
  budgetAllocation: z.array(
    z.object({
      category: z.string(),
      amount: z.number()
    })
  ).optional(),
  projectId: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

// Client model schema
const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  contactPerson: z.string(),
  createdAt: z.date().optional()
});

// Activity model schema
const activitySchema = z.object({
  id: z.string().optional(),
  action: z.string(),
  details: z.string(),
  userId: z.string(),
  projectId: z.string().nullable().optional(),
  timestamp: z.date().optional()
});

// Document model schema
const documentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: z.string(),
  url: z.string(),
  projectId: z.string(),
  uploadedBy: z.string(),
  uploadedAt: z.date().optional()
});

// Equipment model schema
const equipmentSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  name: z.string(),
  status: z.string(),
  assignedProjectId: z.string().nullable().optional(),
  createdAt: z.date().optional()
});

// Supply Order model schema
const supplyOrderSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  projectId: z.string(),
  supplierId: z.string(),
  managerId: z.string(),
  quantity: z.number(),
  requestedDate: z.date().optional(),
  requiredByDate: z.date(),
  deliveryDate: z.date().nullable().optional(),
  notes: z.string().nullable().optional()
});

// Email Verification model schema
const emailVerificationSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  token: z.string(),
  createdAt: z.date().optional()
});

// Insert schemas (for creating new records)
export const insertUserSchema = userSchema.omit({ id: true, createdAt: true });
export const insertProjectSchema = projectSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const insertTaskSchema = taskSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const insertResourceSchema = resourceSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const insertClientSchema = clientSchema.omit({ id: true, createdAt: true });
export const insertActivitySchema = activitySchema.omit({ id: true, timestamp: true });
export const insertDocumentSchema = documentSchema.omit({ id: true, uploadedAt: true });
export const insertEquipmentSchema = equipmentSchema.omit({ id: true, createdAt: true });
export const insertSupplyOrderSchema = supplyOrderSchema.omit({ id: true, requestedDate: true });
export const insertEmailVerificationSchema = emailVerificationSchema.omit({ id: true, createdAt: true });

// Types
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Resource = z.infer<typeof resourceSchema>;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Client = z.infer<typeof clientSchema>;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Activity = z.infer<typeof activitySchema>;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type Document = z.infer<typeof documentSchema>;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type Equipment = z.infer<typeof equipmentSchema>;
export type InsertEquipment = z.infer<typeof insertEquipmentSchema>;

export type SupplyOrder = z.infer<typeof supplyOrderSchema>;
export type InsertSupplyOrder = z.infer<typeof insertSupplyOrderSchema>;

export type EmailVerification = z.infer<typeof emailVerificationSchema>;
export type InsertEmailVerification = z.infer<typeof insertEmailVerificationSchema>;
