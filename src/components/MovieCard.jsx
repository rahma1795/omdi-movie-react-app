import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieModal from "./MovieModal";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="movie-card">
      <div className="poster" onClick={() => hasPoster && setShowModal(true)}>
        {hasPoster ? (
          <img
            src={movie?.Poster}
            alt={movie?.Title}
            className="poster-img"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.classList.add("poster-error");
            }}
          />
        ) : (
          <div className="poster-fallback">No Image</div>
        )}
      </div>
      <h3 onClick={() => navigate(`/movie/${movie?.imdbID}`)}>
        {movie?.Title}
      </h3>
      <p>{movie?.Year}</p>

      {showModal && (
        <MovieModal
          poster={movie.Poster}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
