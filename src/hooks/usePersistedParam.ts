import { useLocalStorage, writeLocalStorage } from "./useLocalStorage";
import { setQueryParam, useQueryParam } from "./useQueryParam";

type Options<T extends string> = {
  param: string;
  storageKey: string;
  values: readonly T[];
  defaultValue: T;
};

export const usePersistedParams = <T extends string>({
  param,
  storageKey,
  values,
  defaultValue,
}: Options<T>) => {
  const isValue = (value: string | null): value is T =>
    values.some((candidate) => candidate === value);

  const useValue = (): T => {
    const fromUrl = useQueryParam(param);
    const [stored] = useLocalStorage(storageKey);

    return [fromUrl, stored].find(isValue) ?? defaultValue;
  };

  const setValue = (value: T) => {
    setQueryParam(param, value === defaultValue ? null : value);
    writeLocalStorage(storageKey, value);
  };

  return [useValue, setValue] as const;
};
