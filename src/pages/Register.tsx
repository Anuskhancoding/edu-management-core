
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout 
      title="Create an Account" 
      description="Register to access your student portal"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
