import { History, Plus, Settings } from "lucide-react";

export const TopBar = () => {
  return (
    <header className="bg-surface-overlay h-11 flex shrink-0 items-center gap-3 px-4 border-b border-border-default">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
        <span className="font-mono text-[13px] font-semibold text-text-primary tracking-widest">
          REQLAB
        </span>
      </div>

      <div className="w-px h-5 bg-border-default" />

      <div className="flex items-center gap-1 flex-1">
        <div className="text-text-primary flex items-center gap-1.5 px-3 py-1 rounded bg-surface-raised">
          <span className="font-mono text-[10px] font-semibold px-1 rounded bg-status-success-bg text-status-success">
            GET
          </span>
          <span className="font-mono text-[12px] text-text-muted">
            NEW Request
          </span>
        </div>
        <button className="topbar-buttons">
          <Plus size={15} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="topbar-buttons" title="History">
          <History size={15} />
        </button>
        <button className="topbar-buttons" title="Settings">
          <Settings size={15} />
        </button>
      </div>
    </header>
  );
};
