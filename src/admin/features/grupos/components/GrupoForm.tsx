import { ModalCancelar } from "@/admin/components/ModalCancelar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";

const GRUPOS_MOCK = [
  { id: 1, nombre: "Grupo Operativo A", empresa: "LTJ El Salvador" },
  { id: 2, nombre: "Grupo Operativo B", empresa: "LTJ Guatemala" },
  { id: 3, nombre: "Grupo Comercial", empresa: "LTJ Honduras" },
  { id: 4, nombre: "Grupo Talento", empresa: "LTJ El Salvador" },
] as const;

const EMPRESAS_OPTIONS = [
  "LTJ El Salvador",
  "LTJ Guatemala",
  "LTJ Honduras",
  "LTJ Nicaragua",
  "LTJ Costa Rica",
  "LTJ Panamá",
];

export const GrupoForm = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const isEditMode = Boolean(groupId);

  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (!groupId) {
      return;
    }

    const numericGroupId = Number(groupId);

    if (!Number.isInteger(numericGroupId)) {
      return;
    }

    const grupo = GRUPOS_MOCK.find((item) => item.id === numericGroupId);

    if (!grupo) {
      return;
    }

    setNombre(grupo.nombre);
    setEmpresa(grupo.empresa);
  }, [groupId]);

  const isDirty = nombre.trim() !== "" || empresa.trim() !== "";

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelModalOpen(true);
      return;
    }

    navigate("/admin/grupos");
  };

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    navigate("/admin/grupos");
  };

  const handleStayOnForm = () => {
    setIsCancelModalOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("save group", { nombre, empresa, groupId });
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-corp-gray-200 bg-surface-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          {isEditMode ? "Editar grupo" : "Agregar grupo"}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="nombre"
                className="text-sm font-semibold text-text-strong"
              >
                Nombre del grupo
              </Label>
              <Input
                id="nombre"
                placeholder="Ingrese el nombre del grupo"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
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
                  {EMPRESAS_OPTIONS.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                    >
                      {item}
                    </SelectItem>
                  ))}
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
              {isEditMode ? "Actualizar" : "Guardar"}
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
