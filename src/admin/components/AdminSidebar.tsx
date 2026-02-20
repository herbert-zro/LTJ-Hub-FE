import React from "react";
import { NavContent } from "./NavContent";
import { HeaderBlock } from "./HeaderBlock";

interface SidebarProps {
  isCollapsed: boolean; // SOLO desktop
  onToggle: () => void; // SOLO desktop
}

export const AdminSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  return (
    <div
      className={`hidden md:flex bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-18" : "w-64"
      } flex-col`}
    >
      <HeaderBlock
        showTitle={!isCollapsed}
        onClickToggle={onToggle}
        collapsedIcon={isCollapsed}
      />

      <NavContent collapsed={isCollapsed} />
    </div>
  );
};
