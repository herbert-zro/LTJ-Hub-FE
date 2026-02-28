import type { CandidatoRow } from "../types/candidatos-types";

const NOMBRES = [
  "Ana",
  "Carlos",
  "Lucía",
  "Jorge",
  "Valeria",
  "Diego",
  "Fernanda",
  "Miguel",
  "Patricia",
  "Andrés",
  "Daniela",
  "Ricardo",
];

const APELLIDOS = [
  "Martínez",
  "Pérez",
  "Gómez",
  "Ramírez",
  "Castro",
  "Torres",
  "Ruiz",
  "Herrera",
  "López",
  "Silva",
  "Campos",
  "Morales",
];

const EMPRESAS = [
  "Call Center",
  "LTJ El Salvador",
  "LTJ Guatemala",
  "LTJ Honduras",
  "LTJ Nicaragua",
  "LTJ Costa Rica",
];

export const CANDIDATOS_DATA: CandidatoRow[] = Array.from(
  { length: 80 },
  (_, index) => {
    const id = index + 1;
    const nombre = `${NOMBRES[index % NOMBRES.length]} ${APELLIDOS[(index * 3) % APELLIDOS.length]}`;

    return {
      id,
      nombre,
      usuario: `candidato${id}`,
      correo: `candidato${id}@correo.com`,
      documento: 45507283 + id,
      telefono: 78583256 + id,
      empresa: EMPRESAS[index % EMPRESAS.length],
      tipoRegistro: id % 2 === 0 ? "email" : "whatsapp",
      estadoRegistro: id % 3 === 0 ? "Pendiente" : "Completado",
      curriculumUrl: "/cv-falso.pdf",
      estado: id % 5 === 0 || id === 2 || id === 7 ? "Inactivo" : "Activo",
    };
  },
);
