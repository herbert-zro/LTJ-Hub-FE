export type EmpresaNavItem = {
  to: string;
  label: "Detalle" | "Roles" | "Usuarios" | "Permisos";
  end?: boolean;
};

export const buildEmpresaNavItems = (id: string): EmpresaNavItem[] => [
  { to: `/admin/empresas/${id}`, label: "Detalle", end: true },
  { to: `/admin/empresas/${id}/roles`, label: "Roles" },
  { to: `/admin/empresas/${id}/usuarios`, label: "Usuarios" },
  { to: `/admin/empresas/${id}/roles-permisos`, label: "Permisos" },
];
