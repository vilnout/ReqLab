import { statusTextMap } from "@/lib/utils";
import type { RequestConfig, ResponseData } from "@/types";
import { useCallback, useState } from "react";

interface ExecuteState {
  data: ResponseData | null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: ExecuteState = {
  data: null,
  loading: false,
  error: null,
};

const PROXY_URL = "/api/proxy";

const buildFetchConfig = (
  url: string,
  method: string,
  headers: Record<string, string>,
  body: string | undefined,
): { fetchUrl: string; fetchInit: RequestInit } => {
  return {
    fetchUrl: PROXY_URL,
    fetchInit: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, method, headers, body }),
    },
  };
};

export const useExecuteRequest = () => {
  const [state, setState] = useState<ExecuteState>(INITIAL_STATE);

  const execute = useCallback(
    async (
      config: RequestConfig,
      onSuccess?: (data: ResponseData) => void,
      onError?: (error: string) => void,
    ) => {
      setState({ data: null, loading: true, error: null });
      const startTime = performance.now();

      try {
        const url = new URL(config.url);

        config.params
          .filter((p) => p.enabled && p.key.trim() !== "")
          .forEach((p) => url.searchParams.set(p.key, p.value));

        const headers: Record<string, string> = {};
        config.headers
          .filter((h) => h.enabled && h.key.trim() !== "")
          .forEach((h) => {
            headers[h.key] = h.value;
          });

        const methodsWithBody: RequestConfig["method"][] = [
          "POST",
          "PUT",
          "PATCH",
        ];
        const hasBody = methodsWithBody.includes(config.method);

        if (hasBody && config.body.type === "json" && config.body.content) {
          headers["Content-Type"] = "application/json";
        }

        const { fetchUrl, fetchInit } = buildFetchConfig(
          url.toString(),
          config.method,
          headers,
          hasBody && config.body.content ? config.body.content : undefined,
        );

        const response = await fetch(fetchUrl, fetchInit);
        const body = await response.text();
        const timingMs = Math.round(performance.now() - startTime);
        const size = new TextEncoder().encode(body).length;

        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        const responseData: ResponseData = {
          status: response.status,
          statusText:
            response.statusText || statusTextMap[response.status] || "Unknown",
          headers: responseHeaders,
          body,
          timingMs,
          size,
        };
        onSuccess?.(responseData);
        setState({
          data: responseData,
          loading: false,
          error: null,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Request Failed";
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : "Request Failed",
        });
        onError?.(message);
      }
    },
    [],
  );

  return { ...state, execute };
};
