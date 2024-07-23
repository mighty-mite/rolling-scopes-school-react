import "./flyout.css";

import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";
import ThemeContext from "@/themeContext/themeContext";

import convertToCSV from "../service/convertToCsv";
import { unselectAll } from "./flyoutSlice";

function Flyout() {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => {
    return state.flyout.selected;
  });

  const handleUnselect = () => {
    dispatch(unselectAll());
  };

  const downloadCSV = () => {
    const csvData = new Blob([convertToCSV(items)], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${items.length}_items.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flyout ${theme}`}>
      <span className="flyout__header">Items selected: {items.length}</span>
      <button className={`flyout__unselect ${theme}`} onClick={handleUnselect}>
        Unselect all
      </button>
      <button className={`flyout__donwload ${theme}`} onClick={downloadCSV}>
        Donwload
      </button>
    </div>
  );
}

export default Flyout;
