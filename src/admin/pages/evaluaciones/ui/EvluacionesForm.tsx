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
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl md:text-2xl">
          Formulario de Evaluación
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6">
          {/* Nombre y Tipo */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                placeholder="Ingrese el nombre de la evaluación"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Input
                id="tipo"
                type="text"
                placeholder="Ingrese el tipo"
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label htmlFor="indicador">Indicador</Label>
              <Input
                id="indicador"
                type="number"
                placeholder="Ingrese el indicador"
                value={indicador}
                onChange={(event) => setIndicador(event.target.value)}
              />
            </div>
          </div>

          {/* Botón */}
          <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end md:pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full md:w-auto md:min-w-32"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-full md:w-auto md:min-w-40">
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
