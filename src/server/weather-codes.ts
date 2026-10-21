import type { WeatherCondition } from "../shared/weather-report.js";

// WMO weather interpretation codes, as documented at https://open-meteo.com/en/docs
const WEATHER_CODES = new Map<number, WeatherCondition>([
  [0, { label: "Clear sky", emoji: "☀️", theme: "clear" }],
  [1, { label: "Mainly clear", emoji: "🌤️", theme: "clear" }],
  [2, { label: "Partly cloudy", emoji: "⛅", theme: "cloudy" }],
  [3, { label: "Overcast", emoji: "☁️", theme: "cloudy" }],
  [45, { label: "Fog", emoji: "🌫️", theme: "fog" }],
  [48, { label: "Rime fog", emoji: "🌫️", theme: "fog" }],
  [51, { label: "Light drizzle", emoji: "🌦️", theme: "rain" }],
  [53, { label: "Drizzle", emoji: "🌦️", theme: "rain" }],
  [55, { label: "Dense drizzle", emoji: "🌧️", theme: "rain" }],
  [56, { label: "Light freezing drizzle", emoji: "🌧️", theme: "rain" }],
  [57, { label: "Freezing drizzle", emoji: "🌧️", theme: "rain" }],
  [61, { label: "Light rain", emoji: "🌦️", theme: "rain" }],
  [63, { label: "Rain", emoji: "🌧️", theme: "rain" }],
  [65, { label: "Heavy rain", emoji: "🌧️", theme: "rain" }],
  [66, { label: "Light freezing rain", emoji: "🌧️", theme: "rain" }],
  [67, { label: "Freezing rain", emoji: "🌧️", theme: "rain" }],
  [71, { label: "Light snow", emoji: "🌨️", theme: "snow" }],
  [73, { label: "Snow", emoji: "🌨️", theme: "snow" }],
  [75, { label: "Heavy snow", emoji: "❄️", theme: "snow" }],
  [77, { label: "Snow grains", emoji: "🌨️", theme: "snow" }],
  [80, { label: "Light showers", emoji: "🌦️", theme: "rain" }],
  [81, { label: "Showers", emoji: "🌧️", theme: "rain" }],
  [82, { label: "Violent showers", emoji: "⛈️", theme: "storm" }],
  [85, { label: "Snow showers", emoji: "🌨️", theme: "snow" }],
  [86, { label: "Heavy snow showers", emoji: "❄️", theme: "snow" }],
  [95, { label: "Thunderstorm", emoji: "⛈️", theme: "storm" }],
  [96, { label: "Thunderstorm with hail", emoji: "⛈️", theme: "storm" }],
  [99, { label: "Thunderstorm with heavy hail", emoji: "⛈️", theme: "storm" }],
]);

const UNKNOWN_CONDITION: WeatherCondition = { label: "Unknown", emoji: "🌡️", theme: "cloudy" };

export function describeWeatherCode(code: number): WeatherCondition {
  return WEATHER_CODES.get(code) ?? UNKNOWN_CONDITION;
}
