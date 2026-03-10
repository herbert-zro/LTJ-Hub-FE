import type { ReactNode } from "react";

interface AppShellLayoutProps {
  sidebar: ReactNode;
  mobileSidebarTrigger: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export const AppShellLayout: React.FC<AppShellLayoutProps> = ({
  sidebar,
  mobileSidebarTrigger,
  header,
  children,
}) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
      {sidebar}

      <div className="flex-1 flex flex-col w-full min-w-0">
        <div className="flex w-full">
          {mobileSidebarTrigger}
          <div className="flex-1 min-w-0">{header}</div>
        </div>

        <main className="flex-1 w-full p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};
