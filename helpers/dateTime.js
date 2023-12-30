import { DateTime } from "luxon";

export function formatDateAgo(dateString) {
  const now = new Date();
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
}

export function convertStringToTimestamp(timeAgoString = "") {
  const currentTime = new Date();
  let timestamp;

  if (timeAgoString.includes("second")) {
    const seconds = parseInt(timeAgoString);
    timestamp = currentTime - seconds * 1000;
  } else if (timeAgoString.includes("min")) {
    const minutes = parseInt(timeAgoString);
    timestamp = currentTime - minutes * 60 * 1000;
  } else if (timeAgoString.includes("hour")) {
    const hours = parseInt(timeAgoString);
    timestamp = currentTime - hours * 60 * 60 * 1000;
  } else if (timeAgoString.includes("day")) {
    const days = parseInt(timeAgoString);
    timestamp = currentTime - days * 24 * 60 * 60 * 1000;
  } else if (timeAgoString.includes("week")) {
    const weeks = parseInt(timeAgoString);
    timestamp = currentTime - weeks * 7 * 24 * 60 * 60 * 1000;
  } else if (timeAgoString.includes("month")) {
    const months = parseInt(timeAgoString);
    // Assuming 30 days in a month for simplicity
    timestamp = currentTime - months * 30 * 24 * 60 * 60 * 1000;
  } else if (timeAgoString.includes("year")) {
    const years = parseInt(timeAgoString);
    timestamp = currentTime - years * 12 * 30 * 24 * 60 * 60 * 1000;
  } else {
    timestamp = currentTime;
  }

  return new Date(timestamp);
}