import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import type { AdminNavItem } from "@/admin/navigation/types/nav-items";
import { NavMobileClose } from "@/admin/navigation/components/NavMobileClose";

export const CustomMenu = ({
  items,
  isMobile = false,
}: {
  items: AdminNavItem[];
  isMobile?: boolean;
}) => {
  const { pathname } = useLocation();

  const isActive = (to?: string) => {
    if (!to || to === "#") {
      return false;
    }

    return pathname === to;
  };

  return (
    <NavigationMenu className="w-full max-w-full items-start justify-start">
      <NavigationMenuList className="w-full flex-col items-start justify-start gap-2">
        {items.map((item) => {
          const linkContent = (
            <NavigationMenuLink
              asChild
              className={cn(
                isActive(item.to) && "bg-slate-200",
                "w-full p-2 rounded-md",
              )}
            >
              <Link to={item.to ?? "#"}>{item.label}</Link>
            </NavigationMenuLink>
          );

          return (
            <NavigationMenuItem key={item.label} className="w-full">
              <NavMobileClose
                closeOnSelect={
                  Boolean(isMobile) && Boolean(item.requiresCloseOnMobile)
                }
              >
                {linkContent}
              </NavMobileClose>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
