import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onDelete: () => void;
}

export const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="text-text-ghost hover:text-status-error shrink-0 cursor-pointer opacity-0 transition-all group-hover:opacity-100"
    >
      <Trash2 size={12} strokeWidth={2} />
    </button>
  );
};
