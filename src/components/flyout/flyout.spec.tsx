import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import ThemeContext from "@/themeContext/themeContext";

import Card from "../card/Card";
import Flyout from "../flyout/Flyout";
import flyoutReducer from "../flyout/flyoutSlice";

describe("Flyout component tests", () => {
  const mockStore = configureStore({
    reducer: {
      flyout: flyoutReducer,
    },
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <Provider store={mockStore}>
        <ThemeContext.Provider value="light">
          <MemoryRouter>{ui}</MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );
  };

  it("appears when at least one card is selected", () => {
    const cardProps = {
      id: 1,
      title: "Test Card",
      thumbnail: "https://via.placeholder.com/150",
    };

    renderWithProviders(
      <>
        <Card {...cardProps} />
        <Flyout />
      </>
    );

    // Select the card
    const checkbox = screen.getByLabelText(/choose me/i);
    fireEvent.click(checkbox);

    // Check that the Flyout appears with the correct number of selected items
    expect(screen.getByText(/items selected: 1/i)).toBeInTheDocument();
  });
});
