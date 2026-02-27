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
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-corp-gray-200 bg-surface-card p-4 sm:flex-row sm:items-center sm:justify-end">
      <div className="flex w-full items-center justify-around gap-2 sm:w-auto sm:justify-start">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-red-300 bg-surface-card text-red-600 transition-colors hover:bg-red-600 hover:text-white"
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
