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

  const isActive = (to?: string, exactMatch?: boolean) => {
    if (!to || to === "#") {
      return false;
    }

    if (exactMatch) {
      return pathname === to;
    }

    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <NavigationMenu className="w-full max-w-full items-start justify-start">
      <NavigationMenuList className="relative w-full flex-col items-start justify-start gap-1 pl-4">
        <div className="bg-border pointer-events-none absolute top-1 bottom-1 left-1 w-px" />
        {items.map((item) => {
          const itemActive = isActive(item.to, item.exactMatch);

          const linkContent = (
            <NavigationMenuLink
              asChild
              className={cn(
                "relative w-full rounded-lg px-3 py-2 text-sm font-normal text-muted-foreground transition-colors duration-150 ease-out hover:bg-accent hover:text-foreground before:absolute before:-left-2.75 before:top-1/2 before:h-6 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-transparent before:transition-all before:duration-150 before:ease-out",
                itemActive &&
                  "bg-accent text-foreground font-semibold before:w-1 before:bg-slate-400",
              )}
            >
              <Link to={item.to ?? "#"} className="block w-full">
                {item.label}
              </Link>
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
