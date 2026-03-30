import { BodyEditor } from "@/components/request/BodyEditor";
import { KeyValueEditor } from "@/components/request/KeyValueEditor";
import { RequestTabs } from "@/components/request/RequestTabs";
import { UrlBar } from "@/components/request/UrlBar";
import { useRequestStore } from "@/stores/requestStore";

export const RequestPanel = () => {
  const activePanel = useRequestStore((s) => s.getActiveTab().activePanel);
  const isTransitioning = useRequestStore(
    (s) => s.getActiveTab().isTransitioning,
  );
  return (
    <div>
      <UrlBar />
      <RequestTabs />
      {/* show transition */}
      <div
        className={`min-h-50 text-white transition-opacity duration-150 ${isTransitioning ? "pointer-events-none opacity-30" : "opacity-100"}`}
      >
        {activePanel === "params" && <KeyValueEditor type="params" />}
        {activePanel === "headers" && <KeyValueEditor type="headers" />}
        {activePanel === "body" && <BodyEditor />}
        {activePanel === "auth" && <AuthPlaceholder />}
      </div>
    </div>
  );
};

const AuthPlaceholder = () => {
  return (
    <div className="text-text-ghost flex h-50 items-center justify-center font-mono text-sm">
      Auth — out of scope
    </div>
  );
};
