import { Outlet, useParams } from "react-router";

import { GrupoNavigation } from "../navigation/components/GrupoNavigation";
import { buildGruposNavItems } from "../navigation/types/nav-items";

export const GrupoLayout = () => {
  const { id } = useParams();
  const links = buildGruposNavItems(id ?? "");

  return (
    <section className="space-y-4">
      <GrupoNavigation links={links} />

      <Outlet />
    </section>
  );
};
