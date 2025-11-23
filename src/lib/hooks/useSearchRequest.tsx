"use client";

import { useRef } from "react";
import api from "@/lib/apiConfig";

export default function useSearchRequest() {
  const controllerRef = useRef<AbortController | null>(null);

  const search = async (value: string) => {
    if (!value || value.trim() === "") return [];

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const { data } = await api.get("/product/search", {
        params: { s: value },
        signal: controller.signal,
      });

      return data.data;
    } catch (err: any) {
      if (err.name === "CanceledError" || err.name === "AbortError") {
        return [];
      }
      throw err;
    }
  };

  return search;
}
