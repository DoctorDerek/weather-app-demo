import "isomorphic-unfetch"

import { rest } from "msw"
import { setupServer } from "msw/node"

import CityWeather from "@/src/components/CityWeather"
import { render, screen } from "@testing-library/react"

const currentWeatherConditions = "Overcast clouds"
const currentTemperatureInKelvin = 295.372

// `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
const server = setupServer(
  rest.get(
    "https://api.openweathermap.org/data/2.5/weather?q=:city&appid=:API_KEY",
    (req, res, ctx) => {
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
        })
      )
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderCityWeather(city?: string) {
  if (city) return render(<CityWeather city={city} />)
  render(<CityWeather />)
}

test("<CityWeather> renders nothing with default props", async () => {
  renderCityWeather()
  expect(screen.queryByText(/Temp/i)).toBeNull() // Temperature
})

test("<CityWeather> renders correctly when prop city='Memphis'", async () => {
  const city = "Memphis"
  renderCityWeather(city)
  expect(screen.queryByText(new RegExp(city, "i"))).toBeVisible()
  expect(screen.queryByText(/Temp/i)).toBeVisible() // Temperature
  expect(
    screen.queryByText(new RegExp(currentWeatherConditions, "i"))
  ).toBeVisible() // Temperature
})

test("<CityWeather> renders nothing when prop city='FakeCity'", async () => {
  const city = "Memphis"
  renderCityWeather(city)
  expect(screen.queryByText(new RegExp(city, "i"))).toBeVisible()
  expect(screen.queryByText(/Temp/i)).toBeVisible() // Temperature
  expect(
    screen.queryByText(new RegExp(currentWeatherConditions, "i"))
  ).toBeVisible() // Temperature
})
