import { formatDuration } from "date-fns/formatDuration";
import { nl } from "date-fns/locale/nl";

import { parseDuration } from "./parseDuration";
import { DurationString } from "./types";

export const formatDurationString = (durationString: DurationString) => {
  const duration = parseDuration(durationString) ?? {};

  return formatDuration(duration, { locale: nl });
};
