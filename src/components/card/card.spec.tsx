import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import ThemeContext from "@/themeContext/themeContext";

import Card from "./Card";

// Mock slice
const mockFlyoutSlice = {
  reducer: (state = { selected: [] }) => state,
};

const store = configureStore({
  reducer: {
    flyout: mockFlyoutSlice.reducer,
  },
});

describe("Card component test", () => {
  it("renders the relevant card data", () => {
    const thumbnail =
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png";
    const title = "Essence Mascara Lash Princess";
    const id = 1;

    render(
      <Provider store={store}>
        <ThemeContext.Provider value="light">
          <MemoryRouter>
            <Card thumbnail={thumbnail} title={title} id={id} />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    // Check if the title is rendered
    expect(
      screen.getByText("Essence Mascara Lash Princess")
    ).toBeInTheDocument();
  });
});
