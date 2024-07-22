import "./flyout.css";

import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";
import ThemeContext from "@/themeContext/themeContext";

import { unselectAll } from "./flyoutSlice";

function Flyout() {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => {
    return state.flyout.selected.length;
  });

  const handleUnselect = () => {
    dispatch(unselectAll());
  };

  return (
    <div className={`flyout ${theme}`}>
      <span className="flyout__header">Items selected: {items}</span>
      <button className={`flyout__unselect ${theme}`} onClick={handleUnselect}>
        Unselect all
      </button>
      <button className={`flyout__donwload ${theme}`}>Donwload</button>
    </div>
  );
}

export default Flyout;
