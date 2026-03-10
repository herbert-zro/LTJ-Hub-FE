import { SidebarBrandHeader } from "@/shared/components/shell/SidebarBrandHeader";
import { CandidateNavContent } from "@/candidato-externo/components/CandidateNavContent";

interface CandidateSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const CandidateSidebar: React.FC<CandidateSidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  return (
    <aside
      className={`hidden md:flex bg-white border-r border-gray-200 transition-all duration-400 ease-in-out ${
        isCollapsed ? "w-18" : "w-57"
      } flex-col`}
    >
      <SidebarBrandHeader
        showTitle={!isCollapsed}
        onToggle={onToggle}
        isCollapsed={isCollapsed}
        title="Portal Candidatos"
      />

      <CandidateNavContent collapsed={isCollapsed} />
    </aside>
  );
};
