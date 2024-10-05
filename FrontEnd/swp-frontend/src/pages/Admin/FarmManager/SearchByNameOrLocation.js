import React, { useState } from "react";
import { Input, Button } from "antd";
import "./KoiFarm.scss";
function SearchByNameOrLocation({ onSearch, className }) {
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
        placeholder="Search by name or location"
        value={searchValue}
        onChange={handleInputChange}
        className="search-input"
      />
      <Button type="primary" onClick={handleSearch} className="search-button">
        Search
      </Button>
    </div>
  );
}

export default SearchByNameOrLocation;
