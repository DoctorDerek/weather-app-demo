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
          <h1 className="text-base font-semibold tracking-tight">
            Weather Search:
          </h1>
          <input
            data-testid="weather-input"
            className="w-40 h-10 p-2 ml-2 border border-gray-300 border-solid rounded-l-lg"
            type="text"
            name="city"
          />
          <button
            className="h-10 p-2 text-xs font-bold text-white uppercase bg-[#4683c8] border border-[#4683c8] border-solid rounded-r-lg"
            type="submit"
          >
            Submit
          </button>
        </form>

        {city && <CityWeather city={city} />}
      </div>
      <BackgroundImage />
    </>
  )
}
