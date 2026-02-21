import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const NavIcon = ({
  icon: Icon,
  className,
}: {
  icon?: LucideIcon;
  className?: string;
}) => {
  if (!Icon) {
    return null;
  }

  return <Icon size={20} className={cn("shrink-0", className)} />;
};
