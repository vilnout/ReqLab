import { useRequestStore } from "@/stores/requestStore";
import type { BodyType, HttpMethod } from "@/types";
import { AlertCircle, WrapText } from "lucide-react";
import React, { useState } from "react";

const METHODS_WITH_BODY: HttpMethod[] = ["POST", "PUT", "PATCH"];

const BODY_TYPES: { value: BodyType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "json", label: "JSON" },
  { value: "form-data", label: "Form Data" },
  { value: "x-www-form-urlencoded", label: "URL Encoded" },
];

export const BodyEditor = () => {
  const method = useRequestStore((s) => s.method);
  const bodyType = useRequestStore((s) => s.bodyType);
  const bodyContent = useRequestStore((s) => s.bodyContent);
  const setBodyType = useRequestStore((s) => s.setBodyType);
  const setBodyContent = useRequestStore((s) => s.setBodyContent);

  const [jsonError, setJsonError] = useState<string | null>(null);
  const isDisabled = !METHODS_WITH_BODY.includes(method);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(bodyContent);
      setBodyContent(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch {
      setJsonError("Invalid JSON - cannot format");
    }
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const target = e.currentTarget;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const newContent =
      bodyContent.substring(0, start) + "  " + bodyContent.substring(end);
    setBodyContent(newContent);
    requestAnimationFrame(() => {
      target.selectionStart = start + 2;
      target.selectionEnd = start + 2;
    });
  };
  const handleBodyTypeChange = (type: BodyType) => {
    setBodyType(type);
    setJsonError(null);
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-1">
        {BODY_TYPES.map(({ value, label }) => {
          const isActive = bodyType === value;
          return (
            <button
              className={`rounded border px-3 py-1 font-mono text-[11px] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${isActive ? "bg-accent-dim border-accent text-accent" : "border-border-default text-text-ghost hover:text-text-muted hover:border-border-subtle bg-transparent"}`}
              key={value}
              onClick={() => handleBodyTypeChange(value)}
              disabled={isDisabled}
            >
              {label}
            </button>
          );
        })}
      </div>
      {isDisabled && (
        <p className="text-text-ghost flex items-center justify-center gap-1.5 font-mono text-lg">
          <AlertCircle size={11} strokeWidth={2} />
          Body is not available for {method} requests
        </p>
      )}
      {!isDisabled && bodyType === "json" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-text-ghost font-mono text-[10px] tracking-widest uppercase">
              Request Body - JSON
            </span>
            <button
              onClick={handleFormat}
              className="border-border-default text-text-ghost hover:text-text-muted hover:border-border-subtle flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[10px] transition-colors"
            >
              <WrapText size={11} strokeWidth={2} />
              Format
            </button>
          </div>

          <textarea
            value={bodyContent}
            onChange={(e) => {
              setBodyContent(e.target.value);
              setJsonError(null);
            }}
            onKeyDown={handleTabKey}
            placeholder={`{\n "key": "value"\n}`}
            spellCheck={false}
            rows={10}
            className={`bg-surface-overlay w-full rounded border ${jsonError ? "border-status-error" : "border-border-default"} text-text-secondary placeholder:text-text-ghost focus:border-accent resize-y px-4 py-3 font-mono text-[12.5px] leading-relaxed transition-all outline-none focus:shadow-[0_0_0_2px_rgba(249,115,22,0.08)]`}
          />
          {jsonError && (
            <p className="text-status-error flex items-center gap-1.5 font-mono text-[11px]">
              <AlertCircle size={11} strokeWidth={2} /> {jsonError}
            </p>
          )}
        </div>
      )}
      {!isDisabled &&
        (bodyType === "form-data" || bodyType === "x-www-form-urlencoded") && (
          <div className="bg-surface-raised border-border-default flex items-start gap-2.5 rounded border p-3">
            <AlertCircle
              size={13}
              strokeWidth={2}
              className="text-text-ghost mt-px shrink-0"
            />
            <div className="text-text-ghost font-mono text-[11px] leading-relaxed">
              <span className="text-text-muted">{bodyType}</span> encoding is
              not yet supported.
              <br />
              Use <span className="text-accent">JSON</span> for structured data
              or <span className="text-accent">None</span> to skip the body.
            </div>
          </div>
        )}

      {!isDisabled && bodyType === "none" && (
        <p className="text-text-ghost font-mono text-[13px]">
          No body will be sent with this request.
        </p>
      )}
    </div>
  );
};
