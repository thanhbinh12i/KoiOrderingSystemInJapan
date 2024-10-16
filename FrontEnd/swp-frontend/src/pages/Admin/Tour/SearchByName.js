import React from "react";
import { Input, Button } from "antd";
import { useState } from "react";

function SearchByName({ onSearch, className }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className={`search-container ${className}`}>
      <Input
        placeholder="Search by name"
        value={searchValue}
        onChange={handleInputChange}
        className="search-input"
      />
      <Button type="primary" onClick={handleSearch} className={className}>
        Search
      </Button>
    </div>
  );
}

export default SearchByName;
