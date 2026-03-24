import { AppLayout } from "@/components/layout/AppLayout";
import { TopBar } from "@/components/layout/TopBar";
import { WorkspacePanel } from "@/components/layout/WorkspacePanel";

const App = () => {
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
