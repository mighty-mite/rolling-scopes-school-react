import "./searchbar.css";

import { useEffect } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";

interface IProps {
  onType: (query: string) => void;
}

function Searchbar(props: IProps) {
  const [storageVal, setStorageVal] = useLocalStorage();

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
        className="search-input"
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
