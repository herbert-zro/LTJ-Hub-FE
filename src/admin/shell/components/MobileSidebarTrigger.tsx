import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { NavContent } from "../../components/NavContent";

export const MobileSidebarTrigger: React.FC = () => {
  return (
    <div className="md:hidden border-r border-gray-200 bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="h-18 px-4 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Abrir menú"
          >
            <ChevronRight size={20} />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-screen p-0">
          <div className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
            <h1 className="text-xl font-bold text-gray-800">Admin</h1>
          </div>

          <div className="bg-white h-full flex flex-col">
            <NavContent collapsed={false} isMobile />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
