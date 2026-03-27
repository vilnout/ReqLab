import type {
  BodyType,
  Collection,
  HistoryEntry,
  HttpMethod,
  RequestConfig,
  RequestPanel,
  RequestParam,
  RequestTab,
  ResponseData,
} from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const makeParam = (partial: Partial<RequestParam> = {}): RequestParam => {
  return {
    id: crypto.randomUUID(),
    key: "",
    value: "",
    enabled: true,
    ...partial,
  };
};

const makeTab = (partial: Partial<RequestTab> = {}): RequestTab => {
  return {
    id: crypto.randomUUID(),
    label: "New Request",
    config: {
      method: "GET",
      url: "",
      params: [makeParam()],
      headers: [makeParam()],
      body: { type: "none", content: "" },
    },
    activePanel: "params",
    lastResponse: null,
    lastError: null,
    isLoading: false,
    ...partial,
  };
};

const deriveLabel = (config: RequestConfig): string => {
  if (!config.url.trim()) return "New Request";
  try {
    const pathname = new URL(config.url).pathname;
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    return last ? `${config.method} /${last}` : config.method;
  } catch {
    return config.method;
  }
};

export interface RequestStore {
  // Tabs
  tabs: RequestTab[];
  activeTabId: string;

  // Tab Managment
  addTab: () => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;

  // Active Tab config
  setMethod: (method: HttpMethod) => void;
  setUrl: (url: string) => void;

  addParam: () => void;
  updateParam: (
    id: string,
    field: keyof Omit<RequestParam, "id">,
    value: string | boolean,
  ) => void;
  deleteParam: (id: string) => void;

  addHeader: () => void;
  updateHeader: (
    id: string,
    field: keyof Omit<RequestParam, "id">,
    value: string | boolean,
  ) => void;
  deleteHeader: (id: string) => void;

  setBodyType: (type: BodyType) => void;
  setBodyContent: (content: string) => void;

  // Active Tab ui
  setActivePanel: (panel: RequestPanel) => void;

  // Active tab response state
  setLastResponse: (response: ResponseData | null) => void;
  setLastError: (error: string | null) => void;
  setIsLoading: (loading: boolean) => void;

  // Collections and history
  collections: Collection[];
  history: HistoryEntry[];

  saveToCollection: (collectionId: string, name: string) => void;
  createCollection: (name: string) => void;
  deleteSavedRequest: (collectionId: string, id: string) => void;
  deleteCollection: (id: string) => void;
  loadRequest: (config: RequestConfig) => void;

  addHistoryEntry: (entry: Omit<HistoryEntry, "id" | "sentAt">) => void;
  clearHistory: () => void;

  // Proxy
  useProxy: boolean;
  toggleProxy: () => void;

  // Derived
  getActiveTab: () => RequestTab;
  getRequestConfig: () => RequestConfig;
}

const updateActiveConfig = (
  state: RequestStore,
  configUpdate: Partial<RequestConfig>,
): Partial<RequestStore> => {
  const tabs = state.tabs.map((tab) =>
    tab.id === state.activeTabId
      ? {
          ...tab,
          config: { ...tab.config, ...configUpdate },
          label: deriveLabel({ ...tab.config, ...configUpdate }),
        }
      : tab,
  );
  return { tabs };
};

const updateActiveTab = (
  state: RequestStore,
  tabUpdate: Partial<RequestTab>,
): Partial<RequestStore> => {
  const tabs = state.tabs.map((tab) =>
    tab.id === state.activeTabId ? { ...tab, ...tabUpdate } : tab,
  );
  return { tabs };
};

const updateActiveTabRows = (
  state: RequestStore,
  field: "params" | "headers",
  updater: (rows: RequestParam[]) => RequestParam[],
): Partial<RequestStore> => {
  return updateActiveConfig(state, {
    [field]: updater(state.getActiveTab().config[field]),
  });
};

const initialTab = makeTab({
  config: {
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    params: [makeParam()],
    headers: [makeParam()],
    body: { type: "none", content: "" },
  },
  label: "GET /1",
});

