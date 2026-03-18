import { MethodBadge } from "@/components/request/MethodSelector";
import { DeleteButton } from "@/components/ui/DeleteButton";
import type { RequestStore } from "@/stores/requestStore";
import type { Collection } from "@/types";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";

interface CollectionItemProps {
  collection: Collection;
  isExpanded: boolean;
  onToggle: () => void;
  onDeleteCollection: () => void;
  onLoadRequest: RequestStore["loadRequest"];
  onDeleteRequest: RequestStore["deleteFromCollection"];
}

export const CollectionItem = ({
  collection,
  isExpanded,
  onToggle,
  onDeleteCollection,
  onLoadRequest,
  onDeleteRequest,
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
        <DeleteButton onDelete={onDeleteCollection} />
      </div>

      {/*Display saved requests*/}
      {isExpanded && (
        <div className="border-border-default ml-3 border-l">
          {collection.requests.length === 0 && (
            <p className="py-1 pl-3 font-mono text-xs text-white">
              No saved requests
            </p>
          )}
          {collection.requests.map((saved) => (
            <button
              key={saved.id}
              onClick={() => onLoadRequest(saved.config)}
              className="hover:bg-surface-raised group flex w-full cursor-pointer items-center gap-2 py-1.5 pr-2 pl-3 transition-colors"
            >
              <MethodBadge method={saved.config.method} size="sm" />
              <span className="text-text-ghost group-hover:text-text-muted min-w-0 flex-1 truncate text-left font-mono text-xs transition-colors">
                {saved.name}
              </span>
              <DeleteButton
                onDelete={() => onDeleteRequest(collection.id, saved.id)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
