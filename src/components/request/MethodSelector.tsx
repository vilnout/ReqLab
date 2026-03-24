import { HTTP_METHODS } from "@/config/http";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRequestStore } from "@/stores/requestStore";
import type { HttpMethod } from "@/types";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const METHOD_STYLES: Record<HttpMethod, { bg: string; text: string }> = {
  GET: { bg: "bg-status-success-bg", text: "text-status-success" },
  POST: { bg: "bg-accent-dim", text: "text-accent" },
  PUT: { bg: "bg-status-warning-bg", text: "text-status-warning" },
  PATCH: { bg: "bg-[#0d1f3b]", text: "text-[#58a6ff]" },
  DELETE: { bg: "bg-status-error-bg", text: "text-status-error" },
};

interface MethodBadgeProps {
  method: HttpMethod;
  size?: "sm" | "md";
}

export const MethodBadge = ({ method, size = "md" }: MethodBadgeProps) => {
  const { bg, text } = METHOD_STYLES[method];
  return (
    <span
      className={`rounded font-mono font-semibold ${bg} ${text} ${size === "md" ? "px-1.5 py-0.5 text-[11px]" : "px-1 py-px text-[9px]"}`}
    >
      {method}
    </span>
  );
};

export const MethodSelector = () => {
  const [open, setOpen] = useState(false);
  const method = useRequestStore((s) => s.getActiveTab().config.method);
  const setMethod = useRequestStore((s) => s.setMethod);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (m: HttpMethod) => {
    setMethod(m);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-surface-raised border-border-default hover:border-border-subtle flex h-9 items-center gap-2 rounded border px-3 transition-colors"
      >
        <MethodBadge method={method} />
        <ChevronDown
          size={12}
          strokeWidth={2}
          className={`text-text-ghost transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="bg-surface-raised border-border-default absolute top-full left-0 z-50 mt-1 min-w-22.5 overflow-hidden rounded border shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          {HTTP_METHODS.map((m) => (
            <button
              key={m}
              onClick={() => handleSelect(m)}
              className={`hover:bg-surface-overlay flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors ${m === method ? "bg-surface-overlay" : ""}`}
            >
              <MethodBadge method={m} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
