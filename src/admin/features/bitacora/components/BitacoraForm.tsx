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
    <Card className="mx-auto w-full max-w-3xl border-corp-gray-200 bg-surface-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          Formulario de Bitácora
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="usuario"
                className="text-sm font-semibold text-text-strong"
              >
                Usuario
              </Label>
              <Input
                id="usuario"
                placeholder="Ingrese el usuario"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="registro"
                className="text-sm font-semibold text-text-strong"
              >
                Registro
              </Label>
              <Input
                id="registro"
                type="number"
                placeholder="Ingrese el registro"
                value={registro}
                onChange={(event) => {
                  const value = event.target.value;
                  setRegistro(value === "" ? "" : Number(value));
                }}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="tabla"
                className="text-sm font-semibold text-text-strong"
              >
                Tabla
              </Label>
              <Input
                id="tabla"
                placeholder="Ingrese la tabla"
                value={tabla}
                onChange={(event) => setTabla(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="accion"
                className="text-sm font-semibold text-text-strong"
              >
                Accion
              </Label>
              <Select value={accion} onValueChange={setAccion}>
                <SelectTrigger
                  id="accion"
                  className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
                >
                  <SelectValue placeholder="Seleccione accion" />
                </SelectTrigger>
                <SelectContent className="border-corp-gray-200 bg-surface-card">
                  <SelectItem
                    value="actualizar"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Actualizar
                  </SelectItem>
                  <SelectItem
                    value="insertar"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Insertar
                  </SelectItem>
                </SelectContent>
              </Select>
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
