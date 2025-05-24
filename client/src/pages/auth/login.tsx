import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'wouter';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-6 w-40 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-60 bg-gray-200 rounded mx-auto mb-8"></div>
          <div className="space-y-4">
            <div className="h-10 w-80 bg-gray-200 rounded"></div>
            <div className="h-10 w-80 bg-gray-200 rounded"></div>
            <div className="h-10 w-80 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="p-4 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
