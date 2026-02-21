import { useCallback, useEffect, useState } from "react";

interface UseAdminSubmenuParams {
  collapsed: boolean;
  isMobile?: boolean;
  pathname: string;
}

export const useAdminSubmenu = ({
  collapsed,
  isMobile,
  pathname,
}: UseAdminSubmenuParams) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (collapsed) {
      close();
    }
  }, [collapsed, close]);

  useEffect(() => {
    if (isMobile) {
      close();
    }
  }, [pathname, isMobile, close]);

  return {
    isOpen,
    toggle,
    close,
  };
};
