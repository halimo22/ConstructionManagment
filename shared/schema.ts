import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull(), // manager, employee, client, supplier
  avatar: text("avatar"),
  emailVerified: boolean("email_verified").default(false),
  verificationToken: text("verification_token"),
  resetPasswordToken: text("reset_password_token"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  avatar: true,
  emailVerified: true,
  verificationToken: true
});

// Project model
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  clientId: integer("client_id").notNull(),
  status: text("status").notNull(), // on track, at risk, delayed, completed
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  progress: integer("progress").notNull().default(0), // percentage
  budget: doublePrecision("budget").notNull(),
  spent: doublePrecision("spent").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  clientId: true,
  status: true,
  startDate: true,
  endDate: true,
  progress: true,
  budget: true,
  spent: true
});

// Task model
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  assigneeId: integer("assignee_id"),
  status: text("status").notNull(), // pending, in progress, completed, blocked
  priority: text("priority").notNull(), // low, medium, high
  dueDate: timestamp("due_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  projectId: true,
  name: true,
  description: true,
  assigneeId: true,
  status: true,
  priority: true,
  dueDate: true
});

// Resource allocation model
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  teamMemberCount: integer("team_member_count").notNull().default(0),
  equipmentUtilization: integer("equipment_utilization").notNull().default(0), // percentage
  teamMembers: json("team_members").notNull().default([]), // array of user IDs
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  projectId: true,
  teamMemberCount: true,
  equipmentUtilization: true,
  teamMembers: true
});

// Client model
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  address: text("address"),
  contactPerson: text("contact_person").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertClientSchema = createInsertSchema(clients).pick({
  name: true,
  email: true,
  phone: true,
  address: true,
  contactPerson: true
});

// Activity log model
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  projectId: integer("project_id"),
  action: text("action").notNull(),
  details: text("details"),
  timestamp: timestamp("timestamp").defaultNow()
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  userId: true,
  projectId: true,
  action: true,
  details: true
});

// Document model
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  uploadedBy: integer("uploaded_by").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow()
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  projectId: true,
  name: true,
  type: true,
  url: true,
  uploadedBy: true
});

// Equipment model
export const equipment = pgTable("equipment", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull(), // available, in use, maintenance, retired
  assignedProjectId: integer("assigned_project_id"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertEquipmentSchema = createInsertSchema(equipment).pick({
  name: true,
  type: true,
  status: true,
  assignedProjectId: true
});

// Supply Order model
export const supplyOrders = pgTable("supply_orders", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  supplierId: integer("supplier_id").notNull(),
  managerId: integer("manager_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  status: text("status").notNull(), // pending, approved, delivered, rejected
  requestedDate: timestamp("requested_date").defaultNow(),
  requiredByDate: timestamp("required_by_date").notNull(),
  deliveryDate: timestamp("delivery_date"),
  notes: text("notes")
});

export const insertSupplyOrderSchema = createInsertSchema(supplyOrders).pick({
  projectId: true,
  supplierId: true,
  managerId: true,
  name: true,
  description: true,
  quantity: true,
  status: true,
  requiredByDate: true,
  notes: true
});

// Email Verification model
export const emailVerifications = pgTable("email_verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertEmailVerificationSchema = createInsertSchema(emailVerifications).pick({
  userId: true,
  token: true,
  expiresAt: true
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type Equipment = typeof equipment.$inferSelect;
export type InsertEquipment = z.infer<typeof insertEquipmentSchema>;

export type SupplyOrder = typeof supplyOrders.$inferSelect;
export type InsertSupplyOrder = z.infer<typeof insertSupplyOrderSchema>;

export type EmailVerification = typeof emailVerifications.$inferSelect;
export type InsertEmailVerification = z.infer<typeof insertEmailVerificationSchema>;
