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
    <div className="flex justify-around">
      {onViewDetails && viewDetailsLabel ? (
        <Button
          variant="ghost"
          size="icon"
          className="text-corp-gray-500 hover:bg-brand-100 hover:text-brand-500"
          onClick={onViewDetails}
          aria-label={viewDetailsLabel}
        >
          <CircleEllipsis className="h-4 w-4" />
        </Button>
      ) : null}
      <Button
        variant="ghost"
        size="icon"
        className="text-corp-gray-500 hover:bg-brand-100 hover:text-brand-500"
        onClick={onEdit}
        aria-label={editLabel}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-corp-gray-500 hover:bg-destructive/10 hover:text-destructive"
        onClick={onDelete}
        aria-label={deleteLabel}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
