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

export const CorreoForm = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<number | "">("");
  const [tipo, setTipo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const isDirty =
    id !== "" ||
    tipo.trim() !== "" ||
    asunto.trim() !== "" ||
    empresa.trim() !== "";

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelModalOpen(true);
      return;
    }

    navigate("/admin/correo");
  };

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    navigate("/admin/correo");
  };

  const handleStayOnForm = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-corp-gray-200 bg-surface-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          Formulario de Correo
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="id"
                className="text-sm font-semibold text-text-strong"
              >
                ID
              </Label>
              <Input
                id="id"
                type="number"
                placeholder="Ingrese el ID"
                value={id}
                onChange={(event) => {
                  const value = event.target.value;
                  setId(value === "" ? "" : Number(value));
                }}
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
                htmlFor="asunto"
                className="text-sm font-semibold text-text-strong"
              >
                Asunto
              </Label>
              <Input
                id="asunto"
                placeholder="Ingrese el asunto"
                value={asunto}
                onChange={(event) => setAsunto(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="empresa"
                className="text-sm font-semibold text-text-strong"
              >
                Empresa
              </Label>
              <Select value={empresa} onValueChange={setEmpresa}>
                <SelectTrigger
                  id="empresa"
                  className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
                >
                  <SelectValue placeholder="Seleccione empresa" />
                </SelectTrigger>
                <SelectContent className="border-corp-gray-200 bg-surface-card">
                  <SelectItem
                    value="ltj-hub"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    LTJ Hub
                  </SelectItem>
                  <SelectItem
                    value="super-selectos"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Super Selectos
                  </SelectItem>
                  <SelectItem
                    value="mr-donnut"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Mr. Donnut
                  </SelectItem>
                  <SelectItem
                    value="teleperformance"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Teleperformance
                  </SelectItem>
                  <SelectItem
                    value="fgr"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Fiscalia General de la Republic
                  </SelectItem>
                  <SelectItem
                    value="tigo-el-salvador"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Tigo El Salvador
                  </SelectItem>
                  <SelectItem
                    value="banco-agricola"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Banco Agrícola
                  </SelectItem>
                  <SelectItem
                    value="grupo-q"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Grupo Q
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
