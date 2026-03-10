import { AppLogo } from "@/shared/components/AppLogo";
import { ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CandidateNavContent } from "@/candidato-externo/components/CandidateNavContent";

export const CandidateMobileSidebarTrigger = () => {
  return (
    <div className="md:hidden border-r border-gray-200 bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="h-18 px-4 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Abrir menu"
          >
            <ChevronRight size={20} />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-screen p-0">
          <div className="bg-white border-b border-gray-200 h-18 flex items-center justify-center px-4">
            <AppLogo alt="Portal Candidatos" />
          </div>

          <div className="bg-white h-full flex flex-col">
            <CandidateNavContent collapsed={false} isMobile />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
