import { Route, Routes } from "react-router";

import Details from "./components/details/Details";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="details/:id" element={<Details />} />
        </Route>
      </Routes>
    </div>
  );
}
