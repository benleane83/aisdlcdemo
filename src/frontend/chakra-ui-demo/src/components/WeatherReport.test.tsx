import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import WeatherReport from "./WeatherReport";

const renderWithChakra = (ui) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe("WeatherReport", () => {
  test("renders location selector", () => {
    renderWithChakra(<WeatherReport />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  test("renders weather forecast for today and next 7 days", async () => {
    renderWithChakra(<WeatherReport />);
    const todayWeather = await screen.findByText(/Today's Weather:/i);
    expect(todayWeather).toBeInTheDocument();

    const next7DaysWeather = await screen.findByText(/Next 7 Days:/i);
    expect(next7DaysWeather).toBeInTheDocument();
  });

  test("changes location and updates weather forecast", async () => {
    renderWithChakra(<WeatherReport />);
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "Los Angeles" } });

    const todayWeather = await screen.findByText(/Today's Weather:/i);
    expect(todayWeather).toBeInTheDocument();

    const next7DaysWeather = await screen.findByText(/Next 7 Days:/i);
    expect(next7DaysWeather).toBeInTheDocument();
  });
});
