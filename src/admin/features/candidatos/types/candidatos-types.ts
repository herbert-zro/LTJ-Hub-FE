export type TipoRegistro = "email" | "whatsapp";

export type EstadoRegistro = "Completado" | "Pendiente";

export type EstadoCandidato = "Activo" | "Inactivo";

export type CandidatoRow = {
  id: number;
  nombre: string;
  usuario: string;
  correo: string;
  documento: number;
  telefono: number;
  empresa: string;
  tipoRegistro: TipoRegistro;
  estadoRegistro: EstadoRegistro;
  curriculumUrl: string;
  estado: EstadoCandidato;
};
