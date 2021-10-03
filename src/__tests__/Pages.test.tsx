import { getPage } from "next-page-tester"

import { screen } from "@testing-library/react"

it("renders the homepage /", async () => {
  const { render } = await getPage({
    route: "/",
    useApp: false, // don't load custom _app.tsx
  })

  render()
  expect(screen.getByText(/Weather/i)).toBeVisible()
  expect(screen.getByText(/Search/i)).toBeVisible()
  expect(screen.getByRole("button")).toBeVisible()
  expect(screen.getByRole("textbox")).toBeVisible()
})
