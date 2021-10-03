// Note: this file will run before any test file and will run on all tests.
import "isomorphic-unfetch"
import "@testing-library/jest-dom/extend-expect" // add better assertions

import { rest } from "msw"
import { setupServer } from "msw/node"

// fix "Error: Uncaught [TypeError: window.matchMedia is not a function]",
// which is caused by the package next-themes when the server-side tests run
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

const currentWeatherConditions = "Overcast clouds"
const currentTemperatureInKelvin = 295.372
// const currentTemperatureInFahrenheit = 72

// `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
export const server = setupServer(
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
