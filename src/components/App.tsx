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
      <div className="relative z-10 flex flex-col justify-end h-screen py-8 sm:justify-start">
        {/** place the search bar at bottom on mobile for improved UX */}
        <form
          className="flex flex-wrap items-center justify-center"
          onSubmit={(e) => {
            e.preventDefault()
            const formdata = new FormData(e.currentTarget)
            setCity(String(formdata.get("city")))
          }}
        >
          <h1 className="pb-2 text-2xl font-semibold tracking-tight sm:text-base sm:pb-0">
            Weather Search:
          </h1>
          <div className="flex flex-wrap items-center justify-center">
            {/* wrapper div to avoid flex-wrap on mobile */}
            <input
              data-testid="weather-input"
              className="w-40 h-10 p-2 ml-2 border border-gray-300 border-solid rounded-l-lg"
              type="text"
              name="city"
            />
            <button
              className="h-10 p-2 text-xs font-bold text-white uppercase bg-[#4683c8] rounded-r-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        {city && <CityWeather city={city} />}
      </div>
      <BackgroundImage />
    </>
  )
}
