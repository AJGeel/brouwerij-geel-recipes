export interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * ISO 8601 Duration: https://en.wikipedia.org/wiki/ISO_8601#Durations
 */
export type DurationString = string;
