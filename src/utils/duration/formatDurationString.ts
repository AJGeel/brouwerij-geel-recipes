import { formatDuration } from "date-fns";
import { parseDuration } from "./parseDuration";
import { DurationString } from "./types";
import { nl } from "date-fns/locale";

export const formatDurationString = (durationString: DurationString) => {
  const duration = parseDuration(durationString) ?? {};

  return formatDuration(duration, { locale: nl });
};
