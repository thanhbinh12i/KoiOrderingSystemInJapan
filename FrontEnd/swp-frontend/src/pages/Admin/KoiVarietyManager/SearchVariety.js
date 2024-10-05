import { useEffect, useState } from "react";
import { Input } from "antd";
import "./KoiVariety.scss";
const { Search } = Input;

function SearchVariety({ onSearch }) {
  const [searchVariety, setsearchVariety] = useState("");
  useEffect(() => {
    onSearch(searchVariety);
  }, [searchVariety, onSearch]);
  return (
    <>
      <Search
        className="search-button"
        placeholder="Tìm kiếm giống cá"
        enterButton="Tìm"
        size="large"
        value={searchVariety}
        onChange={(e) => setsearchVariety(e.target.value)}
      />
    </>
  );
}
export default SearchVariety;
