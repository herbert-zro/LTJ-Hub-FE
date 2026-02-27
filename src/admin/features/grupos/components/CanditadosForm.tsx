import { useMemo, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";

import { ModalCancelar } from "@/admin/components/ModalCancelar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EVALUACIONES_OPTIONS = ["TCG", "CI - VERSION D", "TP1", "TP2"];

type CanditadosFormProps = {
  onRequestClose?: () => void;
};

export const CanditadosForm = ({ onRequestClose }: CanditadosFormProps) => {
  const isModalMode = Boolean(onRequestClose);

  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [evaluaciones, setEvaluaciones] = useState<string[]>([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      nombre.trim().length > 0 &&
      correo.trim().length > 0 &&
      fechaNacimiento.trim().length > 0
    );
  }, [nombre, correo, fechaNacimiento]);

  const toggleEvaluacion = (value: string) => {
    setEvaluaciones((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("save candidate", {
      nombre,
      correo,
      evaluaciones,
      fechaNacimiento,
      observaciones,
    });

    onRequestClose?.();
  };

  const handleCancel = () => {
    const isDirty =
      nombre.trim() !== "" ||
      correo.trim() !== "" ||
      fechaNacimiento.trim() !== "" ||
      observaciones.trim() !== "" ||
      evaluaciones.length > 0;

    if (isDirty) {
      setIsCancelModalOpen(true);
      return;
    }

    if (onRequestClose) {
      onRequestClose();
      return;
    }

    if (id) {
      navigate(`/admin/grupos/${id}/candidatos`);
      return;
    }

    navigate("/admin/grupos");
  };

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);

    if (onRequestClose) {
      onRequestClose();
      return;
    }

    if (id) {
      navigate(`/admin/grupos/${id}/candidatos`);
      return;
    }

    navigate("/admin/grupos");
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <Card
      className={`mx-auto w-full border-corp-gray-200 bg-surface-card shadow-sm ${
        isModalMode ? "max-h-[85vh] max-w-3xl overflow-y-auto" : "max-w-4xl"
      }`}
    >
      <CardHeader className={isModalMode ? "pb-1" : "pb-2"}>
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          Agregar candidato
        </CardTitle>
      </CardHeader>

      <CardContent className={isModalMode ? "pt-2" : "pt-4"}>
        <form
          className={isModalMode ? "space-y-4" : "space-y-6"}
          onSubmit={handleSubmit}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              isModalMode ? "gap-3 lg:gap-4" : "gap-4 lg:gap-6"
            }`}
          >
            <div className="space-y-2">
              <Label
                htmlFor="candidato-nombre"
                className="text-sm font-semibold text-text-strong"
              >
                Nombre
              </Label>
              <Input
                id="candidato-nombre"
                placeholder="Ingrese el nombre del candidato"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="candidato-correo"
                className="text-sm font-semibold text-text-strong"
              >
                Correo
              </Label>
              <Input
                id="candidato-correo"
                type="email"
                placeholder="correo@dominio.com"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong placeholder:text-corp-gray-400 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-text-strong">
              Evaluaciones a asignar
            </Label>
            <div className="flex flex-wrap gap-2">
              {EVALUACIONES_OPTIONS.map((option) => {
                const isSelected = evaluaciones.includes(option);

                return (
                  <Button
                    key={option}
                    type="button"
                    variant="outline"
                    onClick={() => toggleEvaluacion(option)}
                    className={
                      isSelected
                        ? "border-brand-500 bg-brand-100 text-brand-600 hover:bg-brand-100"
                        : "border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                    }
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              isModalMode ? "gap-3 lg:gap-4" : "gap-4 lg:gap-6"
            }`}
          >
            <div className="space-y-2">
              <Label
                htmlFor="candidato-fecha-nacimiento"
                className="text-sm font-semibold text-text-strong"
              >
                Fecha de nacimiento
              </Label>
              <Input
                id="candidato-fecha-nacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={(event) => setFechaNacimiento(event.target.value)}
                className="border-corp-gray-200 bg-surface-card text-text-strong hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="candidato-observaciones"
              className="text-sm font-semibold text-text-strong"
            >
              Observaciones
            </Label>
            <textarea
              id="candidato-observaciones"
              value={observaciones}
              onChange={(event) => setObservaciones(event.target.value)}
              placeholder="Ingrese observaciones adicionales"
              rows={isModalMode ? 3 : 4}
              className="w-full rounded-md border border-corp-gray-200 bg-surface-card px-3 py-2 text-sm text-text-strong placeholder:text-corp-gray-400 outline-none transition-[color,box-shadow] hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-3 focus-visible:ring-brand-100/70"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end md:pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500 md:min-w-32 md:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 md:min-w-40 md:w-auto"
            >
              Guardar candidato
            </Button>
          </div>
        </form>
      </CardContent>

      <ModalCancelar
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
      />
    </Card>
  );
};
