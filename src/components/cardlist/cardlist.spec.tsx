import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import ThemeContext from "@/themeContext/themeContext";
import { ICard } from "@/types";

import CardList from "./CardList";
import { cardListSlice, useGetCardsQuery } from "./cardListSlice";

// Mock data
const mockCardData: ICard[] = [
  { id: 1, title: "Card 1", thumbnail: "thumbnail1.png" },
  { id: 2, title: "Card 2", thumbnail: "thumbnail2.png" },
];

// Mock API call
jest.mock("./cardListSlice", () => ({
  ...jest.requireActual("./cardListSlice"),
  useGetCardsQuery: jest.fn(),
}));

// Mock flyout slice
const mockFlyoutSlice = {
  reducer: (state = { selected: [] }) => state,
};

const mockStore = configureStore({
  reducer: {
    flyout: mockFlyoutSlice.reducer,
    [cardListSlice.reducerPath]: cardListSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cardListSlice.middleware),
});

describe("CardList component tests", () => {
  beforeEach(() => {
    (useGetCardsQuery as jest.Mock).mockReturnValue({
      data: { limit: 10, products: mockCardData, skip: 0, total: 2 },
      isLoading: false,
    });
  });

  it("renders the specified number of cards", () => {
    render(
      <Provider store={mockStore}>
        <ThemeContext.Provider value="light">
          <MemoryRouter>
            <CardList searchQuery="test" />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    // Check if the correct number of cards are rendered
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(mockCardData.length);
  });

  it("displays an appropriate message if no cards are present", () => {
    (useGetCardsQuery as jest.Mock).mockReturnValue({
      data: { limit: 10, products: [], skip: 0, total: 0 },
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <ThemeContext.Provider value="light">
          <MemoryRouter>
            <CardList searchQuery="test" />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    // Check if the no cards message is displayed
    expect(screen.getByText("sorry, no such items")).toBeInTheDocument();
  });
});
