// Trimmed real responses from Open-Meteo, so tests exercise the actual payload shape.
export const SIAULIAI_GEOCODING_RESPONSE_SAMPLE = {
  results: [
    {
      id: 594739,
      name: "Šiauliai",
      latitude: 55.93333,
      longitude: 23.31667,
      country_code: "LT",
      country: "Lithuania",
    },
  ],
};

export const EMPTY_GEOCODING_RESPONSE = { generationtime_ms: 0.1 };

export const SIAULIAI_FORECAST_RESPONSE_SAMPLE = {
  timezone: "Europe/Vilnius",
  current: {
    time: "2026-10-21T10:45",
    temperature_2m: 8.2,
    apparent_temperature: 4.9,
    relative_humidity_2m: 87,
    wind_speed_10m: 16.2,
    weather_code: 0,
  },
  daily: {
    time: ["2026-10-21", "2026-10-22", "2026-10-23", "2026-10-24", "2026-10-25"],
    weather_code: [3, 3, 53, 3, 3],
    temperature_2m_max: [13.1, 13.3, 11.1, 12.4, 12.2],
    temperature_2m_min: [5.5, 9.2, 9.0, 5.7, 5.2],
  },
};
