import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "./App"
import WeatherReport from "./components/WeatherReport"

test("renders learn react link", () => {
  render(<App />)
  const linkElement = screen.getByText(/learn chakra/i)
  expect(linkElement).toBeInTheDocument()
})

test("renders weather report component", () => {
  render(<App />)
  const weatherReportElement = screen.getByText(/Today's Weather:/i)
  expect(weatherReportElement).toBeInTheDocument()
})
