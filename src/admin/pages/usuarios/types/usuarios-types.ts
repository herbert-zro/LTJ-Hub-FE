export type UserRow = {
  id: number;
  nombre: string;
  correo: string;
  tipo: "user" | "admin";
  empresa?: string | null;
  estado: "Activo" | "Inactivo";
};
