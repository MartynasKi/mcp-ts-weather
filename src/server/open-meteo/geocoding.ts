import { z } from "zod";
import { CityNotFoundError } from "../errors.js";
import { fetchJson } from "./http-client.js";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

const geocodingResponseSchema = z.object({
  // Open-Meteo omits `results` entirely when nothing matches.
  results: z
    .array(
      z.object({
        name: z.string(),
        country: z.string().optional(),
        latitude: z.number(),
        longitude: z.number(),
      }),
    )
    .optional(),
});

export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export async function findCity(name: string): Promise<City> {
  const url = new URL(GEOCODING_URL);
  url.search = new URLSearchParams({ name, count: "1", language: "en", format: "json" }).toString();

  const { results } = await fetchJson(url, geocodingResponseSchema);
  const bestMatch = results?.[0];
  if (!bestMatch) {
    throw new CityNotFoundError(name);
  }

  return {
    name: bestMatch.name,
    country: bestMatch.country ?? "",
    latitude: bestMatch.latitude,
    longitude: bestMatch.longitude,
  };
}
