import { createBrowserRouter } from "react-router";
import { DashboardPage } from "../admin/pages/dashboard/DashboardPage";
import { LoginPage } from "../auth/pages/login/LoginPage";
import { lazy } from "react";

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
    path: "/dashboard",
    element: <AdminLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
]);
