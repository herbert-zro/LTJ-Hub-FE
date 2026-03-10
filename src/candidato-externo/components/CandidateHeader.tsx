import { Bell, Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CANDIDATE_COMPANY_OPTIONS = [
  { value: "ltj-el-salvador", label: "LTJ El Salvador" },
  { value: "nova-talent-guatemala", label: "Nova Talent Guatemala" },
  { value: "andina-people-peru", label: "Andina People Peru" },
];

export const CandidateHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 h-18">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <Select defaultValue={CANDIDATE_COMPANY_OPTIONS[0].value}>
            <SelectTrigger
              aria-label="Seleccionar empresa"
              className="w-55 max-w-full border-gray-200 bg-white text-gray-700"
            >
              <SelectValue placeholder="Selecciona una empresa" />
            </SelectTrigger>

            <SelectContent align="start" className="border-gray-200 bg-white">
              <SelectGroup>
                {CANDIDATE_COMPANY_OPTIONS.map((company) => (
                  <SelectItem key={company.value} value={company.value}>
                    {company.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notificaciones"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>

          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Configuracion"
          >
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            CE
          </div>
        </div>
      </div>
    </header>
  );
};
