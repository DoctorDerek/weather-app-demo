import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "isomorphic-unfetch";

import App from "./index";

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    return res(
      ctx.json({
        weather: [
          {
            description: "Overcast clouds"
          }
        ],
        main: {
          // temp in Kelvin
          temp: 295.372
        }
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it shows weather results", async () => {
  render(<App />);
  // todo: write some assertions
});

// todo: add more tests, maybe error handling?
