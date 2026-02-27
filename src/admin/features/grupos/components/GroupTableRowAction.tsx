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
  onView,
  onOperationalReport,
  onDiscResult,
  onEmail,
  viewLabel,
  operationalReportLabel,
  discResultLabel,
  emailLabel,
}: GroupTableRowActionProps) => {
  return (
    <div className="flex justify-around gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="bg-emerald-100 text-emerald-700 transition-none hover:bg-emerald-100 hover:text-emerald-700"
        onClick={onOperationalReport}
        aria-label={operationalReportLabel}
      >
        <FileSpreadsheet className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="bg-violet-100 text-violet-700 transition-none hover:bg-violet-100 hover:text-violet-700"
        onClick={onDiscResult}
        aria-label={discResultLabel}
      >
        <PieChart className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="bg-amber-100 text-amber-700 transition-none hover:bg-amber-100 hover:text-amber-700"
        onClick={onEmail}
        aria-label={emailLabel}
      >
        <Mail className="h-4 w-4" />
      </Button>
    </div>
  );
};
