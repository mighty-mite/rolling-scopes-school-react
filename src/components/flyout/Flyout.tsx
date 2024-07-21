import "./flyout.css";

function Flyout() {
  return (
    <div className="flyout">
      <span className="flyout__header">Items selected:</span>
      <button className="flyout__unselect">Unselect all</button>
      <button className="flyout__donwload">Donwload</button>
    </div>
  );
}

export default Flyout;
