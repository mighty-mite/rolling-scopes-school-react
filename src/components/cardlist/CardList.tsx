import "./cardlist.css";

import { useEffect, useMemo, useState } from "react";

import Card from "../card/Card";
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
  const [text] = useState(localStorage.getItem("search") ?? "");

  const onCardsLoaded = (cards: ICard[]) => {
    setLoading(false);
    setCards(cards);
  };

  useEffect(() => {
    const onRequest = () => {
      service.searchProducts(text).then(data => onCardsLoaded(data));
    };
    onRequest();
  }, [text, service]);

  useEffect(() => {
    setLoading(true);
    service.searchProducts(searchQuery).then(data => onCardsLoaded(data));
  }, [searchQuery, service]);

  const content = cards.map(item => {
    return (
      <Card
        key={item.id}
        title={item.title}
        description={item.description}
        thumbnail={item.thumbnail}
      />
    );
  });

  const spinner = loading ? <Spinner /> : null;

  return (
    <ul className="cardlist">
      {content}
      {spinner}
    </ul>
  );
}

export default CardList;
