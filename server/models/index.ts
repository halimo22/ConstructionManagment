import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// User Model
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['manager', 'employee', 'client', 'supplier']
  },
  avatar: { type: String, default: null },
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  resetPasswordToken: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

// Project Model
const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled']
  },
  progress: { type: Number, default: 0 },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Task Model
const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['To Do', 'In Progress', 'Completed', 'Blocked']
  },
  priority: { 
    type: String, 
    required: true,
    enum: ['Low', 'Medium', 'High', 'Urgent']
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  completedDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Resource Model
const resourceSchema = new Schema({
  teamMemberCount: { type: Number, required: true },
  equipmentUtilization: { type: Number, required: true },
  materialInventory: { type: Number, required: true },
  budgetAllocation: [{ 
    category: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Client Model
const clientSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  contactPerson: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Activity Model
const activitySchema = new Schema({
  action: { type: String, required: true },
  details: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
  timestamp: { type: Date, default: Date.now }
});

// Document Model
const documentSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// Equipment Model
const equipmentSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['Available', 'In Use', 'Maintenance', 'Out of Service']
  },
  assignedProjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
  createdAt: { type: Date, default: Date.now }
});

// Supply Order Model
const supplyOrderSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['Pending', 'Approved', 'Rejected', 'Delivered', 'Cancelled']
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  requestedDate: { type: Date, default: Date.now },
  requiredByDate: { type: Date, required: true },
  deliveryDate: { type: Date, default: null },
  notes: { type: String, default: null }
});

// Email Verification Model
const emailVerificationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // Token expires after 1 hour
});

export const User = mongoose.model('User', userSchema);
export const Project = mongoose.model('Project', projectSchema);
export const Task = mongoose.model('Task', taskSchema);
export const Resource = mongoose.model('Resource', resourceSchema);
export const Client = mongoose.model('Client', clientSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Document = mongoose.model('Document', documentSchema);
export const Equipment = mongoose.model('Equipment', equipmentSchema);
export const SupplyOrder = mongoose.model('SupplyOrder', supplyOrderSchema);
export const EmailVerification = mongoose.model('EmailVerification', emailVerificationSchema);