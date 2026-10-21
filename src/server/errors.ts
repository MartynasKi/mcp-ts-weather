export class CityNotFoundError extends Error {
  constructor(city: string) {
    super(`Could not find a city named "${city}". Check the spelling or try a nearby larger city.`);
    this.name = "CityNotFoundError";
  }
}

export class WeatherServiceError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "WeatherServiceError";
  }
}
