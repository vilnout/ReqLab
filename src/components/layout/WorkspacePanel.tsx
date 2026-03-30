import { RequestPanel } from "@/components/request/RequestPanel";
import { ResponsePanel } from "@/components/response/ResponsePanel";
import { Group, Panel, Separator } from "react-resizable-panels";

export const WorkspacePanel = () => {
  return (
    <Group orientation="vertical">
      <Panel
        defaultSize="45%"
        minSize="25%"
        className="scrollbar flex flex-col overflow-hidden"
      >
        <RequestPanel />
      </Panel>

      <Separator className="group bg-border-default hover:bg-accent active:bg-accent flex h-1.5 shrink-0 items-center justify-center transition-colors">
        <div className="bg-border-subtle group-hover:bg-accent-hover h-0.5 w-8 rounded-full transition-colors group-active:bg-white" />
      </Separator>
      <Panel
        defaultSize="55%"
        minSize="20%"
        className="flex flex-col overflow-hidden"
      >
        <ResponsePanel />
      </Panel>
    </Group>
  );
};
