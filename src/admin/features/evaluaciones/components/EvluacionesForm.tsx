import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ModalCancelar } from "@/admin/components/ModalCancelar";

import { Label } from "@/components/ui/label";

export const EvluacionesForm = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [indicador, setIndicador] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const isDirty =
    nombre.trim() !== "" || tipo.trim() !== "" || indicador.trim() !== "";

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelModalOpen(true);
      return;
    }

    navigate("/admin/evaluaciones");
  };

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    navigate("/admin/evaluaciones");
  };

  const handleStayOnForm = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-corp-gray-200 bg-surface-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          Formulario de Evaluación
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6">
          {/* Nombre y Tipo */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="nombre"
                className="text-sm font-semibold text-text-strong"
              >
                Nombre
              </Label>
              <Input
                id="nombre"
                placeholder="Ingrese el nombre de la evaluación"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="tipo"
                className="text-sm font-semibold text-text-strong"
              >
                Tipo
              </Label>
              <Input
                id="tipo"
                type="text"
                placeholder="Ingrese el tipo"
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="indicador"
                className="text-sm font-semibold text-text-strong"
              >
                Indicador
              </Label>
              <Input
                id="indicador"
                type="number"
                placeholder="Ingrese el indicador"
                value={indicador}
                onChange={(event) => setIndicador(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>
          </div>

          {/* Botón */}
          <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end md:pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500 md:min-w-32 md:w-auto"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-100 md:min-w-40 md:w-auto"
            >
              Guardar
            </Button>
          </div>
        </form>
      </CardContent>

      <ModalCancelar
        isOpen={isCancelModalOpen}
        onClose={handleStayOnForm}
        onConfirm={handleConfirmCancel}
      />
    </Card>
  );
};
