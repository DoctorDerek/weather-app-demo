import { useState } from "react"

import BackgroundImage from "@/src/components/BackgroundImage"
import CityWeather from "@/src/components/CityWeather"

export default function App() {
  const [city, setCity] = useState<string | null>(null)
  return (
    <>
      <div className="relative z-10 py-2">
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

        {city && (
          <div className="mt-4">
            <CityWeather city={city} />
          </div>
        )}
      </div>
      <BackgroundImage />
    </>
  )
}
