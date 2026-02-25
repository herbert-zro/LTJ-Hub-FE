import type { UserRow } from "../types/usuarios-types";

const NOMBRES = [
  "Juan",
  "María",
  "Carlos",
  "Ana",
  "Luis",
  "Sofía",
  "Jorge",
  "Valeria",
  "Diego",
  "Camila",
  "Ricardo",
  "Daniela",
  "Andrés",
  "Fernanda",
  "Miguel",
  "Gabriela",
  "Sebastián",
  "Alejandra",
  "Óscar",
  "Paola",
  "Héctor",
  "Natalia",
  "Emilio",
  "Carolina",
  "Raúl",
  "Verónica",
  "Tomás",
  "Patricia",
  "Iván",
  "Karla",
  "Esteban",
  "Mónica",
  "Felipe",
  "Andrea",
  "Mauricio",
  "Lucía",
  "David",
  "Elena",
  "Adrián",
  "Jimena",
  "Herbert",
];

const APELLIDOS = [
  "Pérez",
  "López",
  "Díaz",
  "Martínez",
  "Herrera",
  "Ramírez",
  "Molina",
  "Gómez",
  "Cruz",
  "Torres",
  "Méndez",
  "Flores",
  "Rojas",
  "Navarro",
  "Castillo",
  "Vásquez",
  "Morales",
  "Guerrero",
  "Pineda",
  "Reyes",
  "Silva",
  "Campos",
  "Salazar",
  "Ortega",
  "Espinoza",
  "Alvarado",
  "Fuentes",
  "Delgado",
  "Cabrera",
  "Aguilar",
  "Gutierrez",
];

const EMPRESAS = [
  "LTJ El Salvador",
  "LTJ Guatemala",
  "LTJ Honduras",
  "LTJ Nicaragua",
  "LTJ Costa Rica",
  "LTJ Panamá",
];

export const USUARIOS_DATA: UserRow[] = Array.from(
  { length: 120 },
  (_, index) => {
    const id = index + 1;
    const nombreBase = NOMBRES[index % NOMBRES.length];
    const apellidoBase = APELLIDOS[(index * 7) % APELLIDOS.length];
    const nombre = `${nombreBase} ${apellidoBase}`;

    return {
      id,
      nombre,
      correo: `usuario${id}@ltj.com`,
      tipo: id % 8 === 0 ? "admin" : "user",
      empresa: id % 10 === 0 ? null : EMPRESAS[index % EMPRESAS.length],
      estado: id % 5 === 0 ? "Inactivo" : "Activo",
    };
  },
);
