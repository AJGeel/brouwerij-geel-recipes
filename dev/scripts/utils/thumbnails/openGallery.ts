import { getGalleryPage } from "./browserSession";
import { renderGallery, type Gallery } from "./renderGallery";

/** Terminals can't show images, so previews open in the same Chrome window as the search */
export const openGallery = async (gallery: Gallery) => {
  const page = await getGalleryPage();

  await page.setContent(renderGallery(gallery));
  await page.bringToFront();
};
