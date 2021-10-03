import "isomorphic-unfetch"

import CityWeather from "@/src/components/CityWeather"
import { render, screen } from "@testing-library/react"

function renderCityWeatherLiveData(city?: string) {
  if (city) return render(<CityWeather city={city} />)
  render(<CityWeather />)
}

test("<CityWeather> renders nothing with default props with live data", () => {
  renderCityWeatherLiveData()
  expect(screen.queryByText(/Temp/i)).toBeNull() // Temperature
})

test("<CityWeather> renders correctly when prop city='Memphis' with live data", () => {
  const city = "Memphis"
  renderCityWeatherLiveData(city)
  expect(screen.queryByText(new RegExp(city, "i"))).toBeVisible()
  expect(screen.queryByText(/Temp/i)).toBeVisible() // Temperature
})

test("<CityWeather> renders nothing when prop city='FakeCity' with live data", () => {
  const city = "FakeCity"
  renderCityWeatherLiveData(city)
  expect(screen.queryByText(new RegExp(city, "i"))).toBeNull()
  expect(screen.queryByText(/Temp/i)).toBeNull() // Temperature
  expect(screen.getByText(/not found/i)).toBeVisible()
})
