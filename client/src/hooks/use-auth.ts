import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  // Check if user is already logged in
  const { data, isLoading } = useQuery({
    queryKey: ['/api/auth/current-user'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/current-user', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          return null;
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error checking authentication:', error);
        return null;
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  // Login mutation
  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      return await response.json();
    },
    onSuccess: (data) => {
      setUser(data.user);
      setLocation('/');
    },
  });

  // Logout mutation
  const logout = useMutation({
    mutationFn: async () => {
      await apiRequest('POST', '/api/auth/logout');
    },
    onSuccess: () => {
      setUser(null);
      setLocation('/auth/login');
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: (credentials: LoginCredentials) => login.mutate(credentials),
    logout: () => logout.mutate(),
    isLoginPending: login.isPending,
    loginError: login.error,
  };
}
