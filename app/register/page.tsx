import { RegistrationForm } from "@/components/auth/registration-form";

export default function RegisterPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background via-background/90 to-primary/10">
      <div className="w-full max-w-md">
        <RegistrationForm />
      </div>
    </main>
  );
}
