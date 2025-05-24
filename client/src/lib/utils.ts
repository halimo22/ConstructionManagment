import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiRequest } from "./queryClient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: Date | string): string => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const getStatusColor = (status: string): { bg: string; text: string } => {
  switch (status.toLowerCase()) {
    case 'on track':
      return { bg: 'bg-green-100', text: 'text-green-800' };
    case 'at risk':
      return { bg: 'bg-amber-100', text: 'text-amber-800' };
    case 'delayed':
      return { bg: 'bg-red-100', text: 'text-red-800' };
    case 'completed':
      return { bg: 'bg-blue-100', text: 'text-blue-800' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800' };
  }
};

export const getPriorityColor = (priority: string): { bg: string; text: string } => {
  switch (priority.toLowerCase()) {
    case 'high':
      return { bg: 'bg-red-100', text: 'text-red-800' };
    case 'medium':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    case 'low':
      return { bg: 'bg-green-100', text: 'text-green-800' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800' };
  }
};

// Session Management
export const getCurrentUser = async () => {
  try {
    const response = await apiRequest('GET', '/api/auth/current-user');
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const loginUser = async (username: string, password: string) => {
  const response = await apiRequest('POST', '/api/auth/login', { username, password });
  return await response.json();
};

export const logoutUser = async () => {
  await apiRequest('POST', '/api/auth/logout');
};
