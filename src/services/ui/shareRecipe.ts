export const shareResponses = {
  clipboard: {
    wasSuccessful: true,
    text: "Link gekopiëerd naar clipboard.",
  },
  webApi: {
    wasSuccessful: true,
    text: "Link gedeeld via Share API.",
  },
  error: {
    wasSuccessful: false,
    text: "Er ging iets mis...",
  },
} as const;

export const shareRecipe = async (recipeName: string) => {
  const shareData: ShareData = {
    text: recipeName,
    title: "Een recept van Brouwerij Geel",
    url: window.location.href,
  };

  try {
    if (!navigator.share || !navigator.canShare(shareData)) {
      navigator.clipboard.writeText(shareData.url ?? "");
      return shareResponses.clipboard;
    }

    await navigator.share(shareData);
    return shareResponses.webApi;
  } catch (error) {
    return shareResponses.error;
  }
};
