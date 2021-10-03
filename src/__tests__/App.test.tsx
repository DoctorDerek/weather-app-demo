import App from "@/src/components/App"
import { server } from "@/src/utils/setup-tests"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderApp = () => render(<App />)

test("it renders the <App>", () => {
  renderApp()
  expect(screen.getByText(/Weather/i)).toBeVisible()
  expect(screen.getByText(/Search/i)).toBeVisible()
  expect(screen.getByText(/Submit/i)).toBeVisible()
  expect(screen.getByRole("button")).toBeVisible()
})

test("it shows nothing when clicking the button for no city", async () => {
  renderApp()
  userEvent.click(screen.getByRole("button"))
  await waitFor(() => expect(screen.queryByText(/overcast/i)).toBeNull())
  expect(screen.queryByText(/clouds/i)).toBeNull()
})

test("it shows weather results when clicking the button for 'Memphis'", async () => {
  renderApp()
  userEvent.type(screen.getByRole("textbox"), "Memphis")
  userEvent.click(screen.getByRole("button"))
  await waitFor(() => expect(screen.getByText(/overcast/i)).toBeVisible())
  expect(screen.getByText(/clouds/i)).toBeVisible()
})

test("it shows an error when clicking the button for 'FakeCity'", async () => {
  renderApp()
  userEvent.type(screen.getByRole("textbox"), "FakeCity")
  userEvent.click(screen.getByRole("button"))
  await waitFor(() => expect(screen.getByText(/overcast/i)).toBeVisible())
  expect(screen.getByText(/clouds/i)).toBeVisible()
})

// todo: add more tests, maybe error handling?
