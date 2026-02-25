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

export const BitacoraForm = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [registro, setRegistro] = useState<number | "">("");
  const [tabla, setTabla] = useState("");
  const [accion, setAccion] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const isDirty =
    usuario.trim() !== "" ||
    registro !== "" ||
    tabla.trim() !== "" ||
    accion.trim() !== "";

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelModalOpen(true);
      return;
    }

    navigate("/admin/bitacora");
  };

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    navigate("/admin/bitacora");
  };

  const handleStayOnForm = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl md:text-2xl">
          Formulario de Bitácora
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                placeholder="Ingrese el usuario"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registro">Registro</Label>
              <Input
                id="registro"
                type="number"
                placeholder="Ingrese el registro"
                value={registro}
                onChange={(event) => {
                  const value = event.target.value;
                  setRegistro(value === "" ? "" : Number(value));
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label htmlFor="tabla">Tabla</Label>
              <Input
                id="tabla"
                placeholder="Ingrese la tabla"
                value={tabla}
                onChange={(event) => setTabla(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accion">Accion</Label>
              <Select value={accion} onValueChange={setAccion}>
                <SelectTrigger id="accion" className="w-full">
                  <SelectValue placeholder="Seleccione accion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actualizar">Actualizar</SelectItem>
                  <SelectItem value="insertar">Insertar</SelectItem>
                </SelectContent>
              </Select>
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