export const useRequestStore = create<RequestStore>()(
  persist(
    (set, get) => ({
      // Initial State
      tabs: [initialTab],
      activeTabId: initialTab.id,
      collections: [],
      history: [],
      useProxy: true,

      // Tab managment
      addTab: () => {
        const tab = makeTab();
        set((state) => ({
          tabs: [...state.tabs, tab],
          activeTabId: tab.id,
        }));
      },

      closeTab: (id) =>
        set((state) => {
          if (state.tabs.length === 1) {
            const fresh = makeTab();
            return { tabs: [fresh], activeTabId: fresh.id };
          }
          const idx = state.tabs.findIndex((t) => t.id === id);
          const filtered = state.tabs.filter((t) => t.id !== id);
          const newActiveId =
            id === state.activeTabId
              ? (filtered[Math.max(0, idx - 1)]?.id ?? filtered[0].id)
              : state.activeTabId;
          return { tabs: filtered, activeTabId: newActiveId };
        }),
      setActiveTab: (activeTabId) => set({ activeTabId }),

      // Config actions
      setMethod: (method) =>
        set((state) => updateActiveConfig(state, { method })),
      setUrl: (url) => set((state) => updateActiveConfig(state, { url })),

      addParam: () =>
        set((state) =>
          updateActiveTabRows(state, "params", (rows) => [
            ...rows,
            makeParam(),
          ]),
        ),

      updateParam: (id, field, value) =>
        set((state) =>
          updateActiveTabRows(state, "params", (rows) =>
            rows.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
          ),
        ),

      deleteParam: (id) =>
        set((state) =>
          updateActiveTabRows(state, "params", (rows) => {
            const filtered = rows.filter((p) => p.id !== id);
            return filtered.length > 0 ? filtered : [makeParam()];
          }),
        ),

      addHeader: () =>
        set((state) =>
          updateActiveTabRows(state, "headers", (rows) => [
            ...rows,
            makeParam(),
          ]),
        ),

      updateHeader: (id, field, value) =>
        set((state) =>
          updateActiveTabRows(state, "headers", (rows) =>
            rows.map((h) => (h.id === id ? { ...h, [field]: value } : h)),
          ),
        ),

      deleteHeader: (id) =>
        set((state) =>
          updateActiveTabRows(state, "headers", (rows) => {
            const filtered = rows.filter((h) => h.id !== id);
            return filtered.length > 0 ? filtered : [makeParam()];
          }),
        ),
      setBodyType: (bodyType) =>
        set((state) =>
          updateActiveConfig(state, {
            body: { ...state.getActiveTab().config.body, type: bodyType },
          }),
        ),
      setBodyContent: (content) =>
        set((state) =>
          updateActiveConfig(state, {
            body: { ...state.getActiveTab().config.body, content },
          }),
        ),

      // Ui
      setActivePanel: (panel) =>
        set((state) => updateActiveTab(state, { activePanel: panel })),

      // Response
      setLastResponse: (lastResponse) =>
        set((state) => updateActiveTab(state, { lastResponse })),
      setLastError: (lastError) =>
        set((state) => updateActiveTab(state, { lastError })),
      setIsLoading: (isLoading) =>
        set((state) => updateActiveTab(state, { isLoading })),

      //Collections
      createCollection: (name) =>
        set((state) => ({
          collections: [
            ...state.collections,
            {
              id: crypto.randomUUID(),
              name,
              requests: [],
              createdAt: Date.now(),
            },
          ],
        })),

      deleteCollection: (id) =>
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        })),

      saveToCollection: (collectionId, name) => {
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

      deleteSavedRequest: (collectionId, id) => {
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? { ...c, requests: c.requests.filter((r) => r.id !== id) }
              : c,
          ),
        }));
      },

      loadRequest: (config) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === state.activeTabId
              ? {
                  ...tab,
                  config: {
                    ...config,
                    params:
                      config.params.length > 0 ? config.params : [makeParam()],
                    headers:
                      config.headers.length > 0
                        ? config.headers
                        : [makeParam()],
                  },
                  label: deriveLabel(config),
                  lastResponse: null,
                  lastError: null,
                }
              : tab,
          ),
        })),

      addHistoryEntry: (entry) =>
        set((state) => ({
          history: [
            { ...entry, id: crypto.randomUUID(), sentAt: Date.now() },
            ...state.history,
          ].slice(0, 50),
        })),

      clearHistory: () => set({ history: [] }),

      // Proxy
      toggleProxy: () => set((state) => ({ useProxy: !state.useProxy })),

      // Derived
      getActiveTab: () => {
        const state = get();
        return (
          state.tabs.find((t) => t.id === state.activeTabId) ?? state.tabs[0]
        );
      },
      getRequestConfig: () => get().getActiveTab().config,
    }),
    {
      name: "reqlab-workspace",
      partialize: (state) => ({
        collections: state.collections,
        history: state.history,
        tabs: state.tabs.map((tab) => ({
          ...tab,
          lastResponse: null,
          lastError: null,
          isLoading: false,
        })),
        activeTabId: state.activeTabId,
      }),
    },
  ),
);
