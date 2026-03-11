import { Sidebar } from "@/components/layout/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex overflow-hidden flex-1">
      <Sidebar />
      <main className="flex flex-col flex-1 overflow-hidden bg-surface-base">
        {children}
      </main>
    </div>
  );
};
