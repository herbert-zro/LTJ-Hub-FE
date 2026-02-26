export const isEmpresaFormDirty = (values: {
  nombre: string;
  url: string;
  direccion: string;
  telefono: string;
  correo: string;
  estado: string;
}): boolean => {
  return (
    values.nombre.trim() !== "" ||
    values.url.trim() !== "" ||
    values.direccion.trim() !== "" ||
    values.telefono.trim() !== "" ||
    values.correo.trim() !== "" ||
    values.estado.trim() !== ""
  );
};
