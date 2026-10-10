"use client";

import { useSyncExternalStore } from "react";

import { useLocalStorage, writeLocalStorage } from "@/hooks/useLocalStorage";
import {
  defaultSortMode,
  isSortMode,
  SortMode,
} from "@/services/markdown/sortRecipes";

const param = "sorteer";
const storageKey = "sortMode";
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("popstate", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
};

const getSnapshot = () =>
  new URLSearchParams(window.location.search).get(param);
// The page is static, so the server always renders the default order
const getServerSnapshot = () => null;

/**
 * Writes the mode to the URL without navigating, which keeps the page static.
 * Next.js syncs `replaceState` with its router, so the URL stays shareable.
 * It is remembered as well, for when the URL has no mode, like after going back.
 */
export const setSortMode = (mode: SortMode) => {
  const url = new URL(window.location.href);

  if (mode === defaultSortMode) {
    url.searchParams.delete(param);
  } else {
    url.searchParams.set(param, mode);
  }

  window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  listeners.forEach((listener) => listener());
  writeLocalStorage(storageKey, mode);
};

/** The mode from the URL, else the remembered one, else the default */
export const useSortMode = () => {
  const urlMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [storedMode] = useLocalStorage(storageKey);

  return [urlMode, storedMode].find(isSortMode) ?? defaultSortMode;
};
