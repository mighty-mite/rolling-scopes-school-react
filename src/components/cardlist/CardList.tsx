import "./cardlist.css";

import { Component } from "react";

import Card from "../card/Card";
import Service from "../service/Service";
import Spinner from "../spinner/Spinner";

interface ICard {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface IState {
  cards: ICard[];
  loading: boolean;
  text: string;
}

interface IProps {
  onSearch: string;
}

class CardList extends Component<IProps, IState> {
  service = new Service();

  constructor(props: IProps) {
    super(props);
    this.state = {
      cards: [],
      loading: true,
      text: localStorage.getItem("search") || "",
    };
  }

  componentDidMount() {
    this.onRequest();
  }

  componentDidUpdate(prevProps: { onSearch: string }) {
    const { onSearch } = this.props;
    if (onSearch !== prevProps.onSearch) {
      this.setState(() => ({ loading: true }));
      this.service
        .searchProducts(onSearch)
        .then(data => this.setState(() => ({ cards: data, loading: false })));
    }
  }

  onRequest() {
    const { text } = this.state;
    this.service.searchProducts(text).then(this.onCardsLoaded);
  }

  onCardsLoaded = (cards: ICard[]) => {
    this.setState({ cards });
    this.setState({ loading: false });
  };

  render() {
    const { cards, loading } = this.state;
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
}

export default CardList;
