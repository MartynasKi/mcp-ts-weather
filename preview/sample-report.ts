import { describeWeatherCode } from "../src/server/weather-codes.js";
import type { WeatherReport, WeatherTheme } from "../src/shared/weather-report.js";

// One representative WMO code per theme, so every gradient can be previewed.
const SAMPLE_CODE_BY_THEME: Record<WeatherTheme, number> = {
  clear: 0,
  cloudy: 3,
  fog: 45,
  rain: 63,
  snow: 73,
  storm: 95,
};

export function createSampleReport(theme: WeatherTheme): WeatherReport {
  return {
    location: { city: "Vilnius", country: "Lithuania" },
    current: {
      temperature: 8.2,
      feelsLike: 4.9,
      humidity: 87,
      windSpeed: 16.2,
      condition: describeWeatherCode(SAMPLE_CODE_BY_THEME[theme]),
    },
    daily: [
      { date: "2026-10-21", condition: describeWeatherCode(3), maxTemperature: 13.1, minTemperature: 5.5 },
      { date: "2026-10-22", condition: describeWeatherCode(61), maxTemperature: 11.4, minTemperature: 7.2 },
      { date: "2026-10-23", condition: describeWeatherCode(0), maxTemperature: 14.8, minTemperature: 4.1 },
      { date: "2026-10-24", condition: describeWeatherCode(71), maxTemperature: 2.4, minTemperature: -3.7 },
      { date: "2026-10-25", condition: describeWeatherCode(95), maxTemperature: 12.2, minTemperature: 5.2 },
    ],
  };
}
