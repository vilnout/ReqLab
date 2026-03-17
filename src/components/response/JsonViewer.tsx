import { tryParseJson } from "@/lib/utils";
import { darkStyles, JsonView } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

interface JsonViewerProps {
  raw: string;
}

const DEFAULT_COLLAPSE_DEPTH = 2;
const shouldExpandNode = (level: number) => level < DEFAULT_COLLAPSE_DEPTH;

export const JsonViewer = ({ raw }: JsonViewerProps) => {
  const parsed = tryParseJson(raw);

  if (parsed === null) {
    return (
      <pre className="text-text-secondary p-4 font-mono text-xs leading-relaxed wrap-break-word whitespace-pre-wrap">
        {raw || (
          <span className="text-text-ghost italic">Empty response body</span>
        )}
      </pre>
    );
  }
  if (raw.length > 100_000) {
    return (
      <div className="flex flex-col gap-3 p-4">
        <p className="text-text-ghost font-mono text-xs">
          Response is large. Showing raw text to avoid performance issues
        </p>
        <pre className="text-text-secondary max-h-[60vh] overflow-auto font-mono text-xs leading-relaxed wrap-break-word whitespace-pre-wrap">
          {raw}
        </pre>
      </div>
    );
  }
  return (
    <div className="p-4">
      <JsonView
        data={parsed as object}
        style={darkStyles}
        shouldExpandNode={shouldExpandNode}
        clickToExpandNode={true}
      />
    </div>
  );
};
