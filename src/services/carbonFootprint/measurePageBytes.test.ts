import { describe, it, expect } from "bun:test";

import { extractAssetUrls } from "./measurePageBytes";

describe("extractAssetUrls", () => {
  const pageUrl = "https://example.com/";

  it("should find scripts, stylesheets and preloaded assets", () => {
    const html = `
      <link rel="preload" href="/font.woff2" as="font"/>
      <link rel="stylesheet" href="/style.css"/>
      <script src="/app.js" async=""></script>
      <script>inline()</script>
    `;

    expect(extractAssetUrls(html, pageUrl)).toEqual([
      "https://example.com/font.woff2",
      "https://example.com/style.css",
      "https://example.com/app.js",
    ]);
  });

  it("should ignore links that are not downloaded on load", () => {
    const html = `
      <link rel="author" href="https://www.linkedin.com/in/someone"/>
      <link rel="canonical" href="/"/>
      <a href="/tag">Tags</a>
    `;

    expect(extractAssetUrls(html, pageUrl)).toEqual([]);
  });

  it("should pick the smallest srcset image of at least 800px wide", () => {
    const html = `<img srcSet="/img?w=640&amp;q=75 640w, /img?w=828&amp;q=75 828w, /img?w=1080&amp;q=75 1080w" src="/img?w=3840&amp;q=75"/>`;

    expect(extractAssetUrls(html, pageUrl)).toEqual([
      "https://example.com/img?w=828&q=75",
    ]);
  });

  it("should fall back to the largest srcset image when none are wide enough", () => {
    const html = `<img srcset="/small.jpg 320w, /medium.jpg 640w" src="/large.jpg"/>`;

    expect(extractAssetUrls(html, pageUrl)).toEqual([
      "https://example.com/medium.jpg",
    ]);
  });

  it("should use src for images without a srcset", () => {
    const html = `<img alt="Logo" src="/logo.svg"/>`;

    expect(extractAssetUrls(html, pageUrl)).toEqual([
      "https://example.com/logo.svg",
    ]);
  });

  it("should skip data URIs and remove duplicates", () => {
    const html = `
      <img src="data:image/gif;base64,R0lGOD"/>
      <script src="/app.js"></script>
      <link rel="preload" as="script" href="/app.js"/>
    `;

    expect(extractAssetUrls(html, pageUrl)).toEqual([
      "https://example.com/app.js",
    ]);
  });
});
