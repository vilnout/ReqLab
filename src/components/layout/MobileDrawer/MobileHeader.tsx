import { Menu } from "lucide-react";

interface MobileHamburgerProps {
  handleClick: () => void;
}

export const MobileHamburger = ({ handleClick }: MobileHamburgerProps) => {
  return (
    <div className="border-border-default bg-surface-overlay flex shrink-0 items-center gap-3 border-b px-3 py-2 md:hidden">
      <button
        className="text-text-ghost hover:text-text-muted hover:bg-surface-raised flex h-8 w-8 items-center justify-center rounded transition-colors"
        onClick={handleClick}
      >
        <Menu size={16} strokeWidth={1.5} />
      </button>
      <span className="text-text-ghost truncate font-mono text-xs">
        Collections & History
      </span>
    </div>
  );
};
