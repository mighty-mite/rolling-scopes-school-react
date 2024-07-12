import "./cardlist.css";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import Service from "../service/Service";
import Spinner from "../spinner/Spinner";

interface ICard {
  description: string;
  id: number;
  thumbnail: string;
  title: string;
}

interface IProps {
  searchQuery: string;
}

function CardList(props: IProps) {
  const { searchQuery } = props;
  const service = useMemo(() => new Service(), []);
  const [cards, setCards] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);

  const [offset, setOffset] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSearchParams] = useSearchParams();

  const onCardsLoaded = (cards: ICard[]) => {
    setLoading(false);
    setCards(cards);
  };

  useEffect(() => {
    setLoading(true);
    service.searchProducts(searchQuery, offset).then(data => {
      onCardsLoaded(data.products);
      console.log(data.total);
      setNumberOfPages(Math.ceil(data.total / 10));
      setSearchParams({ page: String(currentPage) });
    });
  }, [
    searchQuery,
    service,
    numberOfPages,
    setSearchParams,
    currentPage,
    offset,
  ]);

  const content = cards.map(item => {
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

  const spinner = loading ? <Spinner /> : null;

  return (
    <>
      <ul className="cardlist">
        {content}
        {spinner}
      </ul>
      <Pagination
        numberOfPages={numberOfPages}
        handlePageNums={handlePageNums}
        currentPage={currentPage}
      />
    </>
  );
}

export default CardList;
