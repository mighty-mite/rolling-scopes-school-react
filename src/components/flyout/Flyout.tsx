import "./flyout.css";

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";

import { unselectAll } from "./flyoutSlice";

function Flyout() {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => {
    return state.flyout.selected.length;
  });

  const handleUnselect = () => {
    dispatch(unselectAll());
  };

  return (
    <div className="flyout">
      <span className="flyout__header">Items selected: {items}</span>
      <button className="flyout__unselect" onClick={handleUnselect}>
        Unselect all
      </button>
      <button className="flyout__donwload">Donwload</button>
    </div>
  );
}

export default Flyout;
