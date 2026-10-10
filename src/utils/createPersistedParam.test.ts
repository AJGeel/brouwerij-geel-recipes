import { beforeEach, describe, it, expect, mock } from "bun:test";

let queryParam: string | null = null;
let stored: string | null = null;
const setQueryParam = mock((_param: string, _value: string | null) => {});
const writeLocalStorage = mock((_key: string, _value: string | null) => {});

mock.module("@/hooks/useQueryParam", () => ({
  useQueryParam: () => queryParam,
  setQueryParam,
}));
mock.module("@/hooks/useLocalStorage", () => ({
  useLocalStorage: () => [stored],
  writeLocalStorage,
}));

const { createPersistedParam } = await import("./createPersistedParam");

const [useValue, setValue] = createPersistedParam({
  param: "sort",
  storageKey: "sortMode",
  values: ["asc", "desc", "random"],
  defaultValue: "asc",
});

describe("createPersistedParam", () => {
  beforeEach(() => {
    queryParam = null;
    stored = null;
    setQueryParam.mockClear();
    writeLocalStorage.mockClear();
  });

  it("should fall back to the default value", () => {
    expect(useValue()).toBe("asc");
  });

  it("should prefer the URL over storage", () => {
    queryParam = "desc";
    stored = "random";

    expect(useValue()).toBe("desc");
  });

  it("should use storage when the URL has no valid value", () => {
    queryParam = "nonsense";
    stored = "random";

    expect(useValue()).toBe("random");
  });

  it("should write to the URL and storage", () => {
    setValue("desc");

    expect(setQueryParam.mock.calls).toEqual([["sort", "desc"]]);
    expect(writeLocalStorage.mock.calls).toEqual([["sortMode", "desc"]]);
  });

  it("should keep the default value out of the URL", () => {
    setValue("asc");

    expect(setQueryParam.mock.calls).toEqual([["sort", null]]);
    expect(writeLocalStorage.mock.calls).toEqual([["sortMode", "asc"]]);
  });
});
