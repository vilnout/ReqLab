import { BodyEditor } from "@/components/request/BodyEditor";
import { KeyValueEditor } from "@/components/request/KeyValueEditor";
import { RequestTabs } from "@/components/request/RequestTabs";
import { UrlBar } from "@/components/request/UrlBar";
import { useRequestStore } from "@/stores/requestStore";

export const RequestPanel = () => {
  const activeTab = useRequestStore((s) => s.activeTab);
  return (
    <div>
      <UrlBar />
      <RequestTabs />
      <div className="min-h-50 text-white">
        {activeTab === "params" && <KeyValueEditor type="params" />}
        {activeTab === "headers" && <KeyValueEditor type="headers" />}
        {activeTab === "body" && <BodyEditor />}
        {activeTab === "auth" && <div>auth</div>}
      </div>
    </div>
  );
};
