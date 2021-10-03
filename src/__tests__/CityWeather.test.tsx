import "isomorphic-unfetch"

import { rest } from "msw"
import { setupServer } from "msw/node"

import CityWeather, { KtoF } from "@/src/components/CityWeather"
import { render, screen } from "@testing-library/react"

const currentWeatherConditions = "Overcast clouds"
const currentTemperatureInKelvin = 295.372
const currentTemperatureInFahrenheit = 72

test("KtoF conversion function works correctly", () => {
  expect(KtoF(currentTemperatureInKelvin)).toBe(currentTemperatureInFahrenheit)
})

// `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    const { city } = req.params
    if (new RegExp("fake", "i").exec(city))
      return res(
        ctx.json({
          cod: 404,
          message: "city not found",
        })
      )
    return res(
      ctx.json({
        weather: [
          {
            description: currentWeatherConditions,
          },
        ],
        main: {
          // temp in Kelvin
          temp: currentTemperatureInKelvin,
        },
        name: city,
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderCityWeather(city?: string) {
  if (city) return render(<CityWeather city={city} />)
  render(<CityWeather />)
}

test("<CityWeather> renders nothing with default props", () => {
  renderCityWeather()
  expect(screen.queryByText(/Temp/i)).toBeNull() // Temperature
})

test("<CityWeather> renders correctly when prop city='Memphis'", () => {
  const city = "Memphis"
  renderCityWeather(city)
  expect(screen.getByText(new RegExp(city, "i"))).toBeVisible()
  expect(screen.getByText(/Temp/i)).toBeVisible() // Temperature
  expect(
    screen.getByText(new RegExp(currentWeatherConditions, "i"))
  ).toBeVisible()
})

test("<CityWeather> renders 'not found' when prop city='FakeCity'", () => {
  const city = "FakeCity"
  renderCityWeather(city)
  expect(screen.queryByText(new RegExp(city, "i"))).toBeNull()
  expect(screen.queryByText(/Temp/i)).toBeNull() // Temperature
  expect(screen.getByText(/not found/i)).toBeVisible()
})
