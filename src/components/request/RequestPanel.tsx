import { RequestTabs } from "@/components/request/RequestTabs";
import { UrlBar } from "@/components/request/UrlBar";
import { useRequestStore } from "@/stores/requestStore";

export const RequestPanel = () => {
  const activeTab = useRequestStore((s) => s.activeTab);
  return (
    <div>
      <UrlBar />
      <RequestTabs />
      <div className="text-white">
        {activeTab === "params" && <div>params</div>}
        {activeTab === "headers" && <div>headers</div>}
        {activeTab === "body" && <div>body</div>}
        {activeTab === "auth" && <div>auth</div>}
      </div>
    </div>
  );
};
