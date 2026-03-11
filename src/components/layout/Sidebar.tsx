import { Plus } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-[220px] flex flex-col shrink-0 bg-surface-overlay border-r border-border-default overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-3">
        <span className="font-mono text-[10px] font-semibold tracking-widest uppercase text-text-ghost">
          Collections
        </span>
        <button className=" text-text-ghost hover:text-accent hover:bg-surface-raised rounded p-1 text-base leading-none transition-colors">
          <Plus size={15} />
        </button>
      </div>
      <div className="px-3.5 py-2 font-mono text-[11px] text-text-ghost leading-relaxed">
        No collections yet.
        <br />
        <span className="text-white flex gap-2">
          Hit <Plus size={15} /> to create one.
        </span>
      </div>
      <div className="flex-1" />
      <div className="px-3.5 py-2 font-mono text-[10px] font-semibold tracking-widest uppercase text-text-ghost border-t border-border-default">
        Recent
      </div>
      <div className="px-3.5 py-2 pb-4 font-mono text-[11px] text-white">
        No requests yet.
      </div>
    </aside>
  );
};
