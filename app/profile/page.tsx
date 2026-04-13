'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSession, signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background via-background/90 to-primary/10">
        <p className="text-muted-foreground animate-pulse">Loading profile...</p>
      </main>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const user = session.user;

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    toast.success('Logged out successfully');
  };

  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background via-background/90 to-primary/10">
      <Card className="w-full max-w-2xl border-none shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center gap-6">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className="text-2xl font-bold bg-primary/20 text-primary">
              {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight">{user?.name || 'User'}</CardTitle>
            <CardDescription className="text-lg">Member Profile</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Full Name</p>
              <p className="text-lg font-semibold">{user?.name || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Email Address</p>
              <p className="text-lg font-semibold">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Account Status</p>
              <p className="text-lg font-semibold text-emerald-600">Active</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Member Since</p>
              <p className="text-lg font-semibold">March 2026</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => router.push('/')}>
            Back to Home
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
