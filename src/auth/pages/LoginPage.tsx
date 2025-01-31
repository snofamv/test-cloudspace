import { LoginForm } from "../components/login/LoginForm";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout>
        <LoginForm />
    </AuthLayout>
  );
};
