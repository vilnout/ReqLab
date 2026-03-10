import type { HttpMethod } from "@/types";
import { create } from "zustand";

interface RequestStore {
  method: HttpMethod;
  url: string;

  setMethod: (method: HttpMethod) => void;
  setUrl: (url: string) => void;
}

export const useRequestStore = create<RequestStore>()((set) => ({
  method: "GET",
  url: "https://jsonplaceholder.typicode.com/posts/1",

  setMethod: (method) => set({ method }),
  setUrl: (url) => set({ url }),
}));
