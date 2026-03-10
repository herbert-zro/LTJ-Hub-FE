import { Briefcase, ClipboardList, User, type LucideIcon } from "lucide-react";

export interface CandidateNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  exactMatch?: boolean;
}

export const candidateNavItems: CandidateNavItem[] = [
  {
    label: "Perfil",
    to: "/candidato-externo/perfil",
    icon: User,
  },
  {
    label: "Procesos",
    to: "/candidato-externo/procesos",
    icon: Briefcase,
  },
  {
    label: "Evaluaciones",
    to: "/candidato-externo/evaluaciones",
    icon: ClipboardList,
  },
];
