import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import useLocalStorage from "@/hooks/useLocalStorage";
import { RootState } from "@/store/store";

import CardList from "../cardlist/CardList";
import Flyout from "../flyout/Flyout";
import Searchbar from "../searchbar/Searchbar";

function Layout() {
  const [storageVal] = useLocalStorage();
  const [searchTerm, setSearchTerm] = useState(storageVal ?? "");

  const { selected } = useSelector((state: RootState) => state.flyout);

  const onType = (query: string) => {
    setSearchTerm(query);
  };
  return (
    <main className="container" style={{ display: "flex" }}>
      <section>
        <Searchbar onType={onType} />
        <CardList searchQuery={searchTerm} />
        {selected.length > 0 ? <Flyout /> : null}
      </section>
      <Outlet />
    </main>
  );
}

export default Layout;
