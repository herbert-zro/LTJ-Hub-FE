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

export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive("usuarios") && "bg-slate-200",
              "p-2 pl-0 rounded-md",
            )}
          >
            <Link to="usuarios">Usuarios</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Evaluaciones */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive("evaluaciones") && "bg-slate-200",
              "p-2 rounded-md",
            )}
          >
            <Link to="evaluaciones">Evaluaciones</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Factor rango */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive("factor-rango") && "bg-slate-200",
              "p-2 rounded-md",
            )}
          >
            <Link to="factor-rango">Factor Rango</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Correo */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive("correo") && "bg-slate-200",
              "p-2 rounded-md",
            )}
          >
            <Link to="correo">Correo</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
