import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

type ModalVistaCvProps = {
  isOpen: boolean;
  onClose: () => void;
  candidatoNombre: string;
  candidatoUsuario: string;
  pdfUrl: string;
};

export const ModalVistaCv = ({
  isOpen,
  onClose,
  candidatoNombre,
  candidatoUsuario,
  pdfUrl,
}: ModalVistaCvProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-vista-cv-title"
        className="flex h-[85vh] w-full max-w-5xl flex-col rounded-lg border border-corp-gray-200 bg-surface-card p-4 shadow-lg"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3
              id="modal-vista-cv-title"
              className="text-lg font-semibold text-text-strong"
            >
              Vista previa de Curriculum
            </h3>
            <p className="text-sm text-corp-gray-500">
              {candidatoNombre} ({candidatoUsuario})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const link = document.createElement("a");
                link.href = pdfUrl;
                link.download = `CV_${candidatoNombre}.pdf`;
                link.click();
              }}
              title="Descargar CV"
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const printWindow = window.open(pdfUrl);
                if (printWindow) {
                  printWindow.addEventListener("load", () => {
                    printWindow.print();
                  });
                }
              }}
              title="Imprimir CV"
            >
              <Printer className="h-4 w-4" />
            </Button>

            <Button type="button" variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden rounded-md border border-corp-gray-200 bg-surface-page">
          <object
            data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            type="application/pdf"
            className="h-full w-full"
          >
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-corp-gray-500">
              No se pudo visualizar el PDF en esta vista de prueba.
            </div>
          </object>
        </div>
      </div>
    </div>
  );
};
