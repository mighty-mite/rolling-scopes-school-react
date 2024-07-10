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
  onSearch: string;
}

function CardList(props: IProps) {
  const { onSearch } = props;
  const service = useMemo(() => new Service(), []);
  const [cards, setCards] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);
  const [text] = useState(localStorage.getItem("search") || "");

  const onCardsLoaded = (cards: ICard[]) => {
    setCards(cards);
    setLoading(false);
  };

  useEffect(() => {
    const onRequest = () => {
      service.searchProducts(text).then(onCardsLoaded);
    };
    onRequest();
  }, [text, service]);

  useEffect(() => {
    setLoading(true);
    service.searchProducts(onSearch).then(data => {
      setCards(data);
      setLoading(false);
    });
  }, [onSearch, service]);

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
