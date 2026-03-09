export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type BodyType = "none" | "json" | "form-data";

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
