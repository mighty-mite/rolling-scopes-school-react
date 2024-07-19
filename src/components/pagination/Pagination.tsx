import "./pagination.css";

import { useContext } from "react";

import ThemeContext from "@/themeContext/themeContext";

interface IProps {
  numberOfPages: number;
  handlePageNums: (pageNumber: number) => void;
  currentPage: number;
}

function Pagination(props: IProps) {
  const { numberOfPages, handlePageNums, currentPage } = props;

  const theme = useContext(ThemeContext);

  const btns = [...Array(numberOfPages).keys()]
    .map(i => i + 1)
    .map(num => {
      let pageStyle = { color: "black" };
      if (currentPage === num) pageStyle = { color: "red" };
      return (
        <button
          key={num}
          className={`pagination__num pagination__page-button ${theme}`}
          type="button"
          style={pageStyle}
          onClick={() => handlePageNums(num)}
        >
          {num}
        </button>
      );
    });

  return <div className="pagination">{btns}</div>;
}

export default Pagination;
