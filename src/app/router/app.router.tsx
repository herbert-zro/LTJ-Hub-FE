import { createBrowserRouter } from "react-router";
import { DashboardPage } from "@/admin/features/dashboard/DashboardPage";
import { LoginPage } from "@/auth/pages/login/LoginPage";
import { lazy } from "react";
import { BitacoraPage } from "@/admin/features/bitacora/pages/BitacoraPage";
import { CorreoPage } from "@/admin/features/correo/pages/CorreoPage";
import { EvaluacionesPage } from "@/admin/features/evaluaciones/pages/EvaluacionesPage";
import { FactorRangoPage } from "@/admin/features/factor-rango/pages/FactorRangoPage";
import { UsuariosPage } from "@/admin/features/usuarios/pages/UsuariosPage";
import { UserFormPage } from "@/admin/features/usuarios/pages/UserFormPage";
import { FactorRangoFormPage } from "@/admin/features/factor-rango/pages/FactorRangoFormPage";
import { EvaluacionesFormPage } from "@/admin/features/evaluaciones/pages/EvaluacionesFormPage";
import { CorreoFormPage } from "@/admin/features/correo/pages/CorreoFormPage";
import { BitacoraFormPage } from "@/admin/features/bitacora/pages/BitacoraFormPage";

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
      { index: true, element: <DashboardPage /> },
      {
        path: "usuarios",
        children: [
          { index: true, element: <UsuariosPage /> },
          { path: "form", element: <UserFormPage /> },
        ],
      },
      {
        path: "factor-rango",
        children: [
          { index: true, element: <FactorRangoPage /> },
          { path: "form", element: <FactorRangoFormPage /> },
        ],
      },
      {
        path: "evaluaciones",
        children: [
          { index: true, element: <EvaluacionesPage /> },
          { path: "form", element: <EvaluacionesFormPage /> },
        ],
      },
      {
        path: "correo",
        children: [
          { index: true, element: <CorreoPage /> },
          { path: "form", element: <CorreoFormPage /> },
        ],
      },
      {
        path: "bitacora",
        children: [
          { index: true, element: <BitacoraPage /> },
          { path: "form", element: <BitacoraFormPage /> },
        ],
      },
    ],
  },
]);
