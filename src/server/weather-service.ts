import type { WeatherReport } from "../shared/weather-report.js";
import { fetchForecast } from "./open-meteo/forecast.js";
import { findCity } from "./open-meteo/geocoding.js";

export async function getWeatherReport(cityName: string): Promise<WeatherReport> {
  const city = await findCity(cityName);
  const forecast = await fetchForecast(city);

  return {
    location: { city: city.name, country: city.country },
    ...forecast,
  };
}
