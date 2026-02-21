import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomMenu } from "./custom/CustomMenu";
import { useLocation } from "react-router";
import { adminNavItems } from "@/admin/navigation/types/nav-items";
import { useAdminSubmenu } from "@/admin/navigation/hooks/useAdminSubmenu";
import { NavItemButton, NavItemLink } from "@/admin/navigation/components";

export const NavContent = ({
  collapsed,
  isMobile,
}: {
  collapsed: boolean;
  isMobile?: boolean;
}) => {
  const { pathname } = useLocation();
  const { isOpen: isAdminSubmenuOpen, toggle: toggleAdminSubmenu } =
    useAdminSubmenu({
      collapsed,
      isMobile,
      pathname,
    });

  return (
    <>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {adminNavItems.map((item, index) => {
            const isAdminItem = item.isExpandable && item.children?.length;
            const isActive =
              item.to && item.to !== "#"
                ? pathname === item.to || pathname.startsWith(`${item.to}/`)
                : false;

            if (isAdminItem) {
              return (
                <li key={index}>
                  <NavItemButton
                    collapsed={collapsed}
                    active={isActive}
                    onClick={toggleAdminSubmenu}
                    label={item.label}
                    icon={item.icon}
                    rightSlot={
                      <ChevronDown
                        size={16}
                        className={cn(
                          "ml-auto shrink-0 transition-transform duration-200",
                          isAdminSubmenuOpen && "rotate-180",
                        )}
                      />
                    }
                  />

                  {!collapsed && isAdminSubmenuOpen && (
                    <div className="mt-2 pl-6">
                      <CustomMenu
                        items={item.children ?? []}
                        isMobile={Boolean(isMobile)}
                      />
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={index}>
                <NavItemLink
                  collapsed={collapsed}
                  active={isActive}
                  to={item.to ?? "#"}
                  label={item.label}
                  icon={item.icon}
                  closeOnMobile={
                    Boolean(isMobile) && Boolean(item.requiresCloseOnMobile)
                  }
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
