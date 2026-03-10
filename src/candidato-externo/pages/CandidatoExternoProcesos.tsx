import { useMemo } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  History,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CandidateProcess = {
  id: number;
  empresa: string;
  grupo: string;
  fechaInicio: string;
  fechaFinalizacion?: string;
  active?: boolean;
};

const MOCK_PROCESOS: CandidateProcess[] = [
  {
    id: 1,
    empresa: "LTJ El Salvador",
    grupo: "Grupo Operativo A",
    fechaInicio: "2026-02-01",
  },
  {
    id: 2,
    empresa: "LTJ El Salvador",
    grupo: "Grupo Comercial B",
    fechaInicio: "2026-01-18",
    fechaFinalizacion: "2026-03-02",
    active: false,
  },
  {
    id: 3,
    empresa: "Global Talent Corp",
    grupo: "Grupo Analitico 2025",
    fechaInicio: "2025-09-01",
    fechaFinalizacion: "2025-12-15",
    active: false,
  },
  {
    id: 4,
    empresa: "Talento Integral",
    grupo: "Grupo Servicio C",
    fechaInicio: "2026-02-20",
  },
  {
    id: 5,
    empresa: "LTJ El Salvador",
    grupo: "Grupo Operativo A",
    fechaInicio: "2025-03-10",
    fechaFinalizacion: "2025-06-25",
    active: false,
  },
];

const formatDate = (date: string) => {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("es-SV", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const sortByStartDateDesc = (
  left: CandidateProcess,
  right: CandidateProcess,
) => {
  const leftTime = new Date(`${left.fechaInicio}T00:00:00`).getTime();
  const rightTime = new Date(`${right.fechaInicio}T00:00:00`).getTime();

  return rightTime - leftTime;
};

export const CandidatoExternoProcesos = () => {
  const procesosActivos = useMemo(() => {
    return MOCK_PROCESOS.filter((process) => !process.fechaFinalizacion).sort(
      sortByStartDateDesc,
    );
  }, []);

  const procesosFinalizados = useMemo(() => {
    return MOCK_PROCESOS.filter((process) =>
      Boolean(process.fechaFinalizacion),
    ).sort(sortByStartDateDesc);
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Procesos de seleccion
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Visualiza tus procesos actuales y consulta el historial de procesos
            en los que has participado.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="actual" className="space-y-5">
        <TabsList
          variant="line"
          className="h-auto w-full justify-start gap-1 border-b border-gray-200 p-0"
        >
          <TabsTrigger
            value="actual"
            className="rounded-none px-3 py-2 text-base font-semibold text-gray-600 data-[state=active]:text-brand-600 group-data-[variant=line]/tabs-list:data-[state=active]:after:bg-brand-600"
          >
            Proceso Actual
          </TabsTrigger>
          <TabsTrigger
            value="historial"
            className="rounded-none px-3 py-2 text-base font-semibold text-gray-600 data-[state=active]:text-brand-600 group-data-[variant=line]/tabs-list:data-[state=active]:after:bg-brand-600"
          >
            Historial de Procesos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actual">
          <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <BriefcaseBusiness className="h-5 w-5 text-emerald-600" />
                Procesos actuales
              </CardTitle>
              <CardDescription>
                Procesos sin fecha de finalizacion registrada. La columna
                Empresa siempre va primero.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {procesosActivos.length === 0 ? (
                <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  El candidato no tiene procesos activos actualmente.
                </p>
              ) : (
                <>
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Grupo</TableHead>
                          <TableHead>Fecha de inicio</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {procesosActivos.map((process) => (
                          <TableRow key={process.id}>
                            <TableCell className="font-medium text-gray-900">
                              {process.empresa}
                            </TableCell>
                            <TableCell>{process.grupo}</TableCell>
                            <TableCell>
                              {formatDate(process.fechaInicio)}
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Activo
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-3 md:hidden">
                    {procesosActivos.map((process) => (
                      <div
                        key={process.id}
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Empresa
                            </p>
                            <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                              <Building2 className="h-4 w-4 text-gray-500" />
                              {process.empresa}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Activo
                          </span>
                        </div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Grupo
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {process.grupo}
                        </p>

                        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Fecha de inicio
                        </p>
                        <p className="flex items-center gap-2 text-sm text-gray-800">
                          <CalendarDays className="h-4 w-4 text-gray-500" />
                          {formatDate(process.fechaInicio)}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <History className="h-5 w-5 text-brand-500" />
                Historial de procesos
              </CardTitle>
              <CardDescription>
                Procesos finalizados ordenados por fecha de inicio, del mas
                reciente al mas antiguo. La columna Empresa siempre va primero.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {procesosFinalizados.length === 0 ? (
                <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  No existe historial de procesos.
                </p>
              ) : (
                <>
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Grupo</TableHead>
                          <TableHead>Fecha de inicio</TableHead>
                          <TableHead>Fecha de finalizacion</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {procesosFinalizados.map((process) => (
                          <TableRow key={process.id}>
                            <TableCell className="font-medium text-gray-900">
                              {process.empresa}
                            </TableCell>
                            <TableCell>{process.grupo}</TableCell>
                            <TableCell>
                              {formatDate(process.fechaInicio)}
                            </TableCell>
                            <TableCell>
                              {formatDate(process.fechaFinalizacion ?? "")}
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-700">
                                <span className="h-2 w-2 rounded-full bg-gray-500" />
                                Completado
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-3 md:hidden">
                    {procesosFinalizados.map((process) => (
                      <div
                        key={process.id}
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Empresa
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {process.empresa}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-700">
                            <span className="h-2 w-2 rounded-full bg-gray-500" />
                            Completado
                          </span>
                        </div>

                        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Grupo
                        </p>
                        <p className="text-sm text-gray-800">{process.grupo}</p>

                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Fecha de inicio
                            </p>
                            <p className="flex items-center gap-2 text-sm text-gray-800">
                              <CalendarDays className="h-4 w-4 text-gray-500" />
                              {formatDate(process.fechaInicio)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Fecha de finalizacion
                            </p>
                            <p className="flex items-center gap-2 text-sm text-gray-800">
                              <CalendarDays className="h-4 w-4 text-gray-500" />
                              {formatDate(process.fechaFinalizacion ?? "")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};
