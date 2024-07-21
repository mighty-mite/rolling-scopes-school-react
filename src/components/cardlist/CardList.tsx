import "./cardlist.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ICard } from "@/types";

import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import Spinner from "../spinner/Spinner";
import { useGetCardsQuery } from "./cardListSlice";

interface IProps {
  searchQuery: string;
}

function CardList(props: IProps) {
  const { searchQuery } = props;

  const [offset, setOffset] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSearchParams] = useSearchParams();

  const {
    data: response = { limit: 0, products: [], skip: 0, total: 0 },
    isLoading,
  } = useGetCardsQuery({ searchQuery, offset });

  useEffect(() => {
    setNumberOfPages(Math.ceil(response.total / 10));
    setSearchParams({ page: String(currentPage) });
  }, [currentPage, response.total, setSearchParams]);

  const content = response.products.map((item: ICard) => {
    return (
      <Card
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        thumbnail={item.thumbnail}
      />
    );
  });

  const handlePageNums = (pageNumber: number) => {
    setOffset(pageNumber * 10 - 10);
    setCurrentPage(pageNumber);
  };

  const spinner = isLoading ? <Spinner /> : null;

  return (
    <>
      <ul className="cardlist">
        {content.length === 0 ? "sorry, no such items" : content}
        {spinner}
      </ul>
      {numberOfPages <= 1 ? null : (
        <Pagination
          numberOfPages={numberOfPages}
          handlePageNums={handlePageNums}
          currentPage={currentPage}
        />
      )}
    </>
  );
}

export default CardList;
