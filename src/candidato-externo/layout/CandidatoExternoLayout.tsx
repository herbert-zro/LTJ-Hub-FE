import { useState } from "react";
import { Outlet } from "react-router";
import { AppShellLayout } from "@/shared/components/shell/AppShellLayout";
import { CandidateSidebar } from "@/candidato-externo/components/CandidateSidebar";
import { CandidateMobileSidebarTrigger } from "@/candidato-externo/components/CandidateMobileSidebarTrigger";
import { CandidateHeader } from "@/candidato-externo/components/CandidateHeader";
import { cn } from "@/lib/utils";

export const CandidatoExternoLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AppShellLayout
      sidebar={
        <CandidateSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      mobileSidebarTrigger={<CandidateMobileSidebarTrigger />}
      header={<CandidateHeader />}
    >
      <div
        className={cn(
          "w-full transition-all duration-300",
          sidebarCollapsed ? "[&>section]:max-w-368" : "[&>section]:max-w-6xl",
        )}
      >
        <Outlet />
      </div>
    </AppShellLayout>
  );
};
