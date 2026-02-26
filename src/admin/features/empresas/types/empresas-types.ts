export type EmpresaRow = {
  id: number;
  nombre: string;
  url: string;
  direccion: string;
  telefono: number;
  correo: string;
  estado: "Activo" | "Inactivo";
};
