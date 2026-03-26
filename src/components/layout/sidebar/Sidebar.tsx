import { Collections } from "@/components/layout/sidebar/Collections";
import { RecentHistory } from "@/components/layout/sidebar/RecentHistory";

interface SidebarProps {
  onNavigate?: () => void;
}

export const Sidebar = ({ onNavigate }: SidebarProps) => {
  return (
    <aside className="bg-surface-overlay border-border-default flex w-55 shrink-0 flex-col overflow-hidden border-r">
      <Collections onNavigate={onNavigate} />
      <RecentHistory onNavigate={onNavigate} />
    </aside>
  );
};
