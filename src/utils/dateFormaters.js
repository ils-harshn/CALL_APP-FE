import { format, isToday, isYesterday, isThisWeek, isThisYear } from "date-fns";

export function DTMformatDate(timestamp) {
  const date = new Date(timestamp);
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else if (isThisWeek(date)) {
    return format(date, "EEE"); // Returns day of the week, e.g., 'Mon'
  } else if (isThisYear(date)) {
    return format(date, "dd/MM"); // Returns date in format DD/MM
  } else {
    return format(date, "dd/MM/yyyy"); // Returns full date in format DD/MM/YYYY
  }
}

export const MessageDateTimeFormatter = (timestamp) => {
  const date = new Date(timestamp);
  const timeFormat = "hh:mm a"; // Format for time (e.g., 02:30 PM)
  const dateFormat = "dd/MM/yy"; // Format for date (e.g., 04/09/24)

  if (isToday(date)) {
    return format(date, `${timeFormat}`);
  } else if (isYesterday(date)) {
    return `${format(date, timeFormat)} Yesterday`;
  } else if (isThisWeek(date)) {
    return `${format(date, `${timeFormat} EEE`)}`; // EEE for abbreviated day of the week
  } else {
    return `${format(date, `${timeFormat} ${dateFormat}`)}`; // Date format for other dates
  }
};
