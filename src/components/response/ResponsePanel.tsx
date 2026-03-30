import { JsonViewer } from "@/components/response/JsonViewer";
import { useExecuteRequest } from "@/hooks/useExecuteRequest";
import { formatBytes, formatTiming, getStatusMeta } from "@/lib/utils";
import { useRequestStore } from "@/stores/requestStore";
import { AlertCircle, Check, Copy, RotateCcw, SendIcon } from "lucide-react";
import { useState } from "react";

const RESPONSE_TABS = ["pretty", "raw", "headers"] as const;

type ResponseTab = (typeof RESPONSE_TABS)[number];

export const ResponsePanel = () => {
  const lastResponse = useRequestStore((s) => s.getActiveTab().lastResponse);
  const isLoading = useRequestStore((s) => s.getActiveTab().isLoading);
  const lastError = useRequestStore((s) => s.getActiveTab().lastError);

  const getRequestConfig = useRequestStore((s) => s.getRequestConfig);
  const setLastError = useRequestStore((s) => s.setLastError);
  const setIsLoading = useRequestStore((s) => s.setIsLoading);
  const setLastResponse = useRequestStore((s) => s.setLastResponse);
  const addHistoryEntry = useRequestStore((s) => s.addHistoryEntry);
  const { execute } = useExecuteRequest();

  const [activeTab, setActiveTab] = useState<ResponseTab>("pretty");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!lastResponse) return;
    navigator.clipboard.writeText(lastResponse.body);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleRetry = () => {
    const config = getRequestConfig();
    setLastError(null);
    setLastResponse(null);
    setIsLoading(true);
    execute(
      config,
      (response) => {
        setLastResponse(response);
        addHistoryEntry({ config, response });
        setIsLoading(false);
      },
      (error) => {
        setLastError(error);
        setIsLoading(false);
      },
    );
  };

  // Temporary loading state
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-accent h-2 w-2 rounded-full"
              style={{
                animation: "pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <p className="text-text-ghost font-mono text-sm">
          Waiting for response...
        </p>
        <style>{`
        @keyframes pulse {
        0%, 100% {opacity: 0.2; transform: scale(0.8); }
        50%      {opacity: 1; transform: scale(1)}
        }
        `}</style>
      </div>
    );
  }
  if (lastError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <div className="bg-status-error-bg flex h-10 w-10 items-center justify-center rounded-full">
          <AlertCircle
            size={18}
            strokeWidth={1.5}
            className="text-status-error"
          />
        </div>
        <p className="text-status-error font-sans text-base font-medium">
          Network Error
        </p>
        <p className="text-text-ghost max-w-sm text-center font-mono text-xs leading-relaxed">
          {lastError}
        </p>
        <button
          onClick={handleRetry}
          className="border-border-default text-text-muted hover:border-accent hover:text-accent mt-2 flex cursor-pointer items-center gap-2 rounded border px-4 py-2 font-mono text-xs transition-colors"
        >
          <RotateCcw size={11} strokeWidth={2} />
          Try again
        </button>
      </div>
    );
  }
  // Empty - Not loading and no previous response
  if (!isLoading && !lastResponse) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <div className="bg-surface-raised border-border-default text-text-ghost flex h-10 w-10 items-center justify-center rounded-full border">
          <SendIcon />
        </div>
        <p className="text-text-muted font-sans text-sm">
          Send a request to see the response
        </p>
        <p className="text-text-ghost font-mono text-xs">Cmd+Enter to send</p>
      </div>
    );
  }

  // Last reponse always available at this point
  const { status, statusText, headers, body, timingMs, size } = lastResponse!;
  const statusMeta = getStatusMeta(status);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/*Header*/}
      <div className="border-border-default grid shrink-0 items-center gap-2.5 border-b px-4 py-2.5 md:flex">
        <div className="flex min-w-0 items-center justify-between gap-1">
          <span className="text-text-ghost mr-1 shrink-0 font-mono text-xs font-semibold tracking-widest uppercase">
            Response
          </span>
          {/*status indicator*/}
          <div className="flex min-w-0 gap-1">
            <div
              className={`flex min-w-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${statusMeta.bgPrimary} ${statusMeta.text}`}
            >
              <div
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusMeta.bgSecondary}`}
              />
              <span className="shrink-0">{status}</span>
              <p className="hidden truncate md:block">{statusText}</p>
            </div>
            <div className="response-pills shrink-0">
              {formatTiming(timingMs)}
            </div>
            <div className="response-pills shrink-0">{formatBytes(size)}</div>
          </div>
        </div>
        {/*actions*/}
        <div className="flex items-center justify-between gap-1.5 md:ml-auto">
          <button
            onClick={handleCopy}
            className="border-border-default text-text-ghost hover:text-text-muted hover:border-border-subtle flex cursor-pointer items-center gap-1.5 rounded border px-2.5 py-1 text-center font-mono text-xs transition-colors"
          >
            {copied ? (
              <>
                <Check
                  size={11}
                  strokeWidth={2}
                  className="text-status-success"
                />
                Copied
              </>
            ) : (
              <>
                <Copy size={11} strokeWidth={2} />
                Copy
              </>
            )}
          </button>
          {/*view tabs */}
          <div className="flex">
            {RESPONSE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer rounded px-2.5 py-1 font-mono text-xs capitalize transition-colors ${activeTab === tab ? "bg-accent-dim text-accent" : "text-text-ghost hover:text-text-muted"} `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/*response body*/}
      <div className="scrollbar flex-1 overflow-auto">
        {activeTab === "pretty" && <JsonViewer raw={body} />}
        {activeTab === "raw" && (
          <pre className="text-text-secondary p-4 font-mono text-xs leading-relaxed wrap-break-word whitespace-pre-wrap">
            {body}
          </pre>
        )}
        {activeTab === "headers" && (
          <div className="p-4">
            <div className="border-border-default overflow-hidden rounded border">
              {Object.entries(headers).map(([key, value], i) => (
                <div
                  key={key}
                  className={`border-border-default grid grid-cols-[200px_1fr] border-b last:border-b-0 ${i % 2 === 0 ? "bg-transparent" : "bg-surface-overlay"} `}
                >
                  <div className="text-text-muted border-border-default border-r px-3 py-2 font-mono text-xs">
                    {key}
                  </div>
                  <div className="text-text-muted border-border-default border-r px-3 py-2 font-mono text-xs">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
