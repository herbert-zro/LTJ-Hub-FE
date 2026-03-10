import { Navigate, type RouteObject } from "react-router";
import { CandidtatoExternoPerfil } from "./pages/CandidtatoExternoPerfil";
import { CandidatoExternoProcesos } from "./pages/CandidatoExternoProcesos";
import { CandidatoExternoEvaluaciones } from "./pages/CandidatoExternoEvaluaciones";

export const candidatoExternoRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="perfil" replace />,
  },
  {
    path: "perfil",
    element: <CandidtatoExternoPerfil />,
  },
  {
    path: "procesos",
    element: <CandidatoExternoProcesos />,
  },
  {
    path: "evaluaciones",
    element: <CandidatoExternoEvaluaciones />,
  },
];
