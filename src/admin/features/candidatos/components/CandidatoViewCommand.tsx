import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

type CandidatoViewCommandProps = {
  onView: () => void;
  viewLabel: string;
};

export const CandidatoViewCommand = ({
  onView,
  viewLabel,
}: CandidatoViewCommandProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
      onClick={onView}
      aria-label={viewLabel}
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
};
