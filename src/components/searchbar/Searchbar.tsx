import "./searchbar.css";

import { useContext, useEffect } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";
import ThemeContext from "@/themeContext/themeContext";

interface IProps {
  onType: (query: string) => void;
}

function Searchbar(props: IProps) {
  const [storageVal, setStorageVal] = useLocalStorage();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    setStorageVal(storageVal);
  }, [setStorageVal, storageVal]);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { onType } = props;
    onType(storageVal);
  };

  return (
    <form className="searchbar">
      <input
        value={storageVal}
        type="text"
        className={`search-input ${theme}`}
        placeholder="type here"
        onChange={e => {
          setStorageVal(e.target.value);
        }}
      />
      <button type="submit" onClick={handleClick}>
        Search
      </button>
    </form>
  );
}

export default Searchbar;
