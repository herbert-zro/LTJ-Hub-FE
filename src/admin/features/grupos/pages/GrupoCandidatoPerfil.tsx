import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { InformeOperativo } from "@/admin/features/grupos/components/InformeOperativo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CandidateHistoryItem = {
  groupName: string;
  company: string;
  date: string;
};

type CandidateProfile = {
  id: number;
  nombreCompleto: string;
  correo: string;
  direccionCasa: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexoGenero: string;
  estadoCivil: string;
  nacionalidad: string;
  estadoCandidato: "Activo" | "Inactivo";
  historialProcesos: CandidateHistoryItem[];
};

type GrupoCandidatoPerfilProps = {
  candidateId?: number | null;
};

const CANDIDATE_PROFILES: CandidateProfile[] = [
  {
    id: 1,
    nombreCompleto: "Ana Martinez",
    correo: "ana.martinez@correo.com",
    direccionCasa: "Colonia Escalon, San Salvador, El Salvador",
    numeroDocumento: "04567891-2",
    fechaNacimiento: "1995-06-18",
    sexoGenero: "Femenino",
    estadoCivil: "Soltera",
    nacionalidad: "Salvadorena",
    estadoCandidato: "Activo",
    historialProcesos: [
      {
        groupName: "Grupo Soporte",
        company: "LTJ Panama",
        date: "2025-11-14",
      },
    ],
  },
  {
    id: 2,
    nombreCompleto: "Carlos Perez",
    correo: "carlos.perez@correo.com",
    direccionCasa: "Zona 10, Ciudad de Guatemala, Guatemala",
    numeroDocumento: "Pasaporte GUA-834921",
    fechaNacimiento: "1992-11-03",
    sexoGenero: "Masculino",
    estadoCivil: "Casado",
    nacionalidad: "Guatemalteca",
    estadoCandidato: "Activo",
    historialProcesos: [],
  },
  {
    id: 3,
    nombreCompleto: "Lucia Gomez",
    correo: "lucia.gomez@correo.com",
    direccionCasa: "Colonia Palmira, Tegucigalpa, Honduras",
    numeroDocumento: "DNI HN-29910477",
    fechaNacimiento: "1997-01-29",
    sexoGenero: "Femenino",
    estadoCivil: "Soltera",
    nacionalidad: "Hondurena",
    estadoCandidato: "Inactivo",
    historialProcesos: [
      {
        groupName: "Grupo Evaluacion",
        company: "LTJ Nicaragua",
        date: "2025-09-03",
      },
      {
        groupName: "Grupo Innovacion",
        company: "LTJ El Salvador",
        date: "2025-12-19",
      },
    ],
  },
  {
    id: 4,
    nombreCompleto: "Jorge Ramirez",
    correo: "jorge.ramirez@correo.com",
    direccionCasa: "Albrook, Ciudad de Panama, Panama",
    numeroDocumento: "Cedula 8-912-441",
    fechaNacimiento: "1989-08-14",
    sexoGenero: "Masculino",
    estadoCivil: "Casado",
    nacionalidad: "Panamena",
    estadoCandidato: "Activo",
    historialProcesos: [],
  },
  {
    id: 5,
    nombreCompleto: "Valeria Castro",
    correo: "valeria.castro@correo.com",
    direccionCasa: "Escazu, San Jose, Costa Rica",
    numeroDocumento: "Cedula 1-1432-990",
    fechaNacimiento: "1994-03-22",
    sexoGenero: "Femenino",
    estadoCivil: "Union libre",
    nacionalidad: "Costarricense",
    estadoCandidato: "Activo",
    historialProcesos: [
      {
        groupName: "Grupo Talento",
        company: "LTJ El Salvador",
        date: "2025-10-08",
      },
    ],
  },
  {
    id: 6,
    nombreCompleto: "Diego Torres",
    correo: "diego.torres@correo.com",
    direccionCasa: "San Francisco, Heredia, Costa Rica",
    numeroDocumento: "Cedula 4-1550-221",
    fechaNacimiento: "1998-12-05",
    sexoGenero: "Masculino",
    estadoCivil: "Soltero",
    nacionalidad: "Costarricense",
    estadoCandidato: "Inactivo",
    historialProcesos: [],
  },
  {
    id: 7,
    nombreCompleto: "Fernanda Ruiz",
    correo: "fernanda.ruiz@correo.com",
    direccionCasa: "Carretera a Masaya, Managua, Nicaragua",
    numeroDocumento: "Cedula NI-001-180792-0041A",
    fechaNacimiento: "1993-07-18",
    sexoGenero: "Femenino",
    estadoCivil: "Casada",
    nacionalidad: "Nicaraguense",
    estadoCandidato: "Activo",
    historialProcesos: [
      {
        groupName: "Grupo Comercial",
        company: "LTJ Honduras",
        date: "2025-07-22",
      },
    ],
  },
  {
    id: 8,
    nombreCompleto: "Miguel Herrera",
    correo: "miguel.herrera@correo.com",
    direccionCasa: "Zona 15, Ciudad de Guatemala, Guatemala",
    numeroDocumento: "Pasaporte GUA-992144",
    fechaNacimiento: "1996-10-10",
    sexoGenero: "Masculino",
    estadoCivil: "Soltero",
    nacionalidad: "Guatemalteca",
    estadoCandidato: "Inactivo",
    historialProcesos: [],
  },
];

