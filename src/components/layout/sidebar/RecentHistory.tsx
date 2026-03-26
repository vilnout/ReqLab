import { MethodBadge } from "@/components/request/MethodSelector";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { useRequestStore } from "@/stores/requestStore";
import type { HistoryEntry } from "@/types";
import { Clock } from "lucide-react";

interface RecentHistoryProps {
  onNavigate?: () => void;
}

export const RecentHistory = ({ onNavigate }: RecentHistoryProps) => {
  const history = useRequestStore((s) => s.history);
  const clearHistory = useRequestStore((s) => s.clearHistory);
  const loadRequest = useRequestStore((s) => s.loadRequest);

  const getDisplayName = (entry: HistoryEntry) => {
    try {
      return new URL(entry.config.url).pathname;
    } catch {
      return entry.config.url;
    }
  };
  return (
    <div className="border-border-default mb-5 flex max-h-60 shrink-0 flex-col border-t">
      <div className="group flex shrink-0 items-center justify-between px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <Clock size={11} strokeWidth={2} className="text-text-ghost" />
          <span className="text-text-ghost font-mono text-sm font-semibold tracking-widest uppercase">
            Recent
          </span>
        </div>
        {history.length > 0 && (
          <DeleteButton onDelete={clearHistory} size={15} />
        )}
      </div>

      <div className="overflow-y-auto pb-2">
        {history.length === 0 && (
          <p className="px-3.5 pb-2 font-mono text-xs text-white">
            No requests yet
          </p>
        )}
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => {
              loadRequest(entry.config);
              onNavigate?.();
            }}
            className="hover:bg-surface-raised group flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 transition-colors"
          >
            <MethodBadge method={entry.config.method} size="sm" />
            <span className="text-text-ghost group-hover:text-text-muted min-w-0 flex-1 truncate text-left font-mono text-xs transition-colors">
              {getDisplayName(entry)}
            </span>
            {entry.response && (
              <span
                className={`shrink-0 font-mono text-[9px] ${entry.response.status < 400 ? "text-status-success" : "text-status-error"} `}
              >
                {entry.response.status}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
