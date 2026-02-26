import { NavLink } from "react-router";

import type { EmpresaNavItem } from "../types/nav-items";

type EmpresaNavigationProps = {
  links: EmpresaNavItem[];
};

export const EmpresaNavigation = ({ links }: EmpresaNavigationProps) => {
  return (
    <div className="rounded-xl border bg-white p-3">
      <nav className="flex flex-wrap gap-2" aria-label="Navegación de empresa">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-500 text-white"
                  : "bg-brand-100 text-brand-500 hover:bg-brand-200"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
