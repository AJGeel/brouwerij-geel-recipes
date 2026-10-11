// Paid stock sites put a watermark on their previews
const stockHosts =
  /(?:^|\.)(?:123rf|dreamstime|shutterstock|istockphoto|depositphotos|alamy|gettyimages|stock\.adobe|bigstockphoto|canstockphoto|vecteezy|freepik|pngtree)\./;

export const hostOf = (page: string) => {
  try {
    return new URL(page).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
};

export const isStockPhotoSite = (page?: string) => {
  const host = page && hostOf(page);

  return Boolean(host && stockHosts.test(`${host}.`));
};
