import { Duration } from "./types";

export const parseDuration = (durationString: string): Duration | undefined => {
  const durationRegex =
    /P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?)?/;
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
