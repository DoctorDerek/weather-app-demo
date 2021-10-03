import "isomorphic-unfetch"

import { rest } from "msw"
import { setupServer } from "msw/node"

import App from "@/src/components/App"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

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

const renderApp = () => render(<App />)

test("it renders the <App>", async () => {
  renderApp()
  expect(screen.getByText(/Weather/i)).toBeVisible()
  expect(screen.getByText(/Search/i)).toBeVisible()
  expect(screen.getByText(/Submit/i)).toBeVisible()
  expect(screen.getByRole("button")).toBeVisible()
})

test("it shows weather results when clicking the button", async () => {
  renderApp()
  userEvent.click(screen.getByRole("button"))
  await waitFor(() => expect(screen.getByText(/overcast/i)).toBeVisible())
  expect(screen.getByText(/clouds/i)).toBeVisible()
})

// todo: add more tests, maybe error handling?
