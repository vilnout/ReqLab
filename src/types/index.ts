import type { HTTP_METHODS } from "@/config/http";

export type HttpMethod = (typeof HTTP_METHODS)[number];

export type BodyType = "none" | "json" | "form-data" | "x-www-form-urlencoded";

export type RequestPanel = "params" | "headers" | "body" | "auth";

export interface RequestParam {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface RequestBody {
  type: BodyType;
  content: string;
}

export interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  timingMs: number;
  size: number;
}

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  params: RequestParam[];
  headers: RequestParam[];
  body: RequestBody;
}

export interface SavedRequest {
  id: string;
  name: string;
  config: RequestConfig;
  createdAt: number;
}

export interface Collection {
  id: string;
  name: string;
  requests: SavedRequest[];
  createdAt: number;
}

export interface HistoryEntry {
  id: string;
  config: RequestConfig;
  response: ResponseData | null;
  sentAt: number;
}

export interface RequestTab {
  id: string;
  label: string;
  config: RequestConfig;
  activePanel: RequestPanel;
  lastResponse: ResponseData | null;
  lastError: string | null;
  isLoading: boolean;
}
