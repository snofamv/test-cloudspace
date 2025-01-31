import { createBrowserRouter } from "react-router";
import { LoginPage, RegisterPage } from "../auth";
import { RestorePage } from "../auth/pages/RestorePage";
import { PersonasPage } from "../dashboard/page/PersonasPage";
import { AgregarPage } from "../dashboard/page/AgregarPage";
import { LogoutPage } from "../auth/components/logout/LogoutPage";
import { ActualizarPage } from "../dashboard/page/ActualizarPage";

export const PrivateRoutes = createBrowserRouter([
  {
    path: "/agregar",
    Component: AgregarPage,
  },
  {
    path: "/actualizar/:id",
    Component: ActualizarPage,
  },
  {
    path: "/salir",
    Component: LogoutPage,
  },
  {
    path: "/*",
    Component: PersonasPage,
  },
]);
export const PublicRoutes = createBrowserRouter([
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/restore",
    Component: RestorePage,
  },
  {
    path: "/*",
    Component: LoginPage,
  },
]);
