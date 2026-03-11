import { AppLayout } from "@/components/layout/AppLayout";
import { TopBar } from "@/components/layout/TopBar";
import { UrlBar } from "@/components/request/UrlBar";

const App = () => {
  return (
    <div className="h-screen flex flex-col bg-surface-base overflow-hidden">
      <TopBar />
      <AppLayout>
        <UrlBar />
      </AppLayout>
    </div>
  );
};

export default App;
