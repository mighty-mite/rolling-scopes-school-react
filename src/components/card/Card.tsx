import "./card.css";

import { Link } from "react-router-dom";

interface Props {
  description: string;
  thumbnail: string;
  title: string;
  id: number;
}

function Card(props: Props) {
  const { thumbnail, description, title, id } = props;
  return (
    <Link className="card" to={`/details/${id}`}>
      <img className="card__image" src={thumbnail} width="100" alt={title} />
      <h4 className="card__name">{title}</h4>
      <div className="card__description">{description}</div>
    </Link>
  );
}

export default Card;
