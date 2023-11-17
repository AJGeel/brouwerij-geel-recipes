import { Duration } from "./types";

export const minutesToDuration = (totalMinutes: number): Duration => {
  const minutesInHour = 60;
  const minutesInDay = 24 * minutesInHour;
  const minutesInYear = 365 * minutesInDay;

  const years = Math.floor(totalMinutes / minutesInYear);
  const remainingMinutesAfterYears = totalMinutes % minutesInYear;

  const months = Math.floor(remainingMinutesAfterYears / (30 * minutesInDay));
  const remainingMinutesAfterMonths =
    remainingMinutesAfterYears % (30 * minutesInDay);

  const days = Math.floor(remainingMinutesAfterMonths / minutesInDay);
  const remainingMinutesAfterDays = remainingMinutesAfterMonths % minutesInDay;

  const hours = Math.floor(remainingMinutesAfterDays / minutesInHour);
  const remainingMinutesAfterHours = remainingMinutesAfterDays % minutesInHour;

  const minutes = Math.floor(remainingMinutesAfterHours);
  const seconds = Math.floor((remainingMinutesAfterHours - minutes) * 60);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};
