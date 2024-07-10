import { useState } from "react";

import BreakUiButton from "./components/breakUiButton/BreakUiButton";
import CardList from "./components/cardlist/CardList";
import Searchbar from "./components/searchbar/Searchbar";

export default function App() {
  const [text, setText] = useState("");

  const onType = (query: string) => {
    setText(query);
  };

  return (
    <div className="app">
      <Searchbar onType={onType} />
      <CardList onSearch={text} />
      <BreakUiButton />
    </div>
  );
}
