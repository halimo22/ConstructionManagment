import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      role: 'Manager' | 'Employee' | 'Client' | 'Supplier';
      emailVerified: boolean;
    };
  }
}