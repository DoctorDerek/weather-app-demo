[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=weather-app-demo)](https://weather-app-demo.vercel.app/?app=weather-app-demo) [![codecov](https://codecov.io/gh/DoctorDerek/weather-app-demo/branch/master/graph/badge.svg?token=7VDUW7TGZN)](https://codecov.io/gh/DoctorDerek/weather-app-demo) [![Build Status](https://travis-ci.com/DoctorDerek/weather-app-demo.svg?branch=master)](https://travis-ci.com/DoctorDerek/weather-app-demo)

# 📆 Weather App Demo - Next.js 11 + React 17 + Tailwind CSS + 100% Test Coverage

# ✅ Code Repaired by Dr. Derek Austin to Work and Match Design

# 👀 View Production Build at https://weather-app-demo.vercel.app

I repaired [this weather app](https://codesandbox.io/s/blazing-butterfly-6qudf) to actually work and match the design document.

Additionally, I added \_\_ other major features, including best practices and extensive test coverage.

Below you will find a complete feature set, discussion section, and technical journal.

## Required Features

1. ✅ Fix the bug where the app crashes when trying to request the weather

2. ✅ Refactor <CityWeather> to a function component using React Hooks

3. 🟩 Match the design

   - A designer has provided a comp on how this app should look (see design.png)
     - To match the design you may need to use different fields that are retuned from teh openweathermap API. For example, the weather condition three digit code can be [mapped to the icons here](https://openweathermap.org/weather-conditions)
   - Tailwindcss is installed and configured for you

4. 🟩 Improve web accessibility

   - Ensure that clicking on the label "Weather Search" puts focus into the text-input.
   - Make sure any loading states are correctly announced to a screen reader

5. ✅ Make the tests better

## Additional Features

1. ✅ Deployed production build of Next.js to Vercel with CI/CD
2. ✅ Upgraded Next.js to `@latest` (`v11.1.2`) and all other dependencies
3. ✅ Established engineering best practices:
   - Prettier, ESLint, Husky (Git Hooks), `tsconfig.json`, TypeScript Import Sorter, `.gitattributes`
4. ✅ Crafted unit tests for new code features (TDD / Test Driven Development)
   - Jest + React Testing Library with React Test Renderer
5. ✅ Wrote unit testing for existing code (16% ➡ 100% test coverage)
6. 🟩 Developed mobile-first, responsive UX design with Tailwind CSS

## Discussion Section

1. ✅ Talk about your changes

   - The bug was caused by the classic JavaScript problem where trying to access properties of `null` or `undefined` throws an error.

   - Avoiding that type of error, especially in production, is one of the main advantages of using TypeScript for static code analysis.

   - In this case, the `weatherResult` was not properly typed, and there was no error handling for `404` errors (`"city not found"`).

   - Before beginning work, I updated all dependencies and added multiple engineering standards, such as ESLint and Prettier.

   - ESLint helped identify related errors, such as `formdata.get("city").toString()` being unsafe vs. `String(formData.get("city"))`.

2. ✅ Talk about your changes

   - Acting like this was a "real" work environment with an "urgent" bugfix, I fixed the bug before refactoring to a function component.

   - However, given that this was really a new feature, I would have preferred to refactor and make the code clearer before implementation.

   - I also refactored the structure of the app significantly, including absolute paths (`@/src/**`), `eslint-plugin-tailwindcss`, and more.

   - Even though I moved the API_KEY to `.env.local`, it is still exposed in `.env.test` and in query parameters via the use of a GET request.

   - Ideally, the API_KEY secret would be protected by using a dummy variable in `.env.test` and using POST instead of GET to hit the API.

## Test Coverage Report - Jest & React Testing Library

### `npm run test`

Launches the test runner and generates code coverage report.

### `npm test:watch`

Launches the test runner in the interactive watch mode.

## Technical Journal

- `1.0.0` Existing codebase: Next.js 10 (TypeScript)
- `1.0.1` First commit by Dr. Derek Austin: `chore: delete yarn.lock`
- `1.1.0` Upgraded all dependencies and established best practices like Husky
- `1.2.0` Bugfix / Developed first working development build in Next.js
- `1.3.0` Refactored `<CityWeather>` to function component with `useEffect`
- `1.4.0` Fixed tests, added loading message, and deployed to Vercel with CI/CD
- `1.4.1` Reached 100% test coverage by adding `next-page-tester` to test `/`
- `` Designed animated motion toggle to switch between icons and hours
- `` Created dark mode for app using Tailwind CSS plus SVG animation toggle
