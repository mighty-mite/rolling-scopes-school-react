import "./details.css";

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ThemeContext from "@/themeContext/themeContext";

import Service from "./../service/Service";
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
  const [details, setDetails] = useState<IDetails>({
    title: "",
    brand: "",
    thumbnail: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const service = new Service();
    setDetails({ title: "", brand: "", thumbnail: "" });
    setLoading(true);
    if (id)
      service.getSingleProduct(id).then(data => {
        setDetails(data);
        setLoading(false);
      });
  }, [id]);

  const content = (
    <View
      title={details.title}
      brand={details.brand}
      thumbnail={details.thumbnail}
    />
  );

  const spinner = loading ? <Spinner /> : null;

  return (
    <section className="right">
      {content}
      {spinner}
      <Link className="overlay" to="/" />
    </section>
  );
}

export default Details;
