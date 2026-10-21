import type { z } from "zod";
import { WeatherServiceError } from "../errors.js";

const REQUEST_TIMEOUT_MS = 10_000;

export async function fetchJson<T>(url: URL, schema: z.ZodType<T>): Promise<T> {
  const response = await send(url);
  if (!response.ok) {
    throw new WeatherServiceError(`The weather service responded with HTTP ${response.status}.`);
  }

  // Invalid JSON is treated like any other unexpected body: the schema check below rejects it.
  const body: unknown = await response.json().catch(() => undefined);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw new WeatherServiceError("The weather service returned an unexpected response.", {
      cause: parsed.error,
    });
  }
  return parsed.data;
}

async function send(url: URL): Promise<Response> {
  try {
    return await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  } catch (error) {
    throw new WeatherServiceError(
      "Could not reach the weather service. Check the internet connection and try again.",
      { cause: error },
    );
  }
}
