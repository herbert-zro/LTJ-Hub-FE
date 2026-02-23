export type UserRow = {
  nombre: string;
  correo: string;
  tipo: "user" | "admin";
  empresa?: string | null;
  estado: "Activo" | "Inactivo";
  id: number;
};
