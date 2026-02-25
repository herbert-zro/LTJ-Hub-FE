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
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl md:text-2xl">
          Formulario de Factor Rango
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6">
          {/* Tipo de evaluación y Factor */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label htmlFor="tipoDeEvaluacion">Tipo de evaluación</Label>
              <Input
                id="tipoDeEvaluacion"
                placeholder="Ingrese el tipo de evaluación"
                value={tipoDeEvaluacion}
                onChange={(event) => setTipoDeEvaluacion(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="factor">Factor</Label>
              <Input
                id="factor"
                type="text"
                placeholder="Ingrese el factor"
                value={factor}
                onChange={(event) => setFactor(event.target.value)}
              />
            </div>
          </div>

          {/* Percentil y Estado */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label htmlFor="percentil">Percentil</Label>
              <Select value={percentil} onValueChange={setPercentil}>
                <SelectTrigger id="percentil" className="w-full">
                  <SelectValue placeholder="Seleccione percentil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0 - 39">0 - 39</SelectItem>
                  <SelectItem value="40 - 59">40 - 59</SelectItem>
                  <SelectItem value="60 - 74">60 - 74</SelectItem>
                  <SelectItem value="75 - 94">75 - 94</SelectItem>
                  <SelectItem value="95 - 100">95 - 100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger id="estado" className="w-full">
                  <SelectValue placeholder="Seleccione estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inferior al Termino Medio">
                    Inferior al Termino Medio
                  </SelectItem>
                  <SelectItem value="Termino Medio">Termino Medio</SelectItem>
                  <SelectItem value="Termino Medio Tendiente Alta">
                    Termino Medio Tendiente Alta
                  </SelectItem>
                  <SelectItem value="Superior al Termino Medio">
                    Superior al Termino Medio
                  </SelectItem>
                  <SelectItem value="Muy Superior">Muy Superior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              type="text"
              placeholder="Ingrese la descripción"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
            />
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
