import { AppLayout } from "@/components/layout/AppLayout";
import { TopBar } from "@/components/layout/TopBar";
import { RequestPanel } from "@/components/request/RequestPanel";
import { ResponsePanel } from "@/components/response/ResponsePanel";

const App = () => {
  return (
    <div className="bg-surface-base flex h-screen flex-col overflow-hidden">
      <TopBar />
      <AppLayout>
        <RequestPanel />
        <ResponsePanel />
      </AppLayout>
    </div>
  );
};

export default App;
