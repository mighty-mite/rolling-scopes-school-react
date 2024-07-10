import "./searchbar.css";

import { useEffect, useState } from "react";

interface IProps {
  onType: (query: string) => void;
}

function Searchbar(props: IProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(localStorage.getItem("search") || "");
  }, [text]);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { onType } = props;
    onType(text);
  };

  return (
    <form className="searchbar">
      <input
        value={text}
        type="text"
        className="search-input"
        placeholder="type here"
        onChange={e => {
          localStorage.setItem("search", e.target.value);
          setText(e.target.value);
        }}
      />
      <button type="submit" onClick={handleClick}>
        Search
      </button>
    </form>
  );
}

export default Searchbar;
