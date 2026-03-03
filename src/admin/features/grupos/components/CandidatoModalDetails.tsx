import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { REPORT_USERS } from "./InformeOperativo";

type CandidatoModalDetailsProps = {
  candidateId: number | null;
};

export const CandidatoModalDetails = ({
  candidateId,
}: CandidatoModalDetailsProps) => {
  if (!candidateId) {
    return (
      <div className="rounded-lg border border-corp-gray-200 bg-surface-card p-4 text-sm text-corp-gray-600">
        Selecciona un candidato para ver el detalle.
      </div>
    );
  }

  const candidate =
    REPORT_USERS.find((item) => item.id === candidateId) ?? null;

  if (!candidate) {
    return (
      <div className="rounded-lg border border-corp-gray-200 bg-surface-card p-4 text-sm text-corp-gray-600">
        No se encontró información para el candidato seleccionado.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-text-strong">
            {candidate.nombre}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-text-strong">
          <p>
            <span className="font-semibold">Correo:</span> {candidate.correo}
          </p>
          <p>
            <span className="font-semibold">Plaza:</span> {candidate.plaza}
          </p>
          <p>
            <span className="font-semibold">Evaluaciones:</span>{" "}
            {candidate.evaluaciones.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Completado:</span>{" "}
            {candidate.completado}
          </p>
        </CardContent>
      </Card>

      {candidate.sections.map((section) => (
        <Card
          key={section.title}
          className="border-corp-gray-200 bg-surface-card shadow-sm"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-text-strong">
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                      key={`${section.title}-${row.factor}`}
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
    </div>
  );
};
