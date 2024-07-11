import { useState } from "react";

import CardList from "./components/cardlist/CardList";
import Searchbar from "./components/searchbar/Searchbar";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [text, setText] = useState("");
  const [storageVal] = useLocalStorage();

  const onType = (query: string) => {
    setText(query);
  };

  return (
    <div className="app">
      <Searchbar onType={onType} />
      <CardList searchQuery={text || storageVal} />
    </div>
  );
}
