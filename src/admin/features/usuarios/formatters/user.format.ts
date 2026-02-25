import type { UserRow } from "../types/usuarios-types";

export const formatTipo = (tipo: UserRow["tipo"]) => {
  switch (tipo) {
    case "admin":
      return "Administrador";
    case "user":
      return "Usuario";
    default:
      return tipo;
  }
};
