import "./details.css";

import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import ThemeContext from "@/themeContext/themeContext";

import { useGetSingleCardQuery } from "./../cardlist/cardListSlice";
import Spinner from "./../spinner/Spinner";

interface IDetails {
  warrantyInformation: string;
  thumbnail: string;
  title: string;
}

function View(props: IDetails) {
  const { title, warrantyInformation, thumbnail } = props;
  const theme = useContext(ThemeContext);

  return (
    <div className={`details ${theme}`}>
      <Link to="/">close</Link>
      <div className="title">{title}</div>
      <div className="brand">{warrantyInformation}</div>
      <img src={thumbnail} alt="" width="300" />
    </div>
  );
}

function Details() {
  const { id } = useParams();

  const {
    data: response = { title: "", warrantyInformation: "", thumbnail: "" },
    isLoading,
  } = useGetSingleCardQuery({ id });

  const content = (
    <View
      title={response.title}
      warrantyInformation={response.warrantyInformation}
      thumbnail={response.thumbnail}
    />
  );

  const spinner = isLoading ? <Spinner /> : null;

  return (
    <article className="right">
      {content}
      {spinner}
      <Link className="overlay" to="/" />
    </article>
  );
}

export default Details;
