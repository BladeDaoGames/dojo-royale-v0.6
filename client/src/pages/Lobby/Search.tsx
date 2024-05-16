import React from "react";
import { BiSearchAlt } from "react-icons/bi";

interface SearchProps {
  onSearch: (searchQuery: string) => void; // Function to handle the search action
}

interface SearchState {
  searchQuery: string;
}

export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchQuery: "" };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch(this.state.searchQuery);
  };

  render() {
    return (
      <form className="search-container
        flex items-center justify-center
        ml-2 mr-auto bg-white rounded-md
        px-2
        border border-green-700
      " 
      onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search room by owner or room id"
          className="w-[20em] search-input rounded-md text-xl py-1 px-2
          focus:outline-none
          "
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
        <BiSearchAlt className="search-icon mx-2 text-xl font-bold text-gray-800" />
        <button type="submit" style={{ display: "none" }}>
          Search
        </button>
      </form>
    );
  }
}
