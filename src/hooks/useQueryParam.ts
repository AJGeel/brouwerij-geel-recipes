"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("popstate", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
};

/**
 * Writes a search param to the URL without navigating, which keeps a static
 * page static. Next.js syncs `replaceState` with its router.
 */
export const setQueryParam = (param: string, value: string | null) => {
  const url = new URL(window.location.href);

  if (value === null) {
    url.searchParams.delete(param);
  } else {
    url.searchParams.set(param, value);
  }

  window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  listeners.forEach((listener) => listener());
};

/** A search param of the current URL. `null` on the server, and while it is not set */
export const useQueryParam = (param: string) =>
  useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(param),
    // Static pages don't know the URL, the client picks it up after hydrating
    () => null,
  );
