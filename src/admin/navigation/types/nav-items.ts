import type { LucideIcon } from "lucide-react";
import { Building2, LayoutDashboard, UserRound, Users } from "lucide-react";

export interface AdminNavItem {
  label: string;
  icon?: LucideIcon;
  to?: string;
  children?: AdminNavItem[];
  requiresCloseOnMobile?: boolean;
  isExpandable?: boolean;
}

export const adminNavItems: AdminNavItem[] = [
  {
    label: "Administración",
    icon: LayoutDashboard,
    to: "/admin",
    isExpandable: true,
    children: [
      {
        label: "Usuarios",
        to: "/admin/usuarios",
        requiresCloseOnMobile: true,
      },
      {
        label: "Evaluaciones",
        to: "/admin/evaluaciones",
        requiresCloseOnMobile: true,
      },
      {
        label: "Factor Rango",
        to: "/admin/factor-rango",
        requiresCloseOnMobile: true,
      },
      {
        label: "Correo",
        to: "/admin/correo",
        requiresCloseOnMobile: true,
      },
    ],
  },
  {
    label: "Empresas",
    icon: Building2,
    to: "#",
    requiresCloseOnMobile: true,
  },
  {
    label: "Grupos",
    icon: Users,
    to: "#",
    requiresCloseOnMobile: true,
  },
  {
    label: "Candidatos",
    icon: UserRound,
    to: "#",
    requiresCloseOnMobile: true,
  },
];
