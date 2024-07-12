import { useState } from "react";
import { Outlet } from "react-router-dom";

import useLocalStorage from "@/hooks/useLocalStorage";

import CardList from "../cardlist/CardList";
import Searchbar from "../searchbar/Searchbar";

function Layout() {
  const [storageVal] = useLocalStorage();
  const [searchTerm, setSearchTerm] = useState(storageVal ?? "");

  const onType = (query: string) => {
    setSearchTerm(query);
  };
  return (
    <main className="container" style={{ display: "flex" }}>
      <section>
        <Searchbar onType={onType} />
        <CardList searchQuery={searchTerm} />
      </section>
      <Outlet />
    </main>
  );
}

export default Layout;
