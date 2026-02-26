export const isUserFormDirty = (values: {
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
}): boolean => {
  return (
    values.nombre.trim() !== "" ||
    values.correo.trim() !== "" ||
    values.rol.trim() !== "" ||
    values.estado.trim() !== ""
  );
};
