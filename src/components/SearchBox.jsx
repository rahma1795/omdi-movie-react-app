import { useState } from "react";
import { useDispatch } from "react-redux";
import useScrollShadow from "../hooks/useScrollShadow";
import { resetMovies, setSearch } from "../features/movies/movieSlice";
import { fetchMovies } from "../features/movies/movieThunks";

export default function SearchBox() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const shadow = useScrollShadow();

  const onSearch = (e) => {
    setValue(e.target.value);
    dispatch(resetMovies());
    dispatch(setSearch(e.target.value));
    dispatch(fetchMovies({ search: e.target.value, page: 1 }));
  };

  return (
    <div className={`search-wrapper ${shadow ? "shadow" : ""}`}>
      <input
        type="text"
        placeholder="Search movies by keyword..."
        value={value}
        onChange={onSearch}
        className="search-input"
      />
    </div>
  );
}
