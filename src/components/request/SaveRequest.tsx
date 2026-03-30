import { useClickOutside } from "@/hooks/useClickOutside";
import { useRequestStore } from "@/stores/requestStore";
import { Bookmark, Check, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

export const SaveRequest = () => {
  const collections = useRequestStore((s) => s.collections);
  const saveToCollection = useRequestStore((s) => s.saveToCollection);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [requestName, setRequestName] = useState("");
  const [saved, setSaved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (collections.length === 0) return;
    setSelectedId(collections[0].id);
    setOpen(true);
  };

  const handleSave = () => {
    if (!selectedId || !requestName.trim()) return;
    saveToCollection(selectedId, requestName.trim());
    setSaved(true);
    setOpen(false);
    setRequestName("");
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  useClickOutside(ref, () => setOpen(false));

  if (collections.length === 0) return;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        className={`border-border-default flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded border px-2.5 font-mono text-xs transition-colors ${
          saved
            ? "text-status-success border-status-success-bg"
            : "text-text-ghost hover:text-text-muted hover:border-border-subtle"
        } `}
      >
        {saved ? (
          <>
            <Check size={11} strokeWidth={2} className="text-status-success" />
            Saved
          </>
        ) : (
          <>
            <Bookmark size={11} strokeWidth={2} />
            Save
          </>
        )}
      </button>
      {open && (
        <div className="bg-surface-base border-border-default absolute top-full right-0 z-50 mt-1 flex w-55 flex-col gap-2 rounded border p-3 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <p className="text-text-ghost font-mono text-xs tracking-widest uppercase">
            Save to collection
          </p>
          {/*Request name */}
          <input
            autoFocus
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Request name"
            className="bg-surface-overlay border-border-default text-text-primary placeholder:text-text-ghost focus:border-accent rounded border px-2.5 py-1.5 font-mono text-xs transition-colors outline-none"
          />
          <div className="relative">
            <select
              value={selectedId ?? ""}
              onChange={(e) => setSelectedId(e.target.value)}
              className="bg-surface-overlay border-border-default text-text-primary focus:border-accent w-full cursor-pointer appearance-none rounded border px-2.5 py-1.5 font-mono text-xs transition-colors outline-none"
            >
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={11}
              strokeWidth={2}
              className="text-text-ghost pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={!requestName.trim()}
            className="bg-accent hover:bg-accent-hover cursor-pointer rounded py-1.5 font-mono text-xs text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save request
          </button>
        </div>
      )}
    </div>
  );
};
