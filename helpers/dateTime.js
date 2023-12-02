import { DateTime } from "luxon";

export function formatDateAgo(dateString) {
  const dateTime = DateTime.fromISO(dateString);
  const currentTime = DateTime.local();

  const diff = currentTime.diff(dateTime, ["years", "months", "days", "hours", "minutes", "seconds"]);
  
  if (diff.years > 0) {
    return `${diff.years} year${diff.years > 1 ? "s" : ""} ago`;
  } else if (diff.months > 0) {
    return `${diff.months} month${diff.months > 1 ? "s" : ""} ago`;
  } else if (diff.days > 0) {
    return `${diff.days} day${diff.days > 1 ? "s" : ""} ago`;
  } else if (diff.hours > 0) {
    return `${diff.hours} hour${diff.hours > 1 ? "s" : ""} ago`;
  } else if (diff.minutes > 0) {
    return `${diff.minutes} minute${diff.minutes > 1 ? "s" : ""} ago`;
  } else {
    return "a minute ago";
  }
}
