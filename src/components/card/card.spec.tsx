/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ThemeContext from "@/themeContext/themeContext";

import { cardListSlice } from "../cardlist/cardListSlice";
import Details from "../details/Details";
import Card from "./Card";

// Mock slice
const mockFlyoutSlice = {
  reducer: (state = { selected: [] }) => state,
};

const store = configureStore({
  reducer: {
    flyout: mockFlyoutSlice.reducer,
    [cardListSlice.reducerPath]: cardListSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cardListSlice.middleware),
});

const mockCardData = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  thumbnail:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
};

// Mock the API calls
jest.mock("./../cardlist/cardListSlice", () => ({
  ...jest.requireActual("./../cardlist/cardListSlice"),
  useGetSingleCardQuery: jest.fn().mockReturnValue({
    data: {
      title: "Essence Mascara Lash Princess",
      brand: "Essence",
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    },
    isLoading: false,
  }),
}));

describe("Card component tests", () => {
  it("renders the relevant card data", () => {
    const { thumbnail, title, id } = mockCardData;

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
    // Check if the image is rendered with the correct alt text
    expect(
      screen.getByAltText("Essence Mascara Lash Princess")
    ).toBeInTheDocument();
  });

  it("opens the detailed card component when a card is clicked", async () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value="light">
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route
                path="/"
                element={
                  <Card
                    thumbnail={mockCardData.thumbnail}
                    title={mockCardData.title}
                    id={mockCardData.id}
                  />
                }
              />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    // Click on the card link
    const cardLink = screen.getByRole("link", {
      name: /essence mascara lash princess/i,
    });
    fireEvent.click(cardLink);

    // Check if the Details component is rendered
    await waitFor(() => {
      expect(
        screen.getByText(/essence mascara lash princess/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/essence/i)).toBeInTheDocument();
      expect(screen.getByRole("img", { name: "" })).toBeInTheDocument();
    });
  });

  it("triggers an additional API call to fetch detailed information when the card is clicked", async () => {
    const useGetSingleCardQuery =
      require("./../cardlist/cardListSlice").useGetSingleCardQuery;

    render(
      <Provider store={store}>
        <ThemeContext.Provider value="light">
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route
                path="/"
                element={
                  <Card
                    thumbnail={mockCardData.thumbnail}
                    title={mockCardData.title}
                    id={mockCardData.id}
                  />
                }
              />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    // Click on the card link
    const cardLink = screen.getByRole("link", {
      name: /essence mascara lash princess/i,
    });
    fireEvent.click(cardLink);

    // Ensure the API call is made
    await waitFor(() => {
      expect(useGetSingleCardQuery).toHaveBeenCalledWith({
        id: `${mockCardData.id}`,
      });
    });
  });
});
