import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { NavIcon } from "./NavIcon";
import { NavLabel } from "./NavLabel";

export const NavItemButton = ({
  collapsed,
  active,
  onClick,
  label,
  icon,
  rightSlot,
}: {
  collapsed: boolean;
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: LucideIcon;
  rightSlot?: ReactNode;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-300 group ${
        collapsed ? "justify-center" : "gap-3"
      } ${
        active
          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <NavIcon icon={icon} />
      <NavLabel collapsed={collapsed}>{label}</NavLabel>
      {!collapsed && rightSlot}
    </button>
  );
};
