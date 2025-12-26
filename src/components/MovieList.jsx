import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/movieThunks";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "./MovieCard";
import Loader from "./Loader";

export default function MovieList() {
  const dispatch = useDispatch();
  const { list, page, search, totalResults, loading } = useSelector(
    state => state.movies
  );

  useEffect(() => {
    if (search) {
      dispatch(fetchMovies({ search, page }));
    }
  }, [dispatch]);

  useInfiniteScroll(() => {
    dispatch(fetchMovies({ search, page }));
  }, list?.length < totalResults, loading);

  return (
    <>
      <div className="movie-grid">
        {list?.map(movie => (
          <MovieCard key={movie?.imdbID} movie={movie} />
        ))}
      </div>
      {loading && <Loader />}
    </>
  );
}
