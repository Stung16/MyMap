import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import "../../../assets/css/style.css";

const Search = ({ onSearch, data }) => {
  const [searchValue, setSearchValue] = useState("");
  const [active, setActive] = useState(false);
  const debounced = useDebouncedCallback((value) => {
    onSearch(value?.toLowerCase()?.trim());
  }, 1000);
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (data !== 0) {
      debounced(e.target.value);
    }
  };
  return (
    <div className="flex justify-center items-center gap-1 relative ">
      <IoSearch className=" search_icon" onClick={() => setActive(!active)} />
      <Input
        type="email"
        placeholder="Type to search..."
        className={`input_search ${active && 'active'}`}
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
