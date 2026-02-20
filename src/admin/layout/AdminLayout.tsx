import { useState } from "react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";
import { Outlet } from "react-router";
import { MobileSidebarTrigger } from "../components/MobileSidebarTrigger";

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col w-full min-w-0">
        <div className="flex w-full">
          <MobileSidebarTrigger />
          <div className="flex-1 min-w-0">
            <AdminHeader />
          </div>
        </div>

        <main className="flex-1 w-full p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
