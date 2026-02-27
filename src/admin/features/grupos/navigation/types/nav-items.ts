export type GruposNavItem = {
  to: string;
  label: "Candidatos" | "Resultados";
  end?: boolean;
};

export const buildGruposNavItems = (id: string): GruposNavItem[] => [
  { to: `/admin/grupos/${id}/candidatos`, label: "Candidatos" },
  { to: `/admin/grupos/${id}/resultados`, label: "Resultados" },
];
