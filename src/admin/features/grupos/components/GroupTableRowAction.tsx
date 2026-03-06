import { CircleUserRound, Eye, FileSpreadsheet, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

type GroupTableRowActionProps = {
  onView: () => void;
  onOperationalReport: () => void;
  onCandidateProfile: () => void;
  onEmail: () => void;
  viewLabel: string;
  operationalReportLabel: string;
  candidateProfileLabel: string;
  emailLabel: string;
};

export const GroupTableRowAction = ({
  onView,
  onOperationalReport,
  onCandidateProfile,
  onEmail,

  viewLabel,
  operationalReportLabel,
  candidateProfileLabel,
  emailLabel,
}: GroupTableRowActionProps) => {
  return (
    <div className="flex justify-around gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer bg-sky-100 text-sky-700 transition-colors hover:bg-sky-300 hover:text-sky-800"
        onClick={onView}
        aria-label={viewLabel}
        title="Candidato Prevista"
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer bg-emerald-100 text-emerald-700 transition-colors hover:bg-emerald-300 hover:text-emerald-800"
        onClick={onOperationalReport}
        aria-label={operationalReportLabel}
        title="Evaluaciones"
      >
        <FileSpreadsheet className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer bg-violet-100 text-violet-700 transition-colors hover:bg-violet-300 hover:text-violet-800"
        onClick={onCandidateProfile}
        aria-label={candidateProfileLabel}
        title="Perfil de Candidato"
      >
        <CircleUserRound className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer bg-amber-100 text-amber-700 transition-colors hover:bg-amber-300 hover:text-amber-800"
        onClick={onEmail}
        aria-label={emailLabel}
        title="Enviar pruebas"
      >
        <Mail className="h-4 w-4" />
      </Button>
    </div>
  );
};
