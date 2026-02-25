import { formatTipo } from "../formatters/user.format";
import type { UserRow } from "../types/usuarios-types";

export const filterUsers = (users: UserRow[], query: string): UserRow[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return users;
  }

  return users.filter((user) => {
    const tipo = formatTipo(user.tipo).toLowerCase();

    return (
      user.id.toString().includes(normalizedQuery) ||
      user.nombre.toLowerCase().includes(normalizedQuery) ||
      user.correo.toLowerCase().includes(normalizedQuery) ||
      tipo.includes(normalizedQuery) ||
      (user.empresa ?? "").toLowerCase().includes(normalizedQuery) ||
      user.estado.toLowerCase().includes(normalizedQuery)
    );
  });
};
