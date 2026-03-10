import { useState } from "react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";
import { MobileSidebarTrigger } from "../components/MobileSidebarTrigger";
import { Outlet } from "react-router";
import { AppShellLayout } from "@/shared/components/shell/AppShellLayout";

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AppShellLayout
      sidebar={
        <AdminSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      mobileSidebarTrigger={<MobileSidebarTrigger />}
      header={<AdminHeader />}
    >
      <Outlet />
    </AppShellLayout>
  );
};

export default AdminLayout;
