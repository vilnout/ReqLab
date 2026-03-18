import { Sidebar } from "@/components/layout/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="bg-surface-base flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
};
