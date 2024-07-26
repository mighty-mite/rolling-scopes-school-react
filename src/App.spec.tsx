import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

describe("App component tests", () => {
  it("changes theme when the theme toggler is toggled", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Select the app container
    const app = screen.getByTestId("application");

    // Find the theme toggler select element using a more direct approach
    const themeToggle = screen.getByTestId("theme-toggle");

    // Check initial theme
    expect(app).toHaveClass("app light");

    // Change to dark theme
    fireEvent.change(themeToggle, { target: { value: "dark" } });
    expect(app).toHaveClass("app dark");

    // Change back to light theme
    fireEvent.change(themeToggle, { target: { value: "light" } });
    expect(app).toHaveClass("app light");
  });
});
