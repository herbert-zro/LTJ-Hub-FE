import { AdminTitle } from "@/admin/components/AdminTitle";
import { Outlet, useParams } from "react-router";

import { EmpresaNavigation } from "../navigation/components/EmpresaNavigation";
import { buildEmpresaNavItems } from "../navigation/types/nav-items";

export const EmpresaLayout = () => {
  const { id } = useParams();
  const links = buildEmpresaNavItems(id ?? "");

  return (
    <section className="space-y-4">
      <EmpresaNavigation links={links} />

      <Outlet />
    </section>
  );
};
