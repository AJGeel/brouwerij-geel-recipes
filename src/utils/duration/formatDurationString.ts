import { formatDuration } from "date-fns";
import { nl } from "date-fns/locale";

import { parseDuration } from "./parseDuration";
import { DurationString } from "./types";

export const formatDurationString = (durationString: DurationString) => {
  const duration = parseDuration(durationString) ?? {};

  return formatDuration(duration, { locale: nl });
};
