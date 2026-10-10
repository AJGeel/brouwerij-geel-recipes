"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  // Changes made in another tab
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

// Storage can be blocked, e.g. in a private window, the app should work without
const read = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeLocalStorage = (key: string, value: string | null) => {
  try {
    if (value === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
  } catch {}

  listeners.forEach((listener) => listener());
};

/**
 * A string kept in localStorage. It is `null` on the server and while
 * hydrating, so server and client markup match, and while nothing is stored.
 */
export const useLocalStorage = (key: string) => {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );
  const setValue = useCallback(
    (next: string | null) => writeLocalStorage(key, next),
    [key],
  );

  return [value, setValue] as const;
};
