import UniversitiesList from "./UniversitiesList";
import { UniversityContext } from "../contexts/UniversityContext";
import { useContext, useRef, useState } from "react";

const Home = () => {
  const { error, isPending, data } = useContext(UniversityContext);
  const { dispatch } = useContext(UniversityContext);
  const [searchResult, setSearchResult] = useState([]);
  const [SearchQuery, setSearchQuery] = useState(null);

  const [sortType, setSortType] = useState("SORT_ASC");
  const inputEl = useRef("");
  const getSearch = () => {
    const keyword = inputEl.current.value;
    setSearchQuery(keyword);
    if (keyword !== "") {
      const result = data.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };

  const sortData = () => {
    if (sortType == "SORT_ASC") {
      setSortType("SORT_DESC");
    } else {
      setSortType("SORT_ASC");
    }
    dispatch({ type: sortType });
  };
  return (
    <div className="home">
      <div className="input-box">
        <input
          ref={inputEl}
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          onChange={getSearch}
          placeholder="Search"
        />{" "}
        <button onClick={() => sortData()}>
          {sortType == "SORT_ASC" ? <div>A-Z</div> : <div>Z-A</div>}
        </button>
      </div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <UniversitiesList universities={SearchQuery ? searchResult : data} />
      )}
      {SearchQuery && searchResult.length == 0 ? (
        <div className="blog-list">
          <div className="blog-preview">No result...</div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
