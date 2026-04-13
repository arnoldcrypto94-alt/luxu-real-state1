'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function GithubButton({ text = "Continue with GitHub" }: { text?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('github', { callbackUrl: '/' });
    } catch (error) {
      toast.error('Could not connect to GitHub');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full bg-white/50 hover:bg-white hover:text-nordic transition-all duration-300 shadow-sm border-nordic/10"
      onClick={handleSignIn}
      disabled={isLoading}
    >
      {isLoading ? (
        "Connecting..."
      ) : (
        <>
          <Github className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
}
