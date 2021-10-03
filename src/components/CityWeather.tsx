import ImageFixed from "next/image"
import { useEffect, useState } from "react"

// to get api key: https://openweathermap.org/appid
const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY

export default function CityWeather({ city }: { city?: string }) {
  const [weatherResult, setWeatherResult] = useState<CurrentWeatherData | null>(
    null
  )

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
        .then((r) => r.json())
        .then((result) => setWeatherResult(result))
    }
  }, [city])

  if (!city) return null
  if (!weatherResult) return <div>loading...</div>

  const icon = weatherResult.weather[0].icon
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
  // Reference: https://openweathermap.org/weather-conditions

  if (weatherResult.cod === 200)
    return (
      <div>
        <h1>{city}</h1>
        <div>Temperature: {KtoF(weatherResult.main.temp).toFixed(0)} °F</div>
        <div className="grid w-24 h-24">
          <div className="relative">
            <ImageFixed src={iconUrl} layout="fill" className="object-cover" />
          </div>
        </div>
        <div>Description: {weatherResult.weather[0].description}</div>
      </div>
    )
  return (
    <div>
      <h1>Error {weatherResult.cod}</h1>
      <div>{weatherResult.message}</div>
    </div>
  )
}

export function KtoF(tempKelvin: number) {
  return Math.round(((tempKelvin - 273.15) * 9) / 5 + 32)
}
