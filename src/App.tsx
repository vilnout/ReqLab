import { AppLayout } from "@/components/layout/AppLayout";
import { AppSkeleton } from "@/components/layout/AppSkeleton";
import { TopBar } from "@/components/layout/TopBar";
import { WorkspacePanel } from "@/components/layout/WorkspacePanel";
import { useEffect, useState } from "react";

const INIT_DELAY_MS = 1000;

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, INIT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <AppSkeleton />;

  return (
    <div className="bg-surface-base flex h-screen flex-col overflow-hidden">
      <TopBar />
      <AppLayout>
        <WorkspacePanel />
      </AppLayout>
    </div>
  );
};

export default App;
