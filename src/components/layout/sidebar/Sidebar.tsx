import { Collections } from "@/components/layout/sidebar/Collections";
import { RecentHistory } from "@/components/layout/sidebar/RecentHistory";

export const Sidebar = () => {
  return (
    <aside className="bg-surface-overlay border-border-default flex w-55 shrink-0 flex-col overflow-hidden border-r">
      <Collections />
      <RecentHistory />
    </aside>
  );
};
