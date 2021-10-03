import "isomorphic-unfetch"

import { rest } from "msw"
import { setupServer } from "msw/node"

import CityWeather from "@/src/components/CityWeather"
import { render, screen } from "@testing-library/react"

const currentWeatherConditions = "Overcast clouds"
const currentTemperatureInKelvin = 295.372

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
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
  })
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
  expect(screen.queryByText(/Temp/i)).not.toBeVisible() // Temperature
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
