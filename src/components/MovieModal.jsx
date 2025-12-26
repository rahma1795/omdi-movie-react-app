import "../global.scss";

export default function MovieModal({ poster, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <img src={poster} alt="poster" />
      </div>
    </div>
  );
}