import { Eye, FileSpreadsheet, Mail, PieChart } from "lucide-react";

import { Button } from "@/components/ui/button";

type GroupTableRowActionProps = {
  onView: () => void;
  onOperationalReport: () => void;
  onDiscResult: () => void;
  onEmail: () => void;
  viewLabel: string;
  operationalReportLabel: string;
  discResultLabel: string;
  emailLabel: string;
};

export const GroupTableRowAction = ({
  onOperationalReport,
  onDiscResult,
  onEmail,

  operationalReportLabel,
  discResultLabel,
  emailLabel,
}: GroupTableRowActionProps) => {
  return (
    <div className="flex justify-around gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer bg-emerald-100 text-emerald-700 transition-colors hover:bg-emerald-300 hover:text-emerald-800"
        onClick={onOperationalReport}
        aria-label={operationalReportLabel}
      >
        <FileSpreadsheet className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer bg-violet-100 text-violet-700 transition-colors hover:bg-violet-300 hover:text-violet-800"
        onClick={onDiscResult}
        aria-label={discResultLabel}
      >
        <PieChart className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer bg-amber-100 text-amber-700 transition-colors hover:bg-amber-300 hover:text-amber-800"
        onClick={onEmail}
        aria-label={emailLabel}
      >
        <Mail className="h-4 w-4" />
      </Button>
    </div>
  );
};
