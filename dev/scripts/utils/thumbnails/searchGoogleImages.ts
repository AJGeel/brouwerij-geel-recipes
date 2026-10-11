import { getBrowser, SearchUnavailableError } from "./browserSession";
import { isStockPhotoSite } from "./isStockPhotoSite";

export type Candidate = {
  image: Buffer;
  dataUrl: string;
  /** The page the image is from, to check its licence */
  page?: string;
};

// Smaller than this is an icon or a logo, not a result
const MIN_RESULT_WIDTH = 120;

/**
 * Reads the result thumbnails of a Google Images search through the
 * developer's own Chrome. It is a scrape and can break when Google changes.
 */
export const searchGoogleImages = async (
  query: string,
  limit = 6,
): Promise<Candidate[]> => {
  const page = await (await getBrowser()).newPage();

  try {
    await page.goto(
      `https://www.google.com/search?q=${encodeURIComponent(query)}&udm=2&hl=nl`,
      { waitUntil: "networkidle2" },
    );

    if (page.url().includes("/sorry/")) {
      throw new SearchUnavailableError("Google asked for a captcha.");
    }

    const results = await page.$$eval(
      "img",
      (images, minWidth) =>
        images
          .filter(
            (img) =>
              img.naturalWidth >= minWidth && img.src.startsWith("data:image"),
          )
          .map((img) => ({
            dataUrl: img.src,
            page:
              img.closest("[data-lpage]")?.getAttribute("data-lpage") ??
              undefined,
          })),
      MIN_RESULT_WIDTH,
    );

    const unique = [
      ...new Map(results.map((result) => [result.dataUrl, result])).values(),
    ];

    return unique
      .filter(({ page }) => !isStockPhotoSite(page))
      .slice(0, limit)
      .map(({ dataUrl, page }) => ({
        image: Buffer.from(dataUrl.split(",")[1], "base64"),
        dataUrl,
        page,
      }));
  } finally {
    await page.close();
  }
};
