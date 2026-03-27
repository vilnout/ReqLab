import { Sidebar } from "@/components/layout/sidebar";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { X } from "lucide-react";
import { useEffect } from "react";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
  // No body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on escape
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  return (
    <>
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
      />

      {/* Drawer panel */}
      <div
        className={`bg-surface-overlay border-border-default fixed top-0 bottom-0 left-0 z-50 w-70 transform border-r transition-transform duration-200 ease-out md:hidden ${open ? "translate-x-0" : "-translate-x-full"} `}
      >
        {/* Header */}
        <div className="border-border-default flex items-center justify-between border-b px-4 py-3">
          <SiteLogo />
          <button
            onClick={onClose}
            className="text-text-ghost hover:text-text-primary hover:bg-surface-raised flex h-7 w-7 items-center justify-center rounded transition-colors"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
        <div className="flex h-[90%] overflow-hidden">
          <Sidebar onNavigate={onClose} />
        </div>
      </div>
    </>
  );
};
