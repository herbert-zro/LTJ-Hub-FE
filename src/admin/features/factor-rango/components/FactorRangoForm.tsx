import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ModalCancelar } from "@/admin/components/ModalCancelar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

export const FactorRangoForm = () => {
  const navigate = useNavigate();
  const [tipoDeEvaluacion, setTipoDeEvaluacion] = useState("");
  const [factor, setFactor] = useState("");
  const [percentil, setPercentil] = useState("");
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const isDirty =
    tipoDeEvaluacion.trim() !== "" ||
    factor.trim() !== "" ||
    percentil.trim() !== "" ||
    estado.trim() !== "" ||
    descripcion.trim() !== "";

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelModalOpen(true);
      return;
    }

    navigate("/admin/factor-rango");
  };

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    navigate("/admin/factor-rango");
  };

  const handleStayOnForm = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-corp-gray-200 bg-surface-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          Formulario de Factor Rango
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6">
          {/* Tipo de evaluación y Factor */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="tipoDeEvaluacion"
                className="text-sm font-semibold text-text-strong"
              >
                Tipo de evaluación
              </Label>
              <Input
                id="tipoDeEvaluacion"
                placeholder="Ingrese el tipo de evaluación"
                value={tipoDeEvaluacion}
                onChange={(event) => setTipoDeEvaluacion(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="factor"
                className="text-sm font-semibold text-text-strong"
              >
                Factor
              </Label>
              <Input
                id="factor"
                type="text"
                placeholder="Ingrese el factor"
                value={factor}
                onChange={(event) => setFactor(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>
          </div>

          {/* Percentil y Estado */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="percentil"
                className="text-sm font-semibold text-text-strong"
              >
                Percentil
              </Label>
              <Select value={percentil} onValueChange={setPercentil}>
                <SelectTrigger
                  id="percentil"
                  className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
                >
                  <SelectValue placeholder="Seleccione percentil" />
                </SelectTrigger>
                <SelectContent className="border-corp-gray-200 bg-surface-card">
                  <SelectItem
                    value="0 - 39"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    0 - 39
                  </SelectItem>
                  <SelectItem
                    value="40 - 59"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    40 - 59
                  </SelectItem>
                  <SelectItem
                    value="60 - 74"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    60 - 74
                  </SelectItem>
                  <SelectItem
                    value="75 - 94"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    75 - 94
                  </SelectItem>
                  <SelectItem
                    value="95 - 100"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    95 - 100
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="estado"
                className="text-sm font-semibold text-text-strong"
              >
                Estado
              </Label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger
                  id="estado"
                  className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
                >
                  <SelectValue placeholder="Seleccione estado" />
                </SelectTrigger>
                <SelectContent className="border-corp-gray-200 bg-surface-card">
                  <SelectItem
                    value="Inferior al Termino Medio"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Inferior al Termino Medio
                  </SelectItem>
                  <SelectItem
                    value="Termino Medio"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Termino Medio
                  </SelectItem>
                  <SelectItem
                    value="Termino Medio Tendiente Alta"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Termino Medio Tendiente Alta
                  </SelectItem>
                  <SelectItem
                    value="Superior al Termino Medio"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Superior al Termino Medio
                  </SelectItem>
                  <SelectItem
                    value="Muy Superior"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Muy Superior
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label
              htmlFor="descripcion"
              className="text-sm font-semibold text-text-strong"
            >
              Descripción
            </Label>
            <Input
              id="descripcion"
              type="text"
              placeholder="Ingrese la descripción"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
            />
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
