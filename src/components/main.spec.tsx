import { render, screen } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";
import { store } from "@/store/store";
import ThemeContext from "@/themeContext/themeContext";

import ErrorBoundary from "./errorBoundary/ErrorBoundary";

describe("Main entry point", () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <ReduxProvider store={store}>
        <ThemeContext.Provider value="light">
          <BrowserRouter>
            <ErrorBoundary>{ui}</ErrorBoundary>
          </BrowserRouter>
        </ThemeContext.Provider>
      </ReduxProvider>
    );
  };

  it("renders the App component", () => {
    renderWithProviders(<App />);

    expect(screen.getByTestId("application")).toBeInTheDocument();
  });
});
