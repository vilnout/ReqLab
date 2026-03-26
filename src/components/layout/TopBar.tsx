import { MethodBadge } from "@/components/request/MethodSelector";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { useRequestStore } from "@/stores/requestStore";
import { History, Plus, Settings, X } from "lucide-react";

export const TopBar = () => {
  const tabs = useRequestStore((s) => s.tabs);
  const activeTabId = useRequestStore((s) => s.activeTabId);
  const addTab = useRequestStore((s) => s.addTab);
  const closeTab = useRequestStore((s) => s.closeTab);
  const setActiveTab = useRequestStore((s) => s.setActiveTab);
  return (
    <header className="bg-surface-overlay border-border-default flex h-11 shrink-0 items-center gap-1 border-b px-1 md:gap-3 md:px-4">
      <div className="border-border-default flex h-full shrink-0 items-center border-r px-4 md:w-51">
        <SiteLogo />
      </div>

      <div className="flex h-full flex-1 items-center gap-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group border-border-default flex h-full max-w-45 min-w-0 shrink-0 cursor-pointer items-center gap-2 border-r px-3 transition-colors ${isActive ? "bg-surface-base border-b-accent -mb-px flex border-b-2" : "bg-surface-overlay hover:bg-surface-raised hidden md:flex"}`}
            >
              <MethodBadge method={tab.config.method} size="sm" />
              <span className="text-text-muted min-w-0 flex-1 truncate font-mono text-xs">
                {tab.label}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="text-text-ghost hover:text-text-primary hover:bg-surface-raised shrink-0 cursor-pointer rounded p-0.5 opacity-0 transition-all group-hover:opacity-100"
              >
                <X size={12} strokeWidth={2} />
              </button>
            </div>
          );
        })}
        <button
          onClick={addTab}
          className="text-text-ghost hover:text-accent hover:bg-surface-raised flex h-full w-9 shrink-0 cursor-pointer items-center justify-center transition-colors"
        >
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="topbar-buttons" title="History">
          <History size={15} strokeWidth={2} />
        </button>
        <button className="topbar-buttons" title="Settings">
          <Settings size={15} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};