const GRUPOS_CATALOGO = [
  { id: 1, nombre: "Grupo Operativo A", empresa: "LTJ El Salvador" },
  { id: 2, nombre: "Grupo Operativo B", empresa: "LTJ Guatemala" },
  { id: 3, nombre: "Grupo Comercial", empresa: "LTJ Honduras" },
  { id: 4, nombre: "Grupo Talento", empresa: "LTJ El Salvador" },
  { id: 5, nombre: "Grupo Soporte", empresa: "LTJ Panama" },
  { id: 6, nombre: "Grupo Reclutamiento", empresa: "LTJ Costa Rica" },
  { id: 7, nombre: "Grupo Evaluacion", empresa: "LTJ Nicaragua" },
  { id: 8, nombre: "Grupo Analitica", empresa: "LTJ Guatemala" },
  { id: 9, nombre: "Grupo Innovacion", empresa: "LTJ El Salvador" },
  { id: 10, nombre: "Grupo Regional", empresa: "LTJ Honduras" },
] as const;

export const GrupoCandidatoPerfil = ({
  candidateId,
}: GrupoCandidatoPerfilProps) => {
  const navigate = useNavigate();
  const { id, userId } = useParams();
  const [isOperationalReportModalOpen, setIsOperationalReportModalOpen] =
    useState(false);

  useEffect(() => {
    if (!isOperationalReportModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOperationalReportModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOperationalReportModalOpen]);

  const resolvedCandidateId = useMemo(() => {
    if (candidateId !== undefined && candidateId !== null) {
      return candidateId;
    }

    if (!userId) {
      return null;
    }

    const numericUserId = Number(userId);
    return Number.isInteger(numericUserId) ? numericUserId : null;
  }, [candidateId, userId]);

  const candidate = useMemo(() => {
    if (!resolvedCandidateId) {
      return null;
    }

    return (
      CANDIDATE_PROFILES.find((item) => item.id === resolvedCandidateId) ?? null
    );
  }, [resolvedCandidateId]);

  const backPath = id ? `/admin/grupos/${id}/candidatos` : "/admin/grupos";

  const shouldShowBackButton = candidateId === undefined;
  const contactPhone = "No disponible";
  const candidateAge = useMemo(() => {
    const birthDate = new Date(candidate?.fechaNacimiento ?? "");

    if (Number.isNaN(birthDate.getTime())) {
      return null;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }

    return age;
  }, [candidate?.fechaNacimiento]);
  const currentGroup = useMemo(() => {
    if (!id) {
      return null;
    }

    const numericGroupId = Number(id);

    if (!Number.isInteger(numericGroupId)) {
      return null;
    }

    return GRUPOS_CATALOGO.find((group) => group.id === numericGroupId) ?? null;
  }, [id]);

  if (!candidate) {
    return (
      <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
        <CardContent className="py-6 text-sm text-corp-gray-600">
          No se encontro informacion del candidato seleccionado.
        </CardContent>
      </Card>
    );
  }

  const candidateStatusStyles =
    candidate.estadoCandidato === "Activo"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-red-200 bg-red-50 text-red-700";

  return (
    <section className="space-y-3">
      <div className="rounded-xl border bg-white p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <AdminTitle
            title={`${candidate.nombreCompleto} - Perfil del candidato`}
            subtitle="Informacion general y participacion en procesos previos."
          />

          <div className="flex items-center gap-2 self-start">
            <span className="text-xs font-medium text-corp-gray-600">
              Estado del Candidato
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${candidateStatusStyles}`}
            >
              {candidate.estadoCandidato}
            </span>
          </div>
        </div>

        {shouldShowBackButton && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
              onClick={() => navigate(backPath)}
            >
              Volver a candidatos
            </Button>

            {resolvedCandidateId && (
              <Button
                type="button"
                className="cursor-pointer border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600"
                onClick={() => setIsOperationalReportModalOpen(true)}
              >
                Ver informe de evaluaciones
              </Button>
            )}
          </div>
        )}
      </div>

      <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-text-strong">
            Datos del Candidato
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="rounded-lg border border-corp-gray-200 bg-surface-page p-3">
              <h3 className="mb-2 text-sm font-semibold text-text-strong">
                Informacion Personal
              </h3>
              <div className="space-y-1.5">
                <p className="text-text-strong">
                  <span className="font-medium">Nombre:</span>{" "}
                  {candidate.nombreCompleto}
                </p>
                <p className="text-text-strong">
                  <span className="font-medium">Edad:</span>{" "}
                  {candidateAge ?? "-"}
                </p>
                <p className="text-text-strong">
                  <span className="font-medium">Sexo:</span>{" "}
                  {candidate.sexoGenero}
                </p>
                <p className="text-text-strong">
                  <span className="font-medium">Estado civil:</span>{" "}
                  {candidate.estadoCivil}
                </p>
                <p className="text-text-strong">
                  <span className="font-medium">Nacionalidad:</span>{" "}
                  {candidate.nacionalidad}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-corp-gray-200 bg-surface-page p-3">
              <h3 className="mb-2 text-sm font-semibold text-text-strong">
                Contacto
              </h3>
              <div className="space-y-1.5">
                <p className="text-text-strong">
                  <span className="font-medium">Email:</span> {candidate.correo}
                </p>
                <p className="text-text-strong">
                  <span className="font-medium">Telefono:</span> {contactPhone}
                </p>
                <p className="text-text-strong">
                  <span className="font-medium">Direccion:</span>{" "}
                  {candidate.direccionCasa}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-corp-gray-200 bg-surface-page p-3">
              <h3 className="mb-2 text-sm font-semibold text-text-strong">
                Identificacion
              </h3>
              <div className="space-y-1.5">
                <p className="text-text-strong">
                  <span className="font-medium">DUI:</span>{" "}
                  {candidate.numeroDocumento}
                </p>
                <p className="text-text-strong">
                  <span className="font-medium">Fecha de nacimiento:</span>{" "}
                  {candidate.fechaNacimiento}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="proceso-actual" className="space-y-3">
        <div className="flex justify-start">
          <TabsList variant="line" className="w-full justify-start sm:w-auto">
            <TabsTrigger
              value="proceso-actual"
              className="cursor-pointer hover:text-brand-500 data-[state=active]:text-brand-500 group-data-[variant=line]/tabs-list:data-[state=active]:after:bg-brand-500"
            >
              Proceso Actual
            </TabsTrigger>
            <TabsTrigger
              value="historial-procesos"
              className="cursor-pointer hover:text-brand-500 data-[state=active]:text-brand-500 group-data-[variant=line]/tabs-list:data-[state=active]:after:bg-brand-500"
            >
              Historial de Procesos
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="proceso-actual" className="mt-0">
          <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-text-strong">
                Proceso actual
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentGroup ? (
                <div className="overflow-x-auto rounded-lg border border-corp-gray-200">
                  <table className="min-w-full text-sm">
                    <thead className="bg-surface-page text-corp-gray-600">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">
                          Grupo
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Empresa
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Fecha de inicio
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-corp-gray-200">
                        <td className="px-4 py-2 text-text-strong">
                          {currentGroup.nombre}
                        </td>
                        <td className="px-4 py-2 text-text-strong">
                          {currentGroup.empresa}
                        </td>
                        <td className="px-4 py-2 text-text-strong">
                          2026-02-01
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-corp-gray-600">
                  No se encontro el proceso actual para este candidato.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial-procesos" className="mt-0">
          <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-text-strong">
                Historial en otros procesos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {candidate.historialProcesos.length === 0 ? (
                <p className="text-sm text-corp-gray-600">
                  Sin participacion previa en otros procesos.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-corp-gray-200">
                  <table className="min-w-full text-sm">
                    <thead className="bg-surface-page text-corp-gray-600">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">
                          Grupo
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Empresa
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Fecha de participacion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidate.historialProcesos.map((process, index) => (
                        <tr
                          key={`${process.groupName}-${process.date}-${index}`}
                          className="border-t border-corp-gray-200"
                        >
                          <td className="px-4 py-2 text-text-strong">
                            {process.groupName}
                          </td>
                          <td className="px-4 py-2 text-text-strong">
                            {process.company}
                          </td>
                          <td className="px-4 py-2 text-text-strong">
                            {process.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isOperationalReportModalOpen && resolvedCandidateId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
          onClick={() => setIsOperationalReportModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Informe de evaluaciones"
            className="relative isolate w-full max-w-7xl overflow-hidden rounded-xl bg-surface-page"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="max-h-[92vh] overflow-y-auto bg-surface-page">
              <div className="sticky top-0 z-40 border-b border-corp-gray-200 bg-surface-page/85 px-3 py-3 backdrop-blur-md sm:px-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                    onClick={() => setIsOperationalReportModalOpen(false)}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>

              <div className="relative z-0 p-3 sm:p-4">
                <InformeOperativo
                  candidateId={resolvedCandidateId}
                  compactMode={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
