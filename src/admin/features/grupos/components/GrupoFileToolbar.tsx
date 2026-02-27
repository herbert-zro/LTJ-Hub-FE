import { FileSpreadsheet, FileText, FileType } from "lucide-react";

import { Button } from "@/components/ui/button";

type GrupoFileToolbarProps = {
  onPdfClick?: () => void;
  onExcelClick?: () => void;
  onWordClick?: () => void;
};

export const GrupoFileToolbar = ({
  onPdfClick,
  onExcelClick,
  onWordClick,
}: GrupoFileToolbarProps) => {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-corp-gray-200 bg-surface-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-center text-sm text-corp-gray-600 sm:text-left">
        Exporta el listado del grupo en el formato que necesites.
      </p>

      <div className="flex w-full items-center justify-around gap-2 sm:w-auto sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-amber-300 bg-surface-card text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          onClick={onPdfClick}
          aria-label="Exportar PDF"
        >
          <FileText className="h-4 w-4" />
          PDF
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-emerald-300 bg-surface-card text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white"
          onClick={onExcelClick}
          aria-label="Exportar Excel"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Excel
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-blue-300 bg-surface-card text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
          onClick={onWordClick}
          aria-label="Exportar Word"
        >
          <FileType className="h-4 w-4" />
          Word
        </Button>
      </div>
    </div>
  );
};
