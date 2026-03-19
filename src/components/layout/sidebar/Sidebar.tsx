import { CollectionItem } from "@/components/layout/sidebar/CollectionItem";
import { RecentHistory } from "@/components/layout/sidebar/RecentHistory";
import { useRequestStore } from "@/stores/requestStore";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const collections = useRequestStore((s) => s.collections);
  const createCollection = useRequestStore((s) => s.createCollection);
  const deleteCollection = useRequestStore((s) => s.deleteCollection);

  const loadRequest = useRequestStore((s) => s.loadRequest);
  const deleteRequest = useRequestStore((s) => s.deleteFromCollection);

  const [newCollectionName, setNewCollectionName] = useState("");
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(
    new Set(),
  );

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    createCollection(newCollectionName.trim());
    setNewCollectionName("");
    setCreatingCollection(false);
  };

  const toggleCollection = (id: string) => {
    setExpandedCollections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <aside className="bg-surface-overlay border-border-default flex w-[220px] shrink-0 flex-col overflow-hidden border-r">
      {/*collections*/}
      <div className="flex items-center justify-between px-3.5 py-3">
        <span className="text-text-ghost font-mono text-xs font-semibold tracking-widest uppercase">
          Collections
        </span>
        <button
          onClick={() => setCreatingCollection((v) => !v)}
          className="text-text-ghost hover:text-accent hover:bg-surface-raised rounded p-1 text-base leading-none transition-colors"
        >
          <Plus size={15} strokeWidth={2} />
        </button>
      </div>

      {/*create collection modal*/}
      {creatingCollection && (
        <div className="flex shrink-0 gap-1.5 px-3 pb-2">
          <input
            autoFocus
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateCollection();
              if (e.key === "Escape") setCreatingCollection(false);
            }}
            placeholder="Collection name"
            className="bg-surface-raised border-border-default text-text-primary placeholder:text-text-ghost focus:border-accent min-w-0 flex-1 rounded border px-2 py-1 font-mono text-xs transition-colors outline-none"
          />
          <button
            onClick={handleCreateCollection}
            className="bg-accent shrink-0 rounded px-2 py-1 font-mono text-xs text-white"
          >
            Add
          </button>
        </div>
      )}

      {/*list collections*/}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {collections.length === 0 && !creatingCollection && (
          <div className="text-text-ghost px-3.5 py-2 font-mono text-xs leading-relaxed">
            No collections yet.
            <br />
            <span className="flex gap-1 text-white">
              Hit <Plus size={15} /> to create one.
            </span>
          </div>
        )}
        {collections.map((collection) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            isExpanded={expandedCollections.has(collection.id)}
            onToggle={() => toggleCollection(collection.id)}
            onDeleteCollection={() => deleteCollection(collection.id)}
            onLoadRequest={loadRequest}
            onDeleteRequest={deleteRequest}
          />
        ))}
      </div>

      <RecentHistory />
    </aside>
  );
};
