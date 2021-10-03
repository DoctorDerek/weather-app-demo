import { useRouter } from "next/router"
import { useState } from "react"

import BackgroundImage from "@/src/components/BackgroundImage"
import CityWeather from "@/src/components/CityWeather"

export default function App() {
  const { query } = useRouter()
  const qParam = query.q ? String(query.q) : null
  // http://localhost:3000/?q=Puerto+Morelos
  const cityParam = query.city ? String(query.city) : null
  // https://weather-app-demo-doctorderek.vercel.app/?city=Puerto+Morelos
  const defaultCity = qParam || cityParam
  const [city, setCity] = useState<string | null>(defaultCity)

  return (
    <>
      <div className="relative z-10 pt-8">
        <form
          className="flex items-center justify-center"
          onSubmit={(e) => {
            e.preventDefault()
            const formdata = new FormData(e.currentTarget)
            setCity(String(formdata.get("city")))
          }}
        >
          <h1 className="font-semibold">Weather Search:</h1>{" "}
          <input
            data-testid="weather-input"
            className="px-2 py-1 ml-2 border border-black"
            type="text"
            name="city"
          />
          <button className="p-2 ml-2 text-sm border rounded-lg" type="submit">
            Submit
          </button>
        </form>

        {city && <CityWeather city={city} />}
      </div>
      <BackgroundImage />
    </>
  )
}
