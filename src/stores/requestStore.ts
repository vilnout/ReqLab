import type {
  BodyType,
  Collection,
  HistoryEntry,
  HttpMethod,
  RequestConfig,
  RequestParam,
  RequestTab,
  ResponseData,
} from "@/types";
import { create } from "zustand";

function makeParam(partial: Partial<RequestParam> = {}): RequestParam {
  return {
    id: crypto.randomUUID(),
    key: "",
    value: "",
    enabled: true,
    ...partial,
  };
}

interface RequestStore {
  method: HttpMethod;
  url: string;
  params: RequestParam[];
  headers: RequestParam[];
  bodyType: BodyType;
  bodyContent: string;

  activeTab: RequestTab;
  lastResponse: ResponseData | null;
  collections: Collection[];
  history: HistoryEntry[];

  setMethod: (method: HttpMethod) => void;
  setUrl: (url: string) => void;

  addParam: () => void;
  updateParam: (
    id: string,
    field: keyof Omit<RequestParam, "id">,
    value: string | boolean,
  ) => void;
  deleteParam: (id: string) => void;
  clearParams: () => void;

  addHeader: () => void;
  updateHeader: (
    id: string,
    field: keyof Omit<RequestParam, "id">,
    value: string | boolean,
  ) => void;
  deleteHeader: (id: string) => void;
  clearHeaders: () => void;

  setBodyType: (type: BodyType) => void;
  setBodyContent: (content: string) => void;

  setActiveTab: (tab: RequestTab) => void;

  setLastResponse: (response: ResponseData | null) => void;

  saveToCollections: (collectionId: string, name: string) => void;
  createCollection: (name: string) => void;
  deleteCollection: (id: string) => void;
  loadRequest: (config: RequestConfig) => void;

  addHistoryEntry: (entry: Omit<HistoryEntry, "id" | "sentAt">) => void;
  clearHistory: () => void;

  getRequestConfig: () => RequestConfig;
}

export const useRequestStore = create<RequestStore>()((set, get) => ({
  // Initial State
  method: "GET",
  url: "https://jsonplaceholder.typicode.com/posts/1",
  params: [makeParam()],
  headers: [makeParam()],
  bodyType: "none",
  bodyContent: "",
  activeTab: "params",
  lastResponse: null,
  collections: [],
  history: [],

  setMethod: (method) => set({ method }),
  setUrl: (url) => set({ url }),

  addParam: () => set((state) => ({ params: [...state.params, makeParam()] })),
  updateParam: (id, field, value) =>
    set((state) => ({
      params: state.params.map((p) =>
        p.id === id ? { ...p, [field]: value } : p,
      ),
    })),
  deleteParam: (id) =>
    set((state) => {
      const remaining = state.params.filter((p) => p.id !== id);
      return {
        params: remaining.length > 0 ? remaining : [makeParam()],
      };
    }),
  clearParams: () => set({ params: [makeParam()] }),
  addHeader: () =>
    set((state) => ({ headers: [...state.headers, makeParam()] })),
  updateHeader: (id, field, string) =>
    set((state) => ({
      headers: state.headers.map((h) =>
        h.id === id ? { ...h, [field]: string } : h,
      ),
    })),
  deleteHeader: (id) =>
    set((state) => {
      const remaining = state.headers.filter((h) => h.id !== id);
      return { headers: remaining.length > 0 ? remaining : [makeParam()] };
    }),
  clearHeaders: () => set({ headers: [makeParam()] }),
  setBodyType: (type) => set({ bodyType: type }),
  setBodyContent: (content) => set({ bodyContent: content }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setLastResponse: (response) => set({ lastResponse: response }),
  createCollection: (name) =>
    set((state) => ({
      collections: [
        ...state.collections,
        { id: crypto.randomUUID(), name, requests: [], createdAt: Date.now() },
      ],
    })),
  deleteCollection: (id) =>
    set((state) => ({
      collections: state.collections.filter((c) => c.id !== id),
    })),
  saveToCollections: (collectionId, name) => {
    const config = get().getRequestConfig();
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? {
              ...c,
              requests: [
                ...c.requests,
                {
                  id: crypto.randomUUID(),
                  name,
                  config,
                  createdAt: Date.now(),
                },
              ],
            }
          : c,
      ),
    }));
  },
  loadRequest: (config) =>
    set({
      method: config.method,
      url: config.url,
      params: config.params.length > 0 ? config.headers : [makeParam()],
      headers: config.headers.length > 0 ? config.headers : [makeParam()],
      bodyType: config.body.type,
      bodyContent: config.body.content,
      lastResponse: null,
    }),
  addHistoryEntry: (entry) =>
    set((state) => ({
      history: [
        { ...entry, id: crypto.randomUUID(), sentAt: Date.now() },
        ...state.history,
      ].slice(0, 50),
    })),
  clearHistory: () => set({ history: [] }),
  getRequestConfig: () => {
    const { method, url, params, headers, bodyType, bodyContent } = get();
    return {
      method,
      url,
      params,
      headers,
      body: {
        type: bodyType,
        content: bodyContent,
      },
    };
  },
}));
