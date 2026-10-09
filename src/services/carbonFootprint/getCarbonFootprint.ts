import { websiteUrl } from "@/config";

import { measurePageBytes } from "./measurePageBytes";
import {
  FootprintResult,
  FootprintError,
  ApiResponse,
  GreenCheckResponse,
} from "./types";

const config = {
  apiUrl: "https://api.websitecarbon.com/data",
  greenCheckUrl: "https://api.thegreenwebfoundation.org/api/v3/greencheck/",
  revalidateSeconds: 31 * 60 * 60 * 24, /** Refetch monthly */
}


const errorResponse: FootprintError = {
  wasSuccessful: false,
  reason: "Unable to get footprint data.",
};

const isGreenHosted = async (hostname: string) => {
  try {
    const res = await fetch(config.greenCheckUrl + hostname, {
      next: { revalidate: config.revalidateSeconds },
    });
    const data: GreenCheckResponse = await res.json();

    return data.green === true;
  } catch {
    return false;
  }
};

export const getCarbonFootprint = async (): Promise<
  FootprintError | FootprintResult
> => {
  try {
    const [bytes, green] = await Promise.all([
      measurePageBytes(websiteUrl),
      isGreenHosted(new URL(websiteUrl).hostname),
    ]);

    const res = await fetch(`${config.apiUrl}?bytes=${bytes}&green=${green ? 1 : 0}`, {
      next: { revalidate: config.revalidateSeconds },
    });

    if (!res.ok) {
      return errorResponse;
    }

    const data: ApiResponse = await res.json();

    if (
      typeof data.gco2e !== "number" ||
      typeof data.cleanerThan !== "number"
    ) {
      return errorResponse;
    }

    return {
      wasSuccessful: true,
      co2: Math.round(data.gco2e * 100) / 100,
      percentage: Math.round(data.cleanerThan * 100),
    };
  } catch {
    return errorResponse;
  }
};
