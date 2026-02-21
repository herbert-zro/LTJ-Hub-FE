import type { ReactNode } from "react";

export const NavLabel = ({
  collapsed,
  children,
}: {
  collapsed: boolean;
  children: ReactNode;
}) => {
  return (
    <span
      className={`font-medium whitespace-nowrap overflow-hidden transition-all ${
        collapsed
          ? "max-w-0 opacity-0 -translate-x-1 duration-200 ease-in"
          : "max-w-55 opacity-100 translate-x-0 duration-300 ease-out"
      }`}
    >
      {children}
    </span>
  );
};
