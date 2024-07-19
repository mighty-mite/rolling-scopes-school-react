import "./card.css";

import { useContext } from "react";
import { Link } from "react-router-dom";

import ThemeContext from "@/themeContext/themeContext";

interface Props {
  description: string;
  thumbnail: string;
  title: string;
  id: number;
}

function Card(props: Props) {
  const { thumbnail, description, title, id } = props;
  const theme = useContext(ThemeContext);
  return (
    <Link className={`card ${theme}`} to={`/details/${id}`}>
      <img className="card__image" src={thumbnail} width="100" alt={title} />
      <h4 className="card__name">{title}</h4>
      <div className="card__description">{description}</div>
    </Link>
  );
}

export default Card;
