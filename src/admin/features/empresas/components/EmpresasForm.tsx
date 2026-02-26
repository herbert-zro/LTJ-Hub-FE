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
import { isEmpresaFormDirty } from "../utils/isEmpresaFormDirty";

import { Label } from "@/components/ui/label";

export const EmpresasForm = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [estado, setEstado] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const isDirty = isEmpresaFormDirty({
    nombre,
    url,
    direccion,
    telefono,
    correo,
    estado,
  });

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelModalOpen(true);
      return;
    }

    navigate("/admin/empresas");
  };

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    navigate("/admin/empresas");
  };

  const handleStayOnForm = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-corp-gray-200 bg-surface-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          Formulario de Empresa
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6">
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
                placeholder="Ingrese el nombre de la empresa"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="url"
                className="text-sm font-semibold text-text-strong"
              >
                URL
              </Label>
              <Input
                id="url"
                placeholder="https://empresa.com"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="direccion"
                className="text-sm font-semibold text-text-strong"
              >
                Dirección
              </Label>
              <Input
                id="direccion"
                placeholder="Ingrese la dirección"
                value={direccion}
                onChange={(event) => setDireccion(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="telefono"
                className="text-sm font-semibold text-text-strong"
              >
                Teléfono
              </Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="Ingrese el teléfono"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="correo"
                className="text-sm font-semibold text-text-strong"
              >
                Correo
              </Label>
              <Input
                id="correo"
                type="email"
                placeholder="ejemplo@empresa.com"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
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
                    value="activo"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Activo
                  </SelectItem>
                  <SelectItem
                    value="inactivo"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Inactivo
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
