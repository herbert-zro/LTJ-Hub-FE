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

const EMPRESA_USUARIOS_MOCK = [
  {
    id: 1,
    nombre: "Ana Martínez",
    correo: "ana.martinez@empresa.com",
    rol: "administrador",
    estado: "activo",
  },
  {
    id: 2,
    nombre: "Carlos Pérez",
    correo: "carlos.perez@empresa.com",
    rol: "supervisor",
    estado: "activo",
  },
  {
    id: 3,
    nombre: "Lucía Gómez",
    correo: "lucia.gomez@empresa.com",
    rol: "operador",
    estado: "activo",
  },
  {
    id: 4,
    nombre: "Jorge Ramírez",
    correo: "jorge.ramirez@empresa.com",
    rol: "operador",
    estado: "inactivo",
  },
] as const;

export const EmpresaUsuariosForm = () => {
  const navigate = useNavigate();
  const { id, userId } = useParams();
  const isEditMode = Boolean(userId);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const numericUserId = Number(userId);

    if (!Number.isInteger(numericUserId)) {
      return;
    }

    const usuario = EMPRESA_USUARIOS_MOCK.find(
      (item) => item.id === numericUserId,
    );

    if (!usuario) {
      return;
    }

    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setRol(usuario.rol);
    setEstado(usuario.estado);
  }, [userId]);

  const backPath = id ? `/admin/empresas/${id}/usuarios` : "/admin/empresas";

  const isDirty =
    nombre.trim() !== "" ||
    correo.trim() !== "" ||
    rol.trim() !== "" ||
    estado.trim() !== "";

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
    console.log("save user", { nombre, correo, rol, estado });
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-corp-gray-200 bg-surface-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          {isEditMode ? "Editar usuario" : "Ingresar usuario"}
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
                Nombre
              </Label>
              <Input
                id="nombre"
                placeholder="Ingrese el nombre completo"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>

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
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="rol"
                className="text-sm font-semibold text-text-strong"
              >
                Rol
              </Label>
              <Select value={rol} onValueChange={setRol}>
                <SelectTrigger
                  id="rol"
                  className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
                >
                  <SelectValue placeholder="Seleccione rol" />
                </SelectTrigger>
                <SelectContent className="border-corp-gray-200 bg-surface-card">
                  <SelectItem
                    value="administrador"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Administrador
                  </SelectItem>
                  <SelectItem
                    value="supervisor"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Supervisor
                  </SelectItem>
                  <SelectItem
                    value="operador"
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    Operador
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
