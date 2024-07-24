import "./details.css";

import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import ThemeContext from "@/themeContext/themeContext";

import { useGetSingleCardQuery } from "./../cardlist/cardListSlice";
import Spinner from "./../spinner/Spinner";

interface IDetails {
  brand: string;
  thumbnail: string;
  title: string;
}

function View(props: IDetails) {
  const { title, brand, thumbnail } = props;
  const theme = useContext(ThemeContext);

  return (
    <div className={`details ${theme}`}>
      <Link to="/">close</Link>
      <div className="title">{title}</div>
      <div className="brand">{brand}</div>
      <img src={thumbnail} alt="" width="300" />
    </div>
  );
}

function Details() {
  const { id } = useParams();

  const {
    data: response = { title: "", brand: "", thumbnail: "" },
    isLoading,
  } = useGetSingleCardQuery({ id });

  const content = (
    <View
      title={response.title}
      brand={response.brand}
      thumbnail={response.thumbnail}
    />
  );

  const spinner = isLoading ? <Spinner /> : null;

  return (
    <section className="right">
      {content}
      {spinner}
      <Link className="overlay" to="/" />
    </section>
  );
}

export default Details;
