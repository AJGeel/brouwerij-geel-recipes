import { describe, it, expect, afterEach, mock } from "bun:test";

import { getCarbonFootprint } from "./getCarbonFootprint";

describe("getCarbonFootprint", () => {
  const originalFetch = globalThis.fetch;
  const page = '<script src="/app.js"></script>';

  type Routes = {
    site?: () => Response;
    green?: () => Response;
    data?: () => Response;
  };

  const mockFetch = ({
    site = () => new Response(page),
    green = () => Response.json({ green: false }),
    data = () => Response.json({ gco2e: 0.1234, cleanerThan: 0.88 }),
  }: Routes = {}) => {
    const fetchMock = mock(async (input: string | URL | Request) => {
      const url = input.toString();

      if (url.includes("thegreenwebfoundation")) return green();
      if (url.includes("api.websitecarbon.com")) return data();
      if (url.endsWith("/app.js")) return new Response("x".repeat(1000));
      return site();
    });

    globalThis.fetch = fetchMock as unknown as typeof fetch;
    return fetchMock;
  };

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should return the rounded footprint when all requests succeed", async () => {
    mockFetch();

    const result = await getCarbonFootprint();
    expect(result).toEqual({ wasSuccessful: true, co2: 0.12, percentage: 88 });
  });

  it("should pass the measured bytes and green status to the API", async () => {
    const fetchMock = mockFetch({ green: () => Response.json({ green: true }) });

    await getCarbonFootprint();

    const dataUrl = fetchMock.mock.calls
      .map(([input]) => input.toString())
      .find((url) => url.includes("api.websitecarbon.com"));
    const bytes = new TextEncoder().encode(page).byteLength + 1000;
    expect(dataUrl).toEndWith(`/data?bytes=${bytes}&green=1`);
  });

  it("should treat a failing green check as not green", async () => {
    const fetchMock = mockFetch({
      green: () => new Response("Bad gateway", { status: 502 }),
    });

    const result = await getCarbonFootprint();

    const dataUrl = fetchMock.mock.calls
      .map(([input]) => input.toString())
      .find((url) => url.includes("api.websitecarbon.com"));
    expect(dataUrl).toEndWith("&green=0");
    expect(result.wasSuccessful).toBe(true);
  });

  it("should return an error when the API responds with an error status", async () => {
    mockFetch({
      data: () => Response.json({ error: "Unavailable" }, { status: 503 }),
    });

    const result = await getCarbonFootprint();
    expect(result.wasSuccessful).toBe(false);
  });

  it("should return an error when the response is missing data", async () => {
    mockFetch({ data: () => Response.json({ bytes: 1000 }) });

    const result = await getCarbonFootprint();
    expect(result.wasSuccessful).toBe(false);
  });

  it("should return an error when the site cannot be measured", async () => {
    mockFetch({ site: () => new Response("Not found", { status: 404 }) });

    const result = await getCarbonFootprint();
    expect(result.wasSuccessful).toBe(false);
  });

  it("should return an error when a request throws", async () => {
    globalThis.fetch = mock(async () => {
      throw new Error("Network error");
    }) as unknown as typeof fetch;

    const result = await getCarbonFootprint();
    expect(result.wasSuccessful).toBe(false);
  });
});
