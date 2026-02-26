import { AdminTitle } from "@/admin/components/AdminTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { EMPRESAS_DATA } from "../mock/empresas.mock";

export const EmpresaDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const empresaId = useMemo(() => Number(id), [id]);

  const empresa = useMemo(() => {
    if (!Number.isInteger(empresaId)) {
      return null;
    }

    return EMPRESAS_DATA.find((item) => item.id === empresaId) ?? null;
  }, [empresaId]);

  if (!Number.isInteger(empresaId) || empresa === null) {
    return (
      <section className="space-y-4">
        <div className="rounded-xl border bg-white p-4">
          <AdminTitle
            title="Detalle de empresa"
            subtitle="No se encontró una empresa con el identificador solicitado."
          />
        </div>

        <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                onClick={() => navigate("/admin/empresas")}
              >
                Volver al listado
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-xl border bg-white p-4">
        <AdminTitle
          title="Detalle de empresa"
          subtitle="Información general de la empresa seleccionada."
        />
      </div>

      <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
            {empresa.nombre}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-corp-gray-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-corp-gray-500">
                ID
              </p>
              <p className="mt-1 text-sm font-medium text-text-strong">
                {empresa.id}
              </p>
            </div>

            <div className="rounded-lg border border-corp-gray-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-corp-gray-500">
                Estado
              </p>
              <p className="mt-1 text-sm font-medium text-text-strong">
                {empresa.estado}
              </p>
            </div>

            <div className="rounded-lg border border-corp-gray-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-corp-gray-500">
                URL
              </p>
              <a
                href={empresa.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block break-all text-sm font-medium text-brand-500 hover:text-brand-600"
              >
                {empresa.url}
              </a>
            </div>

            <div className="rounded-lg border border-corp-gray-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-corp-gray-500">
                Correo
              </p>
              <p className="mt-1 text-sm font-medium text-text-strong">
                {empresa.correo}
              </p>
            </div>

            <div className="rounded-lg border border-corp-gray-200 p-4 md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-corp-gray-500">
                Dirección
              </p>
              <p className="mt-1 text-sm font-medium text-text-strong">
                {empresa.direccion}
              </p>
            </div>

            <div className="rounded-lg border border-corp-gray-200 p-4 md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-corp-gray-500">
                Teléfono
              </p>
              <p className="mt-1 text-sm font-medium text-text-strong">
                {empresa.telefono}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              asChild
              type="button"
              variant="outline"
              className="border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
            >
              <Link to="/admin/empresas">Volver al listado</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
