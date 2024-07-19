import "./App.css";

import { useState } from "react";
import { Route, Routes } from "react-router";

import Details from "./components/details/Details";
import ErrorPage from "./components/errorpage/ErrorPage";
import Layout from "./components/layout/Layout";
import ThemeToggle from "./components/themeToggle.tsx/ThemeToggle";
import ThemeContext from "./themeContext/themeContext";

const { Provider } = ThemeContext;

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <Provider value={theme}>
      <div className={`app ${theme}`}>
        <ThemeToggle changeTheme={(arg: string) => setTheme(arg)} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="details/:id" element={<Details />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Provider>
  );
}
