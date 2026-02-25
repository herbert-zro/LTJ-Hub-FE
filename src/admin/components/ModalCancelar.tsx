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
        className="w-full max-w-md rounded-lg border border-corp-gray-200 bg-surface-card p-6 shadow-lg"
      >
        <h3
          id="cancel-modal-title"
          className="text-lg font-semibold text-text-strong"
        >
          {title}
        </h3>
        <p
          id="cancel-modal-description"
          className="mt-2 text-sm text-corp-gray-500"
        >
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500 sm:w-auto"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            className="w-full border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-100 sm:w-auto"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
