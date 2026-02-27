import { useNavigate, useParams } from "react-router";

import { AdminTitle } from "../../../components/AdminTitle";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const GroupCandidatoDetailsPage = () => {
  const navigate = useNavigate();
  const { id, userId } = useParams();

  const backPath = id ? `/admin/grupos/${id}/candidatos` : "/admin/grupos";

  return (
    <section className="space-y-4">
      <div className="rounded-xl border bg-white p-4">
        <AdminTitle
          title="Detalle de candidato"
          subtitle={`Información del candidato seleccionado (ID: ${userId ?? "N/A"}).`}
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
};
