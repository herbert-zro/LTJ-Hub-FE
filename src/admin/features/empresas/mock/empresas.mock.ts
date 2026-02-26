import type { EmpresaRow } from "../types/empresas-types";

const NOMBRES = [
  "LTJ El Salvador",
  "LTJ Guatemala",
  "LTJ Honduras",
  "LTJ Nicaragua",
  "LTJ Costa Rica",
  "LTJ Panamá",
  "Grupo Andino",
  "Innovatech",
  "Soluciones Globales",
  "Nexo Digital",
  "Data Prime",
  "Red Empresarial",
];

const CALLES = [
  "Av. Olímpica",
  "Blvd. Los Próceres",
  "Calle La Mascota",
  "Paseo General Escalón",
  "Av. Roosevelt",
  "Boulevard Morazán",
  "Av. Universitaria",
  "Calle Principal",
];

const CIUDADES = [
  "San Salvador",
  "Santa Tecla",
  "Antiguo Cuscatlán",
  "San Miguel",
  "Santa Ana",
  "Ciudad de Guatemala",
  "Tegucigalpa",
  "San José",
  "Panamá",
];

export const EMPRESAS_DATA: EmpresaRow[] = Array.from(
  { length: 120 },
  (_, index) => {
    const id = index + 1;
    const baseName = NOMBRES[index % NOMBRES.length];
    const suffix =
      id > NOMBRES.length ? ` ${Math.ceil(id / NOMBRES.length)}` : "";
    const nombre = `${baseName}${suffix}`;
    const city = CIUDADES[index % CIUDADES.length];

    return {
      id,
      nombre,
      url: `https://${nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")}.com`,
      direccion: `${CALLES[index % CALLES.length]} #${100 + id}, ${city}`,
      telefono: 70000000 + id,
      correo: `contacto${id}@${nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "")}.com`,
      estado: id % 5 === 0 ? "Inactivo" : "Activo",
    };
  },
);
