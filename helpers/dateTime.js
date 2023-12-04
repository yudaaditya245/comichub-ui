import { DateTime } from "luxon";

export function formatDateAgo(dateString) {
  const now = new Date()  
  const diffInSeconds = Math.abs(now - new Date(dateString)) / 1000;
  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "week", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 }
  ];

  for (let unit of units) {
    const quotient = Math.floor(diffInSeconds / unit.seconds);
    if (quotient >= 1) {
      return `${quotient} ${unit.name}${quotient > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";

  // const dateTime = DateTime.utc(dateString);
  // const currentTime = new Date();
  // return JSON.stringify(dateTime) +" - "+ JSON.stringify(currentTime)

  // const diff = currentTime.diff(dateTime, ["years", "months", "days", "hours", "minutes", "seconds"]);

  // if (diff.years > 0) {
  //   return `${diff.years} year${diff.years > 1 ? "s" : ""} ago`;
  // } else if (diff.months > 0) {
  //   return `${diff.months} month${diff.months > 1 ? "s" : ""} ago`;
  // } else if (diff.days > 0) {
  //   return `${diff.days} day${diff.days > 1 ? "s" : ""} ago`;
  // } else if (diff.hours > 0) {
  //   return `${diff.hours} hour${diff.hours > 1 ? "s" : ""} ago`;
  // } else if (diff.minutes > 0) {
  //   return `${diff.minutes} minute${diff.minutes > 1 ? "s" : ""} ago`;
  // } else {
  //   return "a minute ago";
  // }
}
