import { createBrowserRouter } from "react-router";
import { DashboardPage } from "@/admin/pages/dashboard/DashboardPage";
import { LoginPage } from "@/auth/pages/login/LoginPage";
import { lazy } from "react";
import { BitacoraPage } from "@/admin/pages/bitacora/BitacoraPage";
import { CorreoPage } from "@/admin/pages/correo/CorreoPage";
import { EvaluacionesPage } from "@/admin/pages/evaluaciones/EvaluacionesPage";
import { FactorRangoPage } from "@/admin/pages/factor-rango/FactorRangoPage";
import { UsuariosPage } from "@/admin/pages/usuarios/UsuariosPage";
import { UserFormPage } from "@/admin/pages/usuarios/UserFormPage";
import { FactorRangoFormPage } from "@/admin/pages/factor-rango/FactorRangoFormPage";
import { EvaluacionesFormPage } from "@/admin/pages/evaluaciones/EvaluacionesFormPage";
import { CorreoFormPage } from "@/admin/pages/correo/CorreoFormPage";
import { BitacoraFormPage } from "@/admin/pages/bitacora/BitacoraFormPage";

const AuthLayout = lazy(() => import("@/auth/layout/AuthLayout"));
const AdminLayout = lazy(() => import("@/admin/layout/AdminLayout"));

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
