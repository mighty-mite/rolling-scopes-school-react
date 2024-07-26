import "./card.css";

import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch, RootState } from "@/store/store";
import ThemeContext from "@/themeContext/themeContext";

import { itemAdded, itemRemoved } from "../flyout/flyoutSlice";

interface Props {
  thumbnail: string;
  title: string;
  id: number;
}

function Card(props: Props) {
  const { thumbnail, title, id } = props;
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  const isSelectedSelector = useSelector((state: RootState) => {
    const selectedItem = state.flyout.selected.find(item => item.id === id);
    return selectedItem ? true : false;
  });

  const [isSelected, setIsSelected] = useState(isSelectedSelector);

  useEffect(() => {
    setIsSelected(isSelectedSelector);
  }, [isSelectedSelector]);

  const handleChange = () => {
    const newIsSelected = !isSelected;
    setIsSelected(newIsSelected);
    if (newIsSelected) {
      dispatch(itemAdded({ id, title, thumbnail }));
    } else {
      dispatch(itemRemoved(id));
    }
  };

  return (
    <li className="card">
      <Link className={`card__link ${theme}`} to={`/details/${id}`}>
        <img className="card__image" src={thumbnail} width="100" alt={title} />
        <h4 className="card__name">{title}</h4>
      </Link>
      <label className={`card__checkbox ${theme}`}>
        Choose Me
        <input checked={isSelected} type="checkbox" onChange={handleChange} />
      </label>
    </li>
  );
}

export default Card;
