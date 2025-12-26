import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Utils
import { formatNumber, formatDuration } from "../utils";
import { fetchMovieById } from "../features/movies/movieThunks";

// Components
import Loader from "../components/Loader";

// styles
import "../styles/styles.scss";

export default function MovieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selected, loading } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);

  if (loading || !selected) return (
    <div className="loader-overlay"><Loader white /></div>
  );

  const genreList = selected?.Genre?.split(",").map((g) => g.trim());

  return (
    <div className="details-page">
      <div className="breadcrumb" >
        <div className="breadcrumb-item active" onClick={() => navigate("/")}>Home</div>
        <div className="breadcrumb-item">Detail</div>
      </div>
      
      <div className="poster">
        <img src={selected?.Poster} alt={selected?.Title} width="300" />
      </div>
      <div>
        <h1>{selected?.Title}</h1>
        <div className="list-info">
            <span>⭐ {selected?.imdbRating} ({formatNumber(selected?.imdbVotes)})</span>
            <span> &#x2022; {selected?.Type}</span>
            <span> &#x2022; {formatDuration(selected?.Runtime)}</span>
            <span> &#x2022; {selected?.Rated}</span>
        </div>
        <div className="genre-tags">
          {genreList.map((genre, index) => (
            <span key={index} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
        <div className="plot">
          {selected?.Plot}
        </div>
        <p><b>Year:</b> {selected?.Year}</p>
        <p><b>Director:</b> {selected?.Director}</p>
        <p><b>Actors:</b> {selected?.Actors}</p>
      </div>
    </div>
  );
}
