import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background via-background/90 to-primary/10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
