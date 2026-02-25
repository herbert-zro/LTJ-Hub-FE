import type { RouteObject } from "react-router";
import { UserFormPage } from "./pages/UserFormPage";
import { UsuariosPage } from "./pages/UsuariosPage";

export const usuariosRoutes: RouteObject[] = [
  {
    path: "usuarios",
    children: [
      { index: true, element: <UsuariosPage /> },
      { path: "form", element: <UserFormPage /> },
    ],
  },
];
