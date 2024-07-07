import "./searchbar.css";

import { Component } from "react";

interface IProps {
  onType: (query: string) => void;
}

class Searchbar extends Component<IProps> {
  state = {
    text: "",
  };

  componentDidMount() {
    this.setState({ text: localStorage.getItem("search") });
  }

  handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { onType } = this.props;
    const { text } = this.state;
    onType(text);
  };

  render() {
    const { text } = this.state;

    return (
      <form className="searchbar">
        <input
          value={text}
          type="text"
          className="search-input"
          placeholder="type here"
          onChange={e =>
            this.setState(() => {
              localStorage.setItem("search", e.target.value);
              return { text: e.target.value };
            })
          }
        />
        <button type="submit" onClick={this.handleClick}>
          Search
        </button>
      </form>
    );
  }
}

export default Searchbar;
