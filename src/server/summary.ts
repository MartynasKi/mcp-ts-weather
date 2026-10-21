import type { DailyForecast, WeatherReport } from "../shared/weather-report.js";

// Plain-text fallback for hosts that cannot render the widget, and context for the model.
export function formatSummary({ location, current, daily }: WeatherReport): string {
  const place = [location.city, location.country].filter(Boolean).join(", ");
  const now =
    `${place}: ${current.condition.label}, ${degrees(current.temperature)} ` +
    `(feels like ${degrees(current.feelsLike)}), humidity ${current.humidity}%, ` +
    `wind ${Math.round(current.windSpeed)} km/h.`;
  const outlook = daily.map(formatDay).join("; ");

  return `${now}\nForecast: ${outlook}.`;
}

function formatDay({ date, condition, maxTemperature, minTemperature }: DailyForecast): string {
  return `${date} ${condition.label}, ${degrees(maxTemperature)} / ${degrees(minTemperature)}`;
}

function degrees(celsius: number): string {
  return `${Math.round(celsius)}°C`;
}
