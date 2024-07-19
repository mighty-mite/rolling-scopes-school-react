import "./themeToggle.css";

interface IProps {
  changeTheme: (arg: string) => void;
}

function ThemeToggle(props: IProps) {
  const { changeTheme } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeTheme(e.target.value);
  };
  return (
    <select className="theme-toggle" id="theme-toggle" onChange={handleChange}>
      <option value="light">Light theme</option>
      <option value="dark">Dark theme</option>
    </select>
  );
}

export default ThemeToggle;
