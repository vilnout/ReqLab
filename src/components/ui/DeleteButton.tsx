import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  size?: number;
  onDelete: () => void;
}

export const DeleteButton = ({ onDelete, size = 12 }: DeleteButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="text-text-ghost hover:text-status-error shrink-0 cursor-pointer opacity-0 transition-all group-hover:opacity-100 hover:opacity-100"
    >
      <Trash2 size={size} strokeWidth={2} />
    </button>
  );
};
