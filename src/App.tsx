import { AppLayout } from "@/components/layout/AppLayout";
import { TopBar } from "@/components/layout/TopBar";
import { HTTP_METHODS } from "@/config/http";
import { useExecuteRequest } from "@/hooks/useExecuteRequest";
import { useRequestStore } from "@/stores/requestStore";
import type { RequestConfig } from "@/types";

const buildConfig = (
  method: RequestConfig["method"],
  url: string,
): RequestConfig => ({
  method,
  url,
  params: [],
  headers: [],
  body: { type: "none", content: "" },
});

const App = () => {
  const method = useRequestStore((s) => s.method);
  const url = useRequestStore((s) => s.url);
  const setUrl = useRequestStore((s) => s.setUrl);
  const setMethod = useRequestStore((s) => s.setMethod);

  const { execute, data, loading, error } = useExecuteRequest();

  return (
    <div className="h-screen flex flex-col bg-surface-base overflow-hidden">
      <TopBar />
      <AppLayout>
        <div className="p-24 text-white">
          <h1>ReqLab - Basic</h1>
          <div className="flex gap-8 mt-8">
            <select
              value={method}
              onChange={(e) =>
                setMethod(e.target.value as RequestConfig["method"])
              }
            >
              {HTTP_METHODS.map((v) => (
                <option id={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border px-2 py-1"
            />
            <button
              onClick={() => execute(buildConfig(method, url))}
              disabled={loading}
              className="bg-green-400 p-2 rounded-lg"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          {error && <div className="text-red-500">Network Error: {error}</div>}
          {data && (
            <div className="flex flex-col gap-3 mt-5">
              <div>
                Status: {data.status} {data.statusText}
              </div>
              <div>
                Time: {data.timingMs}ms , Size: {data.size}
              </div>
              <pre className="p-8 bg-slate-400 overflow-auto max-h-96">
                {data.body}
              </pre>
            </div>
          )}
        </div>
      </AppLayout>
    </div>
  );
};

export default App;
