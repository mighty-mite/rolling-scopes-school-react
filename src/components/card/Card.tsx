import "./card.css";

interface Props {
  description: string;
  thumbnail: string;
  title: string;
}

function Card(props: Props) {
  const { thumbnail, description, title } = props;
  return (
    <li className="card">
      <img className="card__image" src={thumbnail} width="100" alt={title} />
      <div className="card__name">{title}</div>
      <div className="card__description">{description}</div>
    </li>
  );
}

export default Card;
