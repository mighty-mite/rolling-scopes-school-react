import { fireEvent, render, screen } from "@testing-library/react";

import useLocalStorage from "@/hooks/useLocalStorage";
import ThemeContext from "@/themeContext/themeContext";

import Searchbar from "./Searchbar";

// Mock the useLocalStorage hook
jest.mock("@/hooks/useLocalStorage");

describe("Searchbar component tests", () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  it("saves the entered value to the local storage when the Search button is clicked", () => {
    const mockSetStorageVal = jest.fn();
    (useLocalStorage as jest.Mock).mockReturnValue(["", mockSetStorageVal]);

    const handleType = jest.fn();
    render(
      <ThemeContext.Provider value="light">
        <Searchbar onType={handleType} />
      </ThemeContext.Provider>
    );

    const inputElement = screen.getByPlaceholderText("type here");
    const buttonElement = screen.getByText("Search");

    fireEvent.change(inputElement, { target: { value: "test query" } });
    fireEvent.click(buttonElement);

    expect(mockSetStorageVal).toHaveBeenCalledWith("test query");
    expect(handleType).toHaveBeenCalledWith("test query");
  });

  it("retrieves the value from local storage upon mounting", () => {
    (useLocalStorage as jest.Mock).mockReturnValue(["stored query", jest.fn()]);

    const handleType = jest.fn();
    render(
      <ThemeContext.Provider value="light">
        <Searchbar onType={handleType} />
      </ThemeContext.Provider>
    );

    const inputElement = screen.getByPlaceholderText("type here");
    expect(inputElement).toHaveValue("stored query");
  });
});
