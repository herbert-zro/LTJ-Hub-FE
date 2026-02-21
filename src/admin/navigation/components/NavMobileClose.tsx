import type { ReactElement } from "react";
import { SheetClose } from "@/components/ui/sheet";

export const NavMobileClose = ({
  closeOnSelect,
  children,
}: {
  closeOnSelect: boolean;
  children: ReactElement;
}) => {
  if (closeOnSelect) {
    return <SheetClose asChild>{children}</SheetClose>;
  }

  return children;
};
