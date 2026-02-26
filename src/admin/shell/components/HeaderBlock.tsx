import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppLogo } from "@/shared/components/AppLogo";

interface HeaderBlockProps {
  showTitle: boolean;
  onClickToggle: () => void;
  collapsedIcon: boolean;
  title?: string;
}

export const HeaderBlock: React.FC<HeaderBlockProps> = ({
  showTitle,
  onClickToggle,
  collapsedIcon,
  title = "Admin",
}) => {
  return (
    <div className="relative p-4 border-b border-gray-200 flex items-center h-18">
      <div className="pointer-events-none absolute inset-x-0 flex justify-center min-w-0 overflow-hidden">
        <AppLogo
          alt={title}
          className={showTitle ? "max-w-40 opacity-100" : "max-w-0 opacity-0"}
        />
      </div>

      <button
        onClick={onClickToggle}
        className="relative z-10 ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle sidebar"
      >
        {collapsedIcon ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};
