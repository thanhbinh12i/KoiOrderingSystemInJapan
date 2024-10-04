import React from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchByName({ onSearch, className }) {
  return (
    <Search
      placeholder="Tìm kiếm theo tên tour"
      onSearch={onSearch}
      className={className}
      style={{ width: 200 }}
    />
  );
}

export default SearchByName;
