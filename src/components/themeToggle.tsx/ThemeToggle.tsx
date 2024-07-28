import "./themeToggle.css";

import { useContext } from "react";

import ThemeContext from "@/themeContext/themeContext";

interface IProps {
  changeTheme: (arg: string) => void;
}

function ThemeToggle(props: IProps) {
  const { changeTheme } = props;
  const theme = useContext(ThemeContext);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeTheme(e.target.value);
  };
  return (
    <select
      data-testid="theme-toggle"
      className={`theme-toggle ${theme}`}
      id="theme-toggle"
      onChange={handleChange}
    >
      <option value="light">Light theme</option>
      <option value="dark">Dark theme</option>
    </select>
  );
}

export default ThemeToggle;
