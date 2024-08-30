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
