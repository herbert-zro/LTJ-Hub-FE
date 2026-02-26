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

const EMPRESA_ROLES_MOCK = [
  {
    id: 1,
    nombre: "Administrador",
    descripcion: "Gestiona configuración general y usuarios de la empresa.",
    estado: "activo",
  },
  {
    id: 2,
    nombre: "Supervisor",
    descripcion: "Supervisa procesos y revisa indicadores operativos.",
    estado: "activo",
  },
  {
    id: 3,
    nombre: "Operador",
    descripcion: "Ejecuta tareas operativas y registra información diaria.",
    estado: "activo",
  },
  {
    id: 4,
    nombre: "Consulta",
    descripcion: "Acceso de solo lectura a módulos habilitados.",
    estado: "inactivo",
  },
] as const;

export const EmpresaRoleForm = () => {
  const navigate = useNavigate();
  const { id, roleId } = useParams();
  const isEditMode = Boolean(roleId);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (!roleId) {
      return;
    }

    const numericRoleId = Number(roleId);

    if (!Number.isInteger(numericRoleId)) {
      return;
    }

    const role = EMPRESA_ROLES_MOCK.find((item) => item.id === numericRoleId);

    if (!role) {
      return;
    }

    setNombre(role.nombre);
    setDescripcion(role.descripcion);
    setEstado(role.estado);
  }, [roleId]);

  const backPath = id ? `/admin/empresas/${id}/roles` : "/admin/empresas";

  const isDirty =
    nombre.trim() !== "" || descripcion.trim() !== "" || estado.trim() !== "";

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelModalOpen(true);
      return;
    }

    navigate(backPath);
  };

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    navigate(backPath);
  };

  const handleStayOnForm = () => {
    setIsCancelModalOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("save role", { nombre, descripcion, estado });
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-corp-gray-200 bg-surface-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          {isEditMode ? "Editar rol" : "Ingresar rol"}
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
                Nombre del rol
              </Label>
              <Input
                id="nombre"
                placeholder="Ingrese el nombre del rol"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
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

          <div className="space-y-2">
            <Label
              htmlFor="descripcion"
              className="text-sm font-semibold text-text-strong"
            >
              Descripción
            </Label>
            <Input
              id="descripcion"
              placeholder="Ingrese la descripción del rol"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
            />
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
