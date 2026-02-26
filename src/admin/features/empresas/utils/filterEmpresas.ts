import type { EmpresaRow } from "../types/empresas-types";

export const filterEmpresas = (
  empresas: EmpresaRow[],
  query: string,
): EmpresaRow[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return empresas;
  }

  return empresas.filter((empresa) => {
    return (
      empresa.id.toString().includes(normalizedQuery) ||
      empresa.nombre.toLowerCase().includes(normalizedQuery) ||
      empresa.url.toLowerCase().includes(normalizedQuery) ||
      empresa.direccion.toLowerCase().includes(normalizedQuery) ||
      empresa.telefono.toString().includes(normalizedQuery) ||
      empresa.correo.toLowerCase().includes(normalizedQuery) ||
      empresa.estado.toLowerCase().includes(normalizedQuery)
    );
  });
};
