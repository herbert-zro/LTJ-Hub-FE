import { createBrowserRouter } from "react-router";
import { dashboardRoutes } from "@/admin/features/dashboard/dashboard.routes";
import { LoginPage } from "@/auth/pages/login/LoginPage";
import { lazy } from "react";
import { usuariosRoutes } from "@/admin/features/usuarios/usuarios.routes";
import { factorRango } from "@/admin/features/factor-rango/factorRango.routes";
import { evaluacionesRoutes } from "@/admin/features/evaluaciones/evaluaciones.routes";
import { correoRoutes } from "@/admin/features/correo/correo.routes";
import { bitacoraRoutes } from "@/admin/features/bitacora/bitacora.routes";
import { empresasRoutes } from "@/admin/features/empresas/empresas.routes";

const AuthLayout = lazy(() => import("@/auth/layout/AuthLayout"));
const AdminLayout = lazy(() => import("@/admin/shell/layout/AdminLayout"));

export const appRouter = createBrowserRouter([
  // Auth routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },

  // Admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      ...dashboardRoutes,
      ...usuariosRoutes,
      ...factorRango,
      ...evaluacionesRoutes,
      ...correoRoutes,
      ...bitacoraRoutes,
      ...empresasRoutes,
    ],
  },
]);
