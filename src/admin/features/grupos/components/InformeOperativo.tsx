import { AdminTitle } from "@/admin/components/AdminTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, FileType } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";

type ReportFactor = {
  factor: string;
  seleccion: string;
};

type ReportSection = {
  title: string;
  factors: ReportFactor[];
};

type ReportUser = {
  id: number;
  nombre: string;
  correo: string;
  plaza: string;
  evaluaciones: string[];
  completado: string;
  sections: ReportSection[];
};

const REPORT_USERS: ReportUser[] = [
  {
    id: 1,
    nombre: "Ana Martínez",
    correo: "ana.martinez@correo.com",
    plaza: "Atención al Usuario",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1", "TP2"],
    completado: "4/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "32 | 15-02-2026" },
          { factor: "Concepción Espacial", seleccion: "20 | 15-02-2026" },
          { factor: "Razonamiento", seleccion: "63 | 15-02-2026" },
          { factor: "Habilidad Numérica", seleccion: "91 | 15-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "57 | 15-02-2026" },
          { factor: "Influencia", seleccion: "70 | 15-02-2026" },
          { factor: "Estabilidad", seleccion: "35 | 15-02-2026" },
          { factor: "Cumplimiento", seleccion: "83 | 15-02-2026" },
        ],
      },
    ],
  },
  {
    id: 2,
    nombre: "Carlos Pérez",
    correo: "carlos.perez@correo.com",
    plaza: "Analista de Operaciones",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1"],
    completado: "3/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "44 | 16-02-2026" },
          { factor: "Concepción Espacial", seleccion: "57 | 16-02-2026" },
          { factor: "Razonamiento", seleccion: "61 | 16-02-2026" },
        ],
      },
    ],
  },
  {
    id: 3,
    nombre: "Lucía Gómez",
    correo: "lucia.gomez@correo.com",
    plaza: "Asistente de Gestión",
    evaluaciones: ["TCG"],
    completado: "1/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "25 | 12-02-2026" },
        ],
      },
    ],
  },
  {
    id: 4,
    nombre: "Jorge Ramírez",
    correo: "jorge.ramirez@correo.com",
    plaza: "Supervisor Comercial",
    evaluaciones: ["TCG", "TP1", "TP2"],
    completado: "3/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "39 | 18-02-2026" },
          { factor: "Concepción Espacial", seleccion: "48 | 18-02-2026" },
          { factor: "Razonamiento", seleccion: "52 | 18-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "62 | 18-02-2026" },
          { factor: "Influencia", seleccion: "74 | 18-02-2026" },
          { factor: "Estabilidad", seleccion: "46 | 18-02-2026" },
          { factor: "Cumplimiento", seleccion: "69 | 18-02-2026" },
        ],
      },
    ],
  },
  {
    id: 5,
    nombre: "Valeria Castro",
    correo: "valeria.castro@correo.com",
    plaza: "Coordinadora de Talento",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1", "TP2"],
    completado: "4/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "58 | 19-02-2026" },
          { factor: "Concepción Espacial", seleccion: "63 | 19-02-2026" },
          { factor: "Razonamiento", seleccion: "71 | 19-02-2026" },
          { factor: "Habilidad Numérica", seleccion: "76 | 19-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "68 | 19-02-2026" },
          { factor: "Influencia", seleccion: "81 | 19-02-2026" },
          { factor: "Estabilidad", seleccion: "55 | 19-02-2026" },
          { factor: "Cumplimiento", seleccion: "77 | 19-02-2026" },
        ],
      },
    ],
  },
  {
    id: 6,
    nombre: "Diego Torres",
    correo: "diego.torres@correo.com",
    plaza: "Asistente Operativo",
    evaluaciones: ["CI - VERSION D", "TP2"],
    completado: "2/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "31 | 20-02-2026" },
          { factor: "Concepción Espacial", seleccion: "42 | 20-02-2026" },
          { factor: "Razonamiento", seleccion: "47 | 20-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "44 | 20-02-2026" },
          { factor: "Influencia", seleccion: "39 | 20-02-2026" },
          { factor: "Estabilidad", seleccion: "58 | 20-02-2026" },
          { factor: "Cumplimiento", seleccion: "63 | 20-02-2026" },
        ],
      },
    ],
  },
  {
    id: 7,
    nombre: "Fernanda Ruiz",
    correo: "fernanda.ruiz@correo.com",
    plaza: "Especialista de Servicio",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1", "TP2"],
    completado: "4/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "61 | 21-02-2026" },
          { factor: "Concepción Espacial", seleccion: "54 | 21-02-2026" },
          { factor: "Razonamiento", seleccion: "73 | 21-02-2026" },
          { factor: "Habilidad Numérica", seleccion: "79 | 21-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "66 | 21-02-2026" },
          { factor: "Influencia", seleccion: "83 | 21-02-2026" },
          { factor: "Estabilidad", seleccion: "61 | 21-02-2026" },
          { factor: "Cumplimiento", seleccion: "80 | 21-02-2026" },
        ],
      },
    ],
  },
  {
    id: 8,
    nombre: "Miguel Herrera",
    correo: "miguel.herrera@correo.com",
    plaza: "Asesor Comercial",
    evaluaciones: ["TCG", "TP1"],
    completado: "2/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "46 | 22-02-2026" },
          { factor: "Concepción Espacial", seleccion: "37 | 22-02-2026" },
          { factor: "Razonamiento", seleccion: "51 | 22-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "53 | 22-02-2026" },
          { factor: "Influencia", seleccion: "58 | 22-02-2026" },
          { factor: "Estabilidad", seleccion: "49 | 22-02-2026" },
          { factor: "Cumplimiento", seleccion: "65 | 22-02-2026" },
        ],
      },
    ],
  },
];

