import React, { useState } from "react";
import "../Styles/SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);

    const searchResult = debouncingMethod((val) => {
      console.log("valsss", val);
      onSearch(val);
    }, 1000);

    searchResult(event.target.value);
  };

  const handleClearClick = () => {
    setSearchQuery("");
  };

  const debouncingMethod = (func: any, delay: any) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  return (
    <div className="button-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={handleClearClick}
          className="clear-button"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;
