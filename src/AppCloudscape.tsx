import { AuthProvider } from "./auth/context/AuthProvider";
import { AppRouter } from "./router/AppRouter";

export const AppCloudscape = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
