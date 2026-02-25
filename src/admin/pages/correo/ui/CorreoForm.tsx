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
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl md:text-2xl">
          Formulario de Correo
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                type="number"
                placeholder="Ingrese el ID"
                value={id}
                onChange={(event) => {
                  const value = event.target.value;
                  setId(value === "" ? "" : Number(value));
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Input
                id="tipo"
                placeholder="Ingrese el tipo"
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label htmlFor="asunto">Asunto</Label>
              <Input
                id="asunto"
                placeholder="Ingrese el asunto"
                value={asunto}
                onChange={(event) => setAsunto(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa</Label>
              <Select value={empresa} onValueChange={setEmpresa}>
                <SelectTrigger id="empresa" className="w-full">
                  <SelectValue placeholder="Seleccione empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ltj-hub">LTJ Hub</SelectItem>
                  <SelectItem value="super-selectos">Super Selectos</SelectItem>
                  <SelectItem value="mr-donnut">Mr. Donnut</SelectItem>
                  <SelectItem value="teleperformance">
                    Teleperformance
                  </SelectItem>
                  <SelectItem value="fgr">
                    Fiscalia General de la Republic
                  </SelectItem>
                  <SelectItem value="tigo-el-salvador">
                    Tigo El Salvador
                  </SelectItem>
                  <SelectItem value="banco-agricola">Banco Agrícola</SelectItem>
                  <SelectItem value="grupo-q">Grupo Q</SelectItem>
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
