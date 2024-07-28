import { fireEvent, render, screen } from "@testing-library/react";
import {
  BrowserRouter,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";

import Pagination from "./Pagination";

const TestComponent = ({
  numberOfPages,
  currentPage,
}: {
  numberOfPages: number;
  currentPage: number;
}) => {
  const [, setSearchParams] = useSearchParams();

  const handlePageNums = (pageNum: number) => {
    setSearchParams({ page: pageNum.toString() });
  };

  return (
    <Pagination
      numberOfPages={numberOfPages}
      currentPage={currentPage}
      handlePageNums={handlePageNums}
    />
  );
};

describe("Pagination test", () => {
  const numberOfPages = 10;
  const currentPage = 1;

  it("Pagination updates URL query parameter when page changes", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <TestComponent
                numberOfPages={numberOfPages}
                currentPage={currentPage}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );

    const pageButtons = screen.getAllByRole("button");
    fireEvent.click(pageButtons[1]);

    const searchParams = new URLSearchParams(window.location.search);
    expect(searchParams.get("page")).toBe("2");
  });
});
