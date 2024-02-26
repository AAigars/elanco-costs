"use client";

import { SWRConfig } from "swr";

const localStorageProvider = () => {
  if (typeof window === "undefined") {
    return new Map([]);
  }

  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  return map;
};

const SWRProvider = ({ children }) => {
  return (
    <SWRConfig value={{ provider: localStorageProvider }}>{children}</SWRConfig>
  );
};

export default SWRProvider;
