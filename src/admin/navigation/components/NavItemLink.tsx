import type { LucideIcon } from "lucide-react";
import { Link } from "react-router";
import { NavIcon } from "./NavIcon";
import { NavLabel } from "./NavLabel";
import { NavMobileClose } from "./NavMobileClose";

export const NavItemLink = ({
  collapsed,
  active,
  to,
  label,
  icon,
  closeOnMobile = false,
}: {
  collapsed: boolean;
  active: boolean;
  to: string;
  label: string;
  icon?: LucideIcon;
  closeOnMobile?: boolean;
}) => {
  const link = (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 group ${
        collapsed ? "justify-center" : "gap-3"
      } ${
        active
          ? "bg-brand/10 text-brand border-r-2 border-brand"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <NavIcon icon={icon} />
      <NavLabel collapsed={collapsed}>{label}</NavLabel>
    </Link>
  );

  return <NavMobileClose closeOnSelect={closeOnMobile}>{link}</NavMobileClose>;
};
