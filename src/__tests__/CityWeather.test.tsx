import "isomorphic-unfetch"

import { rest } from "msw"
import { setupServer } from "msw/node"

import CityWeather from "@/src/components/CityWeather"
import { render, screen } from "@testing-library/react"

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    return res(
      ctx.json({
        weather: [
          {
            description: "Overcast clouds",
          },
        ],
        main: {
          // temp in Kelvin
          temp: 295.372,
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
  renderCityWeather("Memphis")
  expect(screen.queryByText(/Temp/i)).toBeVisible() // Temperature
})
