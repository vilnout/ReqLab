import { MobileDrawer } from "@/components/layout/MobileDrawer/MobileDrawer";
import { MobileHamburger } from "@/components/layout/MobileDrawer/MobileHeader";
import { Sidebar } from "@/components/layout/sidebar";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden w-55 md:flex">
          <Sidebar />
        </div>
        <main className="bg-surface-base flex min-w-0 flex-1 flex-col overflow-hidden">
          <MobileHamburger handleClick={() => setDrawerOpen(true)} />
          {children}
        </main>
      </div>
    </>
  );
};
