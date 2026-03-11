import { MethodSelector } from "@/components/request/MethodSelector";
import { useExecuteRequest } from "@/hooks/useExecuteRequest";
import { useRequestStore } from "@/stores/requestStore";
import { Loader2, Send } from "lucide-react";
import React, { useEffect, useRef } from "react";

export const UrlBar = () => {
  const url = useRequestStore((s) => s.url);
  const setUrl = useRequestStore((s) => s.setUrl);
  const getRequestConfig = useRequestStore((s) => s.getRequestConfig);
  const setLastResponse = useRequestStore((s) => s.setLastResponse);
  const addHistoryEntry = useRequestStore((s) => s.addHistoryEntry);

  const { execute, loading } = useExecuteRequest();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const config = getRequestConfig();
    execute(config, (response) => {
      setLastResponse(response);
      addHistoryEntry({ config, response });
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  return (
    <div className="border-border-default flex shrink-0 items-center gap-2 border-b px-4 py-3">
      <MethodSelector />
      <input
        ref={inputRef}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter URL"
        spellCheck={false}
        className="bg-surface-raised border-border-default text-text-primary placeholder:text-text-ghost focus:border-accent h-9 flex-1 rounded border px-3 font-mono text-[13px] transition-all outline-none focus:shadow-[0_0_0_2px_rgba(249,115,22,0.12)]"
      />
      <button
        onClick={handleSend}
        disabled={loading || !url.trim()}
        className="bg-accent hover:bg-accent-hover flex h-9 cursor-pointer items-center gap-2 rounded px-5 font-sans text-[13px] font-semibold text-white shadow-[0_0_12px_rgba(249,115,22,0.25)] transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        {loading ? (
          <Loader2 size={14} strokeWidth={2} className="animate-spin" />
        ) : (
          <Send size={14} strokeWidth={2} />
        )}
        {loading ? "Sending" : "Send"}
      </button>
    </div>
  );
};
