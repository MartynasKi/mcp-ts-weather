// The rest of the card is in English, so weekday names stay English too.
const LOCALE = "en-US";

export function formatTemperature(celsius: number): string {
  return `${Math.round(celsius)}°`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatWindSpeed(kilometersPerHour: number): string {
  return `${Math.round(kilometersPerHour)} km/h`;
}

// The forecast starts today in the city's own time zone, so the first entry is always "Today".
export function formatDayName(isoDate: string, dayIndex: number): string {
  if (dayIndex === 0) {
    return "Today";
  }
  // Appending a time makes the date parse as local midnight instead of UTC midnight.
  return new Date(`${isoDate}T00:00`).toLocaleDateString(LOCALE, { weekday: "short" });
}
