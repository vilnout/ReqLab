import { useRequestStore } from "@/stores/requestStore";
import type { RequestPanel } from "@/types";

interface TabConfig {
  id: RequestPanel;
  label: string;
  badge?: (
    state: ReturnType<typeof useRequestStore.getState>,
  ) => string | number | null;
}

const TABS: TabConfig[] = [
  {
    id: "params",
    label: "Params",
    badge: (s) => {
      const count = s.params.filter(
        (p) => p.enabled && p.key.trim() !== "",
      ).length;
      return count > 0 ? count : null;
    },
  },
  {
    id: "headers",
    label: "Headers",
    badge: (s) => {
      const count = s.headers.filter(
        (h) => h.enabled && h.key.trim() !== "",
      ).length;
      return count > 0 ? count : null;
    },
  },
  {
    id: "body",
    label: "Body",
    badge: (s) => (s.bodyType !== "none" ? s.bodyType.toUpperCase() : null),
  },
  {
    id: "auth",
    label: "Auth",
    badge: () => null,
  },
];

export const RequestTabs = () => {
  const activeTab = useRequestStore((s) => s.activeTab);
  const setActiveTab = useRequestStore((s) => s.setActiveTab);

  const storeState = useRequestStore((s) => s);

  return (
    <div className="border-border-default flex shrink-0 items-center gap-1 border-b px-4">
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        const badge = tab.badge?.(storeState) ?? null;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`-mb-px flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 font-sans text-[12px] transition-colors ${isActive ? "text-accent border-accent" : "text-text-ghost hover:text-text-muted hover:border-text-muted border-transparent hover:border-b-2"}`}
          >
            {tab.label}
            {badge !== null && (
              <span
                className={`rounded px-1.5 py-px font-mono text-[10px] ${isActive ? "bg-accent-dim text-accent" : "bg-surface-raised text-text-subtle"}`}
              >
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