export const InformeOperativo = () => {
  const navigate = useNavigate();
  const { id, userId } = useParams();

  const getEvaluationDate = (selection: string) => {
    const datePart = selection.split("|")[1]?.trim();
    return datePart && datePart.length > 0 ? datePart : "Sin fecha";
  };

  const user = useMemo(() => {
    if (!userId) {
      return null;
    }

    const numericUserId = Number(userId);

    if (!Number.isInteger(numericUserId)) {
      return null;
    }

    return REPORT_USERS.find((item) => item.id === numericUserId) ?? null;
  }, [userId]);

  const backPath = id ? `/admin/grupos/${id}/candidatos` : "/admin/grupos";

  if (!user) {
    return (
      <section className="space-y-4">
        <div className="rounded-xl border bg-white p-4">
          <AdminTitle
            title="Informe operativo"
            subtitle="No se encontró información para el candidato seleccionado."
          />
        </div>

        <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
          <CardContent className="pt-6">
            <Button
              type="button"
              variant="outline"
              className="border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
              onClick={() => navigate(backPath)}
            >
              Volver a candidatos
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-xl border bg-white p-4">
        <AdminTitle
          title={`${user.nombre} - Informe operativo`}
          subtitle="Resumen integral de evaluaciones y resultados disponibles."
        />
      </div>

      <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
        <CardContent className="py-2">
          <div className="flex w-full flex-wrap items-center justify-around gap-2 sm:w-auto sm:justify-start">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-red-300 bg-surface-card text-red-600 transition-colors hover:bg-red-600 hover:text-white"
              onClick={() => console.log("generate pdf", user.id)}
            >
              <FileText className="h-4 w-4" />
              Generar PDF
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-blue-300 bg-surface-card text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
              onClick={() => console.log("generate word", user.id)}
            >
              <FileType className="h-4 w-4" />
              Generar Word
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-text-strong">
            Tipos de evaluaciones incluidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-corp-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-surface-page text-corp-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">
                    Evaluación
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">Enlace</th>
                  <th className="px-4 py-2 text-left font-semibold">Estado</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Fecha de generación
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Fecha de vencimiento
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.evaluaciones.map((item) => (
                  <tr key={item} className="border-t border-corp-gray-200">
                    <td className="px-4 py-2 text-text-strong">{item}</td>
                    <td className="px-4 py-2">
                      <a
                        href="#"
                        className="text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700"
                      >
                        Abrir enlace
                      </a>
                    </td>
                    <td className="px-4 py-2 text-text-strong">COMPLETADO</td>
                    <td className="px-4 py-2 text-text-strong">
                      2026-02-14 00:14:00
                    </td>
                    <td className="px-4 py-2 text-text-strong">
                      2027-02-14 00:14:00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {user.sections.map((section) => (
        <Card
          key={section.title}
          className="border-corp-gray-200 bg-surface-card shadow-sm"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-text-strong">
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-2">
              <p className="text-xs text-corp-gray-600">
                Evaluaciones realizadas
              </p>
              <Select
                defaultValue={getEvaluationDate(
                  section.factors[0]?.seleccion ?? "",
                )}
              >
                <SelectTrigger className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 focus-visible:border-brand-500 focus-visible:ring-brand-100/60">
                  <SelectValue placeholder="Selecciona una fecha" />
                </SelectTrigger>
                <SelectContent
                  align="start"
                  className="border-corp-gray-200 bg-surface-card"
                >
                  <SelectGroup>
                    {[
                      ...new Set(
                        section.factors.map((row) =>
                          getEvaluationDate(row.seleccion),
                        ),
                      ),
                    ].map((dateValue) => (
                      <SelectItem
                        key={`${section.title}-${dateValue}`}
                        value={dateValue}
                        className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                      >
                        {dateValue}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto rounded-lg border border-corp-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-surface-page text-corp-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">
                      Factor
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Selección
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {section.factors.map((row) => (
                    <tr
                      key={row.factor}
                      className="border-t border-corp-gray-200"
                    >
                      <td className="px-4 py-2 text-text-strong">
                        {row.factor}
                      </td>
                      <td className="px-4 py-2 text-text-strong">
                        {row.seleccion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
