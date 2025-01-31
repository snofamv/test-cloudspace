import { RouterProvider } from "react-router";
import { PrivateRoutes, PublicRoutes } from "./Routes";
import { useAuth } from "../auth/hook/useAuth";

export const AppRouter = () => {
  const {
    authData: { isLogged },
  } = useAuth();

  return <RouterProvider router={isLogged ? PrivateRoutes : PublicRoutes} />;
};
