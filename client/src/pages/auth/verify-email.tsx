import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyEmail() {
      if (!token) return;

      try {
        setVerifying(true);
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        setVerified(true);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setVerifying(false);
      }
    }

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            {token
              ? 'Verifying your email address...'
              : 'Please check your email for a verification link'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {verified ? (
            <div className="text-center space-y-4">
              <p className="text-green-600 font-medium">Your email has been successfully verified!</p>
              <Button asChild className="w-full">
                <Link to="/login">Login to Your Account</Link>
              </Button>
            </div>
          ) : token ? (
            <div className="text-center">
              {verifying ? 'Verifying your email...' : 'Verification failed. Please try again.'}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p>
                We've sent a verification link to your email address. Please check your inbox and
                click the link to verify your account.
              </p>
              <p className="text-sm text-gray-500">
                If you don't receive an email within a few minutes, please check your spam folder or
                request a new verification link.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Back to Login</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}