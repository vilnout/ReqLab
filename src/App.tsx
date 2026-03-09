import { useExecuteRequest } from "@/hooks/useExecuteRequest";
import type { RequestConfig } from "@/types";
import { useState } from "react";

const makeConfig = (url: string): RequestConfig => ({
  method: "GET",
  url,
  params: [],
  headers: [],
  body: { type: "none", content: "" },
});

const App = () => {
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  const { execute, data, loading, error } = useExecuteRequest();

  return (
    <div className="p-24">
      <h1>ReqLab - Basic</h1>
      <div className="flex gap-8 mt-8">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border-1 px-2 py-1"
        />
        <button
          onClick={() => execute(makeConfig(url))}
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
  );
};

export default App;
