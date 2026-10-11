import type { Duration } from "./types";

export const parseDuration = (durationString: string): Duration | undefined => {
  const durationRegex =
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/;
  const matches = durationString.match(durationRegex);

  if (!matches) {
    return;
  }

  const [, years, months, days, hours, minutes, seconds] = matches.map(Number);

  return {
    years: years || 0,
    months: months || 0,
    days: days || 0,
    hours: hours || 0,
    minutes: minutes || 0,
    seconds: seconds || 0,
  };
};
