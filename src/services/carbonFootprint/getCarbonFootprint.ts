import { websiteUrl } from "@/config";

import { FootprintResult, FootprintError, ApiResponse } from "./types";

const apiUrl = "https://api.websitecarbon.com/b?url=";

const errorResponse: FootprintError = {
  wasSuccessful: false,
  reason: "Unable to get footprint data.",
};

export const getCarbonFootprint = async (): Promise<
  FootprintError | FootprintResult
> => {
  const res = await fetch(apiUrl + encodeURI(websiteUrl));

  if (!res) {
    return errorResponse;
  }

  const data: ApiResponse = await res.json();

  if (!data.c || !data.p) {
    return errorResponse;
  }

  return {
    wasSuccessful: true,
    co2: data.c,
    percentage: data.p,
  };
};
