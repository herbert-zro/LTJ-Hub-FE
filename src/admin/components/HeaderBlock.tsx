import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="p-4 border-b border-gray-200 flex items-center justify-between h-18">
      <div className="flex-1 min-w-0 overflow-hidden">
        <h1
          className={`text-xl font-bold text-gray-800 whitespace-nowrap transition-all ${
            showTitle
              ? "max-w-40 opacity-100 translate-x-0 duration-300 ease-out"
              : "max-w-0 opacity-0 -translate-x-1 duration-200 ease-in"
          }`}
        >
          {title}
        </h1>
      </div>

      <button
        onClick={onClickToggle}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle sidebar"
      >
        {collapsedIcon ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};
