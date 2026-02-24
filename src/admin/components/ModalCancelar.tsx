import { Button } from "@/components/ui/button";

type ModalCancelarProps = {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const ModalCancelar = ({
  isOpen,
  title = "¿Salir sin guardar?",
  description = "Tienes cambios sin guardar. Si continúas, se perderán.",
  confirmText = "Sí, salir",
  cancelText = "Cancelar",
  onConfirm,
  onClose,
}: ModalCancelarProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-modal-title"
        aria-describedby="cancel-modal-description"
        className="bg-background w-full max-w-md rounded-lg border p-6 shadow-lg"
      >
        <h3 id="cancel-modal-title" className="text-lg font-semibold">
          {title}
        </h3>
        <p
          id="cancel-modal-description"
          className="text-muted-foreground mt-2 text-sm"
        >
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
