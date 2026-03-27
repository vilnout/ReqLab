import { Shield, ShieldOff } from "lucide-react";

interface ProxyToggleProps {
  settingsOpen: boolean;
  useProxy: boolean;
  toggleProxy: () => void;
}

export const ProxyToggle = ({
  settingsOpen,
  useProxy,
  toggleProxy,
}: ProxyToggleProps) => {
  if (!settingsOpen) return;
  return (
    <div className="bg-surface-raised border-border-default absolute top-full right-0 z-50 mt-2 w-65 overflow-hidden rounded border shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
      {/* header */}
      <div className="border-border-default border-b px-4 py-3">
        <p className="text-text-ghost font-mono text-xs font-semibold tracking-widest uppercase">
          Settings
        </p>
      </div>

      {/* proxy toggle */}
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              {useProxy ? (
                <Shield
                  size={14}
                  strokeWidth={2}
                  className="text-status-success"
                />
              ) : (
                <ShieldOff
                  size={14}
                  strokeWidth={2}
                  className="text-status-error"
                />
              )}
              <span className="text-text-primary font-sans text-xs font-medium">
                Route via proxy
              </span>
            </div>
            <div className="min-h-15">
              <p className="text-text-ghost font-mono text-xs leading-relaxed">
                {useProxy
                  ? "Requests are sent server-side. Handles CORS for all APIs."
                  : "Requests are sent directly from the browser. Maybe be blocked by CORS."}
              </p>
            </div>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={toggleProxy}
          className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${useProxy ? "bg-accent" : "bg-border-subtle"} `}
        >
          <div
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-150 ${useProxy ? "translate-x-4" : "translate-x-0.5"} `}
          />
        </button>
      </div>

      {/* footer note */}
      <div className="border-border-default bg-surface-overlay border-t px-4 py-2.5">
        <p className="text-text-ghost font-mono text-xs leading-relaxed">
          Proxy runs on Vercel serverless.{" "}
          <span className="text-[#30363d]">
            Disable to test direct browser requests.
          </span>
        </p>
      </div>
    </div>
  );
};
