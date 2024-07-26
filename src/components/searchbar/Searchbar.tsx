import "./searchbar.css";

import { useContext, useState } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";
import ThemeContext from "@/themeContext/themeContext";

interface IProps {
  onType: (query: string) => void;
}

function Searchbar(props: IProps) {
  const [storageVal, setStorageVal] = useLocalStorage();
  const theme = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState(storageVal);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStorageVal(inputValue);
    const { onType } = props;
    onType(inputValue);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form className="searchbar">
      <input
        value={inputValue}
        type="text"
        className={`search-input ${theme}`}
        placeholder="type here"
        onChange={handleInput}
      />
      <button type="submit" onClick={handleClick}>
        Search
      </button>
    </form>
  );
}

export default Searchbar;
