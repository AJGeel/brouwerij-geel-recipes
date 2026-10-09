// Approximates a desktop browser rendering the ~400px wide recipe cards at 2x
const minimumImageWidth = 800;

const linkRelsToMeasure = ["stylesheet", "preload", "modulepreload", "icon"];

const getAttribute = (tag: string, name: string) =>
  tag
    .match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1]
    ?.replaceAll("&amp;", "&");

const pickImageFromSrcSet = (srcSet: string) => {
  const candidates = srcSet
    .split(",")
    .map((candidate) => {
      const [url, descriptor] = candidate.trim().split(/\s+/);
      return { url, width: parseInt(descriptor ?? "", 10) || 0 };
    })
    .sort((a, b) => a.width - b.width);

  return (
    candidates.find(({ width }) => width >= minimumImageWidth) ??
    candidates.at(-1)
  )?.url;
};

const getAssetFromTag = (tag: string) => {
  const tagName = tag.match(/^<(\w+)/)?.[1]?.toLowerCase();

  if (tagName === "script") {
    return getAttribute(tag, "src");
  }

  if (tagName === "link") {
    const rel = getAttribute(tag, "rel")?.toLowerCase() ?? "";
    return linkRelsToMeasure.includes(rel)
      ? getAttribute(tag, "href")
      : undefined;
  }

  if (tagName === "img") {
    const srcSet = getAttribute(tag, "srcset");
    return srcSet ? pickImageFromSrcSet(srcSet) : getAttribute(tag, "src");
  }
};

/**
 * Finds the scripts, stylesheets, fonts, icons and images a browser downloads
 * when loading the page, resolved to absolute URLs.
 */
export const extractAssetUrls = (html: string, pageUrl: string) => {
  const tags = html.match(/<(script|link|img)\b[^>]*>/gi) ?? [];
  const urls = tags
    .map(getAssetFromTag)
    .filter((url): url is string => !!url && !url.startsWith("data:"))
    .map((url) => new URL(url, pageUrl).href);

  return Array.from(new Set(urls));
};

const getTransferSize = async (res: Response) => {
  // Prefer the header, as it reflects the compressed size sent over the wire
  const contentLength = Number(res.headers.get("content-length"));

  if (contentLength > 0) {
    return contentLength;
  }

  return (await res.arrayBuffer()).byteLength;
};

const fetchSize = async (url: string) => {
  try {
    const res = await fetch(url);
    return res.ok ? await getTransferSize(res) : 0;
  } catch {
    return 0;
  }
};

/**
 * Estimates the number of bytes transferred when loading the page: the HTML
 * plus every asset it references.
 */
export const measurePageBytes = async (pageUrl: string) => {
  const res = await fetch(pageUrl);

  if (!res.ok) {
    throw new Error(`Unable to load ${pageUrl}: ${res.status}`);
  }

  const html = await res.text();
  const htmlSize =
    Number(res.headers.get("content-length")) ||
    new TextEncoder().encode(html).byteLength;

  const assetSizes = await Promise.all(
    extractAssetUrls(html, pageUrl).map(fetchSize)
  );

  return assetSizes.reduce((total, size) => total + size, htmlSize);
};
