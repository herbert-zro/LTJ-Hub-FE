import { createBrowserRouter } from "react-router";
import { DashboardPage } from "../admin/pages/dashboard/DashboardPage";
import { LoginPage } from "../auth/pages/login/LoginPage";
import { lazy } from "react";
import { BitacoraPage } from "@/admin/pages/bitacora/BitacoraPage";
import { CorreoPage } from "@/admin/pages/correo/CorreoPage";
import { EvaluacionesPage } from "@/admin/pages/evaluaciones/EvaluacionesPage";
import { FactorRangoPage } from "@/admin/pages/factor-rango/FactorRangoPage";
import { UsuariosPage } from "@/admin/pages/usuarios/UsuariosPage";

const AuthLayout = lazy(() => import("../auth/layout/AuthLayout"));
const AdminLayout = lazy(() => import("../admin/layout/AdminLayout"));

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
      { index: true, element: <DashboardPage /> },
      { path: "usuarios", element: <UsuariosPage /> },
      { path: "factor-rango", element: <FactorRangoPage /> },
      { path: "evaluaciones", element: <EvaluacionesPage /> },
      { path: "correo", element: <CorreoPage /> },
      { path: "bitacora", element: <BitacoraPage /> },
    ],
  },
]);
