import SearchBox from "../components/SearchBox";
import MovieList from "../components/MovieList";

// styles
import "../styles/styles.scss";

export default function Home() {
  return (
    <div className="home-page">
      <h1 className="page-title">🎬 Movie Search</h1>
      <SearchBox />
      <MovieList />
    </div>
  );
}