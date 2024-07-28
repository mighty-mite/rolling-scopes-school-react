/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ThemeContext from "@/themeContext/themeContext";

import { cardListSlice } from "../cardlist/cardListSlice";
import Details from "./Details";

// Define mock details data
const mockDetailsData = {
  title: "Essence Mascara Lash Princess",
  warrantyInformation: "1 month warranty",
  thumbnail:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
};

// Mock the API hook
jest.mock("./../cardlist/cardListSlice", () => ({
  ...jest.requireActual("./../cardlist/cardListSlice"),
  useGetSingleCardQuery: jest.fn().mockReturnValue({
    data: {
      title: "Essence Mascara Lash Princess",
      warrantyInformation: "1 month warranty",
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    },
    isLoading: false,
  }),
}));

// Create a mock store for testing
const store = configureStore({
  reducer: {
    [cardListSlice.reducerPath]: cardListSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cardListSlice.middleware),
});

describe("Details component test", () => {
  it("displays the detailed card data correctly", async () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value="light">
          <MemoryRouter initialEntries={["/details/1"]}>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    // Wait for the component to render the data
    await waitFor(() => {
      // Check if the title is rendered
      expect(
        screen.getByText("Essence Mascara Lash Princess")
      ).toBeInTheDocument();
      // Check if the warranty is rendered
      expect(screen.getByText("1 month warranty")).toBeInTheDocument();
      // Check if the image is rendered with the correct src
      expect(screen.getByRole("img", { name: "" })).toHaveAttribute(
        "src",
        mockDetailsData.thumbnail
      );
    });
  });
});
