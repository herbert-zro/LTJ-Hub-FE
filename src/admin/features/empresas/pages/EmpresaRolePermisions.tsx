import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLE_OPTIONS = [
  { value: "administrador", label: "Administrador" },
  { value: "operador", label: "Operador" },
] as const;

const PERMISSIONS_BY_CATEGORY: Record<
  (typeof PERMISSION_CATEGORIES)[number],
  string[]
> = {
  "Whatsapp General": [
    "General Candidate Whatsapp register",
    "General Candidate Whatsapp register CI",
  ],
  Candidato: [
    "Lista de Candidatos",
    "Crear candidato",
    "Editar Candidato",
    "Ver Candidato",
    "Buscar Candidatos",
    "Ver detalle de evaluación",
  ],
  Empresa: [
    "Ver lista de Empresas",
    "Crear Empresas",
    "Editar Empresa",
    "Agregar Usuario",
    "Ver listado de factores rango",
  ],
  Usuario: ["Crear usuario", "Editar usuario", "Guardar"],
  Permisos: ["Configurar permisos"],
  "Plantilla de correo": [
    "Ver plantillas",
    "Crear plantilla",
    "Editar plantilla",
    "Ver detalle de plantilla",
    "Enviar correo de prueba",
  ],
  Evaluaciones: [
    "Lista de evaluaciones",
    "Crear Evaluación",
    "Ver detalle de evaluación de candidato extremo",
    "Ver detalle de proceso de evaluación de candidato externo",
    "Generar PDF",
    "Generar Word",
    "Enviar correo",
  ],
  Catálogo: ["Editar factor rango"],
  Procesos: [
    "Editar proceso",
    "Ver proceso",
    "Crear proceso",
    "Descargar Excel de candidatos en proceso",
    "Comparar resultados",
  ],
  Grupos: ["Ver lista de grupos", "Crear grupos", "Ver detalle de grupo"],
  Roles: ["Ver roles de la empresa", "Crear Rol", "Editar Rol", "Eliminar rol"],
  "Dashboard General": [
    "Home view",
    "Dashboard datos",
    "Dashboard comparativa",
  ],
};

const makePermissionKey = (category: string, permission: string) =>
  `${category}::${permission}`;

const PERMISSION_CATEGORIES = [
  "Whatsapp General",
  "Candidato",
  "Empresa",
  "Usuario",
  "Permisos",
  "Plantilla de correo",
  "Evaluaciones",
  "Catálogo",
  /* "Informe General", */
  "Procesos",
  "Grupos",
  "Roles",
  /*   "Test Candidato General", */
  "Dashboard General",
] as const;

export const EmpresaRolePermisions = () => {
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined,
  );
  const [expandedByCategory, setExpandedByCategory] = useState<
    Record<string, boolean>
  >({});
  const [checkedPermissions, setCheckedPermissions] = useState<
    Record<string, boolean>
  >({});

  const handleToggleCategory = (category: string) => {
    setExpandedByCategory((current) => ({
      ...current,
      [category]: !current[category],
    }));
  };

  const handleTogglePermission = (category: string, permission: string) => {
    const key = makePermissionKey(category, permission);

    setCheckedPermissions((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <section>
      <div className="mb-4 rounded-xl border bg-white p-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-text-strong">
              Administración de permisos
            </h1>
            <p className="text-corp-gray-500">
              Selecciona un rol para gestionar sus permisos dentro de la
              empresa.
            </p>
          </div>

          <div className="w-full md:w-80 md:shrink-0">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger
                id="empresa-role-permissions-select"
                className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              >
                <SelectValue placeholder="Seleccione un Rol" />
              </SelectTrigger>

              <SelectContent className="border-corp-gray-200 bg-surface-card">
                {ROLE_OPTIONS.map((role) => (
                  <SelectItem
                    key={role.value}
                    value={role.value}
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 sm:p-5 md:p-6">
        <div className="grid grid-cols-1 gap-4">
          {PERMISSION_CATEGORIES.map((category) => (
            <Card
              key={category}
              className="w-full border-corp-gray-200 bg-surface-card py-0 shadow-sm"
            >
              <button
                type="button"
                onClick={() => handleToggleCategory(category)}
                className="cursor-pointer flex w-full items-center justify-between px-6 py-3 text-left transition-colors hover:bg-brand-100/40"
                aria-expanded={Boolean(expandedByCategory[category])}
                aria-controls={`permissions-panel-${category}`}
              >
                <span className="text-base font-semibold text-text-strong">
                  {category}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-corp-gray-500 transition-transform ${
                    expandedByCategory[category] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {expandedByCategory[category] && (
                <div
                  id={`permissions-panel-${category}`}
                  className="border-t border-corp-gray-200 px-6 py-4"
                >
                  <div className="grid grid-cols-1 gap-3">
                    {(PERMISSIONS_BY_CATEGORY[category] ?? []).map(
                      (permission) => {
                        const checkboxId = makePermissionKey(
                          category,
                          permission,
                        );

                        return (
                          <label
                            key={checkboxId}
                            htmlFor={checkboxId}
                            className="flex cursor-pointer items-start gap-3 rounded-md border border-corp-gray-200 bg-white px-3 py-2 hover:bg-brand-100/30"
                          >
                            <input
                              id={checkboxId}
                              type="checkbox"
                              checked={Boolean(checkedPermissions[checkboxId])}
                              onChange={() =>
                                handleTogglePermission(category, permission)
                              }
                              className="mt-0.5 h-4 w-4 cursor-pointer accent-brand-500"
                            />
                            <span className="text-sm text-text-strong">
                              {permission}
                            </span>
                          </label>
                        );
                      },
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
