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
      className="text-corp-gray-500 hover:bg-blue-100 hover:text-blue-600"
      onClick={onView}
      aria-label={viewLabel}
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
};
