import { useRequestStore } from "@/stores/requestStore";
import type { RequestParam } from "@/types";
import { Plus, X } from "lucide-react";
import { useRef } from "react";

type validEditorTabs = "params" | "headers";

interface KeyValueEditorProps {
  type: validEditorTabs;
}

const useEditorActions = (type: validEditorTabs) => {
  const addParam = useRequestStore((s) => s.addParam);
  const updateParam = useRequestStore((s) => s.updateParam);
  const deleteParam = useRequestStore((s) => s.deleteParam);
  const addHeader = useRequestStore((s) => s.addHeader);
  const updateHeader = useRequestStore((s) => s.updateHeader);
  const deleteHeader = useRequestStore((s) => s.deleteHeader);

  return type === "params"
    ? { add: addParam, update: updateParam, delete: deleteParam }
    : { add: addHeader, update: updateHeader, delete: deleteHeader };
};

const baseEditorInputStyle =
  "border-border-default text-text-secondary placeholder:text-text-ghost focus:bg-surface-raised border-r bg-transparent px-3 py-2 font-mono text-[12px] transition-colors outline-none";

interface RowProps {
  row: RequestParam;
  isLast: boolean;
  keyRefCallback: (el: HTMLInputElement | null) => void;
  onUpdate: (
    id: string,
    field: keyof Omit<RequestParam, "id">,
    value: string | boolean,
  ) => void;
  onDelete: (id: string) => void;
  onAddRow: (focus: boolean) => void;
}

const KeyValueRow = ({
  row,
  isLast,
  keyRefCallback,
  onUpdate,
  onDelete,
  onAddRow,
}: RowProps) => {
  const handleValueKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && !e.shiftKey && isLast) {
      e.preventDefault();
      onAddRow(true);
    }
  };
  const handleChange = (id: string, key: "key" | "value", value: string) => {
    if (isLast) {
      onAddRow(false);
    }
    onUpdate(id, key, value);
  };

  return (
    <div
      className={`border-border-default group flex flex-col border-b last:border-b-0 md:grid md:grid-cols-[28px_1fr_1fr_28px] ${!row.enabled ? "opacity-40" : ""}`}
    >
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={row.enabled}
          onChange={(e) => onUpdate(row.id, "enabled", e.target.checked)}
          className="accent-accent hidden h-3 w-3 cursor-pointer md:flex"
        />
      </div>

      <input
        ref={keyRefCallback}
        value={row.key}
        onChange={(e) => handleChange(row.id, "key", e.target.value)}
        placeholder="key"
        spellCheck={false}
        className={baseEditorInputStyle}
      />
      <input
        value={row.value}
        onChange={(e) => handleChange(row.id, "value", e.target.value)}
        onKeyDown={handleValueKeyDown}
        placeholder="value"
        spellCheck={false}
        className={baseEditorInputStyle}
      />
      <button
        onClick={() => onDelete(row.id)}
        className="group-hover:text-text-ghost hover:text-status-error! hidden items-center justify-center text-transparent transition-colors md:flex"
      >
        <X size={12} strokeWidth={2} />
      </button>
    </div>
  );
};

export const KeyValueEditor = ({ type }: KeyValueEditorProps) => {
  const rows = useRequestStore((s) =>
    type === "params"
      ? s.getActiveTab().config.params
      : s.getActiveTab().config.headers,
  );
  const actions = useEditorActions(type);

  const keyInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const handleAdd = (focus: boolean) => {
    actions.add();
    if (focus) {
      requestAnimationFrame(() => {
        const inputs = Array.from(keyInputRefs.current.values());
        inputs[inputs.length - 1]?.focus();
      });
    }
  };
  return (
    <div className="p-4">
      <div className="border-border-default overflow-hidden rounded border">
        <div className="bg-surface-overlay border-border-default hidden grid-cols-[28px_1fr_1fr_28px] border-b md:grid">
          <div />
          {["Key", "Value"].map((label) => (
            <div
              key={label}
              className="text-text-ghost px-3 py-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase"
            >
              {label}
            </div>
          ))}
          <div />
        </div>
        {rows.map((row, index) => (
          <KeyValueRow
            key={row.id}
            row={row}
            isLast={index === rows.length - 1}
            keyRefCallback={(el) => {
              if (el) {
                keyInputRefs.current.set(row.id, el);
              } else {
                keyInputRefs.current.delete(row.id);
              }
            }}
            onUpdate={actions.update}
            onDelete={actions.delete}
            onAddRow={handleAdd}
          />
        ))}
        <button
          onClick={() => handleAdd(true)}
          className="text-text-ghost hover:text-accent hover:bg-surface-raised flex w-full items-center gap-2 px-3 py-2 font-mono text-[11px] transition-colors"
        >
          <Plus size={11} strokeWidth={2} />
          Add {type === "params" ? "parameter" : "header"}
        </button>
      </div>
    </div>
  );
};
