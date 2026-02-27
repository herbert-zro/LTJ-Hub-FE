import { CircleEllipsis, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type TableRowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  editLabel: string;
  deleteLabel: string;
  onViewDetails?: () => void;
  viewDetailsLabel?: string;
};

export const TableRowActions = ({
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
  onViewDetails,
  viewDetailsLabel,
}: TableRowActionsProps) => {
  return (
    <div className="flex items-center justify-around gap-2">
      {onViewDetails && viewDetailsLabel ? (
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer text-brand-500 bg-brand-100 hover:bg-brand-500/70 hover:text-brand-700"
          onClick={onViewDetails}
          aria-label={viewDetailsLabel}
          title="Ver detalle"
        >
          <CircleEllipsis className="h-4 w-4" />
        </Button>
      ) : null}
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer text-blue-600 bg-blue-100 hover:bg-blue-200 hover:text-blue-700"
        onClick={onEdit}
        aria-label={editLabel}
        title="Editar"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer text-destructive bg-destructive/10 hover:bg-destructive/20 hover:text-destructive"
        onClick={onDelete}
        aria-label={deleteLabel}
        title="Eliminar"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
