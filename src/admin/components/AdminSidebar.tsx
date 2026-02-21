import React from "react";
import { NavContent } from "./NavContent";
import { HeaderBlock } from "./HeaderBlock";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  return (
    <div
      className={`hidden md:flex bg-white border-r border-gray-200 transition-all duration-400 ease-in-out ${
        isCollapsed ? "w-18" : "w-50"
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
