import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieModal from "./MovieModal";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="movie-card">
      <div
        className="img-wrap" 
        style={{backgroundImage: `url(${movie?.Poster})`}}
        onClick={() => hasPoster && setShowModal(true)}
      >
        <div className="movie-info">
          <div>
            <h3 onClick={() => navigate(`/movie/${movie?.imdbID}`)}>
              {movie?.Title}
            </h3>
            <p>{movie?.Year}</p>
          </div>
        </div>
      </div>

      {showModal && (
        <MovieModal
          poster={movie.Poster}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
