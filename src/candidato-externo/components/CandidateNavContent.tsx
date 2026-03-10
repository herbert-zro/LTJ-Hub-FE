import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { candidateNavItems } from "@/candidato-externo/types/candidate-nav-items";
import { useLocation, NavLink } from "react-router";

interface CandidateNavContentProps {
  collapsed: boolean;
  isMobile?: boolean;
}

export const CandidateNavContent: React.FC<CandidateNavContentProps> = ({
  collapsed,
  isMobile,
}) => {
  const { pathname } = useLocation();

  const isItemActive = (to: string, exactMatch?: boolean) => {
    if (exactMatch) {
      return pathname === to;
    }

    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        {candidateNavItems.map((item) => {
          const isActive = isItemActive(item.to, item.exactMatch);
          const Icon = item.icon;
          const link = (
            <NavLink
              to={item.to}
              className={cn(
                "w-full h-12 px-3 rounded-xl transition-all duration-300 flex items-center gap-3",
                "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                isActive &&
                  "bg-brand/10 text-brand border-r-2 border-brand hover:bg-brand/10 hover:text-brand",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon size={20} className="shrink-0" />
              <span
                className={cn(
                  "font-medium truncate transition-all",
                  collapsed && "opacity-0 w-0 overflow-hidden",
                )}
              >
                {item.label}
              </span>
            </NavLink>
          );

          return (
            <li key={item.label}>
              {isMobile ? <SheetClose asChild>{link}</SheetClose> : link}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
