import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppLogo } from "@/shared/components/AppLogo";
import { cn } from "@/lib/utils";

interface SidebarBrandHeaderProps {
  showTitle: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  title?: string;
}

export const SidebarBrandHeader: React.FC<SidebarBrandHeaderProps> = ({
  showTitle,
  onToggle,
  isCollapsed,
  title = "LTJ Hub",
}) => {
  return (
    <div className="relative p-4 border-b border-gray-200 flex items-center h-18">
      <div className="pointer-events-none absolute inset-x-0 flex justify-center min-w-0 overflow-hidden">
        <AppLogo
          alt={title}
          className={cn(
            "transition-all",
            showTitle ? "max-w-40 opacity-100" : "max-w-0 opacity-0",
          )}
        />
      </div>

      <button
        onClick={onToggle}
        className="relative z-10 ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};
