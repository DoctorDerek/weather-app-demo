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
  const Loading = () => <div>loading...</div>
  if (!weatherResult) return <Loading />

  const { icon, description } = weatherResult?.weather[0]
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png` // 4x size
  // Reference: https://openweathermap.org/weather-conditions
  const temperature = KtoF(weatherResult?.main?.temp)

  function Card({
    children,
    heading,
  }: {
    children: React.ReactNode
    heading: string
  }) {
    return (
      <div className="flex flex-col items-center justify-center w-64 p-4 mx-auto bg-white rounded-lg shadow-md drop-shadow-md">
        <h2 className="font-bold text-gray-600 uppercase">{heading}</h2>
        {children}
      </div>
    )
  }
  if (weatherResult.cod === 200)
    return (
      <Card heading={city}>
        <div>Temperature: {temperature} °F</div>
        <div className="grid w-24 h-24">
          <div className="relative">
            <ImageFixed src={iconUrl} layout="fill" className="object-cover" />
          </div>
        </div>
        <div>{description}</div>
      </Card>
    )

  return (
    <Card heading={`Error ${weatherResult.cod}`}>
      <div>{weatherResult.message}</div>
    </Card>
  )
}

export function KtoF(tempKelvin: number) {
  return Math.round(((tempKelvin - 273.15) * 9) / 5 + 32)
}
