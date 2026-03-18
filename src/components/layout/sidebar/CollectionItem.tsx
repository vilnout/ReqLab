import type { RequestStore } from "@/stores/requestStore";
import type { Collection } from "@/types";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";

interface CollectionItemProps {
  collection: Collection;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onLoadRequest: RequestStore["loadRequest"];
}

export const CollectionItem = ({
  collection,
  isExpanded,
  onToggle,
  onDelete,
  onLoadRequest,
}: CollectionItemProps) => {
  return (
    <div>
      {/*header */}
      <div className="hover:bg-surface-raised group flex items-center gap-1 rounded px-1 py-1">
        <button
          onClick={onToggle}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5"
        >
          {isExpanded ? (
            <ChevronDown
              size={11}
              strokeWidth={2}
              className="text-text-ghost shrink-0"
            />
          ) : (
            <ChevronRight
              size={11}
              strokeWidth={2}
              className="text-text-ghost shrink-0"
            />
          )}
          {isExpanded ? (
            <FolderOpen
              size={12}
              strokeWidth={1.5}
              className="text-accent shrink-0"
            />
          ) : (
            <Folder
              size={12}
              strokeWidth={1.5}
              className="text-accent shrink-0"
            />
          )}
          <span className="text-text-muted truncate text-left font-sans text-xs">
            {collection.name}
          </span>
          <span className="text-text-ghost ml-auto shrink-0 pr-1 font-mono text-xs">
            {collection.requests.length}
          </span>
        </button>
      </div>
    </div>
  );
};
