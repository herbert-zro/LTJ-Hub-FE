import type { RouteObject } from "react-router";
import { EmpresaLayout } from "./Layout/EmpresaLayout";
import { EmpresaFormPage } from "./pages/EmpresaFormPage";
import { EmpresaDetailsPage } from "./pages/EmpresaDetailsPage";
import { EmpresaRoleFormPage } from "./pages/EmpresaRoleFormPage";
import { EmpresaUsuariosPage } from "./pages/EmpresaUsuariosPage";
import { EmpresaUsuariosFormPage } from "./pages/EmpresaUsuariosFormPage";
import { EmpresasFactorRangoPage } from "./pages/EmpresasFactorRangoPage";
import { EmpresasPage } from "./pages/EmpresasPage";
import { EmpresasRolePage } from "./pages/EmpresasRolePage";

export const empresasRoutes: RouteObject[] = [
  {
    path: "empresas",
    children: [
      { index: true, element: <EmpresasPage /> },
      { path: "form", element: <EmpresaFormPage /> },
      {
        path: ":id",
        element: <EmpresaLayout />,
        children: [
          { index: true, element: <EmpresaDetailsPage /> },
          { path: "roles", element: <EmpresasRolePage /> },
          { path: "roles/form", element: <EmpresaRoleFormPage /> },
          { path: "roles/:roleId/edit", element: <EmpresaRoleFormPage /> },
          { path: "usuarios", element: <EmpresaUsuariosPage /> },
          { path: "usuarios/form", element: <EmpresaUsuariosFormPage /> },
          {
            path: "usuarios/:userId/edit",
            element: <EmpresaUsuariosFormPage />,
          },
          { path: "factor-rango", element: <EmpresasFactorRangoPage /> },
        ],
      },
    ],
  },
];
