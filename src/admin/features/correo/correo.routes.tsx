import type { RouteObject } from "react-router";
import { CorreoPage } from "./pages/CorreoPage";
import { CorreoFormPage } from "./pages/CorreoFormPage";

export const correoRoutes: RouteObject[] = [
  {
    path: "correo",
    children: [
      { index: true, element: <CorreoPage /> },
      { path: "form", element: <CorreoFormPage /> },
    ],
  },
];
