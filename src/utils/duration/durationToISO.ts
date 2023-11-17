import { Duration, DurationString } from "./types";

export const durationToISO = (duration: Duration): DurationString =>
  `P${duration.years}Y${duration.months}M${duration.days}DT${duration.hours}H${duration.minutes}M${duration.seconds}S`;
