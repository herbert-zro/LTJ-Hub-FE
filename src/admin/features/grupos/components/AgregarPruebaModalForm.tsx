import { useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const PRUEBAS_OPTIONS = [
  "TCG",
  "CI - VERSION D",
  "CI - VERSION O",
  "CI - VERSION B",
  "AUTO",
  "TP1",
  "TP2",
] as const;

type AgregarPruebaModalFormProps = {
  onRequestClose?: () => void;
};

export const AgregarPruebaModalForm = ({
  onRequestClose,
}: AgregarPruebaModalFormProps) => {
  const [selectedPruebas, setSelectedPruebas] = useState<string[]>([]);

  const canSubmit = useMemo(
    () => selectedPruebas.length > 0,
    [selectedPruebas],
  );

  const togglePrueba = (value: string) => {
    setSelectedPruebas((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("assign tests to candidate", {
      pruebas: selectedPruebas,
    });

    onRequestClose?.();
  };

  return (
    <Card className="mx-auto w-full max-w-2xl border-corp-gray-200 bg-surface-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-text-strong md:text-2xl">
          Agregar pruebas al candidato
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-2">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-text-strong">
              Selecciona una o más pruebas
            </Label>

            <div className="flex flex-wrap gap-2">
              {PRUEBAS_OPTIONS.map((option) => {
                const isSelected = selectedPruebas.includes(option);

                return (
                  <Button
                    key={option}
                    type="button"
                    variant="outline"
                    onClick={() => togglePrueba(option)}
                    className={
                      isSelected
                        ? "cursor-pointer border-brand-500 bg-brand-100 text-brand-600 hover:bg-brand-100"
                        : "cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                    }
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end md:pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onRequestClose}
              className="cursor-pointer w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500 md:min-w-32 md:w-auto"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={!canSubmit}
              className="cursor-pointer w-full border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 md:min-w-40 md:w-auto"
            >
              Guardar pruebas
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
