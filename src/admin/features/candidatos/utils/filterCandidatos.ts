import type { CandidatoRow } from "../types/candidatos-types";

export const filterCandidatos = (
  candidatos: CandidatoRow[],
  query: string,
): CandidatoRow[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return candidatos;
  }

  return candidatos.filter((candidato) => {
    return (
      candidato.id.toString().includes(normalizedQuery) ||
      candidato.nombre.toLowerCase().includes(normalizedQuery) ||
      candidato.usuario.toLowerCase().includes(normalizedQuery) ||
      candidato.correo.toLowerCase().includes(normalizedQuery) ||
      candidato.documento.toString().includes(normalizedQuery) ||
      candidato.telefono.toString().includes(normalizedQuery) ||
      candidato.empresa.toLowerCase().includes(normalizedQuery) ||
      candidato.tipoRegistro.toLowerCase().includes(normalizedQuery) ||
      candidato.estadoRegistro.toLowerCase().includes(normalizedQuery) ||
      candidato.estado.toLowerCase().includes(normalizedQuery)
    );
  });
};
